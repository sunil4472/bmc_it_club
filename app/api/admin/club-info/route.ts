import { type NextRequest, NextResponse } from "next/server"
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

export async function PUT(request: NextRequest) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const clubData = await request.json()

    // In a real application, you would save this to a database
    // For now, we'll just return success
    return NextResponse.json({ message: "Club information updated successfully", data: clubData })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update club information" }, { status: 500 })
  }
}
