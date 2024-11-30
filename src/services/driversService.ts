import axios from "axios";

import { driverData, editDriverData } from "@/types/driver";

export const addDriver = async (data: driverData) => {
  const response = await axios.post(`http://localhost:4000/drivers`, data);
  console.log(`adding the following data ${response}`);

  console.log(`adding the following data ${data}`);
  if (response.status !== 201) {
    throw new Error(response.data.message);
  }
  return response.data;
};

export const fetchDrivers = async () => {
  const response = await axios.get(`http://localhost:4000/drivers`);
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
  const response = await axios.patch(
    `http://localhost:4000/drivers/${data.id}`,
    data
  );
  if (response.status !== 200) {
    throw new Error("Failed to edit driver");
  }
  return response.data;
};
