export interface orderData {
  id: string;
  customer_name: string;
  assigned_truck: string;
  assigned_driver: string;
  order_status: string;
}
export interface editOrderData {
  id?: string;
  customer_name?: string;
  assigned_truck?: string;
  assigned_driver?: string;
  order_status?: string;
}

export interface editstatusProps {
  orderId: string;
  newStatus: string;
}
