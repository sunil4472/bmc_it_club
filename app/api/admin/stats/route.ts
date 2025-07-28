import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Blog from "@/lib/models/Blog"
import Event from "@/lib/models/Event"
import Member from "@/lib/models/Member"
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

    // Get all statistics in parallel
    const [totalBlogs, activeEvents, clubMembers, allEvents] = await Promise.all([
      Blog.countDocuments({ published: true }),
      Event.countDocuments({ status: "upcoming" }),
      Member.countDocuments({ isActive: true }),
      Event.find({}, "registrations"),
    ])

    // Count total registrations across all events
    const totalRegistrations = allEvents.reduce((total, event) => {
      return total + (event.registrations?.length || 0)
    }, 0)

    const stats = {
      totalBlogs,
      activeEvents,
      clubMembers,
      totalRegistrations,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Stats error:", error)
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}
