import { useState } from "react";
import { Calendar as CalendarIcon, ChevronDown, Table, Grid3X3 } from "lucide-react";

interface ShiftSchedule {
  date: string;
  day: string;
  shift1: string;
  shift2: string;
  shift3: string;
}

const initialSchedules: ShiftSchedule[] = [
  {
    date: "8/1/2026",
    day: "Sat",
    shift1: "Working Day",
    shift2: "Working Day",
    shift3: "Working Day",
  },
  {
    date: "8/2/2026",
    day: "Sun",
    shift1: "Working Day",
    shift2: "Working Day",
    shift3: "Working Day",
  },
  {
    date: "8/3/2026",
    day: "Mon",
    shift1: "Working Day",
    shift2: "Working Day",
    shift3: "Working Day",
  },
  {
    date: "8/4/2026",
    day: "Tue",
    shift1: "Working Day",
    shift2: "Working Day",
    shift3: "Working Day",
  },
  {
    date: "8/5/2026",
    day: "Wed",
    shift1: "Working Day",
    shift2: "Working Day",
    shift3: "Working Day",
  },
  {
    date: "8/6/2026",
    day: "Thu",
    shift1: "Working Day",
    shift2: "Working Day",
    shift3: "Working Day",
  },
  {
    date: "8/7/2026",
    day: "Fri",
    shift1: "Working Day",
    shift2: "Working Day",
    shift3: "Working Day",
  },
  {
    date: "8/8/2026",
    day: "Sat",
    shift1: "Working Day",
    shift2: "Working Day",
    shift3: "Non-Working Day",
  },
  {
    date: "8/9/2026",
    day: "Sun",
    shift1: "Non-Working Day",
    shift2: "Non-Working Day",
    shift3: "Non-Working Day",
  },
  {
    date: "8/10/2026",
    day: "Mon",
    shift1: "Working Day",
    shift2: "Working Day",
    shift3: "Working Day",
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

const years = ["2024", "2025", "2026", "2027", "2028"];

export function CalendarMasterWireframe() {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [selectedMonth, setSelectedMonth] = useState("August");
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedDayDetail, setSelectedDayDetail] = useState<number | null>(12);
  const [schedules, setSchedules] = useState<ShiftSchedule[]>(initialSchedules);

  const handleShiftChange = (
    index: number,
    shiftKey: "shift1" | "shift2" | "shift3",
    value: string,
  ) => {
    setSchedules((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [shiftKey]: value };
      return copy;
    });
  };

  const startDay = 6;
  const daysInAugust = 31;

  return (
    <div className="space-y-6">
      {/* Calendar Setup Main Card Container */}
      <div className="rounded-2xl border border-slate-100 dark:border-border/60 bg-white dark:bg-card shadow-2xs overflow-hidden">
        {/* Card Header & Controls */}
        <div className="p-6 md:p-8 flex flex-wrap items-center justify-between border-b border-slate-100 dark:border-border/50 gap-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Calendar Setup</h2>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-border/60">
              <button
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "table"
                    ? "bg-white dark:bg-card text-slate-900 dark:text-slate-100 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
                }`}
              >
                <Table className="h-3.5 w-3.5" />
                <span>Shift Table</span>
              </button>

              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-card text-slate-900 dark:text-slate-100 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
                }`}
              >
                <Grid3X3 className="h-3.5 w-3.5" />
                <span>Calendar Grid</span>
              </button>
            </div>

            {/* Month Selector */}
            <div className="relative">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="pl-3.5 pr-8 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none cursor-pointer appearance-none"
              >
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Year Selector */}
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="pl-3.5 pr-8 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none cursor-pointer appearance-none"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Calendar Icon Badge */}
            <div className="p-2 rounded-xl border border-slate-200 dark:border-border/60 bg-white dark:bg-slate-900 text-emerald-600 shadow-2xs">
              <CalendarIcon className="h-4.5 w-4.5" />
            </div>
          </div>
        </div>

        {/* View 1: Calendar Setup Table (matching screenshot precisely) */}
        {viewMode === "table" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-100 dark:border-border/50">
                  <th className="p-4 sm:p-5 font-semibold w-28">Date</th>
                  <th className="p-4 sm:p-5 font-semibold w-20">Day</th>
                  <th className="p-4 sm:p-5 font-semibold">Shift 1</th>
                  <th className="p-4 sm:p-5 font-semibold">Shift 2</th>
                  <th className="p-4 sm:p-5 font-semibold">Shift 3</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-border/40 text-slate-700 dark:text-slate-200">
                {schedules.map((row, idx) => (
                  <tr
                    key={row.date}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="p-4 sm:p-5 font-medium text-slate-900 dark:text-slate-100">
                      {row.date}
                    </td>
                    <td className="p-4 sm:p-5 font-medium text-slate-600 dark:text-slate-300">
                      {row.day}
                    </td>

                    {/* Shift 1 */}
                    <td className="p-4 sm:p-5">
                      <div className="space-y-1 max-w-[200px]">
                        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          00:00:00-06:59:59
                        </div>
                        <div className="relative">
                          <select
                            value={row.shift1}
                            onChange={(e) => handleShiftChange(idx, "shift1", e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none cursor-pointer appearance-none pr-8 focus:border-emerald-500"
                          >
                            <option value="Working Day">Working Day</option>
                            <option value="Non-Working Day">Non-Working Day</option>
                            <option value="Half Day">Half Day</option>
                            <option value="Maintenance">Maintenance</option>
                          </select>
                          <ChevronDown className="h-3.5 w-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </td>

                    {/* Shift 2 */}
                    <td className="p-4 sm:p-5">
                      <div className="space-y-1 max-w-[200px]">
                        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          07:00:00-18:59:59
                        </div>
                        <div className="relative">
                          <select
                            value={row.shift2}
                            onChange={(e) => handleShiftChange(idx, "shift2", e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none cursor-pointer appearance-none pr-8 focus:border-emerald-500"
                          >
                            <option value="Working Day">Working Day</option>
                            <option value="Non-Working Day">Non-Working Day</option>
                            <option value="Half Day">Half Day</option>
                            <option value="Maintenance">Maintenance</option>
                          </select>
                          <ChevronDown className="h-3.5 w-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </td>

                    {/* Shift 3 */}
                    <td className="p-4 sm:p-5">
                      <div className="space-y-1 max-w-[200px]">
                        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          19:00:00-23:59:59
                        </div>
                        <div className="relative">
                          <select
                            value={row.shift3}
                            onChange={(e) => handleShiftChange(idx, "shift3", e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-border/60 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none cursor-pointer appearance-none pr-8 focus:border-emerald-500"
                          >
                            <option value="Working Day">Working Day</option>
                            <option value="Non-Working Day">Non-Working Day</option>
                            <option value="Half Day">Half Day</option>
                            <option value="Maintenance">Maintenance</option>
                          </select>
                          <ChevronDown className="h-3.5 w-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* View 2: Full Monthly Calendar Grid */}
        {viewMode === "grid" && (
          <div className="p-6 md:p-8 space-y-6">
            {/* Days Header */}
            <div className="grid grid-cols-7 gap-3 text-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            {/* Calendar Cells Grid */}
            <div className="grid grid-cols-7 gap-3">
              {Array.from({ length: startDay }).map((_, idx) => (
                <div
                  key={`empty-${idx}`}
                  className="h-28 rounded-2xl border border-dashed border-slate-200/60 dark:border-slate-800/60 bg-slate-50/40 dark:bg-slate-900/20"
                />
              ))}

              {Array.from({ length: daysInAugust }).map((_, idx) => {
                const dayNum = idx + 1;
                const isToday = dayNum === 12;
                const isSunday = (startDay + idx) % 7 === 0;
                const isSelected = selectedDayDetail === dayNum;

                return (
                  <div
                    key={dayNum}
                    onClick={() => setSelectedDayDetail(dayNum)}
                    className={`h-28 rounded-2xl border p-3 flex flex-col justify-between transition-all cursor-pointer relative ${
                      isToday
                        ? "border-[#007a63] bg-emerald-50/30 dark:bg-emerald-950/20 shadow-xs ring-2 ring-[#007a63]/20"
                        : isSelected
                          ? "border-slate-400 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50"
                          : "border-slate-100 dark:border-border/60 bg-white dark:bg-slate-900 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold h-6 w-6 rounded-full flex items-center justify-center ${
                          isToday
                            ? "bg-[#007a63] text-white"
                            : isSunday
                              ? "text-rose-500"
                              : "text-slate-800 dark:text-slate-200"
                        }`}
                      >
                        {dayNum}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                          isSunday
                            ? "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300"
                            : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                        }`}
                      >
                        {isSunday ? "Off" : "3 Shifts"}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {!isSunday ? (
                        <>
                          <div className="text-[10px] font-medium text-slate-500 truncate flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                            <span>00:00 - Working</span>
                          </div>
                          <div className="text-[10px] font-medium text-slate-500 truncate flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                            <span>07:00 - Working</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-[10px] italic text-slate-400">Non-Working Day</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
