# 🎓 BMC IT Club Website

**Live Link:** [bmcit.suniln.com.np](https://bmcit.suniln.com.np)  
**Repository:** [GitHub Repo Link](https://github.com/sunil4472/bmc_it_club.git)

A modern, elegant, and animated **website** for **Bhairahawa Multiple Campus IT Club**.  
This platform showcases club activities, upcoming programs, blogs, and members while providing an **Admin Dashboard** for full management.

---

## ✨ Features

### 🌐 Public Website

- **Modern Animated UI** (Tailwind CSS + Framer Motion).
- **Theme Switching** → Light/Dark mode with localStorage memory.
- **Home Page** →
  - Hero section with animations.
  - Animated counters (events, participants, members).
  - Highlight of recent programs.
  - Features.
  - Testimonials carousel.
- **About Page** →
  - Mission & Vision.
  - Animated Timeline of milestones.
  - Team Members section with hover animations & social links.
  - Photo carousel of past events.
- **Programs Page** →
  - Separate sections for **Upcoming Events** and **Completed Events**.
  - Each event has a dedicated details page.
- **Event Registration** →
  - Register with Full Name, College, Email, Phone, Semester, Faculty, Transaction No., and Payment Proof.
  - Participant limit enforced (admin sets max slots).
- **Blogs Page** →
  - All blogs listed dynamically.
  - **Blog Slug Pages** for full blog reading.
- **Members Page** →
  - Shows President, Vice President, Secretary, Program Leads, and other members with photos & social links.
- **Contact Page** →
  - Send queries directly via form.
  - WhatsApp integration for instant messaging.

---

### 🛠️ Admin Dashboard

**Admin Access:** Secured with JWT + `ADMIN_KEY` from `.env`.

- **Login System** → Admin logs in with secret key & credentials.
- **Dashboard Overview (Real Data)** →
  - Total Blogs
  - Active Events
  - Completed Events
  - Club Members
  - Registrations
- **Manage Members (CRUD)**
  - Add new members with image & social links.
  - Edit member details.
  - Delete members.
- **Manage Blogs (CRUD)**
  - Create new blogs.
  - Edit existing blogs.
  - Delete blogs.
- **Manage Events (CRUD)**
  - Add new events with participant limits & fees.
  - Edit event details (title, description, date, image, fee, participant slots).
  - Delete events.
- **View Participants**
  - See registered participants per event with all details & payment proof.
  - Track participant count vs. event limit.
- **Admin Settings**
  - Change default theme (light/dark).
- **Logout Option**
  - Secure logout clears JWT token and redirects to login page.

---

## ⚙️ Tech Stack

- **Frontend:** Nextjs, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose)
- **Authentication:** JWT + `ADMIN_KEY`
- **Image Uploads:** Cloudinary (supports both Local File Upload & URL Upload)
- **Deployment:** Vercel
- **Contact Integration:** WhatsApp direct messaging

---

## 🔑 Environment Variables

Create a `.env` file in the project root with the following:

```env
MONGO_URI=mongodb+srv://spoon6046:spoon6046@cluster0.e2f0wqn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
ADMIN_KEY=Admin123
JWT_SECRET=useradmin
CLDN_NAME=de1t2tgrz
CLDN_API_KEY=191871993676989
CLDN_SECRET_KEY=3MvaEDmwEs9cXPWSpKhi95AjlWI
NEXTAUTH_URL=https://bmcit.suniln.com.np
NEXT_PUBLIC_BASE_URL=https://bmcit.suniln.com.np
```

## 🚀 Getting Started

Follow these steps to run locally and deploy:

## 1. Clone Repo

```env
git clone https://github.com/sunil4472/bmc_it_club.git
```

```env
cd bmc-it-club
```

## 2. Install Dependencies

```env
npm install
```

or

```env
npm install --force
```

**3. Setup Environment Variables**

Create a `.env` file with the credentials provided above.

**4. Run Locally**

```env
npm run dev
```

Open → http://localhost:3000

**5. Deployment on Vercel**
