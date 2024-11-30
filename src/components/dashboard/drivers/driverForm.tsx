import React, { useState } from "react";
import { editDriverData, driverData } from "@/types/driver";
import { z } from "zod";
import "./driverForm.scss";
import { useTruck } from "@/hooks/trucks/useTruck";

interface DriverFormProps {
  onSubmit: (data: driverData | editDriverData) => void;
  onClose: () => void;
  initialData?: editDriverData | null;
  isLoading?: boolean;
}

const driverSchema = z.object({
  id: z.string().min(1, "Truck ID is required"),
  name: z.string().min(1, "driver's name is required"),
  license_number: z
    .string()
    .min(
      6,
      "license number is required and must be at least 6 characters long"
    ),
  assigned_truck: z.string().default("null"),
  contact_number: z.string().min(10, "Contact number is required"),
  status: z.enum(["Available", "Delivering"]),
});

const DriverForm: React.FC<DriverFormProps> = ({
  onSubmit,
  onClose,
  initialData = null,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<driverData | editDriverData>({
    id: initialData?.id || "",
    name: initialData?.name || "",
    assigned_truck: initialData?.assigned_truck || "null",
    contact_number: initialData?.contact_number || "",
    license_number: initialData?.license_number || "",
    status: initialData?.status || "Available",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data } = useTruck();
  const availableTrucks = data?.filter(
    (truck: { status: string }) => truck.status == "Available"
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "capacity" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    try {
      const validatedData = driverSchema.parse(formData);
      console.log("Validated data:", validatedData);
      setErrors({});
      onSubmit(validatedData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as string] = error.message;
          }
        });
        console.log("Validation errors:", fieldErrors);
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="truck-form-overlay">
      <div className="truck-form-container">
        <h2>{initialData ? "Edit Driver" : "Add New Driver"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id">Driver ID</label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
            />
            {errors.id && <span className="error-message">{errors.id}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="contact_number">Contact_number</label>
            <input
              type="text"
              id="contact_number"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
            />
            {errors.name && (
              <span className="error-message">{errors.contact_number}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="license_number">License_number</label>
            <input
              type="text"
              id="license_number"
              name="license_number"
              value={formData.license_number}
              onChange={handleChange}
            />
            {errors.license_number && (
              <span className="error-message">{errors.license_number}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="assigned_truck">Assign Truck</label>
            <select
              id="assigned_truck"
              name="assigned_truck"
              value={formData.assigned_truck}
              onChange={handleChange}
              className="custom-select"
            >
              {availableTrucks &&
                availableTrucks.map((truck: { id: string; name: string }) => (
                  <option key={truck.id} value={truck.id}>
                    {truck.id}
                  </option>
                ))}
            </select>
            {errors.assigned_truck && (
              <span className="error-message">{errors.assigned_truck}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Available">Available</option>
              <option value="Delivering">Delivering</option>
            </select>
            {errors.status && (
              <span className="error-message">{errors.status}</span>
            )}
          </div>

          <div className="form-actions">
            <button
              type="submit"
              disabled={isLoading}
              className={isLoading ? "loading" : ""}
            >
              {isLoading
                ? "Submitting..."
                : initialData
                ? "Update Driver"
                : "Add Driver"}
            </button>
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverForm;
