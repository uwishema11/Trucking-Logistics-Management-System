import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { editTruckData, truckData } from "@/types/truck";

export const addTruck = async (data: truckData) => {
  const response = await axios.post(`http://localhost:4000/trucks`, {
    ...data,
    id: uuidv4(),
  });
  if (response.status !== 201) {
    throw new Error(response.data.message);
  }
  return response.data;
};

export const fetchTrucks = async () => {
  const response = await axios.get(`http://localhost:4000/trucks`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }
  return response.data;
};
export const fetchSingleTruck = async (truckId: string) => {
  const response = await axios.get(`http://localhost:4000/trucks${truckId}`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }
  return response.data;
};
export const deleteTruck = async (truckId: string) => {
  const response = await axios.delete(
    `http://localhost:4000/trucks/${truckId}`
  );
  if (response.status !== 200) {
    throw new Error("Failed to delete a truck");
  }
  return response.data;
};

export const editTruck = async (data: editTruckData) => {
  const response = await axios.patch(
    `http://localhost:4000/trucks/${data.id}`,
    data
  );
  if (response.status !== 200) {
    throw new Error("Failed to edit truck");
  }
  return response.data;
};
