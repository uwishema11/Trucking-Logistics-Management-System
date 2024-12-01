"use client";

import { useSession } from "next-auth/react";
import Card from "../Card";
import styles from "./DashboardComponent.module.scss";
import { useGetOrders } from "@/hooks/orders/useGetOrders";
import { useTruck } from "@/hooks/trucks/useTruck";
import { useGetDrivers } from "@/hooks/drivers/useGetDrivers";

const DashboardComponent = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name;

  const { isLoading, isError, data, error } = useTruck();
  const {
    isLoading: isLoadingOrders,
    isError: isOrdersError,
    data: orders,
    error: isOrdersErr,
  } = useGetOrders();

  const {
    isLoading: isGettingDrivers,
    isError: isdriversError,
    data: drivers,
    error: isDriverErr,
  } = useGetDrivers();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <span>{error.message}</span>;

  if (isLoadingOrders) return <p>Loading...</p>;
  if (isOrdersError) return <span>{isOrdersErr.message}</span>;

  if (isGettingDrivers) return <p>Loading...</p>;
  if (isdriversError) {
    return <span>{isDriverErr.message}</span>;
  }

  const availableTrucks = data?.filter(
    (truck: { status: string }) => truck.status == "Available"
  );
  const TotalTrucks = data.map((el: string) => el);

  const availableDrivers = drivers?.filter(
    (driver: { status: string }) => driver.status == "Available"
  );
  const TotalDrivers = drivers?.map((el: string) => el);

  const AvailableOrders = orders?.filter((order: { order_status: string }) => {
    return order.order_status == "pending";
  });
  const TotalOrders = orders?.map((el: string) => el);

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
          <Card
            Total="Total Trucks"
            TotalValue={TotalTrucks.length}
            Available="Available Trucks"
            AvailableValue={availableTrucks.length}
          />
          <Card
            Total="Total Orders"
            TotalValue={TotalOrders.length}
            Available="Pending Orders"
            AvailableValue={AvailableOrders.length}
          />
          <Card
            Total="Total drivers"
            TotalValue={TotalDrivers.length}
            Available="Available Drivers"
            AvailableValue={availableDrivers.length}
          />
        </div>
      </main>
    </div>
  );
};

export default DashboardComponent;
