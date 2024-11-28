import React, { useState } from "react";
import { editTruckData, truckData } from "@/types/truck";
import { z } from "zod";
import "./TruckForm.scss";

interface TruckFormProps {
  onSubmit: (data: truckData | editTruckData) => void;
  onClose: () => void;
  initialData?: editTruckData | null;
  isLoading?: boolean;
}

const truckSchema = z.object({
  id: z.string().min(1, "Truck ID is required"),
  plate_number: z
    .string()
    .min(1, "Plate Number is required")
    .regex(/^[A-Za-z0-9-]+$/, "Invalid Plate Number"),
  capacity: z.number().min(1, "Capacity must be greater than 0"),
  status: z.enum(["Available", "Delivering"]),
});

const TruckForm: React.FC<TruckFormProps> = ({
  onSubmit,
  onClose,
  initialData = null,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<truckData | editTruckData>({
    id: initialData?.id || "",
    plate_number: initialData?.plate_number || "",
    capacity: initialData?.capacity || 0,
    status: initialData?.status || "Available",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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
    try {
      const validatedData = truckSchema.parse(formData);
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
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="truck-form-overlay">
      <div className="truck-form-container">
        <h2>{initialData ? "Edit Truck" : "Add New Truck"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id">Truck ID</label>
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
            <label htmlFor="plate_number">Plate Number</label>
            <input
              type="text"
              id="plate_number"
              name="plate_number"
              value={formData.plate_number}
              onChange={handleChange}
            />
            {errors.plate_number && (
              <span className="error-message">{errors.plate_number}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="capacity">Truck Capacity</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
            />
            {errors.capacity && (
              <span className="error-message">{errors.capacity}</span>
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
                ? "Update Truck"
                : "Add Truck"}
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

export default TruckForm;
