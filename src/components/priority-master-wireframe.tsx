import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PriorityRecord {
  code: string;
  description: string;
  priority: string;
}

const initialRecords: PriorityRecord[] = [
  {
    code: "PRIORITY_8",
    description: "PRIORITY Product Sequence",
    priority: "1",
  },
  {
    code: "PRIORITY_1",
    description: "PRIORITY Sales Orders",
    priority: "2",
  },
  {
    code: "PRIORITY_2",
    description: "PRIORITY Stock Level",
    priority: "3",
  },
  {
    code: "PRIORITY_3",
    description: "PRIORITY Market Priority",
    priority: "4",
  },
  {
    code: "PRIORITY_4",
    description: "PRIORITY Same Type Of Products",
    priority: "5",
  },
  {
    code: "PRIORITY_5",
    description: "PRIORITY GP Percentage",
    priority: "6",
  },
  {
    code: "PRIORITY_6",
    description: "PRIORITY Multi Cavity",
    priority: "7",
  },
];

export function PriorityMasterWireframe() {
  const [records] = useState<PriorityRecord[]>(initialRecords);

  return (
    <div className="space-y-6">
      {/* Main Table Container */}
      <div className="rounded-2xl border border-slate-100 dark:border-border/60 bg-white dark:bg-card overflow-hidden shadow-2xs mt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-border/50">
                <th className="p-4 sm:p-5 font-medium">Code</th>
                <th className="p-4 sm:p-5 font-medium w-1/2">Description</th>
                <th className="p-4 sm:p-5 font-medium">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-border/40 text-slate-700 dark:text-slate-200">
              {records.map((row) => (
                <tr
                  key={row.code}
                  className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors group"
                >
                  <td className="p-4 sm:p-5 text-slate-800 dark:text-slate-200">{row.code}</td>
                  <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-300">
                    {row.description}
                  </td>
                  <td className="p-4 sm:p-5 text-slate-800 dark:text-slate-200">{row.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
