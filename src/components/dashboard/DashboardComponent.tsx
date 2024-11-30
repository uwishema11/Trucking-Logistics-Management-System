"use client";

import { useSession } from "next-auth/react";
import Card from "../Card";
import styles from "./DashboardComponent.module.scss";

import { useTruck } from "@/hooks/trucks/useTruck";
import { useGetDrivers } from "@/hooks/drivers/useGetDrivers";

const DashboardComponent = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name;

  const { isLoading, isError, data, error } = useTruck();
  const {
    isLoading: loading,
    isError: isErr,
    data: list,
    error: err,
  } = useGetDrivers();

  if (isLoading || loading) return <p>Loading...</p>;
  if (isError) {
    return <span>{error.message}</span>;
  }
  if (isErr) {
    return <span>{err.message}</span>;
  }

  const availableTrucks = data?.filter(
    (truck: { status: string }) => truck.status == "Available"
  );
  const availableDrivers = list?.filter(
    (driver: { status: string }) => driver.status == "Available"
  );

  return (
    <div>
      <header className={styles.welcome}>
        <h1>Hello, {userName}!</h1>
        <p>
          Welcome to your dashboard! We&apos;re excited to have you here. Manage
          and keep track of your data with ease.
        </p>
      </header>
      <main>
        <h2 className={styles.heading}>Dashboard Summary</h2>
        <div className={styles.summary_container}>
          <Card title="Available Trucks" value={availableTrucks.length} />
          <Card title="Available Driver" value={availableDrivers.length} />
          <Card title="Available Driver" value={availableDrivers.length} />
        </div>
      </main>
    </div>
  );
};

export default DashboardComponent;
