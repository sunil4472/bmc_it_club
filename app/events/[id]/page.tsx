"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, DollarSign, Users, MapPin, Clock, ArrowLeft, Mail, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"

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

interface RegistrationData {
  name: string
  college: string
  email: string
  phone: string
  semester: string
  faculty: string
  transactionNumber: string
  paymentProof: File | null
}

const faculties = ["CSIT", "BCA", "BIT", "BBA", "BBM", "BA", "BSc", "Other"]
const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]

export default function EventDetailPage() {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [registering, setRegistering] = useState(false)
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    name: "",
    college: "",
    email: "",
    phone: "",
    semester: "",
    faculty: "",
    transactionNumber: "",
    paymentProof: null,
  })
  const { toast } = useToast()
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    if (params.id) {
      fetchEvent(params.id as string)
    }
  }, [params.id])

  const fetchEvent = async (id: string) => {
    try {
      const response = await fetch(`/api/events/${id}`)
      if (response.ok) {
        const data = await response.json()
        setEvent(data)
      } else {
        router.push("/programs")
      }
    } catch (error) {
      console.error("Error fetching event:", error)
      router.push("/programs")
    } finally {
      setLoading(false)
    }
  }

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!event) return

    setRegistering(true)

    try {
      const formData = new FormData()
      Object.entries(registrationData).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value)
        }
      })
      formData.append("eventId", event._id)

      const response = await fetch("/api/events/register", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        toast({
          title: "Registration Successful!",
          description: "You have been registered for the event. Check your email for confirmation.",
        })
        setRegistrationData({
          name: "",
          college: "",
          email: "",
          phone: "",
          semester: "",
          faculty: "",
          transactionNumber: "",
          paymentProof: null,
        })
        fetchEvent(event._id) // Refresh event data
      } else {
        const error = await response.json()
        toast({
          title: "Registration Failed",
          description: error.message || "Please try again later.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setRegistering(false)
    }
  }

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <Button asChild>
            <Link href="/programs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Programs
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const availableSlots = event.participantLimit - event.registrations.length
  const isRegistrationOpen = event.status === "upcoming" && availableSlots > 0
  const eventDate = new Date(event.date)

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/programs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Programs
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="mb-4">
                <Badge className={`${event.status === "upcoming" ? "bg-green-500" : "bg-gray-500"} mb-4`}>
                  {event.status === "upcoming" ? "Upcoming" : "Completed"}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{event.title}</h1>
              <p className="text-xl text-muted-foreground mb-8">{event.description}</p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-5 w-5 mr-3" />
                  <span>
                    {eventDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-5 w-5 mr-3" />
                  <span>
                    {eventDate.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <DollarSign className="h-5 w-5 mr-3" />
                  <span>NPR {event.fee}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="h-5 w-5 mr-3" />
                  <span>
                    {event.registrations.length} / {event.participantLimit} participants
                  </span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-5 w-5 mr-3" />
                  <span>Bhairahawa Multiple Campus</span>
                </div>
              </div>

              {isRegistrationOpen ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="w-full sm:w-auto">
                      Register Now ({availableSlots} slots left)
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Register for {event.title}</DialogTitle>
                      <DialogDescription>
                        Fill out the form below to register for this event. Registration fee: NPR {event.fee}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleRegistration} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={registrationData.name}
                            onChange={(e) => setRegistrationData((prev) => ({ ...prev, name: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="college">College *</Label>
                          <Input
                            id="college"
                            value={registrationData.college}
                            onChange={(e) => setRegistrationData((prev) => ({ ...prev, college: e.target.value }))}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={registrationData.email}
                            onChange={(e) => setRegistrationData((prev) => ({ ...prev, email: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            value={registrationData.phone}
                            onChange={(e) => setRegistrationData((prev) => ({ ...prev, phone: e.target.value }))}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="semester">Semester *</Label>
                          <Select
                            value={registrationData.semester}
                            onValueChange={(value) => setRegistrationData((prev) => ({ ...prev, semester: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                            <SelectContent>
                              {semesters.map((semester) => (
                                <SelectItem key={semester} value={semester}>
                                  {semester} Semester
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="faculty">Faculty *</Label>
                          <Select
                            value={registrationData.faculty}
                            onValueChange={(value) => setRegistrationData((prev) => ({ ...prev, faculty: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select faculty" />
                            </SelectTrigger>
                            <SelectContent>
                              {faculties.map((faculty) => (
                                <SelectItem key={faculty} value={faculty}>
                                  {faculty}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="transactionNumber">Transaction Number *</Label>
                        <Input
                          id="transactionNumber"
                          value={registrationData.transactionNumber}
                          onChange={(e) =>
                            setRegistrationData((prev) => ({ ...prev, transactionNumber: e.target.value }))
                          }
                          placeholder="Enter payment transaction number"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="paymentProof">Payment Proof *</Label>
                        <Input
                          id="paymentProof"
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setRegistrationData((prev) => ({ ...prev, paymentProof: e.target.files?.[0] || null }))
                          }
                          required
                        />
                        <p className="text-xs text-muted-foreground mt-1">Upload screenshot of payment confirmation</p>
                      </div>

                      <Button type="submit" className="w-full" disabled={registering}>
                        {registering ? "Registering..." : "Complete Registration"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              ) : (
                <div className="space-y-2">
                  <Button size="lg" disabled className="w-full sm:w-auto">
                    {event.status === "completed" ? "Event Completed" : "Registration Closed"}
                  </Button>
                  {event.status === "upcoming" && availableSlots === 0 && (
                    <p className="text-sm text-muted-foreground">All slots are filled</p>
                  )}
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="aspect-video relative overflow-hidden rounded-2xl shadow-2xl">
                <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">{eventDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fee:</span>
                    <span className="font-medium">NPR {event.fee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Participants:</span>
                    <span className="font-medium">
                      {event.registrations.length} / {event.participantLimit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge className={event.status === "upcoming" ? "bg-green-500" : "bg-gray-500"}>
                      {event.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">Have questions about this event? Contact us:</p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <a href="mailto:bmcitclub1@gmail.com">
                        <Mail className="mr-2 h-4 w-4" />
                        Email Us
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <a
                        href="https://wa.me/9811420975?text=Hello%20BMC%20IT%20Club,%20I%20have%20a%20question%20about%20the%20event"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
