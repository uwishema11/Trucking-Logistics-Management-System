import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { orderData, editOrderData} from "@/types/order";

export const addOrder = async (data: orderData) => {
  const response = await axios.post(`http://localhost:4000/orders`, {
    ...data,
    id: uuidv4(),
  });
  if (response.status !== 201) {
    throw new Error(response.data.message);
  }
  return response.data;
};

export const fetchOrders = async () => {
  const response = await axios.get(`http://localhost:4000/orders`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }
  return response.data;
};
export const fetchSingleOrder = async (orderId: string) => {
  const response = await axios.get(`http://localhost:4000/orders${orderId}`);
  console.log(`fetching data with idi ${orderId}`);
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
  try {
    const updatePayload: editOrderData = { ...data };
    if (data.order_status === "complete") {
      const currentOrderResponse = await axios.get(
        `http://localhost:4000/orders/${data.id}`
      );
      const currentOrder = currentOrderResponse.data;
      if (currentOrder.assigned_driver) {
        console.log(`this is the driver ${currentOrder.assigned_driver}`);
        await axios.patch(
          `http://localhost:4000/drivers/${currentOrder.assigned_driver}`,
          {
            status: "Available",
          }
        );
      }
      if (currentOrder.assigned_truck) {
        await axios.patch(
          `http://localhost:4000/trucks/${currentOrder.assigned_truck}`,
          {
            status: "Available",
          }
        );
      }
    }

    const response = await axios.patch(
      `http://localhost:4000/orders/${data.id}`,
      updatePayload
    );

    if (response.status !== 200) {
      throw new Error("Failed to edit order");
    }

    return response.data;
  } catch (error) {
    console.error("Error in editOrder:", error);
    throw error;
  }
};
