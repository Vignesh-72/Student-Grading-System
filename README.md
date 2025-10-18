# Student Grading System

A full-stack MERN application designed to modernize and streamline the academic grading process for educational institutions. This platform provides distinct, role-based dashboards and functionalities for **Students**, **Teachers**, and **Admins**.

The application is built with a fully responsive user interface using Material-UI and features a secure backend API, bringing efficiency and clarity to grade management.

**Live Demo**: [https://student-grading-system-frontend.vercel.app/](https://student-grading-system-frontend.vercel.app/)

---

## Features

### 👩‍🎓 **Student Portal**
* **View Grades**: Students can log in to view a clean, organized list of their grades for all enrolled courses, presented as cards on mobile and a table on desktop.
* **Secure Access**: Each student is restricted to viewing only their own grades.

### 👨‍🏫 **Teacher Portal**
* **Course Overview**: Teachers can view a list of all courses they are assigned to in a responsive card layout.
* **Grade Management**:
    * **Add Grades**: Teachers can add new grades for any student enrolled in their courses via a simple modal form.
    * **View Course Grades**: Teachers can navigate to a detailed page to view a complete table of all grades for a specific course they teach.
* **Enroll Students**: Teachers have the ability to enroll students into their courses.

### 👮‍♂️ **Admin Portal**
* **Full User Management (CRUD)**:
    * **Create**: Admins can create new user accounts (students, teachers, or other admins) through a modal form.
    * **Read & Filter**: Admins can view a responsive table of all users in the system and filter the list by role (student, teacher, admin).
    * **Update**: Admins can edit any user's details, including their name, email, and role.
    * **Delete**: Admins can delete any user from the system with a confirmation step.
* **Full Course Management (CRUD)**:
    * **Create**: Admins can create new courses and assign them to any teacher from a dropdown list.
    * **Read & Filter**: Admins can view a responsive list of all courses and filter them by teacher or semester.
    * **Update**: Admins can edit any course's details, including its name, description, and assigned teacher.
    * **Delete**: Admins can delete any course from the system with confirmation.
* **Student Enrollment**: Admins can access an enrollment page for any course to add or manage enrolled students.

### ✨ **General UI/UX Features**
* **Fully Responsive Design**: The entire application, from the landing page to the dashboards, is optimized for all screen sizes.
* **Dynamic Theming**: Users can instantly switch between a light and dark theme with smooth transitions.
* **Modern Animations**: The UI is enhanced with animations for page transitions, text effects, and interactive elements, powered by Framer Motion and GSAP.

---

## Tech Stack

### **Frontend**
* **Framework**: React (Vite)
* **UI Library**: Material-UI (MUI)
* **Routing**: React Router
* **State Management**: React Context API
* **API Client**: Axios
* **Animations**: Framer Motion, GSAP

### **Backend**
* **Framework**: Node.js, Express.js
* **Database**: MongoDB (with Mongoose)
* **Authentication**: JSON Web Tokens (JWT)
* **Password Hashing**: bcrypt.js

### **Deployment**
* **Platform**: Vercel

---

## Getting Started

To get a local copy up and running, follow these steps.

### **Prerequisites**
* Node.js (v18 or later recommended)
* npm (comes with Node.js)
* A MongoDB Atlas account (free tier available) or a local MongoDB installation

### **Installation & Setup**

1.  **Clone the Repository**
    ```sh
    git clone [https://your-github-repository-url.git](https://your-github-repository-url.git)
    cd student-grading-system
    ```

2.  **Setup the Backend**
    * Navigate into the backend directory:
        ```sh
        cd backend
        ```
    * Install the necessary NPM packages:
        ```sh
        npm install
        ```
    * Create a `.env` file in the `backend` directory. Copy the contents of `.env.example` (if provided) or create it manually with the following variables:
        ```env
        MONGO_URI=your_mongodb_atlas_connection_string
        JWT_SECRET=your_super_secret_key_for_jwt_signing
        PORT=5000
        ```
        *Replace `your_mongodb_atlas_connection_string` with your actual connection string from MongoDB Atlas, ensuring you replace `<password>` with your database user's password.*
        *Replace `your_super_secret_key_for_jwt_signing` with a long, random, secure string.*

3.  **Setup the Frontend**
    * Navigate into the frontend directory:
        ```sh
        cd ../frontend
        ```
    * Install the necessary NPM packages:
        ```sh
        npm install
        ```
    * Create a `.env` file in the `frontend` directory with the following variable:
        ```env
        VITE_API_URL=http://localhost:5000
        ```
        *(This tells the frontend where to find the backend API during local development.)*

### **Running the Application Locally**

1.  **Start the Backend Server**
    * Open a terminal in the `backend` directory.
    * Run the command:
        ```sh
        node server.js
        ```
    * You should see output indicating the server is running on port 5000 and connected to MongoDB.

2.  **Start the Frontend Development Server**
    * Open a **separate terminal** in the `frontend` directory.
    * Run the command:
        ```sh
        npm run dev
        ```
    * Open your web browser and navigate to the local URL provided (usually `http://localhost:5173`).

You should now be able to interact with the application locally.

---
