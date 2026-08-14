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
  MoreVertical,
} from "lucide-react";

export interface FactoryRecord {
  factoryId: string;
  factoryCode: string;
  organizationCode: string;
  branchCode: string;
  branchHierarchyId: string;
  description: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  postalCodeId: string;
  phoneNumber: string;
  secondaryPhoneNumber: string;
  officePhoneNumber: string;
  personName: string;
  responsibleStaffId: string;
  numOfManPower: string;
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

const initialRecords: FactoryRecord[] = [
  {
    factoryId: "2",
    factoryCode: "FA001",
    organizationCode: "OR-001",
    branchCode: "BR001",
    branchHierarchyId: "4",
    description: "Test Descr...",
    addressLine1: "Address Li...",
    addressLine2: "Address Li...",
    addressLine3: "Address Li...",
    postalCodeId: "11222",
    phoneNumber: "0112454565",
    secondaryPhoneNumber: "0112454565",
    officePhoneNumber: "0112454565",
    personName: "Amal",
    responsibleStaffId: "1",
    numOfManPower: "1",
    machinePlanning: true,
    manpowerPlanning: false,
    mouldPlanning: true,
    resourcePlanning: false,
    status: "Inactive",
    createdBy: "Admin2",
    createdDateTime: "2025-02-26 , 06:02:98",
    updatedBy: "Admin2",
    updatedDateTime: "2025-02-26 , 06:02:98",
  },
  {
    factoryId: "3",
    factoryCode: "1230",
    organizationCode: "1",
    branchCode: "1",
    branchHierarchyId: "1",
    description: "1",
    addressLine1: "1",
    addressLine2: "1",
    addressLine3: "1",
    postalCodeId: "1",
    phoneNumber: "0748486955",
    secondaryPhoneNumber: "0748486955",
    officePhoneNumber: "0748486955",
    personName: "abc",
    responsibleStaffId: "1",
    numOfManPower: "100",
    machinePlanning: true,
    manpowerPlanning: true,
    mouldPlanning: true,
    resourcePlanning: true,
    status: "Inactive",
    createdBy: "Admin2",
    createdDateTime: "2025-03-21 , 07:03:05",
    updatedBy: "Admin2",
    updatedDateTime: "2025-03-21 , 07:03:05",
  },
  {
    factoryId: "4",
    factoryCode: "2",
    organizationCode: "2",
    branchCode: "2",
    branchHierarchyId: "2",
    description: "2",
    addressLine1: "2",
    addressLine2: "2",
    addressLine3: "2",
    postalCodeId: "1",
    phoneNumber: "1",
    secondaryPhoneNumber: "2",
    officePhoneNumber: "2",
    personName: "2",
    responsibleStaffId: "2",
    numOfManPower: "2",
    machinePlanning: true,
    manpowerPlanning: true,
    mouldPlanning: true,
    resourcePlanning: true,
    status: "Active",
    createdBy: "Admin2",
    createdDateTime: "2025-03-21 , 07:03:18",
    updatedBy: "Admin2",
    updatedDateTime: "2025-03-21 , 07:03:18",
  },
  {
    factoryId: "5",
    factoryCode: "7",
    organizationCode: "5",
    branchCode: "6",
    branchHierarchyId: "7",
    description: "8",
    addressLine1: "9",
    addressLine2: "7",
    addressLine3: "8",
    postalCodeId: "1",
    phoneNumber: "1",
    secondaryPhoneNumber: "6",
    officePhoneNumber: "7",
    personName: "8",
    responsibleStaffId: "9",
    numOfManPower: "8",
    machinePlanning: true,
    manpowerPlanning: true,
    mouldPlanning: true,
    resourcePlanning: true,
    status: "Active",
    createdBy: "Admin2",
    createdDateTime: "2025-03-21 , 07:03:18",
    updatedBy: "Admin2",
    updatedDateTime: "2025-03-21 , 07:03:18",
  },
  {
    factoryId: "6",
    factoryCode: "4",
    organizationCode: "2",
    branchCode: "3",
    branchHierarchyId: "4",
    description: "5",
    addressLine1: "6",
    addressLine2: "7",
    addressLine3: "8",
    postalCodeId: "1",
    phoneNumber: "0",
    secondaryPhoneNumber: "3",
    officePhoneNumber: "4",
    personName: "5",
    responsibleStaffId: "6",
    numOfManPower: "8",
    machinePlanning: true,
    manpowerPlanning: false,
    mouldPlanning: true,
    resourcePlanning: false,
    status: "Active",
    createdBy: "Admin2",
    createdDateTime: "2025-03-21 , 07:03:18",
    updatedBy: "Admin2",
    updatedDateTime: "2025-03-21 , 07:03:18",
  },
];

export function FactoryMasterWireframe() {
  const [records, setRecords] = useState<FactoryRecord[]>(initialRecords);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecordForView, setSelectedRecordForView] = useState<FactoryRecord | null>(null);
  const [editingRecord, setEditingRecord] = useState<FactoryRecord | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  // Form data state
  const [formData, setFormData] = useState<Partial<FactoryRecord>>({
    factoryId: "",
    factoryCode: "",
    organizationCode: "OR-001",
    branchCode: "BR001",
    branchHierarchyId: "1",
    description: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    postalCodeId: "",
    phoneNumber: "",
    secondaryPhoneNumber: "",
    officePhoneNumber: "",
    personName: "",
    responsibleStaffId: "1",
    numOfManPower: "0",
    machinePlanning: false,
    manpowerPlanning: false,
    mouldPlanning: false,
    resourcePlanning: false,
    status: "Active",
  });

