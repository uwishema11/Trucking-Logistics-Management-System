"use client";
import HeaderDashboard from "@/components/dashboard/layout/Header";
import Sidebar from "@/components/dashboard/layout/SideBar";
import ActionLoader from "@/components/Loader/ActionLoader";
import { Suspense, useState } from "react";

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
        <main
          className="dashboard-main"
          // style={{
          //   marginLeft: isSidebarOpen ? "224px" : "0",
          //   transition: "margin 0.3s ease",
          // }}
        >
          <Suspense fallback={<ActionLoader />}>{children}</Suspense>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
