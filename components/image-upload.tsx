"use client"

import { useState } from "react"
import { LinkIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
  className?: string
}

export function ImageUpload({ value, onChange, label = "Image", className }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [urlInput, setUrlInput] = useState("")
  const [showUrlInput, setShowUrlInput] = useState(false)
  const { toast } = useToast()

  const handleFileUpload = async (file: File) => {
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "bmc-it-club")

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLDN_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      )

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()
      onChange(data.secure_url)
      toast({
        title: "Success",
        description: "Image uploaded successfully!",
      })
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim())
      setUrlInput("")
      setShowUrlInput(false)
      toast({
        title: "Success",
        description: "Image URL added successfully!",
      })
    }
  }

  const removeImage = () => {
    onChange("")
    setUrlInput("")
  }

  return (
    <div className={className}>
      <Label>{label}</Label>

      {/* Image Preview */}
      {value && (
        <div className="relative mt-2 mb-4">
          <img
            src={value || "/placeholder.svg"}
            alt="Preview"
            className="w-full max-w-md h-48 object-cover rounded-lg border"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg?height=200&width=300"
            }}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {/* File Upload */}
        <div>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFileUpload(file)
            }}
            disabled={uploading}
          />
          {uploading && <p className="text-sm text-muted-foreground mt-1">Uploading...</p>}
        </div>

        {/* URL Input Toggle */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">OR</span>
          <Button type="button" variant="outline" size="sm" onClick={() => setShowUrlInput(!showUrlInput)}>
            <LinkIcon className="h-4 w-4 mr-2" />
            {showUrlInput ? "Hide URL Input" : "Enter Image URL"}
          </Button>
        </div>

        {/* URL Input */}
        {showUrlInput && (
          <div className="flex space-x-2">
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
            <Button type="button" onClick={handleUrlSubmit}>
              Add
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