  const filteredRecords = records.filter((rec) => {
    const query = searchQuery.toLowerCase();
    return (
      !query ||
      rec.factoryId.toLowerCase().includes(query) ||
      rec.factoryCode.toLowerCase().includes(query) ||
      rec.organizationCode.toLowerCase().includes(query) ||
      rec.description.toLowerCase().includes(query) ||
      rec.personName.toLowerCase().includes(query)
    );
  });

  const handleOpenAddModal = () => {
    const nextId = String(Math.max(...records.map((r) => Number(r.factoryId) || 0), 0) + 1);
    setEditingRecord(null);
    setFormData({
      factoryId: nextId,
      factoryCode: `FA00${nextId}`,
      organizationCode: "OR-001",
      branchCode: "BR001",
      branchHierarchyId: "1",
      description: "New Factory Site",
      addressLine1: "123 Main St",
      addressLine2: "Industrial Estate",
      addressLine3: "City",
      postalCodeId: "10000",
      phoneNumber: "0112345678",
      secondaryPhoneNumber: "",
      officePhoneNumber: "0112345679",
      personName: "John Doe",
      responsibleStaffId: "1",
      numOfManPower: "50",
      machinePlanning: true,
      manpowerPlanning: true,
      mouldPlanning: true,
      resourcePlanning: true,
      status: "Active",
    });
    setIsModalOpen(true);
    setActionMenuOpen(null);
  };

  const handleOpenEditModal = (rec: FactoryRecord) => {
    setEditingRecord(rec);
    setFormData(rec);
    setIsModalOpen(true);
    setActionMenuOpen(null);
  };

  const handleDeleteRecord = (id: string) => {
    if (confirm(`Are you sure you want to delete Factory ID ${id}?`)) {
      setRecords((prev) => prev.filter((r) => r.factoryId !== id));
    }
    setActionMenuOpen(null);
  };

  const handleSaveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const nowStr = new Date().toISOString().replace("T", " , ").substring(0, 21);

