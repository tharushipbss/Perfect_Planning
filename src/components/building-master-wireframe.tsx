import { useState } from "react";
import {
  Check,
  X,
  FileSpreadsheet,
  Plus,
  Search,
  Edit2,
  Trash2,
  X as CloseIcon,
} from "lucide-react";

export interface BuildingRecord {
  buildingId: string;
  factoryId: string;
  organizationId: string;
  branchCode: string;
  code: string;
  description: string;
  personName: string;
  responsibleStaffId: string;
  numManpower: number;
  machinePlanning: boolean;
  manpowerPlanning: boolean;
  mouldPlanning: boolean;
  resourcePlanning: boolean;
  status: "Active" | "Inactive";
  createdBy: string;
  createdDateTime: string;
  updatedBy: string;
  updatedDateTime: string;
}

const initialBuildingRecords: BuildingRecord[] = [
  {
    buildingId: "3",
    factoryId: "1",
    organizationId: "1",
    branchCode: "1",
    code: "1230",
    description: "1",
    personName: "abc",
    responsibleStaffId: "210",
    numManpower: 100,
    machinePlanning: true,
    manpowerPlanning: true,
    mouldPlanning: true,
    resourcePlanning: true,
    status: "Active",
    createdBy: "Admin2",
    createdDateTime: "2025-03-21 , 07:03:14",
    updatedBy: "Admin2",
    updatedDateTime: "2025-04-04 , 05:04:32",
  },
  {
    buildingId: "5",
    factoryId: "4",
    organizationId: "5",
    branchCode: "6",
    code: "7",
    description: "8",
    personName: "9",
    responsibleStaffId: "7",
    numManpower: 8,
    machinePlanning: true,
    manpowerPlanning: true,
    mouldPlanning: true,
    resourcePlanning: true,
    status: "Inactive",
    createdBy: "Admin2",
    createdDateTime: "2025-03-21 , 07:03:49",
    updatedBy: "",
    updatedDateTime: "2025-04-04 , 05:04:32",
  },
  {
    buildingId: "6",
    factoryId: "1",
    organizationId: "5",
    branchCode: "2",
    code: "8",
    description: "2",
    personName: "2",
    responsibleStaffId: "2",
    numManpower: 2,
    machinePlanning: true,
    manpowerPlanning: true,
    mouldPlanning: true,
    resourcePlanning: true,
    status: "Inactive",
    createdBy: "Admin2",
    createdDateTime: "2025-03-21 , 07:03:50",
    updatedBy: "",
    updatedDateTime: "2025-04-04 , 05:04:32",
  },
  {
    buildingId: "4",
    factoryId: "1",
    organizationId: "2",
    branchCode: "3",
    code: "4",
    description: "5",
    personName: "6",
    responsibleStaffId: "7",
    numManpower: 8,
    machinePlanning: true,
    manpowerPlanning: false,
    mouldPlanning: false,
    resourcePlanning: false,
    status: "Inactive",
    createdBy: "Admin2",
    createdDateTime: "2025-03-21 , 07:03:45",
    updatedBy: "Admin2",
    updatedDateTime: "2025-04-04 , 05:04:93",
  },
  {
    buildingId: "2",
    factoryId: "6",
    organizationId: "OR-001",
    branchCode: "BR001",
    code: "BU-001",
    description: "Test Descr...",
    personName: "Amal",
    responsibleStaffId: "3",
    numManpower: 3,
    machinePlanning: true,
    manpowerPlanning: false,
    mouldPlanning: true,
    resourcePlanning: false,
    status: "Active",
    createdBy: "Admin2",
    createdDateTime: "2025-02-26 , 04:02:73",
    updatedBy: "Admin2",
    updatedDateTime: "2025-04-07 , 09:04:71",
  },
  {
    buildingId: "7",
    factoryId: "2",
    organizationId: "2",
    branchCode: "2",
    code: "2",
    description: "2",
    personName: "2",
    responsibleStaffId: "2",
    numManpower: 2,
    machinePlanning: true,
    manpowerPlanning: true,
    mouldPlanning: true,
    resourcePlanning: true,
    status: "Active",
    createdBy: "Admin2",
    createdDateTime: "2025-03-21 , 07:03:50",
    updatedBy: "Admin2",
    updatedDateTime: "2025-04-08 , 05:04:94",
  },
];

