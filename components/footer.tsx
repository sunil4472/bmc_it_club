"use client"

import { motion } from "framer-motion"
import { Facebook, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              {/* <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">BMC</span>
              </div> */}
              <Link href={"/"}>
                          <span className="font-bold text-xl">BMC IT Club</span>
                          </Link>
            </div>
            <p className="text-muted-foreground text-sm">
              Empowering students with IT skills at Bhairahawa Multiple Campus, Nepal.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/about" className="hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/members" className="hover:text-primary transition-colors">
                  Members
                </a>
              </li>
              <li>
                <a href="/programs" className="hover:text-primary transition-colors">
                  Programs
                </a>
              </li>
              <li>
                <a href="/blogs" className="hover:text-primary transition-colors">
                  Blogs
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="font-semibold">Contact Info</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Bhairahawa Multiple Campus, Nepal</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>bmcitclub1@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+977-9811420975 </span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100094504922018" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100094504922018" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100094504922018" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground"
        >
          <p>&copy; 2025 BMC IT Club | Bhairahawa Multiple Campus. All rights reserved.</p><p>Developed by <a href="https://www.suniln.com.np/" target="_blank" className="text-[#3b82f5] font-bold text-sm">Sunil Neupane</a></p>
        </motion.div>
      </div>
    </footer>
  )
}
