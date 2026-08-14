import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Lock,
  Unlock,
  CornerUpRight,
  Maximize,
  Search,
  SlidersHorizontal,
  Building2,
  Factory,
  Layers,
  Calendar,
  AlertTriangle,
  Info,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

export interface WorkOrderScheduleItem {
  id: string;
  workOrderNo: string;
  styleCode: string;
  styleName: string;
  quantity: number;
  startDate: string;
  deadlineDate: string;
  isOverdue: boolean;
  overdueDays?: number;
  progressPercent: number;
  isLocked: boolean;
  colStart: number; // 1 to 7 (for timeline grid columns)
  colSpan: number; // duration width
}

export interface ProductionLineSchedule {
  id: string;
  lineCode: string;
  lineName: string;
  shortName: string;
  workOrders: WorkOrderScheduleItem[];
}

export interface DepartmentSchedule {
  id: string;
  deptCode: string;
  deptName: string;
  lines: ProductionLineSchedule[];
}

const initialPlanningData: DepartmentSchedule[] = [
  {
    id: "DEPT-CUTTING",
    deptCode: "CUT-01",
    deptName: "Waterproof Cutting Dept",
    lines: [
      {
        id: "LINE-02",
        lineCode: "RAIN/PL/02",
        lineName: "Line 02 - Automated Fabric Cutting",
        shortName: "Line 02 (Cutting)",
        workOrders: [
          {
            id: "WO-1001-CUT",
            workOrderNo: "WO-1001",
            styleCode: "RAIN-JKT-10025",
            styleName: "Men's Rain Jacket",
            quantity: 5000,
            startDate: "2026-08-11",
            deadlineDate: "2025-07-05!",
            isOverdue: true,
            overdueDays: 403,
            progressPercent: 35.0,
            isLocked: true,
            colStart: 2,
            colSpan: 2,
          },
          {
            id: "WO-1004-CUT",
            workOrderNo: "WO-1004",
            styleCode: "PONCHO-WP-03",
            styleName: "Ripstop Waterproof Poncho",
            quantity: 3200,
            startDate: "2026-08-11",
            deadlineDate: "2025-10-25!",
            isOverdue: true,
            overdueDays: 292,
            progressPercent: 0.0,
            isLocked: true,
            colStart: 2,
            colSpan: 2,
          },
          {
            id: "WO-1005-CUT",
            workOrderNo: "WO-1005",
            styleCode: "KIDS-RAIN-01",
            styleName: "High-Vis Kids Raincoat",
            quantity: 2500,
            startDate: "2026-08-12",
            deadlineDate: "2025-09-26!",
            isOverdue: true,
            overdueDays: 321,
            progressPercent: 0.0,
            isLocked: true,
            colStart: 3,
            colSpan: 2,
          },
        ],
      },
    ],
  },
  {
    id: "DEPT-BONDING",
    deptCode: "BOND-02",
    deptName: "Bonding & Heat Sealing Dept",
    lines: [
      {
        id: "LINE-03",
        lineCode: "RAIN/PL/03",
        lineName: "Line 03 - Heat Sealing & Assembly",
        shortName: "Line 03 (Heat Sealing)",
        workOrders: [
          {
            id: "WO-1001-BOND",
            workOrderNo: "WO-1001",
            styleCode: "RAIN-JKT-10025",
            styleName: "Men's Rain Jacket",
            quantity: 5000,
            startDate: "2026-08-11",
            deadlineDate: "2025-09-03!",
            isOverdue: true,
            overdueDays: 343,
            progressPercent: 20.0,
            isLocked: true,
            colStart: 2,
            colSpan: 2,
          },
          {
            id: "WO-1003-BOND",
            workOrderNo: "WO-1003",
            styleCode: "COAT-STORM-05",
            styleName: "Heavy Storm Coat",
            quantity: 1800,
            startDate: "2026-08-11",
            deadlineDate: "2025-08-05!",
            isOverdue: true,
            overdueDays: 373,
            progressPercent: 0.0,
            isLocked: true,
            colStart: 2,
            colSpan: 3,
          },
        ],
      },
    ],
  },
  {
    id: "DEPT-SEWING",
    deptCode: "SEW-03",
    deptName: "Main Sewing Dept",
    lines: [
      {
        id: "LINE-01",
        lineCode: "RAIN/PL/01",
        lineName: "Line 01 - Sewing & Stitching",
        shortName: "Line 01 (Sewing)",
        workOrders: [
          {
            id: "WO-1001-SEW",
            workOrderNo: "WO-1001",
            styleCode: "RAIN-JKT-10025",
            styleName: "Men's Rain Jacket",
            quantity: 5000,
            startDate: "2026-08-12",
            deadlineDate: "2026-08-20",
            isOverdue: false,
            progressPercent: 15.0,
            isLocked: false,
            colStart: 3,
            colSpan: 3,
          },
          {
            id: "WO-1002-SEW",
            workOrderNo: "WO-1002",
            styleCode: "UMB-EXEC-02",
            styleName: "Executive Golf Umbrella",
            quantity: 4000,
            startDate: "2026-08-13",
            deadlineDate: "2026-08-22",
            isOverdue: false,
            progressPercent: 0.0,
            isLocked: false,
            colStart: 4,
            colSpan: 3,
          },
        ],
      },
    ],
  },
  {
    id: "DEPT-FRAME",
    deptCode: "FRM-04",
    deptName: "Umbrella Frame & Metalwork",
    lines: [
      {
        id: "LINE-05",
        lineCode: "RAIN/PL/05",
        lineName: "Line 05 - Umbrella Frame & Metalwork",
        shortName: "Line 05 (Frame & Metal)",
        workOrders: [
          {
            id: "WO-1002-FRAME",
            workOrderNo: "WO-1002",
            styleCode: "UMB-EXEC-02",
            styleName: "Executive Golf Umbrella",
            quantity: 4000,
            startDate: "2026-08-11",
            deadlineDate: "2025-11-15!",
            isOverdue: true,
            overdueDays: 271,
            progressPercent: 45.0,
            isLocked: true,
            colStart: 2,
            colSpan: 2,
          },
        ],
      },
    ],
  },
  {
    id: "DEPT-FINISHING",
    deptCode: "FIN-05",
    deptName: "Finishing & Packaging Line",
    lines: [
      {
        id: "LINE-04",
        lineCode: "RAIN/PL/04",
        lineName: "Line 04 - Finishing & Packaging",
        shortName: "Line 04 (Finishing)",
        workOrders: [
          {
            id: "WO-1001-FIN",
            workOrderNo: "WO-1001",
            styleCode: "RAIN-JKT-10025",
            styleName: "Men's Rain Jacket",
            quantity: 5000,
            startDate: "2026-08-14",
            deadlineDate: "2026-08-25",
            isOverdue: false,
            progressPercent: 0.0,
            isLocked: false,
            colStart: 5,
            colSpan: 2,
          },
          {
            id: "WO-1004-FIN",
            workOrderNo: "WO-1004",
            styleCode: "PONCHO-WP-03",
            styleName: "Ripstop Waterproof Poncho",
            quantity: 3200,
            startDate: "2026-08-13",
            deadlineDate: "2026-08-21",
            isOverdue: false,
            progressPercent: 0.0,
            isLocked: false,
            colStart: 4,
            colSpan: 2,
          },
        ],
      },
    ],
  },
];

