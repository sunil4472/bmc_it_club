import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Settings from "@/lib/models/Settings"
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

    let settings = await Settings.findOne()

    // If no settings exist, create default settings
    if (!settings) {
      settings = new Settings({})
      await settings.save()
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error("Settings fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await dbConnect()
    const settingsData = await request.json()

    let settings = await Settings.findOne()

    if (!settings) {
      settings = new Settings(settingsData)
    } else {
      Object.assign(settings, settingsData)
    }

    await settings.save()

    return NextResponse.json(settings)
  } catch (error) {
    console.error("Settings update error:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
