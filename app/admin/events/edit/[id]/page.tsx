"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Save, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"

export default function EditEventPage() {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    fee: 0,
    image: "",
    status: "upcoming",
    participantLimit: 50,
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    if (params.id) {
      fetchEvent(params.id as string)
    }
  }, [params.id])

  const fetchEvent = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/events/${id}`, {
        credentials: "include",
      })
      if (response.ok) {
        const event = await response.json()
        setEventData({
          title: event.title,
          description: event.description,
          date: new Date(event.date).toISOString().slice(0, 16),
          fee: event.fee,
          image: event.image || "",
          status: event.status,
          participantLimit: event.participantLimit,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch event data.",
        variant: "destructive",
      })
    } finally {
      setFetchLoading(false)
    }
  }

  const handleImageUpload = async () => {
    if (!imageFile) return

    setUploading(true)
    const formData = new FormData()
    formData.append("file", imageFile)
    formData.append("upload_preset", "bmc-it-club")

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLDN_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      )

      const data = await response.json()
      setEventData((prev) => ({ ...prev, image: data.secure_url }))
      toast({
        title: "Image uploaded",
        description: "Event image has been uploaded successfully.",
      })
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/admin/events/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(eventData),
      })

      if (response.ok) {
        toast({
          title: "Event updated",
          description: "The event has been successfully updated.",
        })
        router.push("/admin/events")
      } else {
        throw new Error("Failed to update event")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update event. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/admin/events">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Link>
          </Button>
          <h1 className="text-3xl font-bold mb-2">Edit Event</h1>
          <p className="text-muted-foreground">Update the event information</p>
        </motion.div>

        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>Update the information for this event</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={eventData.title}
                    onChange={(e) => setEventData((prev) => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="date">Event Date *</Label>
                  <Input
                    id="date"
                    type="datetime-local"
                    value={eventData.date}
                    onChange={(e) => setEventData((prev) => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={eventData.description}
                  onChange={(e) => setEventData((prev) => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="fee">Registration Fee (NPR)</Label>
                  <Input
                    id="fee"
                    type="number"
                    min="0"
                    value={eventData.fee}
                    onChange={(e) => setEventData((prev) => ({ ...prev, fee: Number.parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="participantLimit">Participant Limit</Label>
                  <Input
                    id="participantLimit"
                    type="number"
                    min="1"
                    value={eventData.participantLimit}
                    onChange={(e) =>
                      setEventData((prev) => ({ ...prev, participantLimit: Number.parseInt(e.target.value) || 50 }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={eventData.status}
                    onValueChange={(value) => setEventData((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="image">Event Cover Image</Label>
                <div className="space-y-4">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  />
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">OR</span>
                    <Input
                      type="url"
                      placeholder="Enter image URL"
                      value={eventData.image}
                      onChange={(e) => setEventData((prev) => ({ ...prev, image: e.target.value }))}
                    />
                  </div>
                  {imageFile && (
                    <Button type="button" onClick={handleImageUpload} disabled={uploading}>
                      <Upload className="mr-2 h-4 w-4" />
                      {uploading ? "Uploading..." : "Upload New Image"}
                    </Button>
                  )}
                  {eventData.image && (
                    <div className="mt-4">
                      <img
                        src={eventData.image || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full max-w-md h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-4">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    "Updating..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Update Event
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/admin/events">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
