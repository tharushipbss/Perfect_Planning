import { ChevronLeft, ChevronRight } from "lucide-react";

export function ErpSyncWireframe() {
  return (
    <div className="space-y-6 mt-4">
      {/* Top Sync Actions Card */}
      <div className="bg-[#1e2329] dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-slate-700/50 gap-y-6">
          {/* Work Orders */}
          <div className="flex flex-col items-center justify-center px-4">
            <h3 className="text-white font-bold mb-3 text-center">Work Orders</h3>
            <button className="px-5 py-2 rounded-lg border border-slate-600 bg-transparent text-white font-semibold text-sm hover:bg-slate-800 transition-colors cursor-pointer">
              Sync Now
            </button>
          </div>

          {/* Products */}
          <div className="flex flex-col items-center justify-center px-4">
            <h3 className="text-white font-bold mb-3 text-center">Products</h3>
            <button className="px-5 py-2 rounded-lg border border-slate-600 bg-transparent text-white font-semibold text-sm hover:bg-slate-800 transition-colors cursor-pointer">
              Sync Now
            </button>
          </div>

          {/* Sales Forecast */}
          <div className="flex flex-col items-center justify-center px-4">
            <h3 className="text-white font-bold mb-3 text-center">Sales Forecast</h3>
            <button className="px-5 py-2 rounded-lg border border-slate-600 bg-transparent text-white font-semibold text-sm hover:bg-slate-800 transition-colors cursor-pointer">
              Sync Now
            </button>
          </div>

          {/* Service Call */}
          <div className="flex flex-col items-center justify-center px-4">
            <h3 className="text-white font-bold mb-3 text-center">Service Call</h3>
            <button className="px-5 py-2 rounded-lg border border-slate-600 bg-transparent text-white font-semibold text-sm hover:bg-slate-800 transition-colors cursor-pointer">
              Sync Now
            </button>
          </div>

          {/* Sub Product Forecast */}
          <div className="flex flex-col items-center justify-center px-4">
            <h3 className="text-white font-bold mb-3 text-center">Sub Product Forecast</h3>
            <button className="px-5 py-2 rounded-lg border border-slate-600 bg-transparent text-white font-semibold text-sm hover:bg-slate-800 transition-colors cursor-pointer">
              Sync Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="rounded-2xl border border-slate-100 dark:border-border/60 bg-white dark:bg-card overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-border/50">
                <th className="p-4 sm:p-5 font-medium">Table Name</th>
                <th className="p-4 sm:p-5 font-medium text-center">Record Count</th>
                <th className="p-4 sm:p-5 font-medium text-center">Last Sync</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-border/40 text-slate-700 dark:text-slate-200">
              <tr>
                <td colSpan={3} className="p-12 text-center text-slate-500 font-medium">
                  No rows
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Pagination Bar */}
        <div className="flex items-center justify-end gap-6 px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
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

      {/* Bottom Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-slate-200 dark:border-border/70 bg-white dark:bg-card text-slate-800 dark:text-slate-100 font-bold text-sm shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            Clear All
          </button>
          <button className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-slate-200 dark:border-border/70 bg-white dark:bg-card text-slate-800 dark:text-slate-100 font-bold text-sm shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            Update System Data
          </button>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-slate-200 dark:border-border/70 bg-white dark:bg-card text-slate-800 dark:text-slate-100 font-bold text-sm shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            Update Closed Work Orders
          </button>
          <button className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-slate-200 dark:border-border/70 bg-white dark:bg-card text-slate-800 dark:text-slate-100 font-bold text-sm shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            Update Cancelled Work Orders
          </button>
        </div>
      </div>
    </div>
  );
}
