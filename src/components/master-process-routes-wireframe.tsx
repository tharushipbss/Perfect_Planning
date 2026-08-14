import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Layers,
  Clock,
  Users,
  Factory,
  Save,
  X,
  AlertTriangle,
  MoveUp,
  MoveDown,
  SlidersHorizontal,
  FileSpreadsheet,
  Building2,
  ArrowRightCircle,
  Info,
} from "lucide-react";

export interface OperationStep {
  id: string;
  sequenceNo: number;
  operationName: string;
  resourceGroup: string;
  productionLine: string; // Production Line / Work Center
  lineCode: string;
  standardTimeSmv: number; // SMV in minutes
  setupTimeMins: number; // Setup time in minutes
  laborRequirement: number; // Persons/Operators needed
  capacityOutputRate: number; // Output rate in pcs/day
  previousDependency: string; // Dependency or "None (Start)"
  status: "Active" | "Inactive";
}

export interface MasterProcessRoute {
  id: string;
  routeCode: string;
  routeName: string;
  styleCode: string;
  styleName: string;
  department: string;
  activeStatus: boolean;
  totalSmv: number;
  operations: OperationStep[];
}

const productionLinesList = [
  { code: "RAIN/PL/01", name: "Line 01 - Sewing & Stitching", short: "L01" },
  { code: "RAIN/PL/02", name: "Line 02 - Automated Fabric Cutting", short: "L02" },
  { code: "RAIN/PL/03", name: "Line 03 - Heat Sealing & Assembly", short: "L03" },
  { code: "RAIN/PL/04", name: "Line 04 - Finishing & Packaging", short: "L04" },
  { code: "RAIN/PL/05", name: "Line 05 - Umbrella Frame & Metalwork", short: "L05" },
];

const resourceGroupsList = [
  "Waterproof Cutting Dept",
  "Bonding & Heat Sealing Dept",
  "Main Sewing Dept",
  "Umbrella Frame & Metalwork",
  "Quality Assurance & Testing",
  "Finishing & Packaging Line",
];

const stylesList = [
  { code: "RAIN-JKT-10025", name: "Men's Rain Jacket", dept: "SEWING & STITCHING" },
  { code: "RAIN-JKT-01", name: "Rain Jacket - Waterproof Shell", dept: "MOLDING & ASSEMBLY" },
  { code: "COAT-STORM-05", name: "Heavy Storm Coat - Seam Sealed", dept: "EXTRUDER" },
  { code: "UMB-EXEC-02", name: "Executive Golf Umbrella", dept: "FRAME & METALWORK" },
  { code: "PONCHO-WP-03", name: "Ripstop Waterproof Poncho", dept: "WATERPROOF CUTTING" },
  { code: "KIDS-RAIN-01", name: "High-Vis Kids Raincoat", dept: "FINISHING & QC" },
];

