import { useState } from "react";
import {
  FileSpreadsheet,
  Plus,
  Search,
  Edit2,
  Trash2,
  X as CloseIcon,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Eye,
} from "lucide-react";

export interface ProductionLineRecord {
  machineId: string;
  organizationCode: string;
  branchCode: string;
  machineCode: string;
  machineName: string;
  machineSerial: string;
  lastMaintenance: string;
  nextMaintenance: string;
  efficiency: string;
  machineIdleCost: string;
  minOperators: string;
  maxOperators: string;
  factoryId: string;
  buildingId: string;
  floorId: string;
  lineId: string;
  purchasePrice: string;
  machineSetupTime: string;
  machineDownTime: string;
  isUnderMaintenance: boolean;
  isAvailable: boolean;
  status: "Active" | "Inactive";
  createdBy: string;
  createdDateTime: string;
  updatedBy: string;
  updatedDateTime: string;
}

const initialRecords: ProductionLineRecord[] = [
  {
    machineId: "2010",
    organizationCode: "OR-001",
    branchCode: "BR001",
    machineCode: "RAIN/PL/01",
    machineName: "Sewing Line 01 - Rainwear & Umbrellas",
    machineSerial: "SEC-A1",
    lastMaintenance: "2026-03-01",
    nextMaintenance: "2026-04-15",
    efficiency: "92",
    machineIdleCost: "0.00",
    minOperators: "12",
    maxOperators: "24",
    factoryId: "9",
    buildingId: "1",
    floorId: "2",
    lineId: "1",
    purchasePrice: "150000",
    machineSetupTime: "30 min",
    machineDownTime: "0 min",
    isUnderMaintenance: false,
    isAvailable: true,
    status: "Active",
    createdBy: "Admin2",
    createdDateTime: "2025-02-26 , 07:02:40",
    updatedBy: "",
    updatedDateTime: "2026-03-21 , 04:03:15",
  },
  {
    machineId: "2011",
    organizationCode: "OR-001",
    branchCode: "BR001",
    machineCode: "RAIN/PL/02",
    machineName: "Automated Waterproof Fabric Cutting Line 02",
    machineSerial: "SEC-B1",
    lastMaintenance: "2026-02-15",
    nextMaintenance: "2026-03-30",
    efficiency: "98",
    machineIdleCost: "0.00",
    minOperators: "4",
    maxOperators: "8",
    factoryId: "9",
    buildingId: "1",
    floorId: "1",
    lineId: "2",
    purchasePrice: "220000",
    machineSetupTime: "15 min",
    machineDownTime: "0 min",
    isUnderMaintenance: false,
    isAvailable: true,
    status: "Active",
    createdBy: "Admin2",
    createdDateTime: "2025-01-18 , 09:01:25",
    updatedBy: "",
    updatedDateTime: "2026-01-23 , 05:01:20",
  },
  {
    machineId: "2012",
    organizationCode: "OR-001",
    branchCode: "BR001",
    machineCode: "RAIN/PL/03",
    machineName: "Heat Sealing & Assembly Line 03",
    machineSerial: "SEC-C1",
    lastMaintenance: "2026-01-10",
    nextMaintenance: "2026-03-20",
    efficiency: "88",
    machineIdleCost: "1.50",
    minOperators: "8",
    maxOperators: "16",
    factoryId: "9",
    buildingId: "2",
    floorId: "1",
    lineId: "3",
    purchasePrice: "180000",
    machineSetupTime: "20 min",
    machineDownTime: "10 min",
    isUnderMaintenance: false,
    isAvailable: true,
    status: "Active",
    createdBy: "Admin2",
    createdDateTime: "2025-01-23 , 07:01:40",
    updatedBy: "",
    updatedDateTime: "2026-02-13 , 08:02:13",
  },
];

