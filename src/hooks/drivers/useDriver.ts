import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addDriver, deleteDriver, editDriver } from "@/services/driversService";
import { driverData, editDriverData } from "@/types/driver";

export default function useDriver() {
  const queryClient = useQueryClient();

  const addDriverMutation = useMutation({
    mutationFn: async (driver: driverData) => {
      const data = await addDriver(driver);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      toast.success("driver added successfully!");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(
          error.message ||
            "An error occurred while adding the driver. Please try again"
        );
      } else {
        toast.error(
          "An error occurred while adding the driver.Please try again"
        );
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
      toast.success("driver deleted successfully!");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(
          error.message ||
            "An error occurred while deleting the driver. Please try again"
        );
      } else {
        toast.error(
          "An error occurred while deleting the driver. Please try again"
        );
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
      toast.success("driver updated successfully!");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(
          error.message || "An error occurred while updating the driver."
        );
      } else {
        toast.error(
          "An error occurred while adding the driver. Please try again"
        );
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
