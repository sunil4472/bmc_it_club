import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "No token found" }, { status: 401 })
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    return NextResponse.json({
      message: "Valid token",
      user: { role: payload.role },
    })
  } catch (error) {
    return NextResponse.json({ error: "Token verification failed" }, { status: 401 })
  }
}
