"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Eye, Users, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Event {
  _id: string
  title: string
  description: string
  date: string
  fee: number
  image: string
  status: "upcoming" | "completed"
  participantLimit: number
  registrations: any[]
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/admin/events")
      const data = await response.json()
      setEvents(data)
    } catch (error) {
      console.error("Error fetching events:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    try {
      const response = await fetch(`/api/admin/events/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Event deleted",
          description: "The event has been successfully deleted.",
        })
        fetchEvents()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event.",
        variant: "destructive",
      })
    }
  }

  const downloadParticipants = (event: Event) => {
    const csvContent = [
      ["Name", "College", "Email", "Phone", "Semester", "Faculty", "Transaction Number", "Registration Date"],
      ...event.registrations.map((reg: any) => [
        reg.name,
        reg.college,
        reg.email,
        reg.phone,
        reg.semester,
        reg.faculty,
        reg.transactionNumber,
        new Date(reg.registeredAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${event.title}-participants.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Events</h1>
            <p className="text-muted-foreground">Create, edit, and manage events</p>
          </div>
          <Button asChild>
            <Link href="/admin/events/new">
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge
                    className={`absolute top-4 left-4 ${event.status === "upcoming" ? "bg-green-500" : "bg-gray-500"}`}
                  >
                    {event.status}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                  <CardDescription>
                    {new Date(event.date).toLocaleDateString()} • NPR {event.fee}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Participants:</span>
                      <span>
                        {event.registrations.length} / {event.participantLimit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${(event.registrations.length / event.participantLimit) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/events/${event._id}`} target="_blank">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/admin/events/edit/${event._id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" onClick={() => setSelectedEvent(event)}>
                          <Users className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Participants - {selectedEvent?.title}</DialogTitle>
                          <DialogDescription>
                            {selectedEvent?.registrations.length} registered participants
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Button onClick={() => selectedEvent && downloadParticipants(selectedEvent)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download CSV
                          </Button>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>College</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Faculty</TableHead>
                                <TableHead>Semester</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {selectedEvent?.registrations.map((participant: any, index: number) => (
                                <TableRow key={index}>
                                  <TableCell>{participant.name}</TableCell>
                                  <TableCell>{participant.college}</TableCell>
                                  <TableCell>{participant.email}</TableCell>
                                  <TableCell>{participant.phone}</TableCell>
                                  <TableCell>{participant.faculty}</TableCell>
                                  <TableCell>{participant.semester}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" variant="outline" onClick={() => deleteEvent(event._id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">No events found.</p>
            <Button asChild>
              <Link href="/admin/events/new">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Event
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