const initialRoutes: MasterProcessRoute[] = [
  {
    id: "ROUTE-01",
    routeCode: "ROUTE-JKT-01",
    routeName: "Men's Waterproof Raincoat Standard Line Route",
    styleCode: "RAIN-JKT-10025",
    styleName: "Men's Rain Jacket",
    department: "SEWING & STITCHING",
    activeStatus: true,
    totalSmv: 21.4,
    operations: [
      {
        id: "OP-101",
        sequenceNo: 10,
        operationName: "Fabric Cutting & Bundling",
        resourceGroup: "Waterproof Cutting Dept",
        productionLine: "Line 02 - Automated Fabric Cutting",
        lineCode: "RAIN/PL/02",
        standardTimeSmv: 3.2,
        setupTimeMins: 20,
        laborRequirement: 6,
        capacityOutputRate: 610,
        previousDependency: "None (Start)",
        status: "Active",
      },
      {
        id: "OP-102",
        sequenceNo: 20,
        operationName: "Waterproof Seam Sealing & Taping",
        resourceGroup: "Bonding & Heat Sealing Dept",
        productionLine: "Line 03 - Heat Sealing & Assembly",
        lineCode: "RAIN/PL/03",
        standardTimeSmv: 4.8,
        setupTimeMins: 15,
        laborRequirement: 8,
        capacityOutputRate: 520,
        previousDependency: "Op 10: Fabric Cutting & Bundling",
        status: "Active",
      },
      {
        id: "OP-103",
        sequenceNo: 30,
        operationName: "Main Body Assembly & Stitching",
        resourceGroup: "Main Sewing Dept",
        productionLine: "Line 01 - Sewing & Stitching",
        lineCode: "RAIN/PL/01",
        standardTimeSmv: 8.5,
        setupTimeMins: 30,
        laborRequirement: 18,
        capacityOutputRate: 550,
        previousDependency: "Op 20: Waterproof Seam Sealing & Taping",
        status: "Active",
      },
      {
        id: "OP-104",
        sequenceNo: 40,
        operationName: "Waterproof QC & Hydrostatic Testing",
        resourceGroup: "Quality Assurance & Testing",
        productionLine: "Line 04 - Finishing & Packaging",
        lineCode: "RAIN/PL/04",
        standardTimeSmv: 2.4,
        setupTimeMins: 10,
        laborRequirement: 4,
        capacityOutputRate: 650,
        previousDependency: "Op 30: Main Body Assembly & Stitching",
        status: "Active",
      },
      {
        id: "OP-105",
        sequenceNo: 50,
        operationName: "Final Inspection, Folding & Tagging",
        resourceGroup: "Finishing & Packaging Line",
        productionLine: "Line 04 - Finishing & Packaging",
        lineCode: "RAIN/PL/04",
        standardTimeSmv: 2.5,
        setupTimeMins: 10,
        laborRequirement: 5,
        capacityOutputRate: 650,
        previousDependency: "Op 40: Waterproof QC & Hydrostatic Testing",
        status: "Active",
      },
    ],
  },
  {
    id: "ROUTE-02",
    routeCode: "ROUTE-UMB-02",
    routeName: "Executive Golf Umbrella Frame & Canopy Route",
    styleCode: "UMB-EXEC-02",
    styleName: "Executive Golf Umbrella",
    department: "FRAME & METALWORK",
    activeStatus: true,
    totalSmv: 14.2,
    operations: [
      {
        id: "OP-201",
        sequenceNo: 10,
        operationName: "Metal Rib & Shaft Assembly",
        resourceGroup: "Umbrella Frame & Metalwork",
        productionLine: "Line 05 - Umbrella Frame & Metalwork",
        lineCode: "RAIN/PL/05",
        standardTimeSmv: 4.0,
        setupTimeMins: 25,
        laborRequirement: 10,
        capacityOutputRate: 480,
        previousDependency: "None (Start)",
        status: "Active",
      },
      {
        id: "OP-202",
        sequenceNo: 20,
        operationName: "Triangular Canopy Fabric Cutting",
        resourceGroup: "Waterproof Cutting Dept",
        productionLine: "Line 02 - Automated Fabric Cutting",
        lineCode: "RAIN/PL/02",
        standardTimeSmv: 2.2,
        setupTimeMins: 15,
        laborRequirement: 4,
        capacityOutputRate: 610,
        previousDependency: "None (Start)",
        status: "Active",
      },
      {
        id: "OP-203",
        sequenceNo: 30,
        operationName: "Canopy Panel Hemming & Stitching",
        resourceGroup: "Main Sewing Dept",
        productionLine: "Line 01 - Sewing & Stitching",
        lineCode: "RAIN/PL/01",
        standardTimeSmv: 5.0,
        setupTimeMins: 20,
        laborRequirement: 12,
        capacityOutputRate: 550,
        previousDependency: "Op 20: Canopy Fabric Cutting",
        status: "Active",
      },
      {
        id: "OP-204",
        sequenceNo: 40,
        operationName: "Frame & Canopy Mounting & QC",
        resourceGroup: "Bonding & Heat Sealing Dept",
        productionLine: "Line 03 - Heat Sealing & Assembly",
        lineCode: "RAIN/PL/03",
        standardTimeSmv: 3.0,
        setupTimeMins: 15,
        laborRequirement: 8,
        capacityOutputRate: 520,
        previousDependency: "Op 10 & Op 30",
        status: "Active",
      },
    ],
  },
  {
    id: "ROUTE-03",
    routeCode: "ROUTE-COAT-03",
    routeName: "Heavy Storm Coat - Seam Sealed Line Route",
    styleCode: "COAT-STORM-05",
    styleName: "Heavy Storm Coat - Seam Sealed",
    department: "EXTRUDER",
    activeStatus: true,
    totalSmv: 22.0,
    operations: [
      {
        id: "OP-301",
        sequenceNo: 10,
        operationName: "Automated Ripstop Fabric Cutting",
        resourceGroup: "Waterproof Cutting Dept",
        productionLine: "Line 02 - Automated Fabric Cutting",
        lineCode: "RAIN/PL/02",
        standardTimeSmv: 3.5,
        setupTimeMins: 30,
        laborRequirement: 6,
        capacityOutputRate: 610,
        previousDependency: "None (Start)",
        status: "Active",
      },
      {
        id: "OP-302",
        sequenceNo: 20,
        operationName: "Thermal Seam Sealing & Bonding",
        resourceGroup: "Bonding & Heat Sealing Dept",
        productionLine: "Line 03 - Heat Sealing & Assembly",
        lineCode: "RAIN/PL/03",
        standardTimeSmv: 5.5,
        setupTimeMins: 20,
        laborRequirement: 10,
        capacityOutputRate: 520,
        previousDependency: "Op 10: Automated Ripstop Fabric Cutting",
        status: "Active",
      },
      {
        id: "OP-303",
        sequenceNo: 30,
        operationName: "Pocket, Zipper & Hood Sewing",
        resourceGroup: "Main Sewing Dept",
        productionLine: "Line 01 - Sewing & Stitching",
        lineCode: "RAIN/PL/01",
        standardTimeSmv: 9.0,
        setupTimeMins: 35,
        laborRequirement: 22,
        capacityOutputRate: 550,
        previousDependency: "Op 20: Thermal Seam Sealing",
        status: "Active",
      },
      {
        id: "OP-304",
        sequenceNo: 40,
        operationName: "Final Waterproof QC & Packaging",
        resourceGroup: "Finishing & Packaging Line",
        productionLine: "Line 04 - Finishing & Packaging",
        lineCode: "RAIN/PL/04",
        standardTimeSmv: 4.0,
        setupTimeMins: 15,
        laborRequirement: 6,
        capacityOutputRate: 650,
        previousDependency: "Op 30: Pocket, Zipper & Hood Sewing",
        status: "Active",
      },
    ],
  },
  {
    id: "ROUTE-04",
    routeCode: "ROUTE-PONCHO-04",
    routeName: "Ripstop Waterproof Poncho Line Route",
    styleCode: "PONCHO-WP-03",
    styleName: "Ripstop Waterproof Poncho",
    department: "WATERPROOF CUTTING",
    activeStatus: true,
    totalSmv: 12.0,
    operations: [
      {
        id: "OP-401",
        sequenceNo: 10,
        operationName: "Die Cutting Waterproof Sheets",
        resourceGroup: "Waterproof Cutting Dept",
        productionLine: "Line 02 - Automated Fabric Cutting",
        lineCode: "RAIN/PL/02",
        standardTimeSmv: 2.0,
        setupTimeMins: 15,
        laborRequirement: 4,
        capacityOutputRate: 610,
        previousDependency: "None (Start)",
        status: "Active",
      },
      {
        id: "OP-402",
        sequenceNo: 20,
        operationName: "Sonic Welding & Hood Attachment",
        resourceGroup: "Bonding & Heat Sealing Dept",
        productionLine: "Line 03 - Heat Sealing & Assembly",
        lineCode: "RAIN/PL/03",
        standardTimeSmv: 4.0,
        setupTimeMins: 15,
        laborRequirement: 8,
        capacityOutputRate: 520,
        previousDependency: "Op 10: Die Cutting Waterproof Sheets",
        status: "Active",
      },
      {
        id: "OP-403",
        sequenceNo: 30,
        operationName: "Folding & Polybag Packing",
        resourceGroup: "Finishing & Packaging Line",
        productionLine: "Line 04 - Finishing & Packaging",
        lineCode: "RAIN/PL/04",
        standardTimeSmv: 1.5,
        setupTimeMins: 10,
        laborRequirement: 4,
        capacityOutputRate: 650,
        previousDependency: "Op 20: Sonic Welding",
        status: "Active",
      },
    ],
  },
  {
    id: "ROUTE-05",
    routeCode: "ROUTE-KIDS-05",
    routeName: "High-Vis Kids Raincoat Line Route",
    styleCode: "KIDS-RAIN-01",
    styleName: "High-Vis Kids Raincoat",
    department: "FINISHING & QC",
    activeStatus: false,
    totalSmv: 16.0,
    operations: [
      {
        id: "OP-501",
        sequenceNo: 10,
        operationName: "Reflective Tape & Fabric Cutting",
        resourceGroup: "Waterproof Cutting Dept",
        productionLine: "Line 02 - Automated Fabric Cutting",
        lineCode: "RAIN/PL/02",
        standardTimeSmv: 2.8,
        setupTimeMins: 20,
        laborRequirement: 5,
        capacityOutputRate: 610,
        previousDependency: "None (Start)",
        status: "Active",
      },
      {
        id: "OP-502",
        sequenceNo: 20,
        operationName: "Reflective Tape Heat Press Bonding",
        resourceGroup: "Bonding & Heat Sealing Dept",
        productionLine: "Line 03 - Heat Sealing & Assembly",
        lineCode: "RAIN/PL/03",
        standardTimeSmv: 3.2,
        setupTimeMins: 15,
        laborRequirement: 6,
        capacityOutputRate: 520,
        previousDependency: "Op 10: Reflective Tape & Fabric Cutting",
        status: "Active",
      },
      {
        id: "OP-503",
        sequenceNo: 30,
        operationName: "Kids Size Stitching & Assembly",
        resourceGroup: "Main Sewing Dept",
        productionLine: "Line 01 - Sewing & Stitching",
        lineCode: "RAIN/PL/01",
        standardTimeSmv: 6.8,
        setupTimeMins: 25,
        laborRequirement: 14,
        capacityOutputRate: 550,
        previousDependency: "Op 20: Heat Press Bonding",
        status: "Active",
      },
      {
        id: "OP-504",
        sequenceNo: 40,
        operationName: "Safety QC & Box Packing",
        resourceGroup: "Finishing & Packaging Line",
        productionLine: "Line 04 - Finishing & Packaging",
        lineCode: "RAIN/PL/04",
        standardTimeSmv: 2.2,
        setupTimeMins: 10,
        laborRequirement: 4,
        capacityOutputRate: 650,
        previousDependency: "Op 30: Kids Size Stitching & Assembly",
        status: "Active",
      },
    ],
  },
];

