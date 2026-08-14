import { useState } from "react";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  CheckCircle2,
  Clock,
  Bell,
  ClipboardList,
  FileCheck2,
  Filter,
  Layers,
  Sparkles,
  ArrowUpDown,
} from "lucide-react";

export interface ScheduledOrderItem {
  id: string;
  orderStatus: "Confirm" | "Planned" | "Pending" | "Hold";
  orderNo: string;
  department: string;
  product: string;
  processRoute: string;
  orderDate: string;
  deliveryDate: string;
}

const mockOrdersData: ScheduledOrderItem[] = [
  {
    id: "1",
    orderStatus: "Confirm",
    orderNo: "320440",
    department: "MOLDING",
    product: "10821",
    processRoute: "WC CONNECTOR ..",
    orderDate: "2026-03-08",
    deliveryDate: "2026-03-08",
  },
  {
    id: "2",
    orderStatus: "Confirm",
    orderNo: "320446",
    department: "MOLDING",
    product: "74508",
    processRoute: "WB F/SOCKET 20M",
    orderDate: "2026-03-08",
    deliveryDate: "2026-03-08",
  },
  {
    id: "3",
    orderStatus: "Confirm",
    orderNo: "320619",
    department: "MOLDING",
    product: "70044",
    processRoute: "WB F/ELBOW 20M",
    orderDate: "2026-03-18",
    deliveryDate: "2026-03-18",
  },
  {
    id: "4",
    orderStatus: "Confirm",
    orderNo: "320851",
    department: "MOLDING",
    product: "88120",
    processRoute: "WC ADAPTER 15M",
    orderDate: "2026-03-20",
    deliveryDate: "2026-03-22",
  },
  {
    id: "5",
    orderStatus: "Planned",
    orderNo: "321002",
    department: "MOLDING",
    product: "10025",
    processRoute: "RAIN-JKT-10025",
    orderDate: "2026-04-01",
    deliveryDate: "2026-04-10",
  },
  {
    id: "6",
    orderStatus: "Planned",
    orderNo: "321145",
    department: "EXTRUDER",
    product: "31692",
    processRoute: "PVC PIPE 20MM",
    orderDate: "2026-04-05",
    deliveryDate: "2026-04-12",
  },
  {
    id: "7",
    orderStatus: "Planned",
    orderNo: "321280",
    department: "EXTRUDER",
    product: "10732",
    processRoute: "HDPE TUBE 50MM",
    orderDate: "2026-04-08",
    deliveryDate: "2026-04-15",
  },
  {
    id: "8",
    orderStatus: "Planned",
    orderNo: "321410",
    department: "ROTO",
    product: "88412",
    processRoute: "ROTO TANK 500L",
    orderDate: "2026-04-10",
    deliveryDate: "2026-04-18",
  },
  {
    id: "9",
    orderStatus: "Planned",
    orderNo: "321550",
    department: "ROTO",
    product: "55219",
    processRoute: "ROTO TANK 1000L",
    orderDate: "2026-04-12",
    deliveryDate: "2026-04-20",
  },
  {
    id: "10",
    orderStatus: "Planned",
    orderNo: "321700",
    department: "WATERPROOF CUTTING",
    product: "44290",
    processRoute: "FABRIC CUT-LINE 02",
    orderDate: "2026-04-15",
    deliveryDate: "2026-04-22",
  },
  {
    id: "11",
    orderStatus: "Planned",
    orderNo: "321850",
    department: "SEWING",
    product: "77218",
    processRoute: "SEW-LINE-01",
    orderDate: "2026-04-18",
    deliveryDate: "2026-04-25",
  },
  {
    id: "12",
    orderStatus: "Confirm",
    orderNo: "322001",
    department: "MOLDING",
    product: "90412",
    processRoute: "WC CONNECTOR 25M",
    orderDate: "2026-03-22",
    deliveryDate: "2026-03-25",
  },
  {
    id: "13",
    orderStatus: "Confirm",
    orderNo: "322150",
    department: "MOLDING",
    product: "61205",
    processRoute: "WB F/SOCKET 25M",
    orderDate: "2026-03-25",
    deliveryDate: "2026-03-28",
  },
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function OrderSchedulingWireframe() {
  // Controls state
  const [planningMethod, setPlanningMethod] = useState("Forward");
  const [planningDate, setPlanningDate] = useState("08/14/2026");

  // Tab State
  const [activeTab, setActiveTab] = useState<"All" | "Planned" | "Pending" | "Hold">("All");

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRouteFilter, setSelectedRouteFilter] = useState("All");
  const [isRouteFilterOpen, setIsRouteFilterOpen] = useState(false);

  // Checkbox selections
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  // Calendar popover
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number>(14);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(7); // August
  const [currentYear, setCurrentYear] = useState(2026);

  // Calendar helpers
  const startDay = new Date(currentYear, currentMonthIndex, 1).getDay();
  const totalDays = new Date(currentYear, currentMonthIndex + 1, 0).getDate();

  const handleDateClick = (dayNum: number) => {
    setSelectedDay(dayNum);
    const formattedMonth = String(currentMonthIndex + 1).padStart(2, "0");
    const formattedDay = String(dayNum).padStart(2, "0");
    setPlanningDate(`${formattedMonth}/${formattedDay}/${currentYear}`);
    setIsCalendarOpen(false);
  };

  // Row selections
  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRowIds(filteredOrders.map((o) => o.id));
    } else {
      setSelectedRowIds([]);
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedRowIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Filter orders
  const filteredOrders = mockOrdersData.filter((item) => {
    // Status tab filter
    if (activeTab === "Planned" && item.orderStatus !== "Planned") return false;
    if (activeTab === "Pending" && item.orderStatus !== "Confirm") return false; // In screenshot Pending = 471 (Confirm orders)
    if (activeTab === "Hold" && item.orderStatus !== "Hold") return false;

    // Process route dropdown filter
    if (selectedRouteFilter !== "All" && !item.processRoute.includes(selectedRouteFilter)) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.orderNo.toLowerCase().includes(q) ||
        item.department.toLowerCase().includes(q) ||
        item.product.toLowerCase().includes(q) ||
        item.processRoute.toLowerCase().includes(q) ||
        item.orderStatus.toLowerCase().includes(q)
      );
    }

    return true;
  });

  // Unique Process Routes for dropdown filter
  const uniqueRoutes = Array.from(new Set(mockOrdersData.map((o) => o.processRoute)));

  return (
    <div className="space-y-6 font-sans text-slate-800 dark:text-slate-100 pb-12">
      {/* 1. Page Title & Breadcrumb */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Order-Scheduling
        </h1>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-medium mt-1">
          <span>Home</span>
          <span>•</span>
          <span className="text-slate-500 dark:text-slate-400 font-semibold">Order-Scheduling</span>
        </div>
      </div>

      {/* 2. Top Input Control Cards (Planning Method & Planning Date) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        {/* Planning Method Field */}
        <div className="relative rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 shadow-2xs">
          <label className="absolute -top-2.5 left-3 bg-white dark:bg-slate-900 px-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Planning Method
          </label>
          <div className="flex items-center justify-between mt-0.5">
            <select
              value={planningMethod}
              onChange={(e) => setPlanningMethod(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-slate-800 dark:text-slate-100 outline-none cursor-pointer pr-4"
            >
              <option value="Forward">Forward</option>
              <option value="Backward">Backward</option>
              <option value="Workforce">Workforce</option>
            </select>
            <ChevronDown className="h-4 w-4 text-slate-400 pointer-events-none shrink-0" />
          </div>
        </div>

        {/* Planning Date Field */}
        <div className="relative">
          <div
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className="relative rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 cursor-pointer hover:border-emerald-500 transition-colors shadow-2xs"
          >
            <label className="absolute -top-2.5 left-3 bg-white dark:bg-slate-900 px-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              Planning Date
            </label>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {planningDate}
              </span>
              <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
            </div>
          </div>

          {/* Popover Calendar */}
          {isCalendarOpen && (
            <div className="absolute top-full left-0 mt-2 z-50 w-72 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                  {months[currentMonthIndex]} {currentYear}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentMonthIndex((m) => (m === 0 ? 11 : m - 1))}
                    className="p-1 rounded text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setCurrentMonthIndex((m) => (m === 11 ? 0 : m + 1))}
                    className="p-1 rounded text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-1">
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {Array.from({ length: startDay }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="h-7 w-7" />
                ))}
                {Array.from({ length: totalDays }).map((_, idx) => {
                  const dayNum = idx + 1;
                  const isSelected = selectedDay === dayNum;
                  return (
                    <button
                      key={dayNum}
                      onClick={() => handleDateClick(dayNum)}
                      className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold cursor-pointer ${
                        isSelected
                          ? "bg-emerald-600 text-white font-bold"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. KPI Metrics Summary Banner Card */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-slate-800">
          {/* Total */}
          <div className="flex items-center gap-4 py-2 sm:py-0 sm:px-6 first:pl-0">
            <div className="h-12 w-12 rounded-full border-2 border-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 flex items-center justify-center text-cyan-600 shrink-0">
              <ClipboardList className="h-5 w-5 text-cyan-500" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900 dark:text-slate-100">Total</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">478 orders</p>
            </div>
          </div>

          {/* Planned */}
          <div className="flex items-center gap-4 py-2 sm:py-0 sm:px-6">
            <div className="h-12 w-12 rounded-full bg-emerald-100/90 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 shrink-0">
              <FileCheck2 className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900 dark:text-slate-100">Planned</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">7 orders</p>
            </div>
          </div>

          {/* Pending */}
          <div className="flex items-center gap-4 py-2 sm:py-0 sm:px-6">
            <div className="h-12 w-12 rounded-full border-2 border-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 flex items-center justify-center text-cyan-600 shrink-0">
              <Clock className="h-5 w-5 text-cyan-500" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900 dark:text-slate-100">Pending</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">471 orders</p>
            </div>
          </div>

          {/* Hold */}
          <div className="flex items-center gap-4 py-2 sm:py-0 sm:px-6 last:pr-0">
            <div className="h-12 w-12 rounded-full bg-rose-100/80 dark:bg-rose-950/60 flex items-center justify-center text-rose-500 shrink-0">
              <Bell className="h-5 w-5 text-rose-500" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900 dark:text-slate-100">Hold</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">0 orders</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Table Section Container */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs overflow-hidden">
        {/* Top Tab Bar & Optional Search */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-200/80 dark:border-slate-800 px-6 pt-4 pb-0 gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab("All")}
              className={`flex items-center gap-2 pb-3 text-sm font-bold transition-all cursor-pointer border-b-2 ${
                activeTab === "All"
                  ? "border-slate-900 dark:border-slate-100 text-slate-900 dark:text-slate-100"
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400"
              }`}
            >
              <span>All</span>
              <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                478
              </span>
            </button>

            <button
              onClick={() => setActiveTab("Planned")}
              className={`flex items-center gap-2 pb-3 text-sm font-bold transition-all cursor-pointer border-b-2 ${
                activeTab === "Planned"
                  ? "border-emerald-600 text-emerald-700 dark:text-emerald-400"
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400"
              }`}
            >
              <span>Planned</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                7
              </span>
            </button>

            <button
              onClick={() => setActiveTab("Pending")}
              className={`flex items-center gap-2 pb-3 text-sm font-bold transition-all cursor-pointer border-b-2 ${
                activeTab === "Pending"
                  ? "border-amber-500 text-amber-700 dark:text-amber-400"
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400"
              }`}
            >
              <span>Pending</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100/80 dark:bg-orange-950/80 text-orange-800 dark:text-orange-300">
                471
              </span>
            </button>

            <button
              onClick={() => setActiveTab("Hold")}
              className={`flex items-center gap-2 pb-3 text-sm font-bold transition-all cursor-pointer border-b-2 ${
                activeTab === "Hold"
                  ? "border-rose-500 text-rose-700 dark:text-rose-400"
                  : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400"
              }`}
            >
              <span>Hold</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100/80 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300">
                0
              </span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative pb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter Order No / Product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 outline-none focus:border-emerald-500 w-48 sm:w-60"
            />
          </div>
        </div>

        {/* Main Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200/80 dark:border-slate-800">
                <th className="p-3.5 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={
                      filteredOrders.length > 0 && selectedRowIds.length === filteredOrders.length
                    }
                    onChange={(e) => toggleSelectAll(e.target.checked)}
                    className="rounded border-slate-300 dark:border-slate-700 cursor-pointer"
                  />
                </th>
                <th className="p-3.5 font-bold text-slate-700 dark:text-slate-200">Order Status</th>
                <th className="p-3.5 font-bold text-slate-700 dark:text-slate-200">Order No</th>
                <th className="p-3.5 font-bold text-slate-700 dark:text-slate-200">Department</th>
                <th className="p-3.5 font-bold text-slate-700 dark:text-slate-200">Product</th>

                {/* Highlighted Process Route Header with Dropdown (Matching Screenshot) */}
                <th className="p-2.5 font-bold relative">
                  <div className="inline-flex items-center border border-emerald-600 bg-emerald-50/20 dark:bg-emerald-950/30 rounded-xs px-2.5 py-1">
                    <select
                      value={selectedRouteFilter}
                      onChange={(e) => setSelectedRouteFilter(e.target.value)}
                      className="bg-transparent text-xs font-bold text-slate-800 dark:text-slate-100 outline-none cursor-pointer pr-1"
                    >
                      <option value="All">Process Route</option>
                      {uniqueRoutes.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </th>

                <th className="p-3.5 font-bold text-slate-700 dark:text-slate-200">Order Date</th>
                <th className="p-3.5 font-bold text-slate-700 dark:text-slate-200">
                  Delivery Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400 italic">
                    No order records found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((row) => {
                  const isSelected = selectedRowIds.includes(row.id);

                  return (
                    <tr
                      key={row.id}
                      className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${
                        isSelected ? "bg-emerald-50/30 dark:bg-emerald-950/20" : ""
                      }`}
                    >
                      <td className="p-3.5 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectRow(row.id)}
                          className="rounded border-slate-300 dark:border-slate-700 cursor-pointer"
                        />
                      </td>
                      <td className="p-3.5 font-medium text-slate-800 dark:text-slate-200">
                        {row.orderStatus}
                      </td>
                      <td className="p-3.5 font-semibold text-slate-900 dark:text-slate-100">
                        {row.orderNo}
                      </td>
                      <td className="p-3.5 font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide text-[11px]">
                        {row.department}
                      </td>
                      <td className="p-3.5 font-semibold text-slate-800 dark:text-slate-200">
                        {row.product}
                      </td>
                      <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100">
                        {row.processRoute}
                      </td>
                      <td className="p-3.5 font-medium text-slate-700 dark:text-slate-300">
                        {row.orderDate}
                      </td>
                      <td className="p-3.5 font-medium text-slate-700 dark:text-slate-300">
                        {row.deliveryDate}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
