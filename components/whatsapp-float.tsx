"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export default function WhatsAppFloat() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello BMC IT Club, I'd like to know more about...")
    const whatsappUrl = `https://wa.me/9811420975?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors"
    >
      <MessageCircle className="h-6 w-6" />
    </motion.button>
  )
}
