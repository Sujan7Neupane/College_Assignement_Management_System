# CourseDesk - College Assignment Management System

CourseDesk is a full-stack college assignment management system where students can view and submit assignments, teachers can create and manage assignments and grade submissions, and admins can manage users.

## Features

### Student
- Student dashboard
- View assignments
- View assignment details
- Submit assignments
- Check submission status and grades
- View and edit profile

### Teacher
- Teacher dashboard
- Create, update, and delete assignments
- View assignment details
- View student submissions
- Grade submissions
- View and edit profile

### Admin
- Admin dashboard
- Manage users
- Approve pending users
- Activate or disable users
- Delete users
- View individual user details
- Add admin users
- View and edit admin profile

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- DaisyUI
- Redux Toolkit
- RTK Query
- React Router
- React Hook Form
- React Hot Toast
- Lucide React

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT authentication
- bcrypt
- Multer
- Cloudinary

## User Roles

The application has three roles:

- **STUDENT** - View and submit assignments
- **TEACHER** - Create assignments and manage submissions
- **ADMIN** - Manage users and the system

## Main Workflow

```text
Student
  ↓
View Assignment
  ↓
Submit Assignment
  ↓
Teacher
  ↓
View Submission
  ↓
Grade Submission
```

## Project Structure

```text
CourseDesk
├── frontend
│   ├── components
│   ├── pages
│   ├── redux
│   ├── routes
│   └── ...
│
└── backend
    ├── controllers
    ├── routes
    ├── middleware
    ├── prisma
    └── ...
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd CourseDesk
```

### 2. Install dependencies

Install dependencies in both frontend and backend folders.

```bash
cd frontend
npm install
```

```bash
cd ../backend
npm install
```

### 3. Configure environment variables

Create `.env` files in the frontend and backend and add the required database, JWT, Cloudinary, and other configuration values.

### 4. Setup the database

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Generate the Prisma client:

```bash
npx prisma generate
```

### 5. Seed the admin account

```bash
npx prisma db seed
```

### 6. Run the application

Start the backend:

```bash
npm run dev
```

Start the frontend from the frontend folder:

```bash
npm run dev
```

## Authentication

The application uses JWT-based authentication. Users are redirected to the appropriate dashboard based on their role after login.

```text
/login
   ↓
Role check
   ├── STUDENT → /student/dashboard
   ├── TEACHER → /teacher/dashboard
   └── ADMIN   → /admin/dashboard
```

Protected routes are implemented separately for students, teachers, and admins.

## Future Improvements

- Real-time notifications
- Better dashboard analytics
- Assignment comments
- Email notifications
- More advanced admin statistics
- Improved file management

## Author

Built as a full-stack web development project using React, Node.js, Express, Prisma, and PostgreSQL.
