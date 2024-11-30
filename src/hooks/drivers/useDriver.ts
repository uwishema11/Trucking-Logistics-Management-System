import { useMutation, useQueryClient } from "@tanstack/react-query";
import { driverData, editDriverData } from "@/types/driver";
import { addDriver, deleteDriver, editDriver } from "@/services/driversService";



export default function useDriver() {
  const queryClient = useQueryClient();

  const addDriverMutation = useMutation({
    mutationFn: async (driver: driverData) => {
      const data = await addDriver(driver);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
       window.alert("driver added succfully");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.log("Error: " + error.message, "error");
      } else {
        console.log("An unexpected error occurred", "error");
      }
    },
  });

  const deleteDriverMutation = useMutation({
    mutationFn: async (driverId: string) => {
      const data = await deleteDriver(driverId);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      window.alert("deleted succfully");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.log("Error: " + error.message, "error");
      } else {
        console.log("An unexpected error occurred", "error");
        window.alert('')
      }
    },
  });

  const updateDriverMutation = useMutation({
  
    mutationFn: async (driver: editDriverData) => {
      const data = await editDriver(driver);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
       window.alert("driver modified succfully");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.log("Error: " + error.message, "error");
      } else {
        console.log("An unexpected error occurred", "error");
      }
    },
  });

  const handleAddSubmit = (formData: driverData) => {
    addDriverMutation.mutate(formData);
  };

  const handleEditSubmit = (FormData: editDriverData) => {
    updateDriverMutation.mutate(FormData);
  };

  return {
    handleAddSubmit,
    handleEditSubmit,
    deleteDriverMutation,
    isAddingOrUpdating:
      addDriverMutation.isPending || updateDriverMutation.isPending,
  };
}
