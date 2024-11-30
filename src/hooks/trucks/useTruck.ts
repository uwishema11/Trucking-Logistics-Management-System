import { useQuery } from "@tanstack/react-query";
import { fetchTrucks } from "@/services/truckService";

export const useTruck = () => {
  return useQuery({
    queryKey: ["trucks"],
    queryFn: fetchTrucks,
  });
};