    if (editingRecord) {
      setRecords((prev) =>
        prev.map((r) =>
          r.factoryId === editingRecord.factoryId
            ? {
                ...(formData as FactoryRecord),
                updatedBy: "Admin2",
                updatedDateTime: nowStr,
              }
            : r,
        ),
      );
    } else {
      const newRec: FactoryRecord = {
        ...(formData as FactoryRecord),
        factoryId: formData.factoryId || String(records.length + 1),
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
      "Factory ID",
      "Factory Code",
      "Organization Code",
      "Branch Code",
      "Branch Hierarchy Id",
      "Description",
      "Address Line 1",
      "Address Line 2",
      "Address Line 3",
      "Postal Code Id",
      "Phone Number",
      "Secondary Phone Number",
      "Office Phone Number",
      "Person Name",
      "Responsible Staff Id",
      "Num of Man Power",
      "Machine Planning",
      "Manpower Planning",
      "Mould Planning",
      "Resource Planning",
      "Status",
      "Created by",
      "Created Date & Time",
      "Updated by",
      "Updated date & Time",
    ];

    const rows = filteredRecords.map((r) => [
      r.factoryId,
      r.factoryCode,
      r.organizationCode,
      r.branchCode,
      r.branchHierarchyId,
      r.description,
      r.addressLine1,
      r.addressLine2,
      r.addressLine3,
      r.postalCodeId,
      r.phoneNumber,
      r.secondaryPhoneNumber,
      r.officePhoneNumber,
      r.personName,
      r.responsibleStaffId,
      r.numOfManPower,
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
      `Factory_Master_Export_${new Date().toISOString().slice(0, 10)}.csv`,
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
            <Plus className="h-4 w-4 text-emerald-600" />
            <span>Add Factory</span>
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
                <th className="p-3.5 sm:p-4 font-semibold">Factory ID</th>
                <th className="p-3.5 sm:p-4 font-semibold">Factory Code</th>
                <th className="p-3.5 sm:p-4 font-semibold">Organization Code</th>
                <th className="p-3.5 sm:p-4 font-semibold">Branch Code</th>
                <th className="p-3.5 sm:p-4 font-semibold">Branch Hierarchy Id</th>
                <th className="p-3.5 sm:p-4 font-semibold">Description</th>
                <th className="p-3.5 sm:p-4 font-semibold">Address Line 1</th>
                <th className="p-3.5 sm:p-4 font-semibold">Address Line 2</th>
                <th className="p-3.5 sm:p-4 font-semibold">Address Line 3</th>
                <th className="p-3.5 sm:p-4 font-semibold">Postal Code Id</th>
                <th className="p-3.5 sm:p-4 font-semibold">Phone Number</th>
                <th className="p-3.5 sm:p-4 font-semibold">Secondary Phone...</th>
                <th className="p-3.5 sm:p-4 font-semibold">Office Phone Number</th>
                <th className="p-3.5 sm:p-4 font-semibold">Person Name</th>
                <th className="p-3.5 sm:p-4 font-semibold">Responsible Staff Id</th>
                <th className="p-3.5 sm:p-4 font-semibold">Num of Man Power</th>
                <th className="p-3.5 sm:p-4 font-semibold text-center">Line Planning</th>
                <th className="p-3.5 sm:p-4 font-semibold text-center">Manpower Planning</th>
                <th className="p-3.5 sm:p-4 font-semibold text-center">Mould Planning</th>
                <th className="p-3.5 sm:p-4 font-semibold text-center">Resource Planning</th>
                <th className="p-3.5 sm:p-4 font-semibold">Status</th>
                <th className="p-3.5 sm:p-4 font-semibold">Created by</th>
                <th className="p-3.5 sm:p-4 font-semibold">Created Date & Time</th>
                <th className="p-3.5 sm:p-4 font-semibold">Updated by</th>
                <th className="p-3.5 sm:p-4 font-semibold">Updated date & Time</th>
                <th className="p-3.5 sm:p-4 font-semibold text-center sticky right-0 bg-slate-50/80 dark:bg-slate-800/40 backdrop-blur w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-border/40 text-slate-700 dark:text-slate-200">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={26} className="p-8 text-center text-slate-400">
                    No factory records found.
                  </td>
                </tr>
              ) : (
                filteredRecords.slice(0, rowsPerPage).map((row) => (
                  <tr
                    key={row.factoryId}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors group relative"
                  >
                    <td className="p-3.5 sm:p-4 font-medium text-slate-900 dark:text-slate-100">
                      {row.factoryId}
                    </td>
                    <td className="p-3.5 sm:p-4 font-medium">{row.factoryCode}</td>
                    <td className="p-3.5 sm:p-4">{row.organizationCode}</td>
                    <td className="p-3.5 sm:p-4">{row.branchCode}</td>
                    <td className="p-3.5 sm:p-4">{row.branchHierarchyId}</td>
                    <td className="p-3.5 sm:p-4 text-slate-500 dark:text-slate-400 max-w-[150px] truncate">
                      {row.description}
                    </td>
                    <td className="p-3.5 sm:p-4 text-slate-500 dark:text-slate-400 max-w-[150px] truncate">
                      {row.addressLine1}
                    </td>
                    <td className="p-3.5 sm:p-4 text-slate-500 dark:text-slate-400 max-w-[150px] truncate">
                      {row.addressLine2}
                    </td>
                    <td className="p-3.5 sm:p-4 text-slate-500 dark:text-slate-400 max-w-[150px] truncate">
                      {row.addressLine3}
                    </td>
                    <td className="p-3.5 sm:p-4">{row.postalCodeId}</td>
                    <td className="p-3.5 sm:p-4">{row.phoneNumber}</td>
                    <td className="p-3.5 sm:p-4">{row.secondaryPhoneNumber}</td>
                    <td className="p-3.5 sm:p-4">{row.officePhoneNumber}</td>
                    <td className="p-3.5 sm:p-4 font-medium">{row.personName}</td>
                    <td className="p-3.5 sm:p-4">{row.responsibleStaffId}</td>
                    <td className="p-3.5 sm:p-4">{row.numOfManPower}</td>
                    <td className="p-3.5 sm:p-4 text-center">
                      {row.machinePlanning ? (
                        <Check className="h-4 w-4 text-slate-600 dark:text-slate-300 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-slate-300 dark:text-slate-600 mx-auto" />
                      )}
                    </td>
                    <td className="p-3.5 sm:p-4 text-center">
                      {row.manpowerPlanning ? (
                        <Check className="h-4 w-4 text-slate-600 dark:text-slate-300 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-slate-300 dark:text-slate-600 mx-auto" />
                      )}
                    </td>
                    <td className="p-3.5 sm:p-4 text-center">
                      {row.mouldPlanning ? (
                        <Check className="h-4 w-4 text-slate-600 dark:text-slate-300 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-slate-300 dark:text-slate-600 mx-auto" />
                      )}
                    </td>
                    <td className="p-3.5 sm:p-4 text-center">
                      {row.resourcePlanning ? (
                        <Check className="h-4 w-4 text-slate-600 dark:text-slate-300 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-slate-300 dark:text-slate-600 mx-auto" />
                      )}
                    </td>
                    <td className="p-3.5 sm:p-4 text-slate-700 dark:text-slate-300 font-medium">
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
                            setActionMenuOpen(
                              actionMenuOpen === row.factoryId ? null : row.factoryId,
                            )
                          }
                          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>

                        {actionMenuOpen === row.factoryId && (
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
                              onClick={() => handleDeleteRecord(row.factoryId)}
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-card border border-slate-200 dark:border-border/80 shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-150 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-border/60">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {editingRecord ? "Edit Factory Master" : "Add Factory Master"}
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
                    Factory ID
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.factoryId || ""}
                    onChange={(e) => setFormData({ ...formData, factoryId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Factory Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.factoryCode || ""}
                    onChange={(e) => setFormData({ ...formData, factoryCode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Organization Code
                  </label>
                  <input
                    type="text"
                    value={formData.organizationCode || ""}
                    onChange={(e) => setFormData({ ...formData, organizationCode: e.target.value })}
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
                  {editingRecord ? "Save Changes" : "Create Factory"}
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
                Factory Details — #{selectedRecordForView.factoryId}
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
                  <p className="text-[10px] text-slate-400 font-medium">Factory Code</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.factoryCode}
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
                  <span className="text-slate-400 font-medium">Person Name</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.personName}
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
                  <span className="text-slate-400 font-medium">Phone Number</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.phoneNumber}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-border/40 pb-1.5">
                  <span className="text-slate-400 font-medium">Description</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.description}
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
