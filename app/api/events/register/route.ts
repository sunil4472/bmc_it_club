import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Event from "@/lib/models/Event"
import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLDN_NAME,
  api_key: process.env.CLDN_API_KEY,
  api_secret: process.env.CLDN_SECRET_KEY,
})

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const formData = await request.formData()
    const eventId = formData.get("eventId") as string
    const name = formData.get("name") as string
    const college = formData.get("college") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const semester = formData.get("semester") as string
    const faculty = formData.get("faculty") as string
    const transactionNumber = formData.get("transactionNumber") as string
    const paymentProof = formData.get("paymentProof") as File

    // Find the event
    const event = await Event.findById(eventId)
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    // Check if registration is still open
    if (event.status !== "upcoming") {
      return NextResponse.json({ error: "Registration is closed for this event" }, { status: 400 })
    }

    // Check if there are available slots
    if (event.registrations.length >= event.participantLimit) {
      return NextResponse.json({ error: "Event is full" }, { status: 400 })
    }

    // Check if user is already registered
    const existingRegistration = event.registrations.find((reg: any) => reg.email === email)
    if (existingRegistration) {
      return NextResponse.json({ error: "You are already registered for this event" }, { status: 400 })
    }

    // Upload payment proof to Cloudinary
    let paymentProofUrl = ""
    if (paymentProof) {
      const bytes = await paymentProof.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              folder: "bmc-it-club/payments",
            },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            },
          )
          .end(buffer)
      })

      paymentProofUrl = (uploadResult as any).secure_url
    }

    // Add registration to event
    const registration = {
      name,
      college,
      email,
      phone,
      semester,
      faculty,
      transactionNumber,
      paymentProof: paymentProofUrl,
      registeredAt: new Date(),
    }

    event.registrations.push(registration)
    await event.save()

    return NextResponse.json(
      {
        message: "Registration successful",
        registration: registration,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