export function BuildingMasterWireframe() {
  const [records, setRecords] = useState<BuildingRecord[]>(initialBuildingRecords);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState<BuildingRecord | null>(null);

  // Form fields state
  const [formData, setFormData] = useState<Partial<BuildingRecord>>({
    buildingId: "",
    factoryId: "1",
    organizationId: "OR-001",
    branchCode: "BR001",
    code: "",
    description: "",
    personName: "",
    responsibleStaffId: "",
    numManpower: 10,
    machinePlanning: true,
    manpowerPlanning: true,
    mouldPlanning: true,
    resourcePlanning: true,
    status: "Active",
  });

  const filteredRecords = records.filter((rec) => {
    const matchesStatus = statusFilter === "All" || rec.status === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      !query ||
      rec.buildingId.toLowerCase().includes(query) ||
      rec.code.toLowerCase().includes(query) ||
      rec.description.toLowerCase().includes(query) ||
      rec.personName.toLowerCase().includes(query) ||
      rec.organizationId.toLowerCase().includes(query) ||
      rec.branchCode.toLowerCase().includes(query);
    return matchesStatus && matchesQuery;
  });

  const handleOpenAddModal = () => {
    const nextId = String(Math.max(...records.map((r) => Number(r.buildingId) || 0), 0) + 1);
    setEditingBuilding(null);
    setFormData({
      buildingId: nextId,
      factoryId: "1",
      organizationId: "OR-001",
      branchCode: "BR001",
      code: `BU-00${nextId}`,
      description: "New Building Facility",
      personName: "Supervisor",
      responsibleStaffId: "101",
      numManpower: 25,
      machinePlanning: true,
      manpowerPlanning: true,
      mouldPlanning: true,
      resourcePlanning: true,
      status: "Active",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (rec: BuildingRecord) => {
    setEditingBuilding(rec);
    setFormData(rec);
    setIsModalOpen(true);
  };

  const handleDeleteRecord = (id: string) => {
    if (confirm(`Are you sure you want to delete Building ID ${id}?`)) {
      setRecords((prev) => prev.filter((r) => r.buildingId !== id));
    }
  };

  const handleSaveBuilding = (e: React.FormEvent) => {
    e.preventDefault();
    const nowStr = new Date().toISOString().replace("T", " , ").substring(0, 21);

    if (editingBuilding) {
      setRecords((prev) =>
        prev.map((r) =>
          r.buildingId === editingBuilding.buildingId
            ? {
                ...(formData as BuildingRecord),
                updatedBy: "Admin2",
                updatedDateTime: nowStr,
              }
            : r,
        ),
      );
    } else {
      const newRec: BuildingRecord = {
        ...(formData as BuildingRecord),
        buildingId: formData.buildingId || String(records.length + 1),
        createdBy: "Admin2",
        createdDateTime: nowStr,
        updatedBy: "Admin2",
        updatedDateTime: nowStr,
      };
      setRecords((prev) => [newRec, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleExportCSV = () => {
    const headers = [
      "Building ID",
      "Factory ID",
      "Organization ID",
      "Branch Code",
      "Code",
      "Description",
      "Person Name",
      "Responsible Staff ID",
      "Num of Man Power",
      "Machine Planning",
      "Manpower Planning",
      "Mould Planning",
      "Resource Planning",
      "Status",
      "Created By",
      "Created Date & Time",
      "Updated By",
      "Updated Date & Time",
    ];

    const rows = filteredRecords.map((r) => [
      r.buildingId,
      r.factoryId,
      r.organizationId,
      r.branchCode,
      r.code,
      r.description,
      r.personName,
      r.responsibleStaffId,
      r.numManpower,
      r.machinePlanning ? "Yes" : "No",
      r.manpowerPlanning ? "Yes" : "No",
      r.mouldPlanning ? "Yes" : "No",
      r.resourcePlanning ? "Yes" : "No",
      r.status,
      r.createdBy,
      r.createdDateTime,
      r.updatedBy,
      r.updatedDateTime,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join(
        "\n",
      );

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Building_Master_Export_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search buildings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-border/60 bg-white dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500 w-48 sm:w-64"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "All" | "Active" | "Inactive")}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-border/60 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active Only</option>
            <option value="Inactive">Inactive Only</option>
          </select>
        </div>

        {/* Top Action Bar with Add Building Button & Excel Export */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-border/70 bg-white dark:bg-card text-slate-800 dark:text-slate-100 font-bold text-xs shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4 text-emerald-600" />
            <span>Add Building</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="p-2 rounded-xl border border-slate-200 dark:border-border/70 bg-white dark:bg-card text-emerald-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer shadow-2xs"
            title="Export to Excel / CSV"
          >
            <FileSpreadsheet className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {/* Main Building Master Scrollable Table Container */}
      <div className="rounded-2xl border border-slate-100 dark:border-border/60 bg-white dark:bg-card overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-100 dark:border-border/50">
                <th className="p-3.5 sm:p-4 font-semibold">Building ID</th>
                <th className="p-3.5 sm:p-4 font-semibold">Factory ID</th>
                <th className="p-3.5 sm:p-4 font-semibold">Organization ID</th>
                <th className="p-3.5 sm:p-4 font-semibold">Branch Code</th>
                <th className="p-3.5 sm:p-4 font-semibold">Code</th>
                <th className="p-3.5 sm:p-4 font-semibold">Description</th>
                <th className="p-3.5 sm:p-4 font-semibold">Person Name</th>
                <th className="p-3.5 sm:p-4 font-semibold">Responsible Staff ID</th>
                <th className="p-3.5 sm:p-4 font-semibold">Num of Man Power</th>
                <th className="p-3.5 sm:p-4 font-semibold text-center">Machine Planning</th>
                <th className="p-3.5 sm:p-4 font-semibold text-center">Manpower Planning</th>
                <th className="p-3.5 sm:p-4 font-semibold text-center">Mould Planning</th>
                <th className="p-3.5 sm:p-4 font-semibold text-center">Resource Planning</th>
                <th className="p-3.5 sm:p-4 font-semibold">Status</th>
                <th className="p-3.5 sm:p-4 font-semibold">Created by</th>
                <th className="p-3.5 sm:p-4 font-semibold">Created Date & Time</th>
                <th className="p-3.5 sm:p-4 font-semibold">Updated by</th>
                <th className="p-3.5 sm:p-4 font-semibold">Updated Date & Time</th>
                <th className="p-3.5 sm:p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-border/40 text-slate-700 dark:text-slate-200">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={19} className="p-8 text-center text-slate-400">
                    No building records found matching your search.
                  </td>
                </tr>
              ) : (
                filteredRecords.slice(0, rowsPerPage).map((row) => (
                  <tr
                    key={row.buildingId}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="p-3.5 sm:p-4 font-medium text-slate-900 dark:text-slate-100">
                      {row.buildingId}
                    </td>
                    <td className="p-3.5 sm:p-4">{row.factoryId}</td>
                    <td className="p-3.5 sm:p-4">{row.organizationId}</td>
                    <td className="p-3.5 sm:p-4">{row.branchCode}</td>
                    <td className="p-3.5 sm:p-4 font-medium">{row.code}</td>
                    <td className="p-3.5 sm:p-4">{row.description}</td>
                    <td className="p-3.5 sm:p-4">{row.personName}</td>
                    <td className="p-3.5 sm:p-4">{row.responsibleStaffId}</td>
                    <td className="p-3.5 sm:p-4 font-medium">{row.numManpower}</td>

                    {/* Machine Planning */}
                    <td className="p-3.5 sm:p-4 text-center">
                      {row.machinePlanning ? (
                        <Check className="h-4 w-4 text-slate-600 dark:text-slate-300 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-slate-400 mx-auto" />
                      )}
                    </td>

                    {/* Manpower Planning */}
                    <td className="p-3.5 sm:p-4 text-center">
                      {row.manpowerPlanning ? (
                        <Check className="h-4 w-4 text-slate-600 dark:text-slate-300 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-slate-400 mx-auto" />
                      )}
                    </td>

                    {/* Mould Planning */}
                    <td className="p-3.5 sm:p-4 text-center">
                      {row.mouldPlanning ? (
                        <Check className="h-4 w-4 text-slate-600 dark:text-slate-300 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-slate-400 mx-auto" />
                      )}
                    </td>

                    {/* Resource Planning */}
                    <td className="p-3.5 sm:p-4 text-center">
                      {row.resourcePlanning ? (
                        <Check className="h-4 w-4 text-slate-600 dark:text-slate-300 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-slate-400 mx-auto" />
                      )}
                    </td>

                    {/* Status */}
                    <td className="p-3.5 sm:p-4 font-medium">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                          row.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>

                    <td className="p-3.5 sm:p-4 text-slate-600 dark:text-slate-300">
                      {row.createdBy}
                    </td>
                    <td className="p-3.5 sm:p-4 text-slate-500 dark:text-slate-400">
                      {row.createdDateTime}
                    </td>
                    <td className="p-3.5 sm:p-4 text-slate-600 dark:text-slate-300">
                      {row.updatedBy || "-"}
                    </td>
                    <td className="p-3.5 sm:p-4 text-slate-500 dark:text-slate-400">
                      {row.updatedDateTime}
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 sm:p-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(row)}
                          className="p-1 rounded text-slate-400 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteRecord(row.buildingId)}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination Bar */}
        <div className="flex items-center justify-end gap-6 px-6 py-3 border-t border-slate-100 dark:border-border/50 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="bg-transparent font-semibold text-slate-800 dark:text-slate-200 outline-none cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div>
            1-{Math.min(filteredRecords.length, rowsPerPage)} of {filteredRecords.length}
          </div>
        </div>
      </div>

      {/* Add / Edit Building Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-card border border-slate-200 dark:border-border/80 shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-150 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-border/60">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {editingBuilding ? "Edit Building Master" : "Add Building Master"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBuilding} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Building ID
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.buildingId || ""}
                    onChange={(e) => setFormData({ ...formData, buildingId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Building Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code || ""}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Factory ID
                  </label>
                  <input
                    type="text"
                    value={formData.factoryId || ""}
                    onChange={(e) => setFormData({ ...formData, factoryId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Organization ID
                  </label>
                  <input
                    type="text"
                    value={formData.organizationId || ""}
                    onChange={(e) => setFormData({ ...formData, organizationId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Branch Code
                  </label>
                  <input
                    type="text"
                    value={formData.branchCode || ""}
                    onChange={(e) => setFormData({ ...formData, branchCode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Person Name
                  </label>
                  <input
                    type="text"
                    value={formData.personName || ""}
                    onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Responsible Staff ID
                  </label>
                  <input
                    type="text"
                    value={formData.responsibleStaffId || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, responsibleStaffId: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Num of Man Power
                  </label>
                  <input
                    type="number"
                    value={formData.numManpower || 0}
                    onChange={(e) =>
                      setFormData({ ...formData, numManpower: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status || "Active"}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as "Active" | "Inactive" })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Planning Checkboxes */}
              <div className="pt-2 border-t border-slate-100 dark:border-border/60">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                  Planning Capabilities
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.machinePlanning || false}
                      onChange={(e) =>
                        setFormData({ ...formData, machinePlanning: e.target.checked })
                      }
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Machine Planning</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.manpowerPlanning || false}
                      onChange={(e) =>
                        setFormData({ ...formData, manpowerPlanning: e.target.checked })
                      }
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Manpower Planning</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.mouldPlanning || false}
                      onChange={(e) =>
                        setFormData({ ...formData, mouldPlanning: e.target.checked })
                      }
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Mould Planning</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.resourcePlanning || false}
                      onChange={(e) =>
                        setFormData({ ...formData, resourcePlanning: e.target.checked })
                      }
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Resource Planning</span>
                  </label>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-border/60">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  {editingBuilding ? "Save Changes" : "Create Building"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
