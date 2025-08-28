<p align="center">
    <img src="https://ik.imagekit.io/freelanceman/github/rnm-readme-header.png?updatedAt=1756222221846" alt="RunningMan - Great Runs Begin With Great Conditions" />
</p>

**RunningMan** is a running tool that helps runners make smart decisions by checking outdoor conditions and tracking personal data. The app features custom post-run stats pics, manual logging for distance and time, and helps runners prepare better based on current outdoor vibes.

## ✨ Features

### • Running Readiness Insights

View daily running readiness score and summary based on air quality, weather conditions, and sunrise/sunset times to plan safer and optimal runs.

### • Save Favorite Routes

Select from previously saved routes in popular parks, specify lap counts, and manually log start and finish times to track performance.

### • Stunning Post Run Pics

Create and customize beautiful post-run statistics images with your distance, time, and route details to share your running achievements.

## 📱 Live Demo

-  **Live Demo**: [runningman.peerapol.dev/](https://runningman.peerapol.dev/)

## ⚙️ Tech Stack

### Architecture

-  **App**: Next.js, Tailwind, React Hook Form, Shadcn (Radix UI), Phosphor Icons

   -  Auth.js with JWT authentication
   -  Get real-time weather and air quality data from 3rd Party API
   -  Update weather data hourly with cron job implement via github action

-  **Database**: PostgreSQL
   -  Relational design with Prisma ORM

### Infrastructure

-  **Deployment**:

   -  App & Managed Database on Railway

-  **3rd Party API**:
   -  Tomorrow.io for weather data
   -  IQAir for air quality index

## 💡 What I Learned

### 3rd Party API Integration

-  **Multiple APIs**:
   -  Standardizing data from different sources into a consistent format
-  **Data Processing**:
   -  Converting raw API responses into scores and translating them into clear, actionable insights

### Data Visualization

-  **Stat-to-Image Conversion**:
   -  Generating PNG images from user running stats for easy sharing or download
-  **UI Mapping**:
   -  Presenting running metrics in a visually clear and engaging way
