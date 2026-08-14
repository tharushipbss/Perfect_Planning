import { ChevronLeft, ChevronRight, ListTodo, Forward } from "lucide-react";

export function SchedulingTimelineWireframe() {
  return (
    <div className="space-y-6">
      {/* Top controls */}
      <div className="flex justify-end gap-3 text-blue-500">
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
          <ListTodo className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
          <Forward className="w-5 h-5" />
        </button>
      </div>

      <div className="rounded-2xl border border-slate-100 dark:border-border/60 bg-white dark:bg-card overflow-hidden shadow-2xs p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center rounded-lg border border-slate-200 dark:border-border p-1 bg-white dark:bg-slate-900 w-full lg:w-auto">
            <button className="flex-1 lg:flex-none px-6 py-1.5 rounded-md border border-blue-200 bg-white dark:bg-slate-800 text-blue-500 font-medium shadow-sm text-sm cursor-pointer">
              Day
            </button>
            <button className="flex-1 lg:flex-none px-6 py-1.5 rounded-md border border-transparent text-blue-500 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer border-l-slate-200 dark:border-l-border">
              Week
            </button>
            <button className="flex-1 lg:flex-none px-6 py-1.5 rounded-md border border-transparent text-blue-500 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer border-l-slate-200 dark:border-l-border">
              Month
            </button>
          </div>

          <div className="text-lg font-bold text-slate-600 dark:text-slate-300">August 2026</div>

          <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
            <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 cursor-pointer">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="px-4 py-1.5 rounded-md border border-blue-400 text-blue-500 font-medium text-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
              Today
            </button>
            <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 cursor-pointer">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Agenda List */}
        <div className="border border-slate-200 dark:border-border/60 rounded-xl overflow-hidden">
          {/* Day 1 */}
          <div className="flex flex-col sm:flex-row border-b border-slate-200 dark:border-border/60">
            <div className="w-full sm:w-48 p-4 sm:p-6 text-sm">
              <div className="font-semibold text-slate-700 dark:text-slate-300">August 11</div>
              <div className="text-slate-500">Tuesday</div>
            </div>
            <div className="flex-1 p-4 sm:p-6 border-l sm:border-slate-200 sm:dark:border-border/60">
              <div className="space-y-5">
                <div className="flex items-start gap-4 sm:gap-8 text-sm">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 shrink-0"></div>
                  <div className="w-24 text-slate-600 dark:text-slate-400 shrink-0 text-right">
                    07:00 - 19:00
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 font-medium">
                    T.C.T.F 110 MM BE &rarr; (T.C.T.F. ASSEMBLY POINT)
                  </div>
                </div>
                <div className="flex items-start gap-4 sm:gap-8 text-sm">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 shrink-0"></div>
                  <div className="w-24 text-slate-600 dark:text-slate-400 shrink-0 text-right">
                    07:00 - 19:00
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 font-medium">
                    PIPE PNT/11 4 X 75 PE &rarr; (KMD 60 - EXTRUDER MACHINE)
                  </div>
                </div>
                <div className="flex items-start gap-4 sm:gap-8 text-sm">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 shrink-0"></div>
                  <div className="w-24 text-slate-600 dark:text-slate-400 shrink-0 text-right">
                    Full day
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 font-medium">
                    T.C.T.F 110 MM BE &rarr; (T.C.T.F. ASSEMBLY POINT)
                  </div>
                </div>
                <div className="flex items-start gap-4 sm:gap-8 text-sm">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 shrink-0"></div>
                  <div className="w-24 text-slate-600 dark:text-slate-400 shrink-0 text-right">
                    Full day
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 font-medium">
                    PIPE PNT/7 4 X 75 SS &rarr; (KMD 60 - EXTRUDER MACHINE)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Day 2 */}
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-48 p-4 sm:p-6 text-sm">
              <div className="font-semibold text-slate-700 dark:text-slate-300">August 12</div>
              <div className="text-slate-500">Wednesday</div>
            </div>
            <div className="flex-1 p-4 sm:p-6 border-l sm:border-slate-200 sm:dark:border-border/60">
              <div className="space-y-5">
                <div className="flex items-start gap-4 sm:gap-8 text-sm">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 shrink-0"></div>
                  <div className="w-24 text-slate-600 dark:text-slate-400 shrink-0 text-right">
                    Full day
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 font-medium">
                    T.C.T.F 110 MM BE &rarr; (T.C.T.F. ASSEMBLY POINT)
                  </div>
                </div>
                <div className="flex items-start gap-4 sm:gap-8 text-sm">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 shrink-0"></div>
                  <div className="w-24 text-slate-600 dark:text-slate-400 shrink-0 text-right">
                    Full day
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 font-medium">
                    PIPE PNT/7 4 X 75 SS &rarr; (KMD 60 - EXTRUDER MACHINE)
                  </div>
                </div>
                <div className="flex items-start gap-4 sm:gap-8 text-sm">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 shrink-0"></div>
                  <div className="w-24 text-slate-600 dark:text-slate-400 shrink-0 text-right">
                    07:00 - 19:00
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 font-medium">
                    T.C.T.F 50MM SS &rarr; (T.C.T.F. ASSEMBLY POINT)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
