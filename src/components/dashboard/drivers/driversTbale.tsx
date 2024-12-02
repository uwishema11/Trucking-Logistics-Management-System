"use client";
import React, { useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { Search, PlusCircle } from "lucide-react";
import { MoreHorizontal } from "lucide-react";

import useDriver from "@/hooks/drivers/useDriver";
import { useGetDrivers } from "@/hooks/drivers/useGetDrivers";
import { driverData, editDriverData } from "@/types/driver";

import Table from "../Table";
import DriverForm from "./driverForm";

import "@/styles/tableStyles.scss";

const DriversTable = () => {
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [editData, setEditData] = useState<editDriverData | null>(null);

  const { handleAddSubmit, handleEditSubmit, deleteDriverMutation } =
    useDriver();

  const { isLoading, isError, data, error } = useGetDrivers();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <span>{error.message}</span>;

  const trucksColumns: ColumnDef<driverData>[] = [
    { accessorKey: "id", header: "Driver-ID" },
    { accessorKey: "name", header: "Driver-Name" },
    { accessorKey: "assigned_truck", header: "Assigned_Truck-ID" },
    { accessorKey: "contact_number", header: "Contact_number" },
    { accessorKey: "status", header: "Status" },
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

  const filteredData = data.filter((driver: driverData) => {
    const matchesSearch = driver.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter === "All" || driver.status === filter;
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

  const handleSubmitForm = (formData: driverData | editDriverData) => {
    console.log("gello");
    if (formMode === "add") {
      handleAddSubmit(formData as driverData);
      setIsFormOpen(false);
    } else if (formMode === "edit") {
      handleEditSubmit(formData as editDriverData);
      setIsFormOpen(false);
    }
    setIsFormOpen(false);
  };

  const handleDeleteDriver = (id: string) => {
    console.log("Deleting driver with ID:", id);
    deleteDriverMutation.mutateAsync(id);
    setShowDropdown(null);
  };

  return (
    <>
      <div className="toolbar">
        <div className="search_container">
          <Search className="search_icon" />
          <input
            type="text"
            placeholder="Search by driver's name..."
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
                onClick={() => handleFilterChange("Available")}
              >
                Available
              </div>
              <div
                className="filter_option"
                onClick={() => handleFilterChange("Delivering")}
              >
                Delivering
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
        <DriverForm
          onSubmit={handleSubmitForm}
          onClose={handleCloseForm}
          initialData={formMode === "edit" ? editData : null}
        />
      )}
    </>
  );
};

export default DriversTable;
