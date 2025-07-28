import type { ObjectId } from "mongodb"

export interface User {
  _id?: ObjectId
  email: string
  password: string
  role: "admin" | "user"
  createdAt: Date
  updatedAt: Date
}
