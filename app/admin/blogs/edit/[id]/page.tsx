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
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"

export default function EditBlogPage() {
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    author: "",
    image: "",
    published: true,
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
      fetchBlog(params.id as string)
    }
  }, [params.id])

  const fetchBlog = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/blogs/${id}`, {
        credentials: "include",
      })
      if (response.ok) {
        const blog = await response.json()
        setBlogData({
          title: blog.title,
          content: blog.content,
          author: blog.author,
          image: blog.image || "",
          published: blog.published,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch blog data.",
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
      setBlogData((prev) => ({ ...prev, image: data.secure_url }))
      toast({
        title: "Image uploaded",
        description: "Featured image has been uploaded successfully.",
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
      const response = await fetch(`/api/admin/blogs/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(blogData),
      })

      if (response.ok) {
        toast({
          title: "Blog updated",
          description: "The blog has been successfully updated.",
        })
        router.push("/admin/blogs")
      } else {
        throw new Error("Failed to update blog")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update blog. Please try again.",
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
            <Link href="/admin/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Link>
          </Button>
          <h1 className="text-3xl font-bold mb-2">Edit Blog</h1>
          <p className="text-muted-foreground">Update the blog post information</p>
        </motion.div>

        <Card>
          <CardHeader>
            <CardTitle>Blog Details</CardTitle>
            <CardDescription>Update the information for this blog post</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Blog Title *</Label>
                  <Input
                    id="title"
                    value={blogData.title}
                    onChange={(e) => setBlogData((prev) => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    value={blogData.author}
                    onChange={(e) => setBlogData((prev) => ({ ...prev, author: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  rows={10}
                  value={blogData.content}
                  onChange={(e) => setBlogData((prev) => ({ ...prev, content: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="image">Featured Image</Label>
                <div className="space-y-4">
                  <Input
                    id="image"
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
                  {blogData.image && (
                    <div className="mt-4">
                      <img
                        src={blogData.image || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full max-w-md h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={blogData.published}
                  onCheckedChange={(checked) => setBlogData((prev) => ({ ...prev, published: checked }))}
                />
                <Label htmlFor="published">Published</Label>
              </div>

              <div className="flex space-x-4">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    "Updating..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Update Blog
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/admin/blogs">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
