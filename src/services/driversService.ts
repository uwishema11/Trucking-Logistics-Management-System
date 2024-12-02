import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { driverData, editDriverData } from "@/types/driver";

export const addDriver = async (data: driverData) => {
  const response = await axios.post(`http://localhost:4000/drivers`, {
    ...data,
    id: uuidv4(),
  });
  console.log(`adding the following data ${response}`);

  console.log(`adding the following data ${data}`);
  if (response.status !== 201) {
    throw new Error(response.data.message);
  }
  return response.data;
};

export const fetchDrivers = async () => {
  const response = await axios.get(`http://localhost:4000/drivers`);
  console.log(response.status);
  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }
  return response.data;
};
export const fetchSingleDriver = async (driverId: string) => {
  const response = await axios.get(`http://localhost:4000/drivers${driverId}`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }
  return response.data;
};
export const deleteDriver = async (driverId: string) => {
  const response = await axios.delete(
    `http://localhost:4000/drivers/${driverId}`
  );
  if (response.status !== 200) {
    throw new Error("Failed to delete a driver");
  }
  return response.data;
};

export const editDriver = async (data: editDriverData) => {
  try {
    if (data.status === "Delivering") {
      const currentDriverResponse = await axios.get(
        `http://localhost:4000/drivers/${data.id}`
      );
      const currentDriver = currentDriverResponse.data;
      if (currentDriver.assigned_truck) {
        await axios.patch(
          `http://localhost:4000/trucks/${currentDriver.assigned_truck}`,
          {
            status: "Delivering",
          }
        );
      }
    }

    const response = await axios.patch(
      `http://localhost:4000/drivers/${data.id}`,
      data
    );

    if (response.status !== 200) {
      throw new Error("Failed to edit driver");
    }

    return response.data;
  } catch (error) {
    console.error("Error in editDriver:", error);
    throw error;
  }
};
