import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Member from "@/lib/models/Member"
import { seedDatabase } from "@/lib/seedData"

export async function GET() {
  try {
    await dbConnect()

    let members = await Member.find({ isActive: true }).sort({ createdAt: -1 })

    // If no members exist, seed the database
    if (members.length === 0) {
      await seedDatabase()
      members = await Member.find({ isActive: true }).sort({ createdAt: -1 })
    }

    return NextResponse.json(members)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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
