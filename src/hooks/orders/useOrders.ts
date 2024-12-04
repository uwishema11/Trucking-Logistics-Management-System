import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
      toast.success("order added successfully!");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.log("Error: " + error.message, "error");
        toast.error(`${error.message}`);
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
      toast.success("order deleted successfully!");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(`${error.message}`);
      } else {
        toast.error(
          `An unexpected error occurred! Failed to delete an order. Please again`
        );
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
      toast.success("order updated successfully!");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(`${error.message}`);
      } else {
        toast.error(
          `An unexpected error occurred! Failed to update an order. Please again`
        );
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