export function MasterProcessRoutesWireframe() {
  const [routes, setRoutes] = useState<MasterProcessRoute[]>(initialRoutes);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [lineFilter, setLineFilter] = useState<string>("All");

  // Expanded row IDs for viewing full operation details
  const [expandedRouteIds, setExpandedRouteIds] = useState<string[]>(["ROUTE-01"]);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRouteId, setEditingRouteId] = useState<string | null>(null);

  // Form State
  const [formRouteCode, setFormRouteCode] = useState("");
  const [formRouteName, setFormRouteName] = useState("");
  const [formStyleCode, setFormStyleCode] = useState("RAIN-JKT-10025");
  const [formActiveStatus, setFormActiveStatus] = useState(true);
  const [formOperations, setFormOperations] = useState<OperationStep[]>([]);

  // Delete modal state
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Success Alert Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Toggle Accordion Expansion
  const toggleExpand = (id: string) => {
    setExpandedRouteIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Toggle Active/Inactive Status directly from table
  const handleToggleRouteStatus = (id: string) => {
    setRoutes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, activeStatus: !r.activeStatus } : r)),
    );
    showToast("Route active status updated!");
  };

  // Open Modal for Add
  const handleOpenAddModal = () => {
    setEditingRouteId(null);
    setFormRouteCode(`ROUTE-NEW-${Math.floor(1000 + Math.random() * 9000)}`);
    setFormRouteName("New Garment Line Production Route");
    setFormStyleCode("RAIN-JKT-10025");
    setFormActiveStatus(true);
    // Initialize default operations
    setFormOperations([
      {
        id: `op-${Date.now()}-1`,
        sequenceNo: 10,
        operationName: "Automated Fabric Cutting",
        resourceGroup: "Waterproof Cutting Dept",
        productionLine: "Line 02 - Automated Fabric Cutting",
        lineCode: "RAIN/PL/02",
        standardTimeSmv: 3.0,
        setupTimeMins: 15,
        laborRequirement: 5,
        capacityOutputRate: 610,
        previousDependency: "None (Start)",
        status: "Active",
      },
      {
        id: `op-${Date.now()}-2`,
        sequenceNo: 20,
        operationName: "Garment Sewing & Assembly",
        resourceGroup: "Main Sewing Dept",
        productionLine: "Line 01 - Sewing & Stitching",
        lineCode: "RAIN/PL/01",
        standardTimeSmv: 7.5,
        setupTimeMins: 25,
        laborRequirement: 16,
        capacityOutputRate: 550,
        previousDependency: "Op 10: Automated Fabric Cutting",
        status: "Active",
      },
      {
        id: `op-${Date.now()}-3`,
        sequenceNo: 30,
        operationName: "QC Inspection & Packaging",
        resourceGroup: "Finishing & Packaging Line",
        productionLine: "Line 04 - Finishing & Packaging",
        lineCode: "RAIN/PL/04",
        standardTimeSmv: 2.5,
        setupTimeMins: 10,
        laborRequirement: 4,
        capacityOutputRate: 650,
        previousDependency: "Op 20: Garment Sewing & Assembly",
        status: "Active",
      },
    ]);
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (route: MasterProcessRoute) => {
    setEditingRouteId(route.id);
    setFormRouteCode(route.routeCode);
    setFormRouteName(route.routeName);
    setFormStyleCode(route.styleCode);
    setFormActiveStatus(route.activeStatus);
    setFormOperations(JSON.parse(JSON.stringify(route.operations)));
    setIsModalOpen(true);
  };

  // Modal Operation Step Handlers
  const handleAddOperationStep = () => {
    const nextSeq =
      formOperations.length > 0 ? Math.max(...formOperations.map((o) => o.sequenceNo)) + 10 : 10;

    const prevOpName =
      formOperations.length > 0
        ? `Op ${formOperations[formOperations.length - 1].sequenceNo}: ${formOperations[formOperations.length - 1].operationName}`
        : "None (Start)";

    const newOp: OperationStep = {
      id: `op-${Date.now()}-${Math.random()}`,
      sequenceNo: nextSeq,
      operationName: "New Process Operation",
      resourceGroup: "Main Sewing Dept",
      productionLine: "Line 01 - Sewing & Stitching",
      lineCode: "RAIN/PL/01",
      standardTimeSmv: 4.0,
      setupTimeMins: 15,
      laborRequirement: 6,
      capacityOutputRate: 550,
      previousDependency: prevOpName,
      status: "Active",
    };

    setFormOperations((prev) => [...prev, newOp]);
  };

  const handleRemoveOperationStep = (opId: string) => {
    setFormOperations((prev) => prev.filter((o) => o.id !== opId));
  };

  const handleMoveOperationStep = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === formOperations.length - 1)
    ) {
      return;
    }

    const updated = [...formOperations];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;

    // Recalculate sequence numbers in steps of 10
    const reordered = updated.map((op, idx) => ({
      ...op,
      sequenceNo: (idx + 1) * 10,
    }));

    setFormOperations(reordered);
  };

  const handleUpdateOperationField = (
    opId: string,
    field: keyof OperationStep,
    value: string | number,
  ) => {
    setFormOperations((prev) =>
      prev.map((op) => {
        if (op.id !== opId) return op;

        if (field === "productionLine") {
          const matchedLine = productionLinesList.find((l) => l.name === value);
          return {
            ...op,
            productionLine: value as string,
            lineCode: matchedLine ? matchedLine.code : op.lineCode,
          };
        }

        return { ...op, [field]: value };
      }),
    );
  };

  // Save Route
  const handleSaveRoute = () => {
    if (!formRouteCode.trim() || !formRouteName.trim()) {
      alert("Please fill in Route Code and Route Name.");
      return;
    }

    const matchedStyle = stylesList.find((s) => s.code === formStyleCode);
    const calculatedSmv = formOperations.reduce(
      (sum, op) => sum + (Number(op.standardTimeSmv) || 0),
      0,
    );

    const updatedRouteData: MasterProcessRoute = {
      id: editingRouteId || `ROUTE-${Date.now()}`,
      routeCode: formRouteCode,
      routeName: formRouteName,
      styleCode: formStyleCode,
      styleName: matchedStyle ? matchedStyle.name : formStyleCode,
      department: matchedStyle ? matchedStyle.dept : "GARMENT ASSEMBLY",
      activeStatus: formActiveStatus,
      totalSmv: Math.round(calculatedSmv * 10) / 10,
      operations: formOperations,
    };

    if (editingRouteId) {
      setRoutes((prev) => prev.map((r) => (r.id === editingRouteId ? updatedRouteData : r)));
      showToast(`Process route ${formRouteCode} updated successfully!`);
    } else {
      setRoutes((prev) => [updatedRouteData, ...prev]);
      showToast(`New process route ${formRouteCode} created successfully!`);
    }

    setIsModalOpen(false);
  };

  // Delete Route
  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      setRoutes((prev) => prev.filter((r) => r.id !== deleteTargetId));
      showToast("Master process route deleted.");
      setDeleteTargetId(null);
    }
  };

  // Filtered dataset
  const filteredRoutes = routes.filter((r) => {
    const matchesSearch =
      r.routeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.routeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.styleCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.styleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ? true : statusFilter === "Active" ? r.activeStatus : !r.activeStatus;

    const matchesLine =
      lineFilter === "All"
        ? true
        : r.operations.some((op) => op.productionLine.includes(lineFilter));

    return matchesSearch && matchesStatus && matchesLine;
  });

  // Top Metrics
  const totalRoutesCount = routes.length;
  const activeRoutesCount = routes.filter((r) => r.activeStatus).length;
  const avgSmv =
    routes.length > 0
      ? Math.round((routes.reduce((sum, r) => sum + r.totalSmv, 0) / routes.length) * 10) / 10
      : 0;
  const totalOperationsCount = routes.reduce((sum, r) => sum + r.operations.length, 0);

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-emerald-500/30 text-xs font-semibold animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div></div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Process Route</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-border/60 bg-white dark:bg-card shadow-2xs flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Total Routes
            </p>
            <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              {totalRoutesCount}{" "}
              <span className="text-xs font-normal text-slate-400">master routes</span>
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-border/60 bg-white dark:bg-card shadow-2xs flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Active Routes
            </p>
            <p className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400">
              {activeRoutesCount} / {totalRoutesCount}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-border/60 bg-white dark:bg-card shadow-2xs flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Avg Route SMV
            </p>
            <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              {avgSmv} <span className="text-xs font-medium text-slate-500">mins / style</span>
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-border/60 bg-white dark:bg-card shadow-2xs flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Factory className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Line Operations
            </p>
            <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              {totalOperationsCount}{" "}
              <span className="text-xs font-normal text-slate-400">total steps</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-border/60 bg-white dark:bg-card shadow-2xs overflow-hidden">
        {/* Controls Bar: Search & Filters */}
        <div className="p-4 sm:p-5 border-b border-slate-200/80 dark:border-border/60 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/40">
          <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search route code, name, style, department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Line Filter */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
              <span>Line Filter:</span>
              <select
                value={lineFilter}
                onChange={(e) => setLineFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold outline-none cursor-pointer"
              >
                <option value="All">All Production Lines</option>
                <option value="Line 01">Line 01 - Sewing</option>
                <option value="Line 02">Line 02 - Cutting</option>
                <option value="Line 03">Line 03 - Heat Sealing</option>
                <option value="Line 04">Line 04 - Finishing</option>
                <option value="Line 05">Line 05 - Frame Work</option>
              </select>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
            {(["All", "Active", "Inactive"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === tab
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Master Routes Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200/80 dark:border-border/60">
                <th className="p-4 w-10 text-center">#</th>
                <th className="p-4 font-bold">Route Code</th>
                <th className="p-4 font-bold">Master Process Route Name</th>
                <th className="p-4 font-bold">Style & Product Code</th>
                <th className="p-4 font-bold text-center">Operations Count</th>
                <th className="p-4 font-bold text-center">Total SMV (Min)</th>
                <th className="p-4 font-bold text-center">Active Status</th>
                <th className="p-4 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-border/40 text-slate-700 dark:text-slate-200">
              {filteredRoutes.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400 italic">
                    No process routes found matching filter criteria.
                  </td>
                </tr>
              ) : (
                filteredRoutes.map((route) => {
                  const isExpanded = expandedRouteIds.includes(route.id);

                  return (
                    <tr key={route.id} className="group transition-colors">
                      <td colSpan={8} className="p-0">
                        {/* Summary Row */}
                        <div
                          className={`flex items-center justify-between p-4 border-b border-slate-100 dark:border-border/30 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${
                            isExpanded ? "bg-slate-50/60 dark:bg-slate-900/40" : ""
                          }`}
                        >
                          <div className="w-10 text-center shrink-0">
                            <button
                              onClick={() => toggleExpand(route.id)}
                              className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                              title={isExpanded ? "Collapse Operations" : "Expand Operations"}
                            >
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4 text-emerald-600" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </button>
                          </div>

                          <div className="w-36 font-extrabold text-slate-900 dark:text-slate-100 shrink-0">
                            <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 font-mono text-[11px] border border-slate-200/80 dark:border-slate-700">
                              {route.routeCode}
                            </span>
                          </div>

                          <div className="flex-1 min-w-[200px] px-3">
                            <p className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                              {route.routeName}
                            </p>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium mt-0.5">
                              <span>Dept: {route.department}</span>
                            </div>
                          </div>

                          <div className="w-48 px-3 shrink-0">
                            <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">
                              {route.styleName}
                            </span>
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                              {route.styleCode}
                            </span>
                          </div>

                          <div className="w-28 text-center shrink-0">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[11px]">
                              <Layers className="h-3 w-3 text-cyan-600" />
                              {route.operations.length} steps
                            </span>
                          </div>

                          <div className="w-28 text-center shrink-0">
                            <span className="font-extrabold text-amber-600 dark:text-amber-400 text-xs">
                              {route.totalSmv} min
                            </span>
                          </div>

                          <div className="w-28 text-center shrink-0">
                            <button
                              onClick={() => handleToggleRouteStatus(route.id)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                                route.activeStatus
                                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 hover:bg-emerald-200"
                                  : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200"
                              }`}
                            >
                              {route.activeStatus ? (
                                <>
                                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                                  Active
                                </>
                              ) : (
                                <>
                                  <XCircle className="h-3 w-3 text-slate-400" />
                                  Inactive
                                </>
                              )}
                            </button>
                          </div>

                          <div className="w-36 flex items-center justify-center gap-1.5 shrink-0">
                            <button
                              onClick={() => toggleExpand(route.id)}
                              className="px-2 py-1 rounded-lg border border-slate-200 dark:border-border hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-[10px] transition-colors cursor-pointer"
                            >
                              {isExpanded ? "Hide Steps" : "View Steps"}
                            </button>
                            <button
                              onClick={() => handleOpenEditModal(route)}
                              className="p-1.5 rounded-lg border border-slate-200 dark:border-border hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:border-emerald-300 text-slate-600 hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                              title="Edit Route & Operations"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteTargetId(route.id)}
                              className="p-1.5 rounded-lg border border-slate-200 dark:border-border hover:bg-rose-50 dark:hover:bg-rose-950/50 hover:border-rose-300 text-slate-600 hover:text-rose-600 transition-colors cursor-pointer"
                              title="Delete Route"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Expanded Operations Timeline & Sequence Table */}
                        {isExpanded && (
                          <div className="p-4 sm:p-5 bg-slate-50/90 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-border/60 space-y-4 animate-in fade-in duration-150">
                            {/* Sequence Flow Diagram Pills */}
                            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                                  <ArrowRightCircle className="h-3.5 w-3.5 text-emerald-600" />
                                  Line Operations Flow Sequence
                                </span>
                                <span className="text-[11px] font-semibold text-slate-400">
                                  {route.operations.length} Work Centers / Lines
                                </span>
                              </div>

                              <div className="flex flex-wrap items-center gap-2 pt-1">
                                {route.operations.map((op, opIdx) => (
                                  <div key={op.id} className="flex items-center gap-2">
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-xs">
                                      <span className="h-5 w-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                                        {op.sequenceNo}
                                      </span>
                                      <div>
                                        <p className="font-extrabold text-slate-900 dark:text-slate-100 text-[11px]">
                                          {op.operationName}
                                        </p>
                                        <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                                          {op.productionLine.split(" - ")[0]} • {op.standardTimeSmv}{" "}
                                          min
                                        </p>
                                      </div>
                                    </div>
                                    {opIdx < route.operations.length - 1 && (
                                      <ArrowRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Operations Detailed Table */}
                            <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-2xs">
                              <table className="w-full text-left text-xs whitespace-nowrap">
                                <thead>
                                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                                    <th className="p-3 w-12 text-center">Seq No</th>
                                    <th className="p-3 font-bold">Process / Operation</th>
                                    <th className="p-3 font-bold">Resource Group</th>
                                    <th className="p-3 font-bold">Production Line / Work Center</th>
                                    <th className="p-3 font-bold text-center">
                                      Standard Time (SMV)
                                    </th>
                                    <th className="p-3 font-bold text-center">Setup Time</th>
                                    <th className="p-3 font-bold text-center">Labor Req</th>
                                    <th className="p-3 font-bold text-center">Output Rate</th>
                                    <th className="p-3 font-bold">Dependency</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                                  {route.operations.map((op) => (
                                    <tr
                                      key={op.id}
                                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40"
                                    >
                                      <td className="p-3 text-center font-bold text-emerald-700 dark:text-emerald-400">
                                        {op.sequenceNo}
                                      </td>
                                      <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">
                                        {op.operationName}
                                      </td>
                                      <td className="p-3 font-medium text-slate-600 dark:text-slate-400">
                                        {op.resourceGroup}
                                      </td>
                                      <td className="p-3 font-bold text-slate-800 dark:text-slate-200">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-bold text-[11px]">
                                          <Factory className="h-3 w-3 text-emerald-600" />
                                          {op.productionLine}
                                        </span>
                                      </td>
                                      <td className="p-3 text-center font-extrabold text-amber-600 dark:text-amber-400">
                                        {op.standardTimeSmv} mins
                                      </td>
                                      <td className="p-3 text-center font-semibold text-slate-600 dark:text-slate-400">
                                        {op.setupTimeMins} mins
                                      </td>
                                      <td className="p-3 text-center font-bold text-indigo-600 dark:text-indigo-400">
                                        {op.laborRequirement} operators
                                      </td>
                                      <td className="p-3 text-center font-bold text-slate-800 dark:text-slate-200">
                                        {op.capacityOutputRate} pcs/day
                                      </td>
                                      <td className="p-3 font-medium text-slate-500 text-[11px]">
                                        {op.previousDependency}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ADD / EDIT MASTER PROCESS ROUTE MODAL                                      */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-5xl my-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden font-sans">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4 bg-slate-50 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {editingRouteId ? "Edit Master Process Route" : "Add New Master Process Route"}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Configure garment style, sequence of operations, work centers & capacity
                    parameters.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {/* Route Primary Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                {/* Route Code */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Route Code *
                  </label>
                  <input
                    type="text"
                    value={formRouteCode}
                    onChange={(e) => setFormRouteCode(e.target.value)}
                    placeholder="e.g. ROUTE-JKT-01"
                    className="w-full px-3 py-2 text-xs font-bold font-mono rounded-lg border border-slate-300 dark:border-border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Route Name */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Master Process Route Name *
                  </label>
                  <input
                    type="text"
                    value={formRouteName}
                    onChange={(e) => setFormRouteName(e.target.value)}
                    placeholder="e.g. Men's Rain Jacket Line Route"
                    className="w-full px-3 py-2 text-xs font-bold rounded-lg border border-slate-300 dark:border-border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Product / Style Code Select */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Product / Garment Style *
                  </label>
                  <select
                    value={formStyleCode}
                    onChange={(e) => setFormStyleCode(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-bold rounded-lg border border-slate-300 dark:border-border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    {stylesList.map((st) => (
                      <option key={st.code} value={st.code}>
                        {st.code} - {st.name} ({st.dept})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Active Status Toggle */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Active Status
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormActiveStatus(!formActiveStatus)}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                      formActiveStatus
                        ? "bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-300"
                        : "bg-slate-100 border-slate-300 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"
                    }`}
                  >
                    {formActiveStatus ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>Active Route</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-slate-400" />
                        <span>Inactive Route</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Operations Builder Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
                      Production Operations Sequence Builder
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Add, re-order, and define Work Centers/Production Lines for each step.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddOperationStep}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Operation Step</span>
                  </button>
                </div>

                {/* Operations Dynamic Form Table */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                        <th className="p-3 w-12 text-center">Reorder</th>
                        <th className="p-3 w-16 text-center">Seq No</th>
                        <th className="p-3 font-bold min-w-[160px]">Process / Operation *</th>
                        <th className="p-3 font-bold min-w-[160px]">Resource Group</th>
                        <th className="p-3 font-bold min-w-[200px]">
                          Production Line / Work Center *
                        </th>
                        <th className="p-3 font-bold text-center w-24">Standard Time (SMV)</th>
                        <th className="p-3 font-bold text-center w-20">Setup (min)</th>
                        <th className="p-3 font-bold text-center w-20">Labor (Persons)</th>
                        <th className="p-3 font-bold text-center w-24">Output (pcs/day)</th>
                        <th className="p-3 font-bold min-w-[150px]">Dependency</th>
                        <th className="p-3 w-10 text-center">Remove</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                      {formOperations.length === 0 ? (
                        <tr>
                          <td colSpan={11} className="p-6 text-center text-slate-400 italic">
                            No operation steps added yet. Click &ldquo;Add Operation Step&rdquo;
                            above.
                          </td>
                        </tr>
                      ) : (
                        formOperations.map((op, idx) => (
                          <tr key={op.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                            {/* Sequence Re-order controls */}
                            <td className="p-2 text-center">
                              <div className="flex items-center justify-center gap-0.5">
                                <button
                                  type="button"
                                  disabled={idx === 0}
                                  onClick={() => handleMoveOperationStep(idx, "up")}
                                  className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                                  title="Move Up"
                                >
                                  <MoveUp className="h-3.5 w-3.5 text-slate-600 dark:text-slate-300" />
                                </button>
                                <button
                                  type="button"
                                  disabled={idx === formOperations.length - 1}
                                  onClick={() => handleMoveOperationStep(idx, "down")}
                                  className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                                  title="Move Down"
                                >
                                  <MoveDown className="h-3.5 w-3.5 text-slate-600 dark:text-slate-300" />
                                </button>
                              </div>
                            </td>

                            {/* Sequence Number */}
                            <td className="p-2 text-center font-extrabold text-emerald-700 dark:text-emerald-400">
                              {op.sequenceNo}
                            </td>

                            {/* Operation Name */}
                            <td className="p-2">
                              <input
                                type="text"
                                value={op.operationName}
                                onChange={(e) =>
                                  handleUpdateOperationField(op.id, "operationName", e.target.value)
                                }
                                placeholder="e.g. Sewing Front Panels"
                                className="w-full px-2.5 py-1.5 text-xs font-bold rounded border border-slate-300 dark:border-border bg-white dark:bg-slate-900 outline-none focus:border-emerald-500"
                              />
                            </td>

                            {/* Resource Group */}
                            <td className="p-2">
                              <select
                                value={op.resourceGroup}
                                onChange={(e) =>
                                  handleUpdateOperationField(op.id, "resourceGroup", e.target.value)
                                }
                                className="w-full px-2 py-1.5 text-xs rounded border border-slate-300 dark:border-border bg-white dark:bg-slate-900 outline-none cursor-pointer"
                              >
                                {resourceGroupsList.map((rg) => (
                                  <option key={rg} value={rg}>
                                    {rg}
                                  </option>
                                ))}
                              </select>
                            </td>

                            {/* Production Line / Work Center Selection */}
                            <td className="p-2">
                              <select
                                value={op.productionLine}
                                onChange={(e) =>
                                  handleUpdateOperationField(
                                    op.id,
                                    "productionLine",
                                    e.target.value,
                                  )
                                }
                                className="w-full px-2 py-1.5 text-xs font-bold rounded border border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 outline-none cursor-pointer"
                              >
                                {productionLinesList.map((line) => (
                                  <option key={line.code} value={line.name}>
                                    {line.name} ({line.code})
                                  </option>
                                ))}
                              </select>
                            </td>

                            {/* Standard Time SMV */}
                            <td className="p-2 text-center">
                              <input
                                type="number"
                                step="0.1"
                                min="0.1"
                                value={op.standardTimeSmv}
                                onChange={(e) =>
                                  handleUpdateOperationField(
                                    op.id,
                                    "standardTimeSmv",
                                    parseFloat(e.target.value) || 0,
                                  )
                                }
                                className="w-20 px-2 py-1.5 text-xs font-extrabold text-amber-600 dark:text-amber-400 text-center rounded border border-slate-300 dark:border-border bg-white dark:bg-slate-900 outline-none focus:border-emerald-500"
                              />
                            </td>

                            {/* Setup Time Mins */}
                            <td className="p-2 text-center">
                              <input
                                type="number"
                                min="0"
                                value={op.setupTimeMins}
                                onChange={(e) =>
                                  handleUpdateOperationField(
                                    op.id,
                                    "setupTimeMins",
                                    parseInt(e.target.value) || 0,
                                  )
                                }
                                className="w-16 px-2 py-1.5 text-xs font-semibold text-center rounded border border-slate-300 dark:border-border bg-white dark:bg-slate-900 outline-none focus:border-emerald-500"
                              />
                            </td>

                            {/* Labor Requirement */}
                            <td className="p-2 text-center">
                              <input
                                type="number"
                                min="1"
                                value={op.laborRequirement}
                                onChange={(e) =>
                                  handleUpdateOperationField(
                                    op.id,
                                    "laborRequirement",
                                    parseInt(e.target.value) || 1,
                                  )
                                }
                                className="w-16 px-2 py-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 text-center rounded border border-slate-300 dark:border-border bg-white dark:bg-slate-900 outline-none focus:border-emerald-500"
                              />
                            </td>

                            {/* Capacity Output Rate */}
                            <td className="p-2 text-center">
                              <input
                                type="number"
                                min="1"
                                value={op.capacityOutputRate}
                                onChange={(e) =>
                                  handleUpdateOperationField(
                                    op.id,
                                    "capacityOutputRate",
                                    parseInt(e.target.value) || 100,
                                  )
                                }
                                className="w-20 px-2 py-1.5 text-xs font-bold text-center rounded border border-slate-300 dark:border-border bg-white dark:bg-slate-900 outline-none focus:border-emerald-500"
                              />
                            </td>

                            {/* Previous Dependency */}
                            <td className="p-2">
                              <input
                                type="text"
                                value={op.previousDependency}
                                onChange={(e) =>
                                  handleUpdateOperationField(
                                    op.id,
                                    "previousDependency",
                                    e.target.value,
                                  )
                                }
                                placeholder="e.g. Op 10"
                                className="w-full px-2 py-1.5 text-xs rounded border border-slate-300 dark:border-border bg-white dark:bg-slate-900 outline-none"
                              />
                            </td>

                            {/* Delete Op Button */}
                            <td className="p-2 text-center">
                              <button
                                type="button"
                                onClick={() => handleRemoveOperationStep(op.id)}
                                className="p-1 rounded text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950 transition-colors cursor-pointer"
                                title="Remove Step"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Total SMV Calculation Summary */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs">
                  <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
                    <Info className="h-4 w-4 shrink-0" />
                    <span>
                      Total Route SMV is calculated automatically by summing operation standard
                      times.
                    </span>
                  </div>
                  <div className="font-extrabold text-amber-900 dark:text-amber-200">
                    Total Route SMV:{" "}
                    <span className="text-base text-emerald-700 dark:text-emerald-400">
                      {Math.round(
                        formOperations.reduce(
                          (sum, op) => sum + (Number(op.standardTimeSmv) || 0),
                          0,
                        ) * 10,
                      ) / 10}{" "}
                      mins
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons: Save and Cancel */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800 px-6 py-4 bg-slate-50 dark:bg-slate-900">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-border hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveRoute}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <Save className="h-4 w-4" />
                <span>Save Process Route</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4 font-sans">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertTriangle className="h-6 w-6 shrink-0" />
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Confirm Route Deletion
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Are you sure you want to delete this master process route? This action will remove all
              associated line sequence operations.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-border hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer shadow-sm"
              >
                Delete Route
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
