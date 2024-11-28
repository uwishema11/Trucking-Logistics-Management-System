export interface truckData {
  id: string;
  plate_number: string;
  capacity: number;
  status: string;
}

export interface editTruckData {
  id?: string;
  plate_number?: string;
  capacity?: number;
  status?: string;
}
