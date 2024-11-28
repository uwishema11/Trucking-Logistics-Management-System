import { useMutation, useQueryClient } from "@tanstack/react-query";
import { truckData, editTruckData } from "@/types/truck";
import { addTruck, deleteTruck, editTruck } from "@/services/truckService";

export default function useCreateTruck() {
  const queryClient = useQueryClient();

  const addTruckMutation = useMutation({
    mutationFn: async (truck: truckData) => {
      const data = await addTruck(truck);
      return data;
    },
    onSuccess: (response) => {
      console.log("u are mutating data");
      if (response.status === 201) {
        console.log(response.status);
        queryClient.invalidateQueries({ queryKey: ["trucks"] });
      } else {
        console.log(response.message);
      }
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.log("Error: " + error.message, "error");
      } else {
        console.log("An unexpected error occurred", "error");
      }
    },
  });

  const deleteTruckMutation = useMutation({
    mutationFn: async (truckId: string) => {
      const data = await deleteTruck(truckId);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.log("Error: " + error.message, "error");
      } else {
        console.log("An unexpected error occurred", "error");
      }
    },
  });

  const updateTruckMutation = useMutation({
    mutationFn: async (truck: editTruckData) => {
      const data = await editTruck(truck);
      return data;
    },
    onSuccess: (response) => {
      console.log("u are mutating data by editing it");
      if (response.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["trucks"] });
      } else {
        console.log(response.message);
      }
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.log("Error: " + error.message, "error");
      } else {
        console.log("An unexpected error occurred", "error");
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
