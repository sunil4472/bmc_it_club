import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
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
    const members = await Member.find().sort({ createdAt: -1 })
    return NextResponse.json(members)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await dbConnect()
    const data = await request.json()

    const member = new Member(data)
    await member.save()

    return NextResponse.json(member, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create member" }, { status: 500 })
  }
}
