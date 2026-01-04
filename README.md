Math Club Hub

A modern, full-stack community management platform designed effectively for university math clubs. This project streamlines event management, student registration, and digital updates through a secure and visually immersive interface.

🚀 Key Features
🔒 Robust Authentication System

Student Portal: Frictionless, passwordless login using Register Numbers and Email for students.
Admin Dashboard: Secure, password-protected access for club coordinators and faculty.
Role-Based Access Control (RBAC): Distinct permissions and views for Admins vs. Students.
📅 Comprehensive Event Management

Digital Notice Board: Real-time updates for upcoming workshops, seminars, and contests.
Admin Controls: Full CRUD (Create, Read, Update, Delete) capabilities for events.
Media Support: Administration can upload and manage event banners and descriptions.
🎨 Premium User Experience (UI/UX)

Glassmorphism Design: A modern, aesthetic interface utilizing translucent layers and vibrant gradients.
Responsive Layouts: Fully optimized for seamless use across desktops, tablets, and mobile devices.
Interactive Elements: Smooth micro-animations and intuitive navigation powered by framer-motion (implied or similar libraries) and standard CSS transitions.
🛠️ Technology Stack
Frontend

React: Component-based UI architecture.
TypeScript: Ensuring type safety and code reliability.
Vite: Lightning-fast build tool and development server.
Tailwind CSS: Utility-first styling for rapid custom design.
shadcn/ui: High-quality, accessible, and customizable UI components.
Backend

Node.js & Express: Scalable server-side logic and API routing.
MongoDB (Mongoose): Flexible NoSQL database schema for storing users and events settings.
Tooling

ESLint: Code quality and consistency.
npm: Package management.
⚙️ Getting Started
Clone the Repository
bash
git clone (https://github.com/Harsh06045/MATHSCLUBWEB.git)
cd math-club-hub
Install Dependencies
bash
npm install
Configure Environment Create a .env file in the root directory and add your necessary environment variables (e.g., MongoDB URI, Secret Keys).
Run the Application
bash
# Start the development server
npm run dev
📂 Project Structure
src/: React frontend source code (Pages, Components, Context).
server/: Backend API logic, controllers, and database models.
public/: Static assets and images.
dist/: Production build artifacts.
✨ Highlights
Type-Safe: Extensive use of TypeScript interfaces for API responses and component props.
Modular Architecture: Separation of concerns between Client, Server, and Database layers.
Modern Standards: Utilizes the latest React hooks and functional component patterns.
