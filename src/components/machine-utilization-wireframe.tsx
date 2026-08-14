import { ChevronLeft, ChevronRight, Forward } from "lucide-react";
import { useState } from "react";

const DATES = [
  "Sat 1",
  "Sun 2",
  "Mon 3",
  "Tue 4",
  "Wed 5",
  "Thu 6",
  "Fri 7",
  "Sat 8",
  "Sun 9",
  "Mon 10",
  "Tue 11",
  "Wed 12",
  "Thu 13",
];

const LINES = [
  {
    name: "SEWING LINE 01 - MAIN PLANT",
    data: [85, 90, 92, 88, 91, 0, 0, 94, 92, 89, 90, 88, 92],
  },
  {
    name: "CUTTING LINE 02 - WATERPROOF FABRIC",
    data: [95, 96, 98, 94, 95, 0, 0, 98, 97, 95, 96, 94, 98],
  },
  {
    name: "HEAT SEALING & ASSEMBLY LINE 03",
    data: [80, 82, 88, 85, 87, 0, 0, 89, 90, 88, 85, 86, 88],
  },
  {
    name: "FINISHING & PACKAGING LINE 04",
    data: [90, 92, 94, 91, 93, 0, 0, 95, 94, 92, 93, 91, 95],
  },
];

export function LineUtilizationWireframe() {
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <div className="space-y-6 mt-4">
      {/* Container */}
      <div className="rounded-2xl border border-slate-100 dark:border-border/60 bg-white dark:bg-card shadow-sm">
        {/* Top actions/filters */}
        <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-border/50">
          <div className="flex justify-end mb-4">
            <button className="text-sky-500 hover:bg-slate-50 dark:hover:bg-slate-800 p-1.5 rounded transition-colors cursor-pointer">
              <Forward className="w-5 h-5 -rotate-90" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <select className="flex-1 sm:max-w-xs border border-slate-200 dark:border-border/70 rounded-lg px-4 py-2.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 outline-none focus:border-emerald-500 shadow-xs appearance-none">
              <option>August</option>
            </select>
            <select className="flex-1 sm:max-w-xs border border-slate-200 dark:border-border/70 rounded-lg px-4 py-2.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 outline-none focus:border-emerald-500 shadow-xs appearance-none">
              <option>2026</option>
            </select>
          </div>
        </div>

        {/* Table Area with scrollbar */}
        <div className="w-full overflow-x-auto pb-4">
          <table className="w-full text-sm border-collapse min-w-max">
            <thead>
              <tr>
                <th className="sticky left-0 z-20 bg-[#475569] text-white p-4 font-bold text-left shadow-[1px_0_0_rgba(255,255,255,0.1)] w-[260px]">
                  Production Line
                </th>
                {DATES.map((date) => (
                  <th
                    key={date}
                    className="p-4 font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 min-w-[100px] text-center border-b border-slate-100 dark:border-border/50"
                  >
                    {date}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LINES.map((line, i) => (
                <tr key={i}>
                  <td className="sticky left-0 z-10 bg-[#475569] text-white p-4 font-semibold text-xs tracking-wide shadow-[1px_0_0_rgba(255,255,255,0.1)] border-t border-[#5e6c84]">
                    {line.name}
                  </td>
                  {line.data.map((val, idx) => {
                    const isZero = val === 0;
                    return (
                      <td
                        key={idx}
                        className={`p-2 border-t border-white dark:border-slate-800 ${isZero ? "bg-[#e6b8b8] dark:bg-rose-900/40" : "bg-[#c3e6cb] dark:bg-emerald-900/40"}`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <div
                            className={`w-3.5 h-1.5 rounded-full ${isZero ? "bg-slate-400/60" : "bg-emerald-600"}`}
                          />
                          <span
                            className={`text-xs font-bold ${isZero ? "text-slate-700 dark:text-slate-300" : "text-slate-800 dark:text-slate-100"}`}
                          >
                            {val}%
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Custom fake scrollbar indicator underneath table */}
          <div className="px-4 mt-2">
            <div className="h-2.5 w-1/2 bg-slate-400 rounded-full" />
          </div>
        </div>

        {/* Footer Pagination Bar */}
        <div className="flex items-center justify-end gap-4 px-6 py-4 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-border/50">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="bg-transparent font-medium text-slate-700 dark:text-slate-300 outline-none cursor-pointer appearance-none"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div>
            1–{Math.min(LINES.length, rowsPerPage)} of {LINES.length}
          </div>
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

export const MachineUtilizationWireframe = LineUtilizationWireframe;
