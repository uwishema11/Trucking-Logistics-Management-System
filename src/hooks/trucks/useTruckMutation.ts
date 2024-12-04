import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addTruck, deleteTruck, editTruck } from "@/services/truckService";
import { truckData, editTruckData } from "@/types/truck";

export default function useCreateTruck() {
  const queryClient = useQueryClient();

  const addTruckMutation = useMutation({
    mutationFn: async (truck: truckData) => {
      const data = await addTruck(truck);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trucks"] });
      toast.success("Truck added successfully!");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(`${error.message}`);
      } else {
        toast.error("Failed to add truck. Please try again");
      }
    },
  });

  const deleteTruckMutation = useMutation({
    mutationFn: async (truckId: string) => {
      const data = await deleteTruck(truckId);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trucks"] });
      toast.success("Truck deleted successfully!");
    },
    onError: (error: unknown) => {
      console.log(error);
      if (error instanceof Error) {
        toast.error(
          error.message ||
            "An error occurred while deleting the truck. Please try again"
        );
      } else {
        toast.error(`An unexpected error occurred. Please try again`);
      }
    },
  });

  const updateTruckMutation = useMutation({
    mutationFn: async (truck: editTruckData) => {
      const data = await editTruck(truck);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trucks"] });
      toast.success("Truck updated successfully!");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(`${error.message}`);
      } else {
        toast.error(
          `An unexpected error occurred While updating truck. Please try again`
        );
      }
    },
  });

  const handleAddSubmit = (formData: truckData | editTruckData) => {
    addTruckMutation.mutate(formData as truckData);
  };

  const handleEditSubmit = (FormData: editTruckData) => {
    updateTruckMutation.mutate(FormData);
  };

  return {
    handleAddSubmit,
    handleEditSubmit,
    deleteTruckMutation,
    isAddingOrUpdating:
      addTruckMutation.isPending || updateTruckMutation.isPending,
  };
}
