# 🏫 eSchool Platform

A modern, role-based, responsive school management platform built with **React**, **Tailwind CSS**, and **Firebase**. Designed specifically for private schools following the Kosovo education system, it enables real-time communication, grading, student progress tracking, online forums, and administrative tools for teachers, students, parents, and more.

---

## 🚀 Features

### 🔐 Authentication
- Firebase Email/Password Login
- JWT Auth with Role Detection
- No sign-up (access controlled by Admin/Principal)

### 👥 User Roles
- **Visitor**: Public landing page access
- **Student**: View grades, homework, schedule, online exams
- **Parent**: Monitor child’s progress and behavior
- **Teacher**: Manage attendance, grading, upload materials
- **Administrator**: Full user management, subjects, library, blog
- **Principal**: Admin privileges + system logs and role control

### 📖 Academic Structure (Kosovo-Aligned)
- Classes 1–3 with academic years
- Multi-directional education (Science, Social, General Medicine, etc.)
- Subject mapping per direction/class/year

### 🧠 Modules
- **Dashboard** per role
- **Gradebook & Reports**
- **Library & Blog**
- **Attendance System**
- **Online Exams** (Auto-grading, Timer)
- **Forum** (Real-time Q&A / Discussions)
- **Notification System**
- **Multi-language Support** (i18n with `react-i18next`)

---

## 🧰 Tech Stack

- ⚛️ **React** with `react-router-dom`
- 💨 **Tailwind CSS** (custom utility + component-based styling)
- 🔥 **Firebase** (Auth, Firestore, Storage)
- 🌐 **Lucide Icons** (lightweight and modern UI icons)
- 🌍 **i18n** with `react-i18next`
- 📦 Deployment-ready (Vercel/Firebase Hosting compatible)

---

## 📸 UI/UX Highlights

- Glassmorphism-based login page with animated background
- Fully responsive navigation
- Smooth scroll + hash-based section linking
- Accessibility-ready form components

---

## 🛠️ Project Setup

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/eschool-platform.git
cd eschool-platform

# 2. Install dependencies
npm install

# 3. Setup Firebase config
# Rename .env.example to .env and fill in:
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
...

# 4. Start development
npm run dev
