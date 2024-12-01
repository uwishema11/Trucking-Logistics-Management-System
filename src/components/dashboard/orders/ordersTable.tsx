"use client";
import React, { useState } from "react";
import { Search, PlusCircle } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { driverData, editDriverData } from "@/types/driver";
import { MoreHorizontal } from "lucide-react";
import Table from "../Table";
import OrdersForm from "./ordersForm";
import useOrders from "@/hooks/orders/useOrders";
import { useGetOrders } from "@/hooks/orders/useGetOrders";
import { editOrderData, orderData } from "@/types/order";
import "@/styles/tableStyles.scss";

const OrdersTable = () => {
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [editData, setEditData] = useState<editDriverData | null>(null);

  const { handleAddSubmit, handleEditSubmit, deleteOrderMutation } =
    useOrders();

  const { isLoading, isError, data, error } = useGetOrders();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <span>{error.message}</span>;

  const trucksColumns: ColumnDef<driverData>[] = [
    { accessorKey: "id", header: "Customer-ID" },
    { accessorKey: "customer_name", header: "Customer-Name" },
    { accessorKey: "assigned_truck", header: "Assigned_Truck-ID" },
    { accessorKey: "assigned_driver", header: "Assigned_Driver-ID" },
    { accessorKey: "order_status", header: "Order_Status" },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="relative">
          <button
            className="more-icon"
            onClick={() => handleDropdownToggle(row.original.id)}
          >
            <MoreHorizontal className="icon" />
          </button>
          {row.original.id === showDropdown && (
            <div className="dropdown-menu">
              <ul>
                <li>
                  <a onClick={() => openFormForEdit(row.original)}>Edit</a>
                </li>
                <li>
                  <a onClick={() => handleDeleteDriver(row.original.id)}>
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      ),
    },
  ];

  const filteredData = data.filter((order: orderData) => {
    const matchesSearch = order.customer_name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter === "All" || order.order_status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setIsFilterOpen(false);
  };

  const handleDropdownToggle = (id: string) => {
    setShowDropdown((prevId) => (prevId === id ? null : id));
  };

  const handleOpenForm = () => {
    setFormMode("add");
    setEditData(null);
    setIsFormOpen(true);
  };

  const openFormForEdit = (driver: editDriverData) => {
    setFormMode("edit");
    setEditData(driver);
    setIsFormOpen(true);
    setShowDropdown(null);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditData(null);
  };

  const handleSubmitForm = (formData: orderData | editOrderData) => {
    if (formMode === "add") {
      handleAddSubmit(formData as orderData);
      setIsFormOpen(false);
    } else if (formMode === "edit") {
      handleEditSubmit(formData as editOrderData);

      setIsFormOpen(false);
    }
    setIsFormOpen(false);
  };

  const handleDeleteDriver = (id: string) => {
    console.log("Deleting driver with ID:", id);
    deleteOrderMutation.mutateAsync(id);
    setShowDropdown(null);
  };

  return (
    <>
      <div className="toolbar">
        <div className="search_container">
          <Search className="search_icon" />
          <input
            type="text"
            placeholder="Search here..."
            value={search}
            onChange={handleSearchChange}
            className="search_input"
          />
        </div>
        <div className="filter_container">
          <button
            className="filter_button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            Filter
          </button>
          {isFilterOpen && (
            <div className="filter_dropdown">
              <div className="filter_dropdown_header">Filter by</div>
              <div
                className="filter_option"
                onClick={() => handleFilterChange("All")}
              >
                All
              </div>
              <div
                className="filter_option"
                onClick={() => handleFilterChange("complete")}
              >
                complete
              </div>
              <div
                className="filter_option"
                onClick={() => handleFilterChange("pending")}
              >
                pending
              </div>
            </div>
          )}
        </div>
        <button onClick={handleOpenForm} className="add_button">
          <PlusCircle className="add_icon" />
          Add New
        </button>
      </div>
      <Table data={filteredData} columns={trucksColumns} />
      {isFormOpen && (
        <OrdersForm
          onSubmit={handleSubmitForm}
          onClose={handleCloseForm}
          initialData={formMode === "edit" ? editData : null}
        />
      )}
    </>
  );
};

export default OrdersTable;
