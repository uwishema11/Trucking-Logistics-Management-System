"use client";
import { Suspense, useState } from "react";

import HeaderDashboard from "@/components/dashboard/layout/Header";
import Sidebar from "@/components/dashboard/layout/SideBar";
import ActionLoader from "@/components/Loader/ActionLoader";

import "./DashboardLayout.scss";

interface Properties {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Properties> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="dashboard-content">
        <HeaderDashboard toggleSidebar={toggleSidebar} />
        <main className="dashboard-main">
          <Suspense fallback={<ActionLoader />}>{children}</Suspense>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
