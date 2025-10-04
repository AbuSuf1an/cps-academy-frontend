# CPS Academy - Learning Platform

A modern learning platform built with Next.js frontend and Strapi backend.

## 🏗️ Project Structure

```
cps-academy/
├── frontend/          # Next.js 14 frontend application
├── backend/           # Strapi v5 backend API
└── README.md          # This file
```

## 🚀 Quick Start

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Access: http://localhost:3000

### Backend (Strapi)
```bash
cd backend
npm install
npm run develop
```
Access: http://localhost:1337

## 📚 Features

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with custom theme
- **shadcn/ui** components
- **Responsive design** with mobile-first approach
- **Marketing pages** with Hero, Features, Courses, CTA sections

### Backend
- **Strapi v5** headless CMS
- **Collection Types**: Course, Module, Class, Topic, UserProfile
- **Role-based access control** (NormalUser, Student, SocialMediaManager, Developer)
- **Deep population** for nested course data
- **Public API endpoints** for course content
- **Protected endpoints** for admin operations

## 🔗 API Endpoints

### Public Endpoints
- `GET /api/courses` - List all public courses
- `GET /api/courses/:id` - Get course details with modules/classes/topics

### Protected Endpoints
- Course management (Admin only)
- User profile management (Authenticated users)

## 🎯 User Roles

- **NormalUser**: Can view public course information and free previews
- **Student**: Can access enrolled course content
- **SocialMediaManager**: Read-only access to course content and stats
- **Developer**: Full system access and feature flags

## 🚀 Deployment

### Frontend (Vercel)
- Repository: `cps-academy-frontend`
- Framework: Next.js
- Environment Variables: API base URL, NextAuth secrets

### Backend (Railway)
- Repository: `cps-academy-backend`
- Framework: Strapi
- Database: PostgreSQL
- Environment Variables: Database URL, JWT secrets

## 📖 Documentation

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)

## 🤝 Contributing

1. Fork the repositories
2. Create feature branches
3. Follow conventional commit messages
4. Submit pull requests

## 📄 License

MIT License - see LICENSE file for details.
