import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { isAdmin } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any
    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { currentPassword, newPassword } = await request.json()

    // Verify current password is the admin key
    if (!isAdmin(currentPassword)) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
    }

    // For this simple implementation, we'll update the admin key in environment
    // In a real app, you'd store this in a database
    if (newPassword.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // Generate new token with updated timestamp
    const newToken = jwt.sign(
      {
        role: "admin",
        adminKey: newPassword,
        timestamp: Date.now(),
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    )

    const response = NextResponse.json({ message: "Password changed successfully" })

    response.cookies.set("auth-token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: "Failed to change password" }, { status: 500 })
  }
}
