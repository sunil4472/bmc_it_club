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
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"

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

export default function EditMemberPage() {
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
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    if (params.id) {
      fetchMember(params.id as string)
    }
  }, [params.id])

  const fetchMember = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/members/${id}`, {
        credentials: "include",
      })
      if (response.ok) {
        const member = await response.json()
        setMemberData({
          name: member.name,
          role: member.role,
          photo: member.photo || "",
          bio: member.bio || "",
          linkedin: member.linkedin || "",
          github: member.github || "",
          facebook: member.facebook || "",
          twitter: member.twitter || "",
          instagram: member.instagram || "",
          email: member.email || "",
          isActive: member.isActive,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch member data.",
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
      setMemberData((prev) => ({ ...prev, photo: data.secure_url }))
      toast({
        title: "Image uploaded",
        description: "Profile image has been uploaded successfully.",
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
      const response = await fetch(`/api/admin/members/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(memberData),
      })

      if (response.ok) {
        toast({
          title: "Member updated",
          description: "The member has been successfully updated.",
        })
        router.push("/admin/members")
      } else {
        throw new Error("Failed to update member")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update member. Please try again.",
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
            <Link href="/admin/members">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Members
            </Link>
          </Button>
          <h1 className="text-3xl font-bold mb-2">Edit Member</h1>
          <p className="text-muted-foreground">Update member information</p>
        </motion.div>

        <Card>
          <CardHeader>
            <CardTitle>Member Details</CardTitle>
            <CardDescription>Update the information for this member</CardDescription>
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

              <div>
                <Label htmlFor="photo">Profile Image</Label>
                <div className="space-y-4">
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  />
                  {imageFile && (
                    <Button type="button" onClick={handleImageUpload} disabled={uploading}>
                      <Upload className="mr-2 h-4 w-4" />
                      {uploading ? "Uploading..." : "Upload New Image"}
                    </Button>
                  )}
                  {memberData.photo && (
                    <div className="mt-4">
                      <img
                        src={memberData.photo || "/placeholder.svg"}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-full"
                      />
                    </div>
                  )}
                </div>
              </div>

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
                    "Updating..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Update Member
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
