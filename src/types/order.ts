export interface orderData {
  id: string;
  customer_name: string;
  assigned_truck: string | null;
  assignedDriver: string | null;
  order_sattus: string;
}
export interface editOrderData {
  id?: string;
  customer_name?: string;
  assigned_truck?: string | null;
  assignedDriver?: string | null;
  order_sattus?: string;
}
