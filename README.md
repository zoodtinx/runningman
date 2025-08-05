# RunningMan

_A running readiness tracker for people without GPS watches._

---

## Overview

Many runners don’t use smartwatches or mobile tracking apps, yet still need to plan their runs effectively. **RunningMan** helps users check daily running conditions based on air quality, weather, and sun cycle—plus lets them manually track laps, times, and routes.

---

## Features

### 🌤 Run Readiness Conditions

Visual indicators for air quality, temperature, humidity, and sunlight so users know if it's a good day to run.

### 🏞️ Predefined Park Routes

Choose from curated running routes in popular parks across Thailand. Set laps, distances, and durations manually.

### 📝 Manual Run Tracking

Log your start/finish time, laps, and estimated distance—perfect for users without GPS or wearables.

### 🧹 Demo Data Auto-Cleanup (Cron Job)

Scheduled job that clears demo user data daily to keep the app clean.

---

## Demo

-  **Live Demo**: [Insert Live URL]
-  **Screenshots**: [Insert images or links]

---

## Tech Stack

### 🧠 Language

-  TypeScript

### 💻 Frontend

-  Framework: Next.js (App Router)
-  UI: Tailwind CSS, Shadcn
-  State Management: Zustand
-  API Client: React Query

### 🛠 Backend

-  Framework: Nest.js
-  Database: PostgreSQL (via Prisma ORM)
-  Background Jobs: cron + node-cron

### ☁ Services

-  Weather & AQI API: Tomorrow.io

---

## What I learned

---

## Challenges & Solutions

---

## How to Run Locally

```bash
git clone https://github.com/yourusername/runningman.git
cd runningman
npm install
npm run dev
```
