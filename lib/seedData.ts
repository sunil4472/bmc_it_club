import dbConnect from "./db"
import Blog from "./models/Blog"
import Event from "./models/Event"
import Member from "./models/Member"

const dummyBlogs = [
  {
    title: "Getting Started with React Development",
    content:
      "React is a powerful JavaScript library for building user interfaces. In this comprehensive guide, we'll explore the fundamentals of React development, including components, state management, and best practices. Whether you're a beginner or looking to refresh your knowledge, this post will provide valuable insights into modern React development.",
    author: "John Doe",
    image: "/placeholder.svg?height=400&width=600",
    published: true,
    slug: "getting-started-with-react-development",
  },
  {
    title: "7 Days React Training Camp - A Success Story",
    content:
      "Our recent 7-day React training camp was an incredible success! Over 50 students participated in intensive hands-on sessions covering React fundamentals, hooks, state management, and project development. Participants built real-world applications and gained practical experience that will help them in their careers. The camp concluded with project presentations and networking sessions.",
    author: "Jane Smith",
    image: "/placeholder.svg?height=400&width=600",
    published: true,
    slug: "7-days-react-training-camp-success-story",
  },
  {
    title: "The Future of Web Development: Trends to Watch",
    content:
      "Web development is constantly evolving, and staying updated with the latest trends is crucial for developers. In this article, we explore emerging technologies like WebAssembly, Progressive Web Apps, AI integration, and serverless architecture. We also discuss how these trends will shape the future of web development and what skills developers should focus on.",
    author: "Mike Johnson",
    image: "/placeholder.svg?height=400&width=600",
    published: true,
    slug: "future-of-web-development-trends-to-watch",
  },
]

const dummyEvents = [
  {
    title: "Advanced JavaScript Workshop",
    description:
      "Join us for an intensive workshop covering advanced JavaScript concepts including closures, prototypes, async/await, and modern ES6+ features. Perfect for intermediate developers looking to level up their skills.",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    fee: 500,
    image: "/placeholder.svg?height=300&width=500",
    status: "upcoming",
    participantLimit: 30,
  },
  {
    title: "7 Days React Training Camp",
    description:
      "Comprehensive React training program covering components, hooks, state management, and project development. Includes hands-on projects and career guidance.",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    fee: 1000,
    image: "/placeholder.svg?height=300&width=500",
    status: "completed",
    participantLimit: 50,
  },
  {
    title: "Web Development Bootcamp",
    description:
      "Full-stack web development bootcamp covering HTML, CSS, JavaScript, Node.js, and database management. Perfect for beginners starting their web development journey.",
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    fee: 1500,
    image: "/placeholder.svg?height=300&width=500",
    status: "completed",
    participantLimit: 40,
  },
]