export function PlanningBoardWireframe() {
  const [planningData, setPlanningData] = useState<DepartmentSchedule[]>(initialPlanningData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeptFilter, setSelectedDeptFilter] = useState("All");
  const [selectedLineFilter, setSelectedLineFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"Hour" | "Day" | "Week" | "Month">("Week");

  // Expand / Collapse State
  const [expandedDepts, setExpandedDepts] = useState<string[]>([
    "DEPT-CUTTING",
    "DEPT-BONDING",
    "DEPT-SEWING",
    "DEPT-FRAME",
    "DEPT-FINISHING",
  ]);
  const [expandedLines, setExpandedLines] = useState<string[]>([
    "LINE-02",
    "LINE-03",
    "LINE-01",
    "LINE-05",
    "LINE-04",
  ]);

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Toggle Department Expand
  const toggleDept = (deptId: string) => {
    setExpandedDepts((prev) =>
      prev.includes(deptId) ? prev.filter((id) => id !== deptId) : [...prev, deptId],
    );
  };

  // Toggle Line Expand
  const toggleLine = (lineId: string) => {
    setExpandedLines((prev) =>
      prev.includes(lineId) ? prev.filter((id) => id !== lineId) : [...prev, lineId],
    );
  };

  // Toggle Lock state for work order
  const toggleLock = (deptId: string, lineId: string, woId: string) => {
    setPlanningData((prev) =>
      prev.map((dept) => {
        if (dept.id !== deptId) return dept;
        return {
          ...dept,
          lines: dept.lines.map((line) => {
            if (line.id !== lineId) return line;
            return {
              ...line,
              workOrders: line.workOrders.map((wo) => {
                if (wo.id !== woId) return wo;
                const updatedLock = !wo.isLocked;
                showToast(
                  `${wo.workOrderNo} / ${wo.styleCode} ${
                    updatedLock ? "Locked 🔒" : "Unlocked 🔓"
                  }`,
                );
                return { ...wo, isLocked: updatedLock };
              }),
            };
          }),
        };
      }),
    );
  };

  // Filtered dataset
  const filteredData = planningData
    .map((dept) => {
      // Dept level filter
      if (selectedDeptFilter !== "All" && dept.deptName !== selectedDeptFilter) {
        return null;
      }

      const filteredLines = dept.lines
        .map((line) => {
          // Line level filter
          if (selectedLineFilter !== "All" && !line.lineName.includes(selectedLineFilter)) {
            return null;
          }

          // Search query filter
          const filteredWorkOrders = line.workOrders.filter((wo) => {
            if (!searchQuery.trim()) return true;
            const q = searchQuery.toLowerCase();
            return (
              wo.workOrderNo.toLowerCase().includes(q) ||
              wo.styleCode.toLowerCase().includes(q) ||
              wo.styleName.toLowerCase().includes(q) ||
              line.lineName.toLowerCase().includes(q) ||
              dept.deptName.toLowerCase().includes(q)
            );
          });

          if (filteredWorkOrders.length === 0 && searchQuery.trim()) {
            return null;
          }

          return {
            ...line,
            workOrders: filteredWorkOrders,
          };
        })
        .filter(Boolean) as ProductionLineSchedule[];

      if (filteredLines.length === 0) return null;

      return {
        ...dept,
        lines: filteredLines,
      };
    })
    .filter(Boolean) as DepartmentSchedule[];

  // Column Headers based on viewMode
  const getTimelineHeaders = () => {
    switch (viewMode) {
      case "Hour":
        return {
          groupTitle: "11 Aug 2026 — Shift 1 & Shift 2",
          cols: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"],
        };
      case "Day":
        return {
          groupTitle: "August 2026 Daily Lines",
          cols: [
            "Mon 10 Aug",
            "Tue 11 Aug",
            "Wed 12 Aug",
            "Thu 13 Aug",
            "Fri 14 Aug",
            "Sat 15 Aug",
            "Sun 16 Aug",
          ],
        };
      case "Month":
        return {
          groupTitle: "Q3 2026 Line Master Schedule",
          cols: ["Jul 2026", "Aug 2026", "Sep 2026", "Oct 2026"],
        };
      case "Week":
      default:
        return {
          groupTitle: "Week #33",
          cols: ["10 Aug", "11 Aug", "12 Aug", "13 Aug", "14 Aug", "15 Aug", "16 Aug"],
        };
    }
  };

  const timelineInfo = getTimelineHeaders();

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-emerald-500/30 text-xs font-semibold animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 mt-1">
        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search Work Order / Style / Line"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-emerald-500 shadow-2xs"
            />
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 px-2.5 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 shadow-2xs">
            <span className="text-slate-400">Department:</span>
            <select
              value={selectedDeptFilter}
              onChange={(e) => setSelectedDeptFilter(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 dark:text-slate-100 outline-none cursor-pointer"
            >
              <option value="All">All Departments</option>
              <option value="Waterproof Cutting Dept">Waterproof Cutting Dept</option>
              <option value="Bonding & Heat Sealing Dept">Bonding & Heat Sealing Dept</option>
              <option value="Main Sewing Dept">Main Sewing Dept</option>
              <option value="Umbrella Frame & Metalwork">Umbrella Frame & Metalwork</option>
              <option value="Finishing & Packaging Line">Finishing & Packaging Line</option>
            </select>
          </div>

          {/* Line Filter */}
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 px-2.5 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 shadow-2xs">
            <span className="text-slate-400">Line:</span>
            <select
              value={selectedLineFilter}
              onChange={(e) => setSelectedLineFilter(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 dark:text-slate-100 outline-none cursor-pointer"
            >
              <option value="All">All Lines</option>
              <option value="Line 01">Line 01 - Sewing</option>
              <option value="Line 02">Line 02 - Cutting</option>
              <option value="Line 03">Line 03 - Heat Sealing</option>
              <option value="Line 04">Line 04 - Finishing</option>
              <option value="Line 05">Line 05 - Metalwork</option>
            </select>
          </div>
        </div>

        {/* View Mode Zoom Controls & Actions */}
        <div className="flex items-center gap-2 overflow-x-auto shrink-0 pt-1 lg:pt-0">
          <button
            onClick={() => showToast("Board exported / synced with ERP!")}
            className="text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 rounded transition-colors shrink-0 cursor-pointer"
            title="Export Board / Sync"
          >
            <CornerUpRight className="w-5 h-5" />
          </button>

          {/* Hour / Day / Week / Month View Buttons */}
          <div className="flex items-center text-xs font-bold rounded-md overflow-hidden border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xs">
            {(["Hour", "Day", "Week", "Month"] as const).map((mode) => {
              const isActive = viewMode === mode;
              return (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1.5 transition-colors cursor-pointer ${
                    isActive
                      ? "bg-emerald-600 text-white"
                      : "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                  }`}
                >
                  {mode} View
                </button>
              );
            })}
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={() => showToast("Expanded to Fullscreen View")}
            className="bg-sky-500 hover:bg-sky-600 text-white p-2 rounded transition-colors shrink-0 cursor-pointer shadow-2xs"
            title="Fullscreen Mode"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Gantt Chart Table Area */}
      <div className="w-full overflow-x-auto rounded-md shadow-2xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <table className="w-full text-xs border-collapse min-w-[980px]">
          <thead>
            {/* Top Level Table Header */}
            <tr>
              <th className="bg-[#5a5a5a] text-white border-r border-[#6a6a6a] p-2.5 text-left font-bold w-[280px]">
                Department / Line / Work Order
              </th>
              <th className="bg-[#5a5a5a] text-white border-r border-[#6a6a6a] p-2.5 text-center font-bold w-[110px]">
                Start Date
              </th>
              <th className="bg-[#5a5a5a] text-white border-r border-[#6a6a6a] p-2.5 text-center font-bold w-[110px]">
                Deadline
              </th>
              <th className="bg-[#5a5a5a] text-white border-r border-white/20 p-2.5 text-center font-bold w-[90px]">
                Progress
              </th>
              <th
                className="bg-[#dcdcdc] dark:bg-slate-700 text-slate-800 dark:text-slate-100 border-b border-white dark:border-slate-800 p-2 text-center font-extrabold uppercase tracking-wider text-[11px]"
                colSpan={timelineInfo.cols.length}
              >
                {timelineInfo.groupTitle}
              </th>
            </tr>

            {/* Sub-Header Timeline Days/Hours */}
            <tr>
              <th className="bg-[#5a5a5a] p-0" colSpan={4}></th>
              {timelineInfo.cols.map((colName, idx) => (
                <th
                  key={idx}
                  className="bg-[#dcdcdc] dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-r border-white dark:border-slate-800 p-1.5 text-center font-semibold text-[11px] min-w-[120px]"
                >
                  {colName}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-slate-800 dark:text-slate-200">
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={4 + timelineInfo.cols.length}
                  className="p-8 text-center text-slate-400 italic"
                >
                  No matching work orders or lines found.
                </td>
              </tr>
            ) : (
              filteredData.map((dept) => {
                const isDeptExpanded = expandedDepts.includes(dept.id);

                return (
                  <FragmentGroup key={dept.id}>
                    {/* ========================================================================= */}
                    {/* LEVEL 1: DEPARTMENT ROW                                                   */}
                    {/* ========================================================================= */}
                    <tr className="bg-[#e8e8e8] dark:bg-slate-800 border-b border-white dark:border-slate-700 font-bold text-slate-900 dark:text-slate-100">
                      <td className="p-2 border-r border-white dark:border-slate-700">
                        <button
                          onClick={() => toggleDept(dept.id)}
                          className="flex items-center gap-1.5 w-full text-left font-extrabold text-xs cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                        >
                          {isDeptExpanded ? (
                            <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-300 shrink-0" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-300 shrink-0" />
                          )}
                          <span className="truncate uppercase tracking-wide">{dept.deptName}</span>
                        </button>
                      </td>
                      <td className="p-2 border-r border-white dark:border-slate-700"></td>
                      <td className="p-2 border-r border-white dark:border-slate-700"></td>
                      <td className="p-2 border-r border-white dark:border-slate-700"></td>

                      {/* Timeline Area Group Bar for Department */}
                      <td
                        className="p-1 border-r border-white dark:border-slate-700"
                        colSpan={timelineInfo.cols.length}
                      >
                        <div className="bg-[#f59e0b] text-white text-[11px] font-extrabold px-3 py-1.5 rounded-xs shadow-2xs flex items-center justify-between">
                          <span className="truncate uppercase">{dept.deptName}</span>
                          <span className="text-[10px] font-mono opacity-90">
                            {dept.lines.reduce((acc, l) => acc + l.workOrders.length, 0)} Work
                            Orders Allocated
                          </span>
                        </div>
                      </td>
                    </tr>

                    {/* ========================================================================= */}
                    {/* LEVEL 2: PRODUCTION LINE ROWS (if department expanded)                    */}
                    {/* ========================================================================= */}
                    {isDeptExpanded &&
                      dept.lines.map((line) => {
                        const isLineExpanded = expandedLines.includes(line.id);

                        return (
                          <FragmentGroup key={line.id}>
                            {/* Production Line Row Header */}
                            <tr className="bg-[#f0f0f0] dark:bg-slate-800/80 border-b border-white dark:border-slate-700 text-slate-800 dark:text-slate-200">
                              <td className="p-2 border-r border-white dark:border-slate-700 pl-6">
                                <button
                                  onClick={() => toggleLine(line.id)}
                                  className="flex items-center gap-1.5 w-full text-left font-bold text-[11px] cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                >
                                  {isLineExpanded ? (
                                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                                  ) : (
                                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                                  )}
                                  <span className="truncate text-slate-800 dark:text-slate-200">
                                    {line.lineName}
                                  </span>
                                </button>
                              </td>
                              <td className="p-2 border-r border-white dark:border-slate-700"></td>
                              <td className="p-2 border-r border-white dark:border-slate-700"></td>
                              <td className="p-2 border-r border-white dark:border-slate-700"></td>

                              {/* Timeline Area Group Bar for Production Line */}
                              <td
                                className="p-1 border-r border-white dark:border-slate-700"
                                colSpan={timelineInfo.cols.length}
                              >
                                <div className="bg-[#e5a000] dark:bg-amber-600 text-white text-[10px] font-bold px-2 py-1 rounded-xs flex items-center justify-between">
                                  <span>{line.shortName}</span>
                                  <span className="text-[10px] font-mono">
                                    {line.workOrders.length} Allocated Jobs
                                  </span>
                                </div>
                              </td>
                            </tr>

                            {/* ========================================================================= */}
                            {/* LEVEL 3: WORK ORDERS / STYLES (if line expanded)                          */}
                            {/* ========================================================================= */}
                            {isLineExpanded &&
                              line.workOrders.map((wo) => {
                                return (
                                  <tr
                                    key={wo.id}
                                    className="bg-[#f8f8f8] dark:bg-slate-800/60 border-b border-white dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/90 transition-colors"
                                  >
                                    {/* Column 1: Department / Line / Work Order */}
                                    <td className="p-2.5 border-r border-white dark:border-slate-700 pl-10">
                                      <div className="flex flex-col">
                                        <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100 font-mono">
                                          {wo.workOrderNo}{" "}
                                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                                            / {wo.styleCode}
                                          </span>
                                        </span>
                                        <span className="text-[10px] text-slate-500 font-medium truncate">
                                          {wo.styleName} ({wo.quantity.toLocaleString()} Pcs)
                                        </span>
                                      </div>
                                    </td>

                                    {/* Column 2: Start Date */}
                                    <td className="p-2.5 border-r border-white dark:border-slate-700 text-center text-xs font-mono">
                                      {wo.startDate}
                                    </td>

                                    {/* Column 3: Deadline */}
                                    <td className="p-2.5 border-r border-white dark:border-slate-700 text-center text-xs font-mono font-bold">
                                      {wo.isOverdue ? (
                                        <span className="text-red-600 dark:text-red-400 font-extrabold">
                                          {wo.deadlineDate}
                                        </span>
                                      ) : (
                                        <span className="text-slate-700 dark:text-slate-300">
                                          {wo.deadlineDate}
                                        </span>
                                      )}
                                    </td>

                                    {/* Column 4: Progress % & Lock */}
                                    <td className="p-2.5 border-r border-white dark:border-slate-700 text-xs">
                                      <div className="flex justify-between items-center gap-1 font-mono">
                                        <span className="font-semibold text-[11px]">
                                          {wo.progressPercent.toFixed(2)}%
                                        </span>
                                        <button
                                          onClick={() => toggleLock(dept.id, line.id, wo.id)}
                                          className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                                          title={
                                            wo.isLocked
                                              ? "Locked: Prevent Rescheduling"
                                              : "Unlocked: Click to Lock"
                                          }
                                        >
                                          {wo.isLocked ? (
                                            <Lock className="w-3.5 h-3.5 text-slate-800 dark:text-slate-200" />
                                          ) : (
                                            <Unlock className="w-3.5 h-3.5 text-slate-400 hover:text-slate-700" />
                                          )}
                                        </button>
                                      </div>
                                    </td>

                                    {/* Column 5+: Timeline Grid & Gantt Bar */}
                                    <td
                                      className="p-1 border-r border-white dark:border-slate-700 relative"
                                      colSpan={timelineInfo.cols.length}
                                    >
                                      <div className="flex items-center gap-2 pl-2 py-0.5">
                                        {/* Progress label before bar */}
                                        <span className="text-[10px] font-mono text-slate-500 font-semibold shrink-0">
                                          {wo.progressPercent.toFixed(2)}%
                                        </span>

                                        {/* Blue Gantt Bar for Rainco Work Order */}
                                        <div
                                          className="bg-[#0ea5e9] hover:bg-sky-600 text-white text-[11px] font-bold px-2 py-1 rounded-xs truncate shadow-2xs cursor-pointer transition-all flex items-center justify-between gap-2"
                                          style={{
                                            minWidth: `${wo.colSpan * 110}px`,
                                            marginLeft: `${(wo.colStart - 1) * 20}px`,
                                          }}
                                          title={`${wo.workOrderNo} | ${wo.styleCode} | Qty: ${wo.quantity} Pcs`}
                                        >
                                          <span className="truncate">
                                            {wo.workOrderNo} / {wo.styleCode}
                                          </span>
                                          <span className="text-[9px] font-mono bg-sky-700/80 px-1 py-0.5 rounded-xs shrink-0">
                                            {wo.quantity.toLocaleString()} Pcs
                                          </span>
                                        </div>

                                        {/* Overdue Badge */}
                                        {wo.isOverdue && (
                                          <span className="text-[11px] text-red-600 dark:text-red-400 font-bold whitespace-nowrap flex items-center gap-1 shrink-0 bg-red-50 dark:bg-red-950/50 px-1.5 py-0.5 rounded border border-red-200 dark:border-red-900/60">
                                            <AlertTriangle className="h-3 w-3 text-red-600" />
                                            Overdue: {wo.overdueDays} days
                                          </span>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                          </FragmentGroup>
                        );
                      })}
                  </FragmentGroup>
                );
              })
            )}

            {/* Bottom Filler Rows matching screenshot look */}
            <tr className="bg-[#e8e8e8]/50 dark:bg-slate-800/40 h-24">
              <td className="border-r border-white dark:border-slate-700"></td>
              <td className="border-r border-white dark:border-slate-700"></td>
              <td className="border-r border-white dark:border-slate-700"></td>
              <td className="border-r border-white dark:border-slate-700"></td>
              <td
                className="border-r border-white dark:border-slate-700"
                colSpan={timelineInfo.cols.length}
              ></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer Info Box explaining scheduling logic */}
      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-xs flex flex-wrap items-center justify-between gap-3 text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Rainco Production Hierarchy:</strong> Department → Production Line → Work Order
            / Style. Automatic scheduling evaluates production line availability rather than machine
            slots.
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-semibold">
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]"></span> Department / Line Span
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#0ea5e9]"></span> Scheduled Work Order
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span> Overdue Alert
          </span>
        </div>
      </div>
    </div>
  );
}

// Simple Fragment Helper
function FragmentGroup({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
