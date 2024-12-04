import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { editTruckData, truckData } from "@/types/truck";

import { fetchDrivers } from "./driversService";

export const addTruck = async (data: truckData) => {
  try {
    const existingTrucks = await fetchTrucks();
    const truckExists = existingTrucks.some(
      (truck: truckData) => truck.plate_number === data.plate_number
    );

    if (truckExists) {
      throw new Error("Truck with this plate number already exists.");
    }

    const response = await axios.post(`http://localhost:4000/trucks`, {
      ...data,
      id: uuidv4(),
    });

    console.log("Received response from backend:", response);

    if (response.status !== 201) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    console.error("Error adding truck:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unexpected error occurred while adding the truck."
    );
  }
};

export const fetchTrucks = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/trucks`);

    if (response.status !== 200) {
      throw new Error("Failed to fetch trucks");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching trucks:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unexpected error occurred while fetching trucks."
    );
  }
};

export const fetchSingleTruck = async (truckId: string) => {
  try {
    const response = await axios.get(`http://localhost:4000/trucks/${truckId}`);

    if (response.status !== 200) {
      throw new Error("Failed to fetch truck data");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching single truck:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unexpected error occurred while fetching the truck."
    );
  }
};

export const deleteTruck = async (truckId: string) => {
  try {
    const truck = await fetchSingleTruck(truckId);

    console.log(truck);

    if (truck.status === "Delivering") {
      throw new Error("Cannot delete a truck that is already Delivering.");
    }

    const response = await axios.delete(
      `http://localhost:4000/trucks/${truckId}`
    );

    if (response.status !== 200) {
      throw new Error("Failed to delete truck");
    }

    return response.data;
  } catch (error) {
    console.error("Error deleting truck:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unexpected error occurred while deleting the truck."
    );
  }
};

export const editTruck = async (data: editTruckData) => {
  try {
    if (data.status === "Available") {
      const drivers = await fetchDrivers();

      const isDriverDriving = drivers.some(
        (driver: { assigned_truck: string; status: string }) =>
          driver.assigned_truck === data.id && driver.status === "Driving"
      );

      if (isDriverDriving) {
        throw new Error(
          "Cannot mark truck as available while its driver is still driving. Please ensure that its driver is not using it"
        );
      }
    }

    const response = await axios.patch(
      `http://localhost:4000/trucks/${data.id}`,
      data
    );

    if (response.status !== 200) {
      throw new Error("Failed to edit truck");
    }

    return response.data;
  } catch (error) {
    console.error("Error editing truck:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unexpected error occurred while editing the truck."
    );
  }
};