const dummyMembers = [
  {
    name: "Rajesh Sharma",
    role: "President",
    photo: "/placeholder.svg?height=200&width=200",
    bio: "Computer Science student passionate about technology leadership.",
    linkedin: "https://linkedin.com/in/rajesh-sharma",
    github: "https://github.com/rajesh-sharma",
    facebook: "https://facebook.com/rajesh.sharma",
    email: "rajesh@bmcitclub.edu.np",
  },
  {
    name: "Priya Patel",
    role: "Vice President",
    photo: "/placeholder.svg?height=200&width=200",
    bio: "Software engineering enthusiast with expertise in full-stack development.",
    linkedin: "https://linkedin.com/in/priya-patel",
    github: "https://github.com/priya-patel",
    facebook: "https://facebook.com/priya.patel",
    email: "priya@bmcitclub.edu.np",
  },
  {
    name: "Amit Kumar",
    role: "Secretary",
    photo: "/placeholder.svg?height=200&width=200",
    bio: "Organized and detail-oriented student managing club operations.",
    linkedin: "https://linkedin.com/in/amit-kumar",
    github: "https://github.com/amit-kumar",
    facebook: "https://facebook.com/amit.kumar",
    email: "amit@bmcitclub.edu.np",
  },
  {
    name: "Sneha Thapa",
    role: "Vice Secretary",
    photo: "/placeholder.svg?height=200&width=200",
    bio: "Assistant secretary with strong communication and organizational skills.",
    linkedin: "https://linkedin.com/in/sneha-thapa",
    github: "https://github.com/sneha-thapa",
    facebook: "https://facebook.com/sneha.thapa",
    email: "sneha@bmcitclub.edu.np",
  },
  {
    name: "Ravi Gupta",
    role: "Program Lead",
    photo: "/placeholder.svg?height=200&width=200",
    bio: "Event coordinator specializing in technical workshops and seminars.",
    linkedin: "https://linkedin.com/in/ravi-gupta",
    github: "https://github.com/ravi-gupta",
    facebook: "https://facebook.com/ravi.gupta",
    email: "ravi@bmcitclub.edu.np",
  },
  {
    name: "Anita Singh",
    role: "Technical Lead",
    photo: "/placeholder.svg?height=200&width=200",
    bio: "Full-stack developer leading technical initiatives and projects.",
    linkedin: "https://linkedin.com/in/anita-singh",
    github: "https://github.com/anita-singh",
    facebook: "https://facebook.com/anita.singh",
    email: "anita@bmcitclub.edu.np",
  },
  {
    name: "Suresh Yadav",
    role: "Marketing Head",
    photo: "/placeholder.svg?height=200&width=200",
    bio: "Digital marketing specialist promoting club activities and events.",
    linkedin: "https://linkedin.com/in/suresh-yadav",
    github: "https://github.com/suresh-yadav",
    facebook: "https://facebook.com/suresh.yadav",
    email: "suresh@bmcitclub.edu.np",
  },
  {
    name: "Kavita Joshi",
    role: "Design Lead",
    photo: "/placeholder.svg?height=200&width=200",
    bio: "UI/UX designer creating beautiful and functional user experiences.",
    linkedin: "https://linkedin.com/in/kavita-joshi",
    github: "https://github.com/kavita-joshi",
    facebook: "https://facebook.com/kavita.joshi",
    email: "kavita@bmcitclub.edu.np",
  },
  {
    name: "Deepak Shrestha",
    role: "Web Developer",
    photo: "/placeholder.svg?height=200&width=200",
    bio: "Frontend developer specializing in React and modern web technologies.",
    linkedin: "https://linkedin.com/in/deepak-shrestha",
    github: "https://github.com/deepak-shrestha",
    facebook: "https://facebook.com/deepak.shrestha",
    email: "deepak@bmcitclub.edu.np",
  },
  {
    name: "Pooja Maharjan",
    role: "Content Writer",
    photo: "/placeholder.svg?height=200&width=200",
    bio: "Technical writer creating engaging content for blogs and documentation.",
    linkedin: "https://linkedin.com/in/pooja-maharjan",
    github: "https://github.com/pooja-maharjan",
    facebook: "https://facebook.com/pooja.maharjan",
    email: "pooja@bmcitclub.edu.np",
  },
  {
    name: "Bikash Tamang",
    role: "Database Administrator",
    photo: "/placeholder.svg?height=200&width=200",
    bio: "Database specialist managing data architecture and optimization.",
    linkedin: "https://linkedin.com/in/bikash-tamang",
    github: "https://github.com/bikash-tamang",
    facebook: "https://facebook.com/bikash.tamang",
    email: "bikash@bmcitclub.edu.np",
  },
  {
    name: "Sita Gurung",
    role: "Mobile App Developer",
    photo: "/placeholder.svg?height=200&width=200",
    bio: "Mobile developer creating innovative apps for Android and iOS platforms.",
    linkedin: "https://linkedin.com/in/sita-gurung",
    github: "https://github.com/sita-gurung",
    facebook: "https://facebook.com/sita.gurung",
    email: "sita@bmcitclub.edu.np",
  },
  {
    name: "Naresh Limbu",
    role: "DevOps Engineer",
    photo: "/placeholder.svg?height=200&width=200",
    bio: "DevOps specialist focusing on CI/CD, cloud infrastructure, and automation.",
    linkedin: "https://linkedin.com/in/naresh-limbu",
    github: "https://github.com/naresh-limbu",
    facebook: "https://facebook.com/naresh.limbu",
    email: "naresh@bmcitclub.edu.np",
  },
  {
    name: "Mina Rai",
    role: "Quality Assurance Lead",
    photo: "/placeholder.svg?height=200&width=200",
    bio: "QA engineer ensuring software quality through comprehensive testing strategies.",
    linkedin: "https://linkedin.com/in/mina-rai",
    github: "https://github.com/mina-rai",
    facebook: "https://facebook.com/mina.rai",
    email: "mina@bmcitclub.edu.np",
  },
  {
    name: "Gopal Adhikari",
    role: "Cybersecurity Specialist",
    photo: "/placeholder.svg?height=200&width=200",
    bio: "Security expert focusing on web application security and ethical hacking.",
    linkedin: "https://linkedin.com/in/gopal-adhikari",
    github: "https://github.com/gopal-adhikari",
    facebook: "https://facebook.com/gopal.adhikari",
    email: "gopal@bmcitclub.edu.np",
  },
]

export async function seedDatabase() {
  try {
    await dbConnect()

    // Clear existing data
    await Blog.deleteMany({})
    await Event.deleteMany({})
    await Member.deleteMany({})

    // Insert dummy data
    await Blog.insertMany(dummyBlogs)
    await Event.insertMany(dummyEvents)
    await Member.insertMany(dummyMembers)

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  }
}
