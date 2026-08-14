import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export function ScheduleHistoryReportWireframe() {
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <div className="space-y-6 mt-4">
      {/* Main Card Container */}
      <div className="rounded-2xl border border-slate-100 dark:border-border/60 bg-white dark:bg-card overflow-hidden shadow-sm">
        {/* Controls Section */}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Month Dropdown */}
            <div className="relative w-full sm:w-1/2 max-w-sm">
              <label className="absolute -top-2.5 left-3 bg-white dark:bg-slate-800 px-1 text-[11px] text-slate-500 dark:text-slate-400 font-semibold z-10">
                Month
              </label>
              <select className="relative w-full border border-slate-200 dark:border-slate-700 rounded-lg pl-4 pr-10 py-3 bg-transparent text-sm text-slate-700 dark:text-slate-200 outline-none appearance-none focus:border-emerald-500 cursor-pointer">
                <option>August</option>
              </select>
              <ChevronDown className="w-5 h-5 absolute right-3 top-3 text-slate-500 pointer-events-none" />
            </div>

            {/* Year Dropdown */}
            <div className="relative w-full sm:w-1/2 max-w-sm">
              <label className="absolute -top-2.5 left-3 bg-white dark:bg-slate-800 px-1 text-[11px] text-slate-500 dark:text-slate-400 font-semibold z-10">
                Year
              </label>
              <select className="relative w-full border border-slate-200 dark:border-slate-700 rounded-lg pl-4 pr-10 py-3 bg-transparent text-sm text-slate-700 dark:text-slate-200 outline-none appearance-none focus:border-emerald-500 cursor-pointer">
                <option>2026</option>
              </select>
              <ChevronDown className="w-5 h-5 absolute right-3 top-3 text-slate-500 pointer-events-none" />
            </div>

            {/* Excel Export Icon */}
            <div className="ml-auto">
              <button
                className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Export to Excel"
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-emerald-600 fill-current">
                  <path d="M21.17 3.25Q22.4 3.25 22.4 4.47v15.06q0 1.22-1.23 1.22H2.83Q1.6 20.75 1.6 19.53V4.47Q1.6 3.25 2.83 3.25h18.34zM7.6 17.5l2.79-3.79-2.61-3.79h2.36l1.24 2.22 1.34-2.22h2.23l-2.67 3.76 2.84 3.82h-2.43l-1.52-2.39-1.46 2.39H7.6z" />
                  <path
                    d="M12.92 13.62l1.32-2.13h-2.14l1.17 2h1.49l-1.39-2.15z"
                    className="fill-white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-x-auto border-t border-slate-100 dark:border-border/50">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-[#f8f9fa] dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-border/50">
                <th className="p-4 sm:p-5 text-center">WO ID</th>
                <th className="p-4 sm:p-5 text-center">Task</th>
                <th className="p-4 sm:p-5 text-center">Machine</th>
                <th className="p-4 sm:p-5 text-center">Department</th>
                <th className="p-4 sm:p-5 text-center">Start Data & Time</th>
                <th className="p-4 sm:p-5 text-center">End Data & Time</th>
                <th className="p-4 sm:p-5 text-center">Planned Qty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-border/40 text-slate-700 dark:text-slate-200">
              <tr>
                <td
                  colSpan={7}
                  className="p-16 text-center text-slate-700 dark:text-slate-300 font-medium"
                >
                  No rows
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Pagination Bar */}
        <div className="flex items-center justify-end gap-6 px-6 py-4 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-border/50 border-dashed">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="bg-transparent font-medium text-slate-700 dark:text-slate-300 outline-none cursor-pointer appearance-none pr-4 relative"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 -ml-4 pointer-events-none" />
          </div>
          <div>0–0 of 0</div>
          <div className="flex items-center gap-2">
            <button disabled className="p-1 text-slate-300 dark:text-slate-600 cursor-not-allowed">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button disabled className="p-1 text-slate-300 dark:text-slate-600 cursor-not-allowed">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
