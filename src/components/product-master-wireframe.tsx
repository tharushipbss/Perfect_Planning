import { useState } from "react";
import {
  FileSpreadsheet,
  Plus,
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

export interface ProductRecord {
  productId: string;
  organizationCode: string;
  branchCode: string;
  productCode: string;
  description: string;
  unitTypeId: string;
  uomId: string;
  productTypeId: string;
  stockLevel: string;
  quantityAvailable: string;
  minQty: string;
  maxQty: string;
  serviceItem: boolean;
  serialItem: boolean;
  warehouseItem: boolean;
  productIdParent: string;
  costingMethodId: string;
  isFixedPrice: boolean;
  retailPrice1: string;
  retailPrice2: string;
  wholesalePrice1: string;
  wholesalePrice2: string;
  defaultVendorId: string;
  purchasePrice1: string;
  purchasePrice2: string;
  productSequence: string;
  status: "Active" | "Inactive";
  mouldMerge: boolean;
  createdBy: string;
  createDateTime: string;
  updatedBy: string;
  updatedDateTime: string;
}

const initialRecords: ProductRecord[] = [
  {
    productId: "1482",
    organizationCode: "1",
    branchCode: "",
    productCode: "11016",
    description: "I-PIPE ST18",
    unitTypeId: "9",
    uomId: "19",
    productTypeId: "15",
    stockLevel: "100",
    quantityAvailable: "",
    minQty: "",
    maxQty: "",
    serviceItem: false,
    serialItem: false,
    warehouseItem: false,
    productIdParent: "",
    costingMethodId: "",
    isFixedPrice: false,
    retailPrice1: "",
    retailPrice2: "",
    wholesalePrice1: "",
    wholesalePrice2: "",
    defaultVendorId: "",
    purchasePrice1: "",
    purchasePrice2: "",
    productSequence: "",
    status: "Active",
    mouldMerge: false,
    createdBy: "",
    createDateTime: "2024-12-09 , 14:12...",
    updatedBy: "",
    updatedDateTime: "2026-03-23 , 15:...",
  },
  {
    productId: "188",
    organizationCode: "1",
    branchCode: "",
    productCode: "10182",
    description: "LUBRICANT",
    unitTypeId: "9",
    uomId: "19",
    productTypeId: "15",
    stockLevel: "100",
    quantityAvailable: "1927.42",
    minQty: "",
    maxQty: "",
    serviceItem: false,
    serialItem: false,
    warehouseItem: false,
    productIdParent: "",
    costingMethodId: "",
    isFixedPrice: false,
    retailPrice1: "",
    retailPrice2: "",
    wholesalePrice1: "",
    wholesalePrice2: "",
    defaultVendorId: "",
    purchasePrice1: "",
    purchasePrice2: "",
    productSequence: "",
    status: "Active",
    mouldMerge: false,
    createdBy: "",
    createDateTime: "2024-12-09 , 14:12...",
    updatedBy: "",
    updatedDateTime: "2026-03-23 , 15:...",
  },
  {
    productId: "79",
    organizationCode: "1",
    branchCode: "",
    productCode: "100701",
    description: "ELBOW 16...",
    unitTypeId: "9",
    uomId: "19",
    productTypeId: "15",
    stockLevel: "100",
    quantityAvailable: "",
    minQty: "",
    maxQty: "",
    serviceItem: false,
    serialItem: false,
    warehouseItem: false,
    productIdParent: "",
    costingMethodId: "",
    isFixedPrice: false,
    retailPrice1: "",
    retailPrice2: "",
    wholesalePrice1: "",
    wholesalePrice2: "",
    defaultVendorId: "",
    purchasePrice1: "",
    purchasePrice2: "",
    productSequence: "",
    status: "Active",
    mouldMerge: false,
    createdBy: "",
    createDateTime: "2024-12-09 , 14:12...",
    updatedBy: "",
    updatedDateTime: "2026-03-23 , 15:...",
  },
  {
    productId: "2217",
    organizationCode: "1",
    branchCode: "",
    productCode: "103609",
    description: "SOCKET 9...",
    unitTypeId: "9",
    uomId: "19",
    productTypeId: "15",
    stockLevel: "100",
    quantityAvailable: "10",
    minQty: "",
    maxQty: "",
    serviceItem: false,
    serialItem: false,
    warehouseItem: false,
    productIdParent: "",
    costingMethodId: "",
    isFixedPrice: false,
    retailPrice1: "",
    retailPrice2: "",
    wholesalePrice1: "",
    wholesalePrice2: "",
    defaultVendorId: "",
    purchasePrice1: "",
    purchasePrice2: "",
    productSequence: "",
    status: "Active",
    mouldMerge: false,
    createdBy: "",
    createDateTime: "2025-11-08 , 07:11:...",
    updatedBy: "",
    updatedDateTime: "2026-03-23 , 15:...",
  },
  {
    productId: "1465",
    organizationCode: "1",
    branchCode: "",
    productCode: "75585",
    description: '"AGRO PI...',
    unitTypeId: "9",
    uomId: "19",
    productTypeId: "15",
    stockLevel: "100",
    quantityAvailable: "",
    minQty: "",
    maxQty: "",
    serviceItem: false,
    serialItem: false,
    warehouseItem: false,
    productIdParent: "",
    costingMethodId: "",
    isFixedPrice: false,
    retailPrice1: "",
    retailPrice2: "",
    wholesalePrice1: "",
    wholesalePrice2: "",
    defaultVendorId: "",
    purchasePrice1: "",
    purchasePrice2: "",
    productSequence: "",
    status: "Active",
    mouldMerge: false,
    createdBy: "",
    createDateTime: "2024-12-09 , 14:12...",
    updatedBy: "",
    updatedDateTime: "2026-03-23 , 15:...",
  },
  {
    productId: "1711",
    organizationCode: "1",
    branchCode: "",
    productCode: "10730",
    description: "FRAME 27...",
    unitTypeId: "9",
    uomId: "19",
    productTypeId: "15",
    stockLevel: "100",
    quantityAvailable: "430",
    minQty: "",
    maxQty: "",
    serviceItem: false,
    serialItem: false,
    warehouseItem: false,
    productIdParent: "",
    costingMethodId: "",
    isFixedPrice: false,
    retailPrice1: "",
    retailPrice2: "",
    wholesalePrice1: "",
    wholesalePrice2: "",
    defaultVendorId: "",
    purchasePrice1: "",
    purchasePrice2: "",
    productSequence: "",
    status: "Active",
    mouldMerge: false,
    createdBy: "",
    createDateTime: "2024-12-09 , 14:12...",
    updatedBy: "",
    updatedDateTime: "2026-03-23 , 15:...",
  },
];

export function ProductMasterWireframe() {
  const [records, setRecords] = useState<ProductRecord[]>(initialRecords);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecordForView, setSelectedRecordForView] = useState<ProductRecord | null>(null);
  const [editingRecord, setEditingRecord] = useState<ProductRecord | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  // Form data state
  const [formData, setFormData] = useState<Partial<ProductRecord>>({
    productId: "",
    productCode: "",
    description: "",
    status: "Active",
  });

  const handleOpenAddModal = () => {
    const nextId = String(Math.max(...records.map((r) => Number(r.productId) || 0), 0) + 1);
    setEditingRecord(null);
    setFormData({
      productId: nextId,
      productCode: `PRD-${nextId}`,
      description: "New Product",
      status: "Active",
      organizationCode: "1",
      unitTypeId: "9",
      uomId: "19",
      productTypeId: "15",
      stockLevel: "100",
      serviceItem: false,
      serialItem: false,
      warehouseItem: false,
      isFixedPrice: false,
      mouldMerge: false,
    });
    setIsModalOpen(true);
    setActionMenuOpen(null);
  };

  const handleOpenEditModal = (rec: ProductRecord) => {
    setEditingRecord(rec);
    setFormData(rec);
    setIsModalOpen(true);
    setActionMenuOpen(null);
  };

  const handleDeleteRecord = (id: string) => {
    if (confirm(`Are you sure you want to delete Product ID ${id}?`)) {
      setRecords((prev) => prev.filter((r) => r.productId !== id));
    }
    setActionMenuOpen(null);
  };

  const handleSaveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const nowStr = new Date().toISOString().replace("T", " , ").substring(0, 21);

    if (editingRecord) {
      setRecords((prev) =>
        prev.map((r) =>
          r.productId === editingRecord.productId
            ? {
                ...(formData as ProductRecord),
                updatedBy: "Admin",
                updatedDateTime: nowStr,
              }
            : r,
        ),
      );
    } else {
      const newRec: ProductRecord = {
        ...(formData as ProductRecord),
        productId: formData.productId || String(records.length + 1),
        createdBy: "Admin",
        createDateTime: nowStr,
        updatedBy: "",
        updatedDateTime: "",
      } as ProductRecord;
      setRecords((prev) => [newRec, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleExportCSV = () => {
    const headers = [
      "Product ID",
      "Organization Code",
      "Branch Code",
      "Product Code",
      "Description",
      "Unit Type Id",
      "UOM Id",
      "Product Type Id",
      "Stock Level",
      "Quantity Available",
      "Min Qty.",
      "Max Qty.",
      "Status",
    ];

    const rows = records.map((r) => [
      r.productId,
      r.organizationCode,
      r.branchCode,
      r.productCode,
      r.description,
      r.unitTypeId,
      r.uomId,
      r.productTypeId,
      r.stockLevel,
      r.quantityAvailable,
      r.minQty,
      r.maxQty,
      r.status,
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
      `Product_Master_Export_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderBooleanIcon = (val: boolean) => {
    return val ? (
      <Check className="h-4 w-4 text-slate-600 dark:text-slate-300 mx-auto" />
    ) : (
      <X className="h-4 w-4 text-slate-300 dark:text-slate-600 mx-auto" />
    );
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
            <span>Add Product</span>
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
                <th className="p-3.5 sm:p-4 font-semibold">Product ID</th>
                <th className="p-3.5 sm:p-4 font-semibold">Organization Code</th>
                <th className="p-3.5 sm:p-4 font-semibold">Branch Code</th>
                <th className="p-3.5 sm:p-4 font-semibold">Product Code</th>
                <th className="p-3.5 sm:p-4 font-semibold">Description</th>
                <th className="p-3.5 sm:p-4 font-semibold">Unit Type Id</th>
                <th className="p-3.5 sm:p-4 font-semibold">UOM Id</th>
                <th className="p-3.5 sm:p-4 font-semibold">Product Type Id</th>
                <th className="p-3.5 sm:p-4 font-semibold">Stock Level</th>
                <th className="p-3.5 sm:p-4 font-semibold">Quantity Available</th>
                <th className="p-3.5 sm:p-4 font-semibold">Min Qty.</th>
                <th className="p-3.5 sm:p-4 font-semibold">Max Qty.</th>
                <th className="p-3.5 sm:p-4 font-semibold text-center">Service Item</th>
                <th className="p-3.5 sm:p-4 font-semibold text-center">Serial Item</th>
                <th className="p-3.5 sm:p-4 font-semibold text-center">Warehouse Item</th>
                <th className="p-3.5 sm:p-4 font-semibold">Product Id Parent</th>
                <th className="p-3.5 sm:p-4 font-semibold">Costing Method Id</th>
                <th className="p-3.5 sm:p-4 font-semibold text-center">Is Fixed Price</th>
                <th className="p-3.5 sm:p-4 font-semibold">Retail Price1</th>
                <th className="p-3.5 sm:p-4 font-semibold">Retail Price2</th>
                <th className="p-3.5 sm:p-4 font-semibold">Wholesale Price1</th>
                <th className="p-3.5 sm:p-4 font-semibold">Wholesale Price2</th>
                <th className="p-3.5 sm:p-4 font-semibold">Default Vendor Id</th>
                <th className="p-3.5 sm:p-4 font-semibold">Purchase Price1</th>
                <th className="p-3.5 sm:p-4 font-semibold">Purchase Price2</th>
                <th className="p-3.5 sm:p-4 font-semibold">Product Sequence</th>
                <th className="p-3.5 sm:p-4 font-semibold">Status</th>
                <th className="p-3.5 sm:p-4 font-semibold text-center">Mould Merge</th>
                <th className="p-3.5 sm:p-4 font-semibold">Created by</th>
                <th className="p-3.5 sm:p-4 font-semibold">Create Date & Time</th>
                <th className="p-3.5 sm:p-4 font-semibold">Updated by</th>
                <th className="p-3.5 sm:p-4 font-semibold">Updated date & Time</th>
                <th className="p-3.5 sm:p-4 font-semibold text-center sticky right-0 bg-slate-50/80 dark:bg-slate-800/40 backdrop-blur w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-border/40 text-slate-700 dark:text-slate-200">
              {records.length === 0 ? (
                <tr>
                  <td colSpan={33} className="p-8 text-center text-slate-400">
                    No product records found.
                  </td>
                </tr>
              ) : (
                records.slice(0, rowsPerPage).map((row) => (
                  <tr
                    key={row.productId}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors group relative"
                  >
                    <td className="p-3.5 sm:p-4 font-medium text-slate-900 dark:text-slate-100">
                      {row.productId}
                    </td>
                    <td className="p-3.5 sm:p-4">{row.organizationCode}</td>
                    <td className="p-3.5 sm:p-4">{row.branchCode}</td>
                    <td className="p-3.5 sm:p-4">{row.productCode}</td>
                    <td className="p-3.5 sm:p-4">{row.description}</td>
                    <td className="p-3.5 sm:p-4">{row.unitTypeId}</td>
                    <td className="p-3.5 sm:p-4">{row.uomId}</td>
                    <td className="p-3.5 sm:p-4">{row.productTypeId}</td>
                    <td className="p-3.5 sm:p-4">{row.stockLevel}</td>
                    <td className="p-3.5 sm:p-4">{row.quantityAvailable}</td>
                    <td className="p-3.5 sm:p-4">{row.minQty}</td>
                    <td className="p-3.5 sm:p-4">{row.maxQty}</td>
                    <td className="p-3.5 sm:p-4 text-center">
                      {renderBooleanIcon(row.serviceItem)}
                    </td>
                    <td className="p-3.5 sm:p-4 text-center">
                      {renderBooleanIcon(row.serialItem)}
                    </td>
                    <td className="p-3.5 sm:p-4 text-center">
                      {renderBooleanIcon(row.warehouseItem)}
                    </td>
                    <td className="p-3.5 sm:p-4">{row.productIdParent}</td>
                    <td className="p-3.5 sm:p-4">{row.costingMethodId}</td>
                    <td className="p-3.5 sm:p-4 text-center">
                      {renderBooleanIcon(row.isFixedPrice)}
                    </td>
                    <td className="p-3.5 sm:p-4">{row.retailPrice1}</td>
                    <td className="p-3.5 sm:p-4">{row.retailPrice2}</td>
                    <td className="p-3.5 sm:p-4">{row.wholesalePrice1}</td>
                    <td className="p-3.5 sm:p-4">{row.wholesalePrice2}</td>
                    <td className="p-3.5 sm:p-4">{row.defaultVendorId}</td>
                    <td className="p-3.5 sm:p-4">{row.purchasePrice1}</td>
                    <td className="p-3.5 sm:p-4">{row.purchasePrice2}</td>
                    <td className="p-3.5 sm:p-4">{row.productSequence}</td>
                    <td className="p-3.5 sm:p-4 text-slate-700 dark:text-slate-300">
                      {row.status}
                    </td>
                    <td className="p-3.5 sm:p-4 text-center">
                      {renderBooleanIcon(row.mouldMerge)}
                    </td>
                    <td className="p-3.5 sm:p-4">{row.createdBy}</td>
                    <td className="p-3.5 sm:p-4 text-slate-500 dark:text-slate-400">
                      {row.createDateTime}
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
                              actionMenuOpen === row.productId ? null : row.productId,
                            )
                          }
                          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>

                        {actionMenuOpen === row.productId && (
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
                              onClick={() => handleDeleteRecord(row.productId)}
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
                {editingRecord ? "Edit Product Master" : "Add Product Master"}
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
                    Product ID
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.productId || ""}
                    onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Product Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.productCode || ""}
                    onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-slate-50 dark:bg-slate-900 text-foreground outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="sm:col-span-2">
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
                    Stock Level
                  </label>
                  <input
                    type="text"
                    value={formData.stockLevel || ""}
                    onChange={(e) => setFormData({ ...formData, stockLevel: e.target.value })}
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
                  {editingRecord ? "Save Changes" : "Create Product"}
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
                Product Details — #{selectedRecordForView.productId}
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
                  <p className="text-[10px] text-slate-400 font-medium">Product Code</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.productCode}
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
                  <span className="text-slate-400 font-medium">Description</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.description}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-border/40 pb-1.5">
                  <span className="text-slate-400 font-medium">Stock Level</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.stockLevel || "-"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-border/40 pb-1.5">
                  <span className="text-slate-400 font-medium">Qty Available</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.quantityAvailable || "-"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-border/40 pb-1.5">
                  <span className="text-slate-400 font-medium">Created Date</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.createDateTime || "-"}
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
