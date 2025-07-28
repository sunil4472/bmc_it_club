import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const { adminKey } = await request.json()

    console.log("Login attempt with admin key:", adminKey)
    console.log("Expected admin key:", process.env.ADMIN_KEY)

    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: "Invalid admin key" }, { status: 401 })
    }

    const token = jwt.sign(
      {
        role: "admin",
        adminKey,
        timestamp: Date.now(),
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    )

    console.log("Generated token:", token)

    const response = NextResponse.json({
      message: "Login successful",
      redirect: "/admin",
    })

    // Set the cookie with proper configuration
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // Changed from "strict" to "lax"
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/", // Ensure cookie is available for all paths
    })

    console.log("Cookie set successfully")

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
