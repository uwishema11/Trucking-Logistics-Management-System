import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addOrder, deleteOrder, editOrder } from "@/services/orderService";
import { orderData, editOrderData } from "@/types/order";

export default function useOrders() {
  const queryClient = useQueryClient();

  const addOrderMutation = useMutation({
    mutationFn: async (order: orderData) => {
      const data = await addOrder(order);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      window.alert("order added succfully");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.log("Error: " + error.message, "error");
      } else {
        console.log("An unexpected error occurred", "error");
      }
    },
  });

  const deleteOrderMutation = useMutation({
    mutationFn: async (orderId: string) => {
      const data = await deleteOrder(orderId);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      window.alert("deleted succfully");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.log("Error: " + error.message, "error");
      } else {
        console.log("An unexpected error occurred", "error");
        window.alert("");
      }
    },
  });

  const updateOrderMutation = useMutation({
    mutationFn: async (order: editOrderData) => {
      const data = await editOrder(order);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      window.alert("order modified succfully");
      // updateOrderStatus(order.id, order.order_status)
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.log("Error: " + error.message, "error");
      } else {
        console.log("An unexpected error occurred", "error");
      }
    },
  });

  const handleAddSubmit = (formData: orderData) => {
    addOrderMutation.mutate(formData);
  };

  const handleEditSubmit = (FormData: editOrderData) => {
    updateOrderMutation.mutate(FormData);
  };

  return {
    handleAddSubmit,
    handleEditSubmit,
    deleteOrderMutation,
    isAddingOrUpdating:
      addOrderMutation.isPending || updateOrderMutation.isPending,
  };
}
