import { useState } from "react";
import {
  FileSpreadsheet,
  Plus,
  Edit2,
  Trash2,
  X as CloseIcon,
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreVertical,
} from "lucide-react";

export interface ShiftRecord {
  shiftId: string;
  organizationCode: string;
  branchCode: string;
  shiftCode: string;
  shiftName: string;
  factoryId: string;
  buildingId: string;
  floorId: string;
  startTime: string;
  endTime: string;
  nextDay: string;
  totalMinutes: string;
  dayTypeId: string;
  dayTypeName: string;
  status: "Active" | "Inactive";
  createdBy: string;
  createdDateTime: string;
  updatedBy: string;
  updatedDateTime: string;
}

const initialRecords: ShiftRecord[] = [
  {
    shiftId: "1",
    organizationCode: "1",
    branchCode: "1",
    shiftCode: "SHIFT1",
    shiftName: "Shift 1",
    factoryId: "1",
    buildingId: "1",
    floorId: "1",
    startTime: "00:00:00",
    endTime: "06:59:59",
    nextDay: "0",
    totalMinutes: "420",
    dayTypeId: "1",
    dayTypeName: "1",
    status: "Active",
    createdBy: "",
    createdDateTime: "2024-12-05 , 12:12:88",
    updatedBy: "",
    updatedDateTime: "2024-12-05 , 12:12:88",
  },
  {
    shiftId: "2",
    organizationCode: "1",
    branchCode: "1",
    shiftCode: "SHIFT2",
    shiftName: "Shift 2",
    factoryId: "1",
    buildingId: "1",
    floorId: "1",
    startTime: "07:00:00",
    endTime: "18:59:59",
    nextDay: "0",
    totalMinutes: "720",
    dayTypeId: "1",
    dayTypeName: "1",
    status: "Active",
    createdBy: "",
    createdDateTime: "2024-12-05 , 12:12:88",
    updatedBy: "",
    updatedDateTime: "2024-12-06 , 04:12:67",
  },
  {
    shiftId: "3",
    organizationCode: "1",
    branchCode: "1",
    shiftCode: "SHIFT2",
    shiftName: "Shift 3",
    factoryId: "1",
    buildingId: "1",
    floorId: "1",
    startTime: "19:00:00",
    endTime: "23:59:59",
    nextDay: "0",
    totalMinutes: "300",
    dayTypeId: "1",
    dayTypeName: "1",
    status: "Active",
    createdBy: "",
    createdDateTime: "2024-12-05 , 12:12:88",
    updatedBy: "",
    updatedDateTime: "2025-01-21 , 05:01:39",
  },
];

