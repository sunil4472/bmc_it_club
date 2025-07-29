"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Target, Eye, Award, Users, ChevronLeft, ChevronRight, Linkedin, Mail,Facebook } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const values = [
  {
    icon: Target,
    title: "Mission",
    description:
      "To empower students with cutting-edge IT skills and foster innovation in technology education at Bhairahawa Multiple Campus.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Eye,
    title: "Vision",
    description:
      "To be the leading IT community that bridges the gap between academic learning and industry requirements, creating future tech leaders.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We strive for excellence in everything we do, from organizing world-class events to delivering quality education and mentorship.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Building a strong, supportive community where students can learn, grow, and succeed together in their tech journey.",
    color: "from-orange-500 to-red-500",
  },
]

const timeline = [
  {
    year: "2080",
    title: "Club Founded",
    description:
      "BMC IT Club was established by passionate computer science students with a vision to create a thriving tech community.",
    icon: "🚀",
  },
  {
    year: "2081",
    title: "First Major Workshop",
    description:
      "Organized our first major programming workshop with 50+ participants, focusing on web development fundamentals.",
    icon: "💻",
  },
  {
    year: "2082",
    title: "Community Growth",
    description:
      "Reached 100+ active members and established partnerships with local tech companies for internship opportunities.",
    icon: "📈",
  },
  
]

const teamMembers = [
  {
    name: "Shishir Gaire",
    role: "President",
    image: "/assets/president.jpg",
    bio: "Computer Science student passionate about full-stack development and community building.",
    social: {
      facebook:"https://www.facebook.com/shishir.gaire.16",
      linkedin: "",
      email: "",
    },
  },
  {
    name: "Nirmal Dhakal",
    role: "Vice President",
    image: "/assets/team/nirmal.jpg",
    bio: "AI/ML enthusiast and mentor, leading our technical workshops and training programs.",
    social: {
      facebook:"https://www.facebook.com/nirmaldhakal2059",
      linkedin: "https://www.linkedin.com/in/nirmaldhakal2003",
      email: "",
    },
  },
  {
    name: "Sudhir Aryal",
    role: "Secretary",
    image: "/assets/team/sectary.jpg",
    bio: "Event organizer and community manager, ensuring smooth operations and member engagement.",
    social: {
      facebook:"https://www.facebook.com/sudhir.aryal.969",
      linkedin: "",
      email: "",
    },
  },
  {
    name: "Shiva Dahal",
    role: "Vice-Tech-Lead",
    image: "/assets/team/shiva.jpg",
    bio: "Assists the tech-lead in managing projects and ensuring the use of modern technologies.",
    social: {
      facebook:"https://www.facebook.com/sk.sking.5",
      linkedin: "",
      email: "",
    },
  },
]

const galleryImages = [
  "/assets/programs/1.jpg",
  "/assets/programs/2.jpg",
  "/assets/programs/3.jpg",
  "/assets/programs/4.jpg",
  "/assets/programs/5.jpg",
  "/assets/programs/6.jpg",
  "/assets/programs/7.jpg",
  "/assets/programs/8.jpg",
  "/assets/programs/9.jpg",
]

export default function AboutPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedMember, setSelectedMember] = useState<number | null>(null)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <div className="pt-8 overflow-x-hidden">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-cyan-500/10" />

        {/* Animated Background Elements */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
               
                <Image src="/logo.jpg" alt="" width={500} height={500} className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl" />
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              About BMC IT Club
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Established with a vision to create a thriving tech community at Bhairahawa Multiple Campus, we have been
              at the forefront of IT education and innovation for over 3 years, empowering students to become tomorrow's
              tech leaders.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Club Introduction */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Story</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  BMC IT Club was founded in 2080 by a group of passionate computer science students who recognized the
                  need for a platform where students could enhance their technical skills beyond the traditional
                  classroom setting.
                </p>
                <p>
                  What started as a small study group has now evolved into one of the most active and influential
                  student organizations at Bhairahawa Multiple Campus. We have successfully bridged the gap between
                  theoretical knowledge and practical application, preparing our members for successful careers in
                  technology.
                </p>
                <p>
                  Today, we continue to grow and adapt to the ever-changing technology landscape, ensuring our members
                  are always equipped with the latest skills and knowledge needed to excel in their chosen fields.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/20 via-purple-500/20 to-cyan-500/20 rounded-3xl flex items-center justify-center overflow-hidden">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="text-center"
                  >
                    <div className="text-8xl font-bold text-primary mb-4">3+</div>
                    <div className="text-2xl font-semibold text-muted-foreground">Years of Excellence</div>
                  </motion.div>
                </div>

                {/* Floating Stats */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-4 -right-4 bg-white dark:bg-card p-4 rounded-2xl shadow-xl border"
                >
                  <div className="text-2xl font-bold text-green-600">300+</div>
                  <div className="text-sm text-muted-foreground">Members Trained</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="absolute -bottom-4 -left-4 bg-white dark:bg-card p-4 rounded-2xl shadow-xl border"
                >
                  <div className="text-2xl font-bold text-blue-600">10+</div>
                  <div className="text-sm text-muted-foreground">Events Organized</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The fundamental principles that guide everything we do at BMC IT Club.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-card to-muted/10 overflow-hidden relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  <CardHeader className="relative">
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-3xl flex items-center justify-center mb-6 shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <value.icon className="h-10 w-10 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <CardDescription className="text-base leading-relaxed">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Key milestones that shaped BMC IT Club into what it is today.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-purple-500 to-cyan-500 rounded-full" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-muted/20">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl">{item.icon}</span>
                          <div>
                            <Badge variant="outline" className="mb-2">
                              {item.year}
                            </Badge>
                            <CardTitle className="text-xl">{item.title}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">{item.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Node */}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="relative z-10 w-6 h-6 bg-gradient-to-br from-primary to-purple-600 rounded-full border-4 border-background shadow-lg"
                  />

                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals leading BMC IT Club towards excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => setSelectedMember(selectedMember === index ? null : index)}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 overflow-hidden bg-gradient-to-br from-card to-muted/20">
                  <div className="relative overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Social Links Overlay */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: selectedMember === index ? 1 : 0,
                        y: selectedMember === index ? 0 : 20,
                      }}
                      className="absolute bottom-4 left-4 right-4 flex justify-center space-x-4"
                    >
                      <Button size="sm" variant="secondary" className="rounded-full" asChild>
                        <a href={member.social.facebook} target="_blank" rel="noopener noreferrer">
                          
                          <Facebook className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button size="sm" variant="secondary" className="rounded-full" asChild>
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button size="sm" variant="secondary" className="rounded-full" asChild>
                        <a href={`mailto:${member.social.email}`}>
                          <Mail className="h-4 w-4" />
                        </a>
                      </Button>
                    </motion.div>
                  </div>

                  <CardHeader className="text-center">
                    <CardTitle className="group-hover:text-primary transition-colors">{member.name}</CardTitle>
                    <Badge variant="outline" className="w-fit mx-auto">
                      {member.role}
                    </Badge>
                  </CardHeader>

                  <CardContent className="text-center">
                    <CardDescription className="text-sm">{member.bio}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Gallery</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Moments captured from our events, workshops, and community activities.
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={galleryImages[currentImageIndex] || "/placeholder.svg"}
                alt={`Gallery image ${currentImageIndex + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>

            {/* Navigation Buttons */}
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={prevImage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={nextImage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "bg-primary scale-125"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="mt-8 grid grid-cols-6 gap-4">
            {galleryImages.map((image, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative aspect-video rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentImageIndex ? "ring-2 ring-primary shadow-lg" : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
