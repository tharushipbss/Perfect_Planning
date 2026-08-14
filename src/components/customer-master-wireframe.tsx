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
  Users,
  Building2,
  Eye,
} from "lucide-react";

export interface CustomerRecord {
  customerId: string;
  organizationId: string;
  branchCode: string;
  customerCode: string;
  customerType: string;
  customerName: string;
  customerDescription: string;
  displayName: string;
  secondaryName: string;
  address: string;
  status: "Active" | "Inactive";
  createdBy: string;
  createdDateTime: string;
  updatedBy: string;
  updatedDateTime: string;
}

const initialCustomerRecords: CustomerRecord[] = [
  {
    customerId: "2",
    organizationId: "OR-001",
    branchCode: "BR001",
    customerCode: "CU001",
    customerType: "Vendor",
    customerName: "Amal",
    customerDescription: "Test Descr...",
    displayName: "Amal Pere...",
    secondaryName: "Perera",
    address: "No.111, Ka...",
    status: "Active",
    createdBy: "Admin2",
    createdDateTime: "2025-02-26 , 04:02:73",
    updatedBy: "Admin2",
    updatedDateTime: "2025-04-07 , 09:04:71",
  },
  {
    customerId: "3",
    organizationId: "OR-001",
    branchCode: "BR001",
    customerCode: "CU002",
    customerType: "Distributor",
    customerName: "Saman",
    customerDescription: "Industrial Plastics Ltd",
    displayName: "Saman Perera",
    secondaryName: "Saman Distributors",
    address: "No.45, Main St, Colombo",
    status: "Active",
    createdBy: "Admin2",
    createdDateTime: "2025-03-01 , 08:12:10",
    updatedBy: "Admin2",
    updatedDateTime: "2025-04-08 , 11:20:00",
  },
  {
    customerId: "4",
    organizationId: "OR-002",
    branchCode: "BR002",
    customerCode: "CU003",
    customerType: "Direct Client",
    customerName: "Nimal",
    customerDescription: "Pipes & Fittings Enterprise",
    displayName: "Nimal Fernando",
    secondaryName: "Nimal Enterprises",
    address: "No.88, Station Rd, Kandy",
    status: "Active",
    createdBy: "Admin2",
    createdDateTime: "2025-03-05 , 10:15:30",
    updatedBy: "",
    updatedDateTime: "2025-04-08 , 11:20:00",
  },
];

