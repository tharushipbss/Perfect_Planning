import { ChevronDown, RefreshCw } from "lucide-react";

export function SapBasedPerformanceReportWireframe() {
  return (
    <div className="space-y-4 mt-4">
      {/* Top Placeholder Area (matches the "No data to view" floating text in screenshot) */}
      <div className="h-32 flex items-center justify-center text-slate-700 dark:text-slate-300 font-medium text-[15px]">
        No data to view
      </div>

      {/* Main Card Container */}
      <div className="rounded-2xl border border-slate-100 dark:border-border/60 bg-white dark:bg-card overflow-hidden shadow-sm">
        {/* Controls Section */}
        <div className="p-5">
          <div className="flex flex-col md:flex-row flex-wrap items-center justify-end gap-4">
            <button className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer">
              Detailed View
            </button>

            {/* Department Dropdown */}
            <div className="relative shrink-0">
              <label className="absolute -top-2.5 left-3 bg-white dark:bg-slate-800 px-1 text-[11px] text-slate-500 dark:text-slate-400 font-semibold z-10">
                Department
              </label>
              <select className="relative w-32 border border-slate-200 dark:border-slate-700 rounded-lg pl-4 pr-10 py-2.5 bg-transparent text-sm text-slate-700 dark:text-slate-200 outline-none appearance-none focus:border-emerald-500 cursor-pointer">
                <option>All</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 text-slate-500 pointer-events-none" />
            </div>

            {/* Month Dropdown */}
            <div className="relative shrink-0">
              <label className="absolute -top-2.5 left-3 bg-white dark:bg-slate-800 px-1 text-[11px] text-slate-500 dark:text-slate-400 font-semibold z-10">
                Month
              </label>
              <select className="relative w-32 border border-slate-200 dark:border-slate-700 rounded-lg pl-4 pr-10 py-2.5 bg-transparent text-sm text-slate-700 dark:text-slate-200 outline-none appearance-none focus:border-emerald-500 cursor-pointer">
                <option>August</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 text-slate-500 pointer-events-none" />
            </div>

            {/* Year Dropdown */}
            <div className="relative shrink-0">
              <label className="absolute -top-2.5 left-3 bg-white dark:bg-slate-800 px-1 text-[11px] text-slate-500 dark:text-slate-400 font-semibold z-10">
                Year
              </label>
              <select className="relative w-28 border border-slate-200 dark:border-slate-700 rounded-lg pl-4 pr-10 py-2.5 bg-transparent text-sm text-slate-700 dark:text-slate-200 outline-none appearance-none focus:border-emerald-500 cursor-pointer">
                <option>2026</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 text-slate-500 pointer-events-none" />
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-3 ml-2 shrink-0">
              <button className="p-2 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors cursor-pointer">
                <RefreshCw className="w-5 h-5" />
              </button>

              <button
                className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Export to Excel"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-emerald-600 fill-current">
                  <path d="M21.17 3.25Q22.4 3.25 22.4 4.47v15.06q0 1.22-1.23 1.22H2.83Q1.6 20.75 1.6 19.53V4.47Q1.6 3.25 2.83 3.25h18.34zM7.6 17.5l2.79-3.79-2.61-3.79h2.36l1.24 2.22 1.34-2.22h2.23l-2.67 3.76 2.84 3.82h-2.43l-1.52-2.39-1.46 2.39H7.6z" />
                  <path
                    d="M12.92 13.62l1.32-2.13h-2.14l1.17 2h1.49l-1.39-2.15z"
                    className="fill-white"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div className="flex justify-end mt-4">
            <input
              type="text"
              placeholder="Search Item"
              className="w-full max-w-[240px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg px-4 py-2.5 text-sm text-slate-800 dark:text-slate-200 outline-none focus:border-emerald-500 placeholder:text-slate-400 shadow-xs"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-[#f8f9fa] dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 font-bold border-y border-slate-100 dark:border-border/50">
                <th className="p-4 w-12 text-center"></th>
                <th className="p-4">Item Code</th>
                <th className="p-4">Description</th>
                <th className="p-4">Total Planned</th>
                <th className="p-4">Total Actual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-border/40 text-slate-700 dark:text-slate-200">
              <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                <td className="p-4 text-center">
                  <ChevronDown className="w-4 h-4 text-slate-400 inline-block" />
                </td>
                <td className="p-4">10010</td>
                <td className="p-4">SOLVENT CEMENT 25 G</td>
                <td className="p-4">0</td>
                <td className="p-4">0</td>
              </tr>
              <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                <td className="p-4 text-center">
                  <ChevronDown className="w-4 h-4 text-slate-400 inline-block" />
                </td>
                <td className="p-4">10011</td>
                <td className="p-4">SOLVENT CEMENT 50 G</td>
                <td className="p-4">0</td>
                <td className="p-4">0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
