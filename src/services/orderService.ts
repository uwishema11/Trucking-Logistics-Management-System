import axios from "axios";
import { orderData,editOrderData } from "@/types/order";

export const addOrder = async (data: orderData) => {
  const response = await axios.post(`http://localhost:4000/orders`, data);
  if (response.status !== 201) {
    throw new Error(response.data.message);
  }
  return response.data;
};

export const fetchOrders = async () => {
  const response = await axios.get(`hhttp://localhost:4000/orders`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }
  return response.data;
};
export const fetchSingleOrder = async (orderId: string) => {
  const response = await axios.get(`http://localhost:4000/orders${orderId}`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }
  return response.data;
};
export const deleteOrder = async (orderId: string) => {
  const response = await axios.delete(
    `http://localhost:4000/orders/${orderId}`
  );
  if (response.status !== 200) {
    throw new Error("Failed to delete a order");
  }
  return response.data;
};

export const editOrder = async (data: editOrderData) => {
  const response = await axios.patch(
    `http://localhost:4000/orders/${data.id}`,
    data
  );
  if (response.status !== 200) {
    throw new Error("Failed to edit order");
  }
  return response.data;
};
