import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Blog from "@/lib/models/Blog"
import jwt from "jsonwebtoken"

async function verifyAdmin(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value
  if (!token) return false

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any
    return payload.role === "admin"
  } catch {
    return false
  }
}

export async function GET(request: NextRequest) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await dbConnect()
    const blogs = await Blog.find().sort({ createdAt: -1 })
    return NextResponse.json(blogs)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await dbConnect()
    const data = await request.json()

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
