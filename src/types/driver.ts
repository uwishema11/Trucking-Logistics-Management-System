export interface driverData {
  id: string;
  name: string;
  assigned_truck: string;
  contact_number: string;
  license_number: string;
  status: string;
}
export interface editDriverData {
  id?: string;
  name?: string;
  assigned_truck?: string;
  license_number?: string;
  contact_number?: string;
  status?: string;
}
