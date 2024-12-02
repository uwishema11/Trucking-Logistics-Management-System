import React, { useState } from "react";
import { z } from "zod";
import { orderData, editOrderData } from "@/types/order";
import { useTruck } from "@/hooks/trucks/useTruck";
import { useGetDrivers } from "@/hooks/drivers/useGetDrivers";
import { orderSchema } from "@/validations/orderValidation";
import "@/styles/formStyles.scss";

interface DriverFormProps {
  onSubmit: (data: orderData | editOrderData) => void;
  onClose: () => void;
  initialData?: editOrderData | null;
  isLoading?: boolean;
}

const OrdersForm: React.FC<DriverFormProps> = ({
  onSubmit,
  onClose,
  initialData = null,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<orderData | editOrderData>({
    id: initialData?.id || "",
    customer_name: initialData?.customer_name || "",
    assigned_truck: initialData?.assigned_truck || "null",
    assigned_driver: initialData?.assigned_driver || "null",
    order_status: initialData?.order_status || "pending",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { data } = useTruck();
  const { data: drivers } = useGetDrivers();

  const availableDrivers = drivers?.filter(
    (driver: { status: string }) => driver.status == "Available"
  );

  const availableTrucks = data?.filter(
    (truck: { status: string }) => truck.status == "Available"
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    try {
      const validatedData = orderSchema.parse(formData);
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
    <div className="form-overlay">
      <div className="form-container">
        <h2>{initialData ? "Edit Order" : "Add New Order"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Customer Name</label>
            <input
              type="text"
              id="customer_name"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
            />
            {errors.customer_name && (
              <span className="error-message">{errors.customer_name}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="assigned_driver">
              {initialData ? "Assigned Driver" : "Assign Driver"}
            </label>
            <select
              id="assigned_driver"
              name="assigned_driver"
              value={formData.assigned_driver}
              onChange={handleChange}
              className="custom-select"
            >
              <option value="">Select a driver</option>
              {availableDrivers &&
                availableDrivers.map((driver: { id: string; name: string }) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.id}
                  </option>
                ))}
            </select>
            {errors.assigned_truck && (
              <span className="error-message">{errors.assigned_truck}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="assigned_truck">
              {initialData ? "Assigned Truck" : "Assign Truck"}
            </label>
            <select
              id="assigned_truck"
              name="assigned_truck"
              value={formData.assigned_truck}
              onChange={handleChange}
              className="custom-select"
            >
              <option value="">Select a truck</option>
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
              name="order_status"
              value={formData.order_status}
              onChange={handleChange}
            >
              <option value="pending">pending</option>
              <option value="complete">complete</option>
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
                ? "Update Order"
                : "Add Order"}
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

export default OrdersForm;