export function ShiftMasterWireframe() {
  const [records, setRecords] = useState<ShiftRecord[]>(initialRecords);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecordForView, setSelectedRecordForView] = useState<ShiftRecord | null>(null);
  const [editingRecord, setEditingRecord] = useState<ShiftRecord | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<ShiftRecord>>({
    shiftId: "",
    shiftCode: "",
    shiftName: "",
    startTime: "",
    endTime: "",
    status: "Active",
  });

  const handleOpenAddModal = () => {
    const nextId = String(Math.max(...records.map((r) => Number(r.shiftId) || 0), 0) + 1);
    setEditingRecord(null);
    setFormData({
      shiftId: nextId,
      organizationCode: "1",
      branchCode: "1",
      shiftCode: `SHIFT${nextId}`,
      shiftName: `Shift ${nextId}`,
      factoryId: "1",
      buildingId: "1",
      floorId: "1",
      startTime: "00:00:00",
      endTime: "08:00:00",
      nextDay: "0",
      totalMinutes: "480",
      dayTypeId: "1",
      dayTypeName: "1",
      status: "Active",
    });
    setIsModalOpen(true);
    setActionMenuOpen(null);
  };

  const handleOpenEditModal = (rec: ShiftRecord) => {
    setEditingRecord(rec);
    setFormData(rec);
    setIsModalOpen(true);
    setActionMenuOpen(null);
  };

  const handleDeleteRecord = (id: string) => {
    if (confirm(`Are you sure you want to delete Shift ID ${id}?`)) {
      setRecords((prev) => prev.filter((r) => r.shiftId !== id));
    }
    setActionMenuOpen(null);
  };

  const handleSaveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const nowStr = new Date().toISOString().replace("T", " , ").substring(0, 21);

    if (editingRecord) {
      setRecords((prev) =>
        prev.map((r) =>
          r.shiftId === editingRecord.shiftId
            ? {
                ...(formData as ShiftRecord),
                updatedBy: "Admin",
                updatedDateTime: nowStr,
              }
            : r,
        ),
      );
    } else {
      const newRec: ShiftRecord = {
        ...(formData as ShiftRecord),
        shiftId: formData.shiftId || String(records.length + 1),
        createdBy: "Admin",
        createdDateTime: nowStr,
        updatedBy: "",
        updatedDateTime: "",
      } as ShiftRecord;
      setRecords((prev) => [newRec, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleExportCSV = () => {
    const headers = [
      "Shift Id",
      "Organization Code",
      "Branch Code",
      "Shift Code",
      "Shift Name",
      "Factory Id",
      "Building Id",
      "Floor Id",
      "Start Time",
      "End Time",
      "Next Day",
      "Total Minutes",
      "Day Type ID",
      "Day Type Name",
      "Status",
      "Created by",
      "Created Date & Time",
      "Updated by",
      "Updated date & Time",
    ];

    const rows = records.map((r) => [
      r.shiftId,
      r.organizationCode,
      r.branchCode,
      r.shiftCode,
      r.shiftName,
      r.factoryId,
      r.buildingId,
      r.floorId,
      r.startTime,
      r.endTime,
      r.nextDay,
      r.totalMinutes,
      r.dayTypeId,
      r.dayTypeName,
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
      `Shift_Master_Export_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Actions Bar */}
      <div className="flex items-center justify-end gap-4">
        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-border/70 bg-white dark:bg-card text-slate-800 dark:text-slate-100 font-bold text-xs shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <span>Add Shift</span>
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
                <th className="p-3.5 sm:p-4 font-semibold">Shift Id</th>
                <th className="p-3.5 sm:p-4 font-semibold">Organization Code</th>
                <th className="p-3.5 sm:p-4 font-semibold">Branch Code</th>
                <th className="p-3.5 sm:p-4 font-semibold">Shift Code</th>
                <th className="p-3.5 sm:p-4 font-semibold">Shift Name</th>
                <th className="p-3.5 sm:p-4 font-semibold">Factory Id</th>
                <th className="p-3.5 sm:p-4 font-semibold">Building Id</th>
                <th className="p-3.5 sm:p-4 font-semibold">Floor Id</th>
                <th className="p-3.5 sm:p-4 font-semibold">Start Time</th>
                <th className="p-3.5 sm:p-4 font-semibold">End Time</th>
                <th className="p-3.5 sm:p-4 font-semibold">Next Day</th>
                <th className="p-3.5 sm:p-4 font-semibold">Total Minutes</th>
                <th className="p-3.5 sm:p-4 font-semibold">Day Type ID</th>
                <th className="p-3.5 sm:p-4 font-semibold">Day Type Name</th>
                <th className="p-3.5 sm:p-4 font-semibold">Status</th>
                <th className="p-3.5 sm:p-4 font-semibold">Created by</th>
                <th className="p-3.5 sm:p-4 font-semibold">Created Date & Time</th>
                <th className="p-3.5 sm:p-4 font-semibold">Updated by</th>
                <th className="p-3.5 sm:p-4 font-semibold">Updated date & Time</th>
                <th className="p-3.5 sm:p-4 font-semibold text-center sticky right-0 bg-slate-50/80 dark:bg-slate-800/40 backdrop-blur w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-border/40 text-slate-700 dark:text-slate-200">
              {records.length === 0 ? (
                <tr>
                  <td colSpan={20} className="p-8 text-center text-slate-400">
                    No shift records found.
                  </td>
                </tr>
              ) : (
                records.slice(0, rowsPerPage).map((row) => (
                  <tr
                    key={row.shiftId}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors group relative"
                  >
                    <td className="p-3.5 sm:p-4 font-medium text-slate-900 dark:text-slate-100">
                      {row.shiftId}
                    </td>
                    <td className="p-3.5 sm:p-4">{row.organizationCode}</td>
                    <td className="p-3.5 sm:p-4">{row.branchCode}</td>
                    <td className="p-3.5 sm:p-4">{row.shiftCode}</td>
                    <td className="p-3.5 sm:p-4">{row.shiftName}</td>
                    <td className="p-3.5 sm:p-4">{row.factoryId}</td>
                    <td className="p-3.5 sm:p-4">{row.buildingId}</td>
                    <td className="p-3.5 sm:p-4">{row.floorId}</td>
                    <td className="p-3.5 sm:p-4">{row.startTime}</td>
                    <td className="p-3.5 sm:p-4">{row.endTime}</td>
                    <td className="p-3.5 sm:p-4">{row.nextDay}</td>
                    <td className="p-3.5 sm:p-4">{row.totalMinutes}</td>
                    <td className="p-3.5 sm:p-4">{row.dayTypeId}</td>
                    <td className="p-3.5 sm:p-4">{row.dayTypeName}</td>
                    <td className="p-3.5 sm:p-4 text-slate-700 dark:text-slate-300">
                      {row.status}
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
                      <div className="relative flex justify-center">
                        <button
                          onClick={() =>
                            setActionMenuOpen(actionMenuOpen === row.shiftId ? null : row.shiftId)
                          }
                          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>

                        {actionMenuOpen === row.shiftId && (
                          <div className="absolute right-8 top-0 mt-0 w-32 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-100">
                            <button
                              onClick={() => {
                                setSelectedRecordForView(row);
                                setActionMenuOpen(null);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                            >
                              <Eye className="h-3.5 w-3.5 text-slate-400" />
                              View
                            </button>
                            <button
                              onClick={() => handleOpenEditModal(row)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                            >
                              <Edit2 className="h-3.5 w-3.5 text-slate-400" />
                              Edit
                            </button>
                            <div className="h-px bg-slate-100 dark:bg-slate-700/50 my-1"></div>
                            <button
                              onClick={() => handleDeleteRecord(row.shiftId)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </button>
                          </div>
                        )}
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
            1-{Math.min(records.length, rowsPerPage)} of {records.length}
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-card border border-slate-200 dark:border-border/80 shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-150 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-border/60">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {editingRecord ? "Edit Shift Master" : "Add Shift Master"}
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
                    Shift ID
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.shiftId || ""}
                    onChange={(e) => setFormData({ ...formData, shiftId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Shift Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.shiftCode || ""}
                    onChange={(e) => setFormData({ ...formData, shiftCode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Shift Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.shiftName || ""}
                    onChange={(e) => setFormData({ ...formData, shiftName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Start Time
                  </label>
                  <input
                    type="text"
                    placeholder="HH:MM:SS"
                    required
                    value={formData.startTime || ""}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    End Time
                  </label>
                  <input
                    type="text"
                    placeholder="HH:MM:SS"
                    required
                    value={formData.endTime || ""}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
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
                  {editingRecord ? "Save Changes" : "Create Shift"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {selectedRecordForView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-card border border-slate-200 dark:border-border/80 shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-border/60">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Shift Details — #{selectedRecordForView.shiftId}
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
                  <p className="text-[10px] text-slate-400 font-medium">Shift Code</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.shiftCode}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Status</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.status}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between border-b border-slate-100 dark:border-border/40 pb-1.5">
                  <span className="text-slate-400 font-medium">Shift Name</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.shiftName}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-border/40 pb-1.5">
                  <span className="text-slate-400 font-medium">Start Time</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.startTime}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-border/40 pb-1.5">
                  <span className="text-slate-400 font-medium">End Time</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.endTime}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-border/40 pb-1.5">
                  <span className="text-slate-400 font-medium">Total Minutes</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.totalMinutes}
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
