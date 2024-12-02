import { useQuery } from "@tanstack/react-query";

import { fetchDrivers } from "@/services/driversService";

export const useGetDrivers = () => {
  return useQuery({
    queryKey: ["drivers"],
    queryFn: fetchDrivers,
  });
};
