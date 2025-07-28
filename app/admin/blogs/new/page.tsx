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
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ImageUpload } from "@/components/image-upload"

export default function NewBlogPage() {
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    author: "",
    image: "",
    published: true,
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(blogData),
      })

      if (response.ok) {
        toast({
          title: "Blog created",
          description: "The blog has been successfully created.",
        })
        router.push("/admin/blogs")
      } else {
        throw new Error("Failed to create blog")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create blog. Please try again.",
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
            <Link href="/admin/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Link>
          </Button>
          <h1 className="text-3xl font-bold mb-2">Create New Blog</h1>
          <p className="text-muted-foreground">Write and publish a new blog post</p>
        </motion.div>

        <Card>
          <CardHeader>
            <CardTitle>Blog Details</CardTitle>
            <CardDescription>Fill in the information for the new blog post</CardDescription>
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

              <ImageUpload
                value={blogData.image}
                onChange={(url) => setBlogData((prev) => ({ ...prev, image: url }))}
                label="Featured Image"
              />

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={blogData.published}
                  onCheckedChange={(checked) => setBlogData((prev) => ({ ...prev, published: checked }))}
                />
                <Label htmlFor="published">Publish immediately</Label>
              </div>

              <div className="flex space-x-4">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    "Creating..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Create Blog
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
