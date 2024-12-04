# Trucking Logistics Management System

## 🚚 Project Overview

This project is a Trucking Logistics Management System built using Next.js, NextAuth, and React Query to simulate the interaction between truck owners, drivers, and customers. The system allows users to manage trucks, drivers, and orders in a logistics environment. Users can log in using Google OAuth 2.0 via NextAuth for authentication and interact with the application through a responsive, user-friendly interface.

## 🛠 Technologies Used

- **Next.js (v14+)**
- **NextAuth (Google OAuth 2.0)**
- **React Query**
- **SCSS**
- **JSON Server (Backend Simulation)**
- **ESLint and Prettier** (for code quality and formatting)

## 📋 Prerequisites

- **Node.js** (v18+)
- **npm** 
- **Git**
- **Google OAuth Credentials**

## 🚀 Installation Steps

1. **Clone Repository**

    ```bash
    git clone https://github.com/uwishema11/Trucking-Logistics-Management-System.git
    cd Trucking-Logistics-Management-System
    ```

2. **Install Dependencies**

    ```bash
    pnpm install
    ```

3. **Configure Environment Variables**

    Create a `.env.local` file in the project root with the following contents:

    ```env
    NEXTAUTH_SECRET=generate_a_random_secret_here
    GOOGLE_CLIENT_ID=your_google_oauth_client_id
    GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
    ```

4. **Setup JSON Server**

    Install JSON Server globally:

    ```bash
    npm install -g json-server
    ```

5. **Run Backend Simulation**

    Start the JSON Server:

    ```bash
    pnpm run json-server
    ```

6. **Start Development Server**

    Start the frontend development server:

    ```bash
    pnpm run dev 
    ```

## ✨ Key Features

- **🔐 Google OAuth Authentication**
- **🚚 Truck Management**  
    - View, add, edit, remove trucks
    - Track truck status
- **👨 Driver Management**  
    - View, add, edit, remove drivers
    - Assign drivers to trucks
- **📦 Order Management**  
    - View, add, edit orders
    - Assign drivers and trucks
    - Track order status

## 📞 Contact

[Celine Uwishrma] - [uwishemaceline4@gmail.com]  
Project Link: [https://github.com/uwishema11/Trucking-Logistics-Management-System]
