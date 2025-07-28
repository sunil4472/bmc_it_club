import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Event from "@/lib/models/Event"
import { seedDatabase } from "@/lib/seedData"

export async function GET() {
  try {
    await dbConnect()

    let events = await Event.find().sort({ date: -1 })

    // If no events exist, seed the database
    if (events.length === 0) {
      await seedDatabase()
      events = await Event.find().sort({ date: -1 })
    }

    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const data = await request.json()

    const event = new Event(data)
    await event.save()

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}
