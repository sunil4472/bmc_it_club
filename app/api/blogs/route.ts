import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Blog from "@/lib/models/Blog"
import { seedDatabase } from "@/lib/seedData"

export async function GET() {
  try {
    await dbConnect()

    let blogs = await Blog.find({ published: true }).sort({ createdAt: -1 })

    // If no blogs exist, seed the database
    if (blogs.length === 0) {
      await seedDatabase()
      blogs = await Blog.find({ published: true }).sort({ createdAt: -1 })
    }

    return NextResponse.json(blogs)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const data = await request.json()

    // Generate slug from title
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    const blog = new Blog({
      ...data,
      slug,
    })

    await blog.save()
    return NextResponse.json(blog, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 })
  }
}
