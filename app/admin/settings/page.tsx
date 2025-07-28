"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Save, Moon, Sun, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"
import { ImageUpload } from "@/components/image-upload"

interface ClubSettings {
  clubName: string
  clubLogo: string
  contactNumber: string
  whatsappLink: string
  email: string
  address: string
  description: string
  defaultTheme: string
}

export default function AdminSettingsPage() {
  const [clubData, setClubData] = useState<ClubSettings>({
    clubName: "BMC IT Club",
    clubLogo: "",
    contactNumber: "+977-9876543210",
    whatsappLink: "https://wa.me/9779876543210",
    email: "info@bmcitclub.edu.np",
    address: "Bhairahawa Multiple Campus, Nepal",
    description: "Empowering students with IT skills at Bhairahawa Multiple Campus, Nepal.",
    defaultTheme: "system",
  })
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings", {
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        setClubData(data)
        // Apply the default theme if it exists
        if (data.defaultTheme) {
          setTheme(data.defaultTheme)
        }
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error)
    } finally {
      setFetchLoading(false)
    }
  }

  const handleClubInfoUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(clubData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Settings updated successfully.",
        })

        // Apply theme change immediately
        if (clubData.defaultTheme) {
          setTheme(clubData.defaultTheme)
        }
      } else {
        throw new Error("Failed to update settings")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
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
          <h1 className="text-3xl font-bold mb-2">Admin Settings</h1>
          <p className="text-muted-foreground">Manage club settings and preferences</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Set the default theme for the website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Default Theme</Label>
                <Select
                  value={clubData.defaultTheme}
                  onValueChange={(value) => setClubData((prev) => ({ ...prev, defaultTheme: value }))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center">
                        <Sun className="mr-2 h-4 w-4" />
                        Light
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center">
                        <Moon className="mr-2 h-4 w-4" />
                        Dark
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center">
                        <Monitor className="mr-2 h-4 w-4" />
                        System
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Current theme: <span className="font-medium capitalize">{theme}</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Club Logo */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Club Logo</CardTitle>
              <CardDescription>Upload or set the club logo</CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUpload
                value={clubData.clubLogo}
                onChange={(url) => setClubData((prev) => ({ ...prev, clubLogo: url }))}
                label="Club Logo"
              />
            </CardContent>
          </Card>
        </div>

        {/* Club Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Club Information</CardTitle>
            <CardDescription>Update club details and contact information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleClubInfoUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="clubName">Club Name</Label>
                  <Input
                    id="clubName"
                    value={clubData.clubName}
                    onChange={(e) => setClubData((prev) => ({ ...prev, clubName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    value={clubData.contactNumber}
                    onChange={(e) => setClubData((prev) => ({ ...prev, contactNumber: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={clubData.email}
                    onChange={(e) => setClubData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="whatsappLink">WhatsApp Link</Label>
                  <Input
                    id="whatsappLink"
                    value={clubData.whatsappLink}
                    onChange={(e) => setClubData((prev) => ({ ...prev, whatsappLink: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={clubData.address}
                  onChange={(e) => setClubData((prev) => ({ ...prev, address: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={3}
                  value={clubData.description}
                  onChange={(e) => setClubData((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <Button type="submit" disabled={loading}>
                <Save className="mr-2 h-4 w-4" />
                {loading ? "Updating..." : "Update Settings"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
