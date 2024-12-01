import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "@/services/orderService";

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });
};
