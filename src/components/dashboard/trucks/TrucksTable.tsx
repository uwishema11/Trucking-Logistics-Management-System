"use client";
import React, { useState } from "react";
import { Search, PlusCircle, IdCardIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useTruck } from "@/hooks/drivers/useTruck";
import { truckData, editTruckData } from "@/types/truck";
import { MoreHorizontal } from "lucide-react";
import Table from "../ReusableTable";
import TruckForm from "./TruckFom";
import useCreateTruck from "@/hooks/trucks/useTruckMutation";
import "./Trucks.scss";

const Trucks = () => {
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [editData, setEditData] = useState<editTruckData | null>(null);

  const { handleAddSubmit, handleEditSubmit, deleteTruckMutation } =
    useCreateTruck();

  const { isLoading, isError, data, error } = useTruck();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <span>{error.message}</span>;

  const trucksColumns: ColumnDef<truckData>[] = [
    { accessorKey: "id", header: "Truck-ID" },
    { accessorKey: "plate_number", header: "Plate-Number" },
    { accessorKey: "capacity", header: "Truck-Capacity" },
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
                  <a onClick={() => handleDeleteTruck(row.original.id)}>
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

  const filteredData = data.filter((truck: truckData) => {
    const matchesSearch = truck.plate_number
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter === "All" || truck.status === filter;
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

  const openFormForEdit = (truck: truckData) => {
    setFormMode("edit");
    setEditData(truck);
    setIsFormOpen(true);
    setShowDropdown(null);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditData(null);
  };

  const handleSubmitForm = (formData: truckData | editTruckData) => {
    if (formMode === "add") {
      console.log("Adding truck:", formData as truckData);
      handleAddSubmit(formData);
    } else if (formMode === "edit") {
      handleEditSubmit(formData);
      console.log("Editing truck:", formData as editTruckData);
    }
    setIsFormOpen(false);
  };

  const handleDeleteTruck = (id: string) => {
    console.log("Deleting truck with ID:", id);
    deleteTruckMutation.mutateAsync(id)
    setShowDropdown(null);
    // Call API or mutation to delete truck
  };

  return (
    <>
      <div className="toolbar">
        <div className="search_container">
          <Search className="search_icon" />
          <input
            type="text"
            placeholder="Search..."
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
        <TruckForm
          onSubmit={handleSubmitForm}
          onClose={handleCloseForm}
          initialData={formMode === "edit" ? editData : null}
        />
      )}
    </>
  );
};

export default Trucks;