export function CustomerMasterWireframe() {
  const [records, setRecords] = useState<CustomerRecord[]>(initialCustomerRecords);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecordForView, setSelectedRecordForView] = useState<CustomerRecord | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<CustomerRecord | null>(null);

  // Form data state
  const [formData, setFormData] = useState<Partial<CustomerRecord>>({
    customerId: "",
    organizationId: "OR-001",
    branchCode: "BR001",
    customerCode: "",
    customerType: "Vendor",
    customerName: "",
    customerDescription: "",
    displayName: "",
    secondaryName: "",
    address: "",
    status: "Active",
  });

  const filteredRecords = records.filter((rec) => {
    const query = searchQuery.toLowerCase();
    const matchesType = typeFilter === "All" || rec.customerType === typeFilter;
    return (
      matchesType &&
      (!query ||
        rec.customerId.toLowerCase().includes(query) ||
        rec.customerCode.toLowerCase().includes(query) ||
        rec.customerName.toLowerCase().includes(query) ||
        rec.displayName.toLowerCase().includes(query) ||
        rec.organizationId.toLowerCase().includes(query) ||
        rec.branchCode.toLowerCase().includes(query))
    );
  });

  const totalCount = records.length;
  const vendorCount = records.filter((r) => r.customerType === "Vendor").length;
  const distributorCount = records.filter((r) => r.customerType === "Distributor").length;

  const handleOpenAddModal = () => {
    const nextId = String(Math.max(...records.map((r) => Number(r.customerId) || 0), 0) + 1);
    setEditingCustomer(null);
    setFormData({
      customerId: nextId,
      organizationId: "OR-001",
      branchCode: "BR001",
      customerCode: `CU00${nextId}`,
      customerType: "Vendor",
      customerName: "Kamal",
      customerDescription: "New Client Account",
      displayName: "Kamal Silva",
      secondaryName: "Silva Hardware",
      address: "No.12, Galle Rd, Panadura",
      status: "Active",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (rec: CustomerRecord) => {
    setEditingCustomer(rec);
    setFormData(rec);
    setIsModalOpen(true);
  };

  const handleDeleteRecord = (id: string) => {
    if (confirm(`Are you sure you want to delete Customer ID ${id}?`)) {
      setRecords((prev) => prev.filter((r) => r.customerId !== id));
    }
  };

  const handleSaveCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const nowStr = new Date().toISOString().replace("T", " , ").substring(0, 21);

    if (editingCustomer) {
      setRecords((prev) =>
        prev.map((r) =>
          r.customerId === editingCustomer.customerId
            ? {
                ...(formData as CustomerRecord),
                updatedBy: "Admin2",
                updatedDateTime: nowStr,
              }
            : r,
        ),
      );
    } else {
      const newRec: CustomerRecord = {
        ...(formData as CustomerRecord),
        customerId: formData.customerId || String(records.length + 1),
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
      "Customer ID",
      "Organization ID",
      "Branch Code",
      "Customer Code",
      "Customer Type",
      "Customer Name",
      "Customer Description",
      "Display Name",
      "Secondary Name",
      "Address",
      "Status",
      "Created By",
      "Created Date & Time",
      "Updated By",
      "Updated Date & Time",
    ];

    const rows = filteredRecords.map((r) => [
      r.customerId,
      r.organizationId,
      r.branchCode,
      r.customerCode,
      r.customerType,
      r.customerName,
      r.customerDescription,
      r.displayName,
      r.secondaryName,
      r.address,
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
      `Customer_Master_Export_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-100 dark:border-border/60 bg-white dark:bg-card p-4 shadow-2xs flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 shrink-0">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400">Total Customers</p>
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{totalCount}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 dark:border-border/60 bg-white dark:bg-card p-4 shadow-2xs flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 shrink-0">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400">Vendors</p>
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{vendorCount}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 dark:border-border/60 bg-white dark:bg-card p-4 shadow-2xs flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 shrink-0">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400">Distributors</p>
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {distributorCount}
            </p>
          </div>
        </div>
      </div>

      {/* Top Header Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-border/60 bg-white dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500 w-44 sm:w-60"
            />
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-border/60 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
          >
            <option value="All">All Types</option>
            <option value="Vendor">Vendor</option>
            <option value="Distributor">Distributor</option>
            <option value="Direct Client">Direct Client</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-border/70 bg-white dark:bg-card text-slate-800 dark:text-slate-100 font-bold text-xs shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4 text-emerald-600" />
            <span>Add Customer</span>
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
                <th className="p-3.5 sm:p-4 font-semibold">Customer ID</th>
                <th className="p-3.5 sm:p-4 font-semibold">Organization ID</th>
                <th className="p-3.5 sm:p-4 font-semibold">Branch Code</th>
                <th className="p-3.5 sm:p-4 font-semibold">Customer Code</th>
                <th className="p-3.5 sm:p-4 font-semibold">Customer Type</th>
                <th className="p-3.5 sm:p-4 font-semibold">Customer Name</th>
                <th className="p-3.5 sm:p-4 font-semibold">Customer Description</th>
                <th className="p-3.5 sm:p-4 font-semibold">Display Name</th>
                <th className="p-3.5 sm:p-4 font-semibold">Secondary Name</th>
                <th className="p-3.5 sm:p-4 font-semibold">Address</th>
                <th className="p-3.5 sm:p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-border/40 text-slate-700 dark:text-slate-200">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={11} className="p-8 text-center text-slate-400">
                    No customer records found matching your search.
                  </td>
                </tr>
              ) : (
                filteredRecords.slice(0, rowsPerPage).map((row) => (
                  <tr
                    key={row.customerId}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="p-3.5 sm:p-4 font-medium text-slate-900 dark:text-slate-100">
                      {row.customerId}
                    </td>
                    <td className="p-3.5 sm:p-4">{row.organizationId}</td>
                    <td className="p-3.5 sm:p-4">{row.branchCode}</td>
                    <td className="p-3.5 sm:p-4 font-medium">{row.customerCode}</td>
                    <td className="p-3.5 sm:p-4">{row.customerType}</td>
                    <td className="p-3.5 sm:p-4 font-semibold text-slate-900 dark:text-slate-100">
                      {row.customerName}
                    </td>
                    <td className="p-3.5 sm:p-4 text-slate-500 dark:text-slate-400">
                      {row.customerDescription}
                    </td>
                    <td className="p-3.5 sm:p-4 font-medium">{row.displayName}</td>
                    <td className="p-3.5 sm:p-4">{row.secondaryName}</td>
                    <td className="p-3.5 sm:p-4 text-slate-600 dark:text-slate-300">
                      {row.address}
                    </td>
                    <td className="p-3.5 sm:p-4 text-center">
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
                          onClick={() => handleDeleteRecord(row.customerId)}
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

      {/* Add / Edit Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-card border border-slate-200 dark:border-border/80 shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-150 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-border/60">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {editingCustomer ? "Edit Customer Master" : "Add Customer Master"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCustomer} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Customer ID
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerId || ""}
                    onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Customer Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerCode || ""}
                    onChange={(e) => setFormData({ ...formData, customerCode: e.target.value })}
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
                    Customer Type
                  </label>
                  <select
                    value={formData.customerType || "Vendor"}
                    onChange={(e) => setFormData({ ...formData, customerType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  >
                    <option value="Vendor">Vendor</option>
                    <option value="Distributor">Distributor</option>
                    <option value="Direct Client">Direct Client</option>
                    <option value="Retailer">Retailer</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName || ""}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={formData.displayName || ""}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Secondary Name
                  </label>
                  <input
                    type="text"
                    value={formData.secondaryName || ""}
                    onChange={(e) => setFormData({ ...formData, secondaryName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Customer Description
                </label>
                <input
                  type="text"
                  value={formData.customerDescription || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, customerDescription: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Address
                </label>
                <textarea
                  rows={2}
                  value={formData.address || ""}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500 resize-none"
                />
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
                  {editingCustomer ? "Save Changes" : "Create Customer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Drawer Modal */}
      {selectedRecordForView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-card border border-slate-200 dark:border-border/80 shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-border/60">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Customer Details — #{selectedRecordForView.customerId}
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
                  <p className="text-[10px] text-slate-400 font-medium">Customer Code</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.customerCode}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Customer Type</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.customerType}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between border-b border-slate-100 dark:border-border/40 pb-1.5">
                  <span className="text-slate-400 font-medium">Customer Name</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.customerName}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-border/40 pb-1.5">
                  <span className="text-slate-400 font-medium">Display Name</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.displayName}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-border/40 pb-1.5">
                  <span className="text-slate-400 font-medium">Secondary Name</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.secondaryName}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-border/40 pb-1.5">
                  <span className="text-slate-400 font-medium">Organization ID</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.organizationId}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-border/40 pb-1.5">
                  <span className="text-slate-400 font-medium">Branch Code</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.branchCode}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-border/40 pb-1.5">
                  <span className="text-slate-400 font-medium">Address</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.address}
                  </span>
                </div>
                <div className="flex justify-between pb-1.5">
                  <span className="text-slate-400 font-medium">Created Date</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.createdDateTime}
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
