"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ImageUpload } from "@/components/image-upload"

const roles = [
  "President",
  "Vice President",
  "Secretary",
  "Vice Secretary",
  "Program Lead",
  "Technical Lead",
  "Marketing Head",
  "Design Lead",
  "Web Developer",
  "Content Writer",
  "Database Administrator",
  "Mobile App Developer",
  "DevOps Engineer",
  "Quality Assurance Lead",
  "Cybersecurity Specialist",
  "Member",
]

export default function NewMemberPage() {
  const [memberData, setMemberData] = useState({
    name: "",
    role: "",
    photo: "",
    bio: "",
    linkedin: "",
    github: "",
    facebook: "",
    twitter: "",
    instagram: "",
    email: "",
    isActive: true,
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/admin/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(memberData),
      })

      if (response.ok) {
        toast({
          title: "Member added",
          description: "The member has been successfully added.",
        })
        router.push("/admin/members")
      } else {
        throw new Error("Failed to add member")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add member. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/admin/members">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Members
            </Link>
          </Button>
          <h1 className="text-3xl font-bold mb-2">Add New Member</h1>
          <p className="text-muted-foreground">Add a new member to the BMC IT Club</p>
        </motion.div>

        <Card>
          <CardHeader>
            <CardTitle>Member Details</CardTitle>
            <CardDescription>Fill in the information for the new member</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={memberData.name}
                    onChange={(e) => setMemberData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="role">Position/Role *</Label>
                  <Select
                    value={memberData.role}
                    onValueChange={(value) => setMemberData((prev) => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={memberData.email}
                  onChange={(e) => setMemberData((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={3}
                  value={memberData.bio}
                  onChange={(e) => setMemberData((prev) => ({ ...prev, bio: e.target.value }))}
                />
              </div>

              <ImageUpload
                value={memberData.photo}
                onChange={(url) => setMemberData((prev) => ({ ...prev, photo: url }))}
                label="Profile Image"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input
                    id="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={memberData.linkedin}
                    onChange={(e) => setMemberData((prev) => ({ ...prev, linkedin: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="github">GitHub URL</Label>
                  <Input
                    id="github"
                    type="url"
                    placeholder="https://github.com/username"
                    value={memberData.github}
                    onChange={(e) => setMemberData((prev) => ({ ...prev, github: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="facebook">Facebook URL</Label>
                  <Input
                    id="facebook"
                    type="url"
                    placeholder="https://facebook.com/username"
                    value={memberData.facebook}
                    onChange={(e) => setMemberData((prev) => ({ ...prev, facebook: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="twitter">Twitter URL</Label>
                  <Input
                    id="twitter"
                    type="url"
                    placeholder="https://twitter.com/username"
                    value={memberData.twitter}
                    onChange={(e) => setMemberData((prev) => ({ ...prev, twitter: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram URL</Label>
                  <Input
                    id="instagram"
                    type="url"
                    placeholder="https://instagram.com/username"
                    value={memberData.instagram}
                    onChange={(e) => setMemberData((prev) => ({ ...prev, instagram: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={memberData.isActive}
                  onCheckedChange={(checked) => setMemberData((prev) => ({ ...prev, isActive: checked }))}
                />
                <Label htmlFor="isActive">Active Member</Label>
              </div>

              <div className="flex space-x-4">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    "Adding..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Add Member
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/admin/members">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