export function ProductionLineMasterWireframe() {
  const [records, setRecords] = useState<ProductionLineRecord[]>(initialRecords);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecordForView, setSelectedRecordForView] = useState<ProductionLineRecord | null>(
    null,
  );
  const [editingRecord, setEditingRecord] = useState<ProductionLineRecord | null>(null);

  // Form data state
  const [formData, setFormData] = useState<Partial<ProductionLineRecord>>({
    machineId: "",
    organizationCode: "OR-001",
    branchCode: "BR001",
    machineCode: "",
    machineName: "",
    machineSerial: "",
    lastMaintenance: "",
    nextMaintenance: "",
    efficiency: "100",
    machineIdleCost: "0",
    minOperators: "1",
    maxOperators: "1",
    factoryId: "0",
    buildingId: "0",
    floorId: "0",
    lineId: "1",
    purchasePrice: "0",
    machineSetupTime: "0",
    machineDownTime: "0",
    isUnderMaintenance: false,
    isAvailable: true,
    status: "Active",
  });

  const filteredRecords = records.filter((rec) => {
    const query = searchQuery.toLowerCase();
    return (
      !query ||
      rec.machineId.toLowerCase().includes(query) ||
      rec.machineCode.toLowerCase().includes(query) ||
      rec.machineName.toLowerCase().includes(query) ||
      rec.organizationCode.toLowerCase().includes(query)
    );
  });

  const handleOpenAddModal = () => {
    const nextId = String(Math.max(...records.map((r) => Number(r.machineId) || 0), 0) + 1);
    setEditingRecord(null);
    setFormData({
      machineId: nextId,
      organizationCode: "OR-001",
      branchCode: "BR001",
      machineCode: `RAIN/PL/0${nextId}`,
      machineName: "New Production Line",
      machineSerial: `SEC-${nextId}`,
      lastMaintenance: "",
      nextMaintenance: "",
      efficiency: "90",
      machineIdleCost: "0.00",
      minOperators: "10",
      maxOperators: "20",
      factoryId: "1",
      buildingId: "1",
      floorId: "1",
      lineId: nextId,
      purchasePrice: "100000",
      machineSetupTime: "15 min",
      machineDownTime: "0 min",
      isUnderMaintenance: false,
      isAvailable: true,
      status: "Active",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (rec: ProductionLineRecord) => {
    setEditingRecord(rec);
    setFormData(rec);
    setIsModalOpen(true);
  };

  const handleDeleteRecord = (id: string) => {
    if (confirm(`Are you sure you want to delete Production Line ID ${id}?`)) {
      setRecords((prev) => prev.filter((r) => r.machineId !== id));
    }
  };

  const handleSaveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const nowStr = new Date().toISOString().replace("T", " , ").substring(0, 21);

    if (editingRecord) {
      setRecords((prev) =>
        prev.map((r) =>
          r.machineId === editingRecord.machineId
            ? {
                ...(formData as ProductionLineRecord),
                updatedBy: "Admin2",
                updatedDateTime: nowStr,
              }
            : r,
        ),
      );
    } else {
      const newRec: ProductionLineRecord = {
        ...(formData as ProductionLineRecord),
        machineId: formData.machineId || String(records.length + 1),
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
      "Line ID",
      "Organization Code",
      "Branch Code",
      "Line Code",
      "Line / Production Section",
      "Line Reference / Section",
      "Last Maintenance",
      "Next Maintenance",
      "Line Capacity / Efficiency",
      "Line Idle Cost",
      "Minimum Operators",
      "Maximum Operators",
      "Factory ID",
      "Building ID",
      "Floor ID",
      "Production Line Ref ID",
      "Investment / Value",
      "Line Changeover / Style Changeover",
      "Line Downtime / Constraint",
      "is_under_maintenance",
      "is_available",
      "Status",
      "Created by",
      "Created Date & Time",
      "Updated by",
      "Updated Date & Time",
    ];

    const rows = filteredRecords.map((r) => [
      r.machineId,
      r.organizationCode,
      r.branchCode,
      r.machineCode,
      r.machineName,
      r.machineSerial,
      r.lastMaintenance,
      r.nextMaintenance,
      r.efficiency,
      r.machineIdleCost,
      r.minOperators,
      r.maxOperators,
      r.factoryId,
      r.buildingId,
      r.floorId,
      r.lineId,
      r.purchasePrice,
      r.machineSetupTime,
      r.machineDownTime,
      r.isUnderMaintenance ? "Yes" : "No",
      r.isAvailable ? "Yes" : "No",
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
      `Production_Line_Master_Export_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search production lines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-border/60 bg-white dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500 w-48 sm:w-64"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-border/70 bg-white dark:bg-card text-slate-800 dark:text-slate-100 font-bold text-xs shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4 text-emerald-600" />
            <span>Add Production Line</span>
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

      {/* Main Table Container */}
      <div className="rounded-2xl border border-slate-100 dark:border-border/60 bg-white dark:bg-card overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-100 dark:border-border/50">
                <th className="p-3.5 sm:p-4 font-semibold">Line ID</th>
                <th className="p-3.5 sm:p-4 font-semibold">Organization Code</th>
                <th className="p-3.5 sm:p-4 font-semibold">Branch Code</th>
                <th className="p-3.5 sm:p-4 font-semibold">Line Code</th>
                <th className="p-3.5 sm:p-4 font-semibold">Line / Production Section</th>
                <th className="p-3.5 sm:p-4 font-semibold">Line Ref / Section</th>
                <th className="p-3.5 sm:p-4 font-semibold">Last Maintenance</th>
                <th className="p-3.5 sm:p-4 font-semibold">Next Maintenance</th>
                <th className="p-3.5 sm:p-4 font-semibold">Line Capacity / Efficiency</th>
                <th className="p-3.5 sm:p-4 font-semibold">Line Idle Cost</th>
                <th className="p-3.5 sm:p-4 font-semibold">Minimum Operators</th>
                <th className="p-3.5 sm:p-4 font-semibold">Maximum Operators</th>
                <th className="p-3.5 sm:p-4 font-semibold">Factory ID</th>
                <th className="p-3.5 sm:p-4 font-semibold">Building ID</th>
                <th className="p-3.5 sm:p-4 font-semibold">Floor ID</th>
                <th className="p-3.5 sm:p-4 font-semibold">Production Line Ref</th>
                <th className="p-3.5 sm:p-4 font-semibold">Purchase Price</th>
                <th className="p-3.5 sm:p-4 font-semibold">Line Changeover / Style Changeover</th>
                <th className="p-3.5 sm:p-4 font-semibold">Line Downtime / Constraint</th>
                <th className="p-3.5 sm:p-4 font-semibold text-center">is_under_maintenance</th>
                <th className="p-3.5 sm:p-4 font-semibold text-center">is_available</th>
                <th className="p-3.5 sm:p-4 font-semibold">Status</th>
                <th className="p-3.5 sm:p-4 font-semibold">Created by</th>
                <th className="p-3.5 sm:p-4 font-semibold">Created Date & Time</th>
                <th className="p-3.5 sm:p-4 font-semibold">Updated by</th>
                <th className="p-3.5 sm:p-4 font-semibold">Updated Date & Time</th>
                <th className="p-3.5 sm:p-4 font-semibold text-center sticky right-0 bg-slate-50/80 dark:bg-slate-800/40 backdrop-blur">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-border/40 text-slate-700 dark:text-slate-200">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={27} className="p-8 text-center text-slate-400">
                    No production line records found matching your search.
                  </td>
                </tr>
              ) : (
                filteredRecords.slice(0, rowsPerPage).map((row) => (
                  <tr
                    key={row.machineId}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="p-3.5 sm:p-4 font-medium text-slate-900 dark:text-slate-100">
                      {row.machineId}
                    </td>
                    <td className="p-3.5 sm:p-4">{row.organizationCode}</td>
                    <td className="p-3.5 sm:p-4">{row.branchCode}</td>
                    <td className="p-3.5 sm:p-4 font-medium">{row.machineCode}</td>
                    <td className="p-3.5 sm:p-4 font-medium">{row.machineName}</td>
                    <td className="p-3.5 sm:p-4">{row.machineSerial}</td>
                    <td className="p-3.5 sm:p-4 text-slate-500 dark:text-slate-400">
                      {row.lastMaintenance}
                    </td>
                    <td className="p-3.5 sm:p-4 text-slate-500 dark:text-slate-400">
                      {row.nextMaintenance}
                    </td>
                    <td className="p-3.5 sm:p-4">{row.efficiency}%</td>
                    <td className="p-3.5 sm:p-4">{row.machineIdleCost}</td>
                    <td className="p-3.5 sm:p-4">{row.minOperators}</td>
                    <td className="p-3.5 sm:p-4">{row.maxOperators}</td>
                    <td className="p-3.5 sm:p-4">{row.factoryId}</td>
                    <td className="p-3.5 sm:p-4">{row.buildingId}</td>
                    <td className="p-3.5 sm:p-4">{row.floorId}</td>
                    <td className="p-3.5 sm:p-4">{row.lineId}</td>
                    <td className="p-3.5 sm:p-4">{row.purchasePrice}</td>
                    <td className="p-3.5 sm:p-4">{row.machineSetupTime}</td>
                    <td className="p-3.5 sm:p-4">{row.machineDownTime}</td>
                    <td className="p-3.5 sm:p-4 text-center">
                      {row.isUnderMaintenance ? (
                        <Check className="h-4 w-4 text-emerald-500 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-slate-300 dark:text-slate-600 mx-auto" />
                      )}
                    </td>
                    <td className="p-3.5 sm:p-4 text-center">
                      {row.isAvailable ? (
                        <Check className="h-4 w-4 text-emerald-500 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-slate-300 dark:text-slate-600 mx-auto" />
                      )}
                    </td>
                    <td className="p-3.5 sm:p-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${row.status === "Active" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3.5 sm:p-4">{row.createdBy}</td>
                    <td className="p-3.5 sm:p-4 text-slate-500 dark:text-slate-400">
                      {row.createdDateTime}
                    </td>
                    <td className="p-3.5 sm:p-4">{row.updatedBy}</td>
                    <td className="p-3.5 sm:p-4 text-slate-500 dark:text-slate-400">
                      {row.updatedDateTime}
                    </td>
                    <td className="p-3.5 sm:p-4 text-center sticky right-0 bg-white/90 dark:bg-card/90 backdrop-blur group-hover:bg-slate-50/90 dark:group-hover:bg-slate-800/90 transition-colors">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setSelectedRecordForView(row)}
                          className="p-1 rounded text-slate-400 hover:text-sky-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="View Record"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(row)}
                          className="p-1 rounded text-slate-400 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteRecord(row.machineId)}
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
          <div className="flex items-center gap-1">
            <button disabled className="p-1 text-slate-300 dark:text-slate-600 cursor-not-allowed">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button disabled className="p-1 text-slate-300 dark:text-slate-600 cursor-not-allowed">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add / Edit Production Line Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-card border border-slate-200 dark:border-border/80 shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-150 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-border/60">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {editingRecord ? "Edit Production Line Master" : "Add Production Line Master"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRecord} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Line ID
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.machineId || ""}
                    onChange={(e) => setFormData({ ...formData, machineId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Line Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.machineCode || ""}
                    onChange={(e) => setFormData({ ...formData, machineCode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Line / Production Section Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.machineName || ""}
                    onChange={(e) => setFormData({ ...formData, machineName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Line Changeover / Style Changeover
                  </label>
                  <input
                    type="text"
                    value={formData.machineSetupTime || ""}
                    onChange={(e) => setFormData({ ...formData, machineSetupTime: e.target.value })}
                    placeholder="e.g. 20 min"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Line Downtime / Line Constraint
                  </label>
                  <input
                    type="text"
                    value={formData.machineDownTime || ""}
                    onChange={(e) => setFormData({ ...formData, machineDownTime: e.target.value })}
                    placeholder="e.g. 0 min"
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

              {/* Modal Actions */}
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
                  {editingRecord ? "Save Changes" : "Create Production Line"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {selectedRecordForView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-card border border-slate-200 dark:border-border/80 shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-border/60">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Production Line Details — #{selectedRecordForView.machineId}
              </h3>
              <button
                onClick={() => setSelectedRecordForView(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900">
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Line Code</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.machineCode}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Status</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.status}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 h-64 overflow-y-auto pr-2">
                <div className="flex justify-between border-b border-slate-100 dark:border-border/40 pb-1.5">
                  <span className="text-slate-400 font-medium">Line / Section Name</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.machineName}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-border/40 pb-1.5">
                  <span className="text-slate-400 font-medium">Line Reference</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.machineSerial}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-border/40 pb-1.5">
                  <span className="text-slate-400 font-medium">Line / Style Changeover</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.machineSetupTime}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-border/40 pb-1.5">
                  <span className="text-slate-400 font-medium">Line Downtime / Constraint</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.machineDownTime}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-border/40 pb-1.5">
                  <span className="text-slate-400 font-medium">Organization Code</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.organizationCode}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-border/40 pb-1.5">
                  <span className="text-slate-400 font-medium">Branch Code</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.branchCode}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-border/40 pb-1.5">
                  <span className="text-slate-400 font-medium">Line Capacity / Efficiency</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.efficiency}%
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-border/60 flex justify-end">
              <button
                onClick={() => setSelectedRecordForView(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
