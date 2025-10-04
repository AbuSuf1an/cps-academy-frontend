# CPS Academy - Frontend

A modern learning platform built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Lucide React** for icons
- **React Hook Form** + **Zod** for forms
- **SWR/React Query** for data fetching
- **NextAuth** for authentication
- **ESLint** + **Prettier** for code quality

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory:

   ```env
   # API Configuration
   NEXT_PUBLIC_API_BASE_URL=http://localhost:1337

   # NextAuth Configuration
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles with Tailwind
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # Reusable components
│   └── ui/            # shadcn/ui components
└── lib/               # Utility functions
    ├── fetcher.ts     # Axios instance
    ├── routes.ts      # Route definitions
    └── utils.ts       # Utility functions
```

## Theme

The project uses a custom theme inspired by Coding Ninjas and Phitron:

- **Primary**: Bright Orange/Amber
- **Accent**: Bright Blue
- **Success**: Green
- **Warning**: Yellow
- **Destructive**: Red

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Data Fetching**: SWR + Axios
- **Authentication**: NextAuth
- **Code Quality**: ESLint + Prettier
