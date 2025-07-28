"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, Calendar, BookOpen, Settings, BarChart3, TrendingUp, LogOut } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const dashboardCards = [
  {
    title: "Manage Blogs",
    description: "Create, edit, and publish blog posts",
    icon: BookOpen,
    href: "/admin/blogs",
    color: "bg-blue-500",
  },
  {
    title: "Manage Events",
    description: "Create and manage upcoming events",
    icon: Calendar,
    href: "/admin/events",
    color: "bg-green-500",
  },
  {
    title: "Manage Members",
    description: "Update club member information",
    icon: Users,
    href: "/admin/members",
    color: "bg-purple-500",
  },
  {
    title: "Settings",
    description: "Configure system settings",
    icon: Settings,
    href: "/admin/settings",
    color: "bg-orange-500",
  },
]

interface Stats {
  totalBlogs: number
  activeEvents: number
  clubMembers: number
  totalRegistrations: number
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [statsLoading, setStatsLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [stats, setStats] = useState<Stats>({
    totalBlogs: 0,
    activeEvents: 0,
    clubMembers: 0,
    totalRegistrations: 0,
  })
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/verify", {
          credentials: "include",
        })

        if (response.ok) {
          setAuthenticated(true)
          fetchStats()
        } else {
          router.push("/admin/login")
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        router.push("/admin/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats", {
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    } finally {
      setStatsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })

      if (response.ok) {
        // Clear any local storage items
        localStorage.clear()
        sessionStorage.clear()

        toast({
          title: "Logged out successfully",
          description: "You have been logged out of the admin panel.",
        })

        router.push("/admin/login")
        router.refresh()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!authenticated) {
    return null // Will redirect to login
  }

  const statsData = [
    {
      title: "Total Blogs",
      value: statsLoading ? "..." : stats.totalBlogs.toString(),
      icon: BookOpen,
      change: "+12%",
    },
    {
      title: "Active Events",
      value: statsLoading ? "..." : stats.activeEvents.toString(),
      icon: Calendar,
      change: "+5%",
    },
    {
      title: "Club Members",
      value: statsLoading ? "..." : stats.clubMembers.toString(),
      icon: Users,
      change: "+2%",
    },
    {
      title: "Registrations",
      value: statsLoading ? "..." : stats.totalRegistrations.toString(),
      icon: TrendingUp,
      change: "+18%",
    },
  ]

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with BMC IT Club.</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statsLoading ? <div className="animate-pulse bg-muted h-8 w-16 rounded"></div> : stat.value}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{stat.change}</span> from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              <Link href={card.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div
                      className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <card.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/admin/blogs/new" className="p-4 border rounded-lg hover:bg-accent transition-colors">
                  <h3 className="font-semibold mb-1">Create New Blog</h3>
                  <p className="text-sm text-muted-foreground">Write and publish a new blog post</p>
                </Link>
                <Link href="/admin/events/new" className="p-4 border rounded-lg hover:bg-accent transition-colors">
                  <h3 className="font-semibold mb-1">Add New Event</h3>
                  <p className="text-sm text-muted-foreground">Schedule a new club event</p>
                </Link>
                <Link href="/admin/members/new" className="p-4 border rounded-lg hover:bg-accent transition-colors">
                  <h3 className="font-semibold mb-1">Add Member</h3>
                  <p className="text-sm text-muted-foreground">Add a new club member</p>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
