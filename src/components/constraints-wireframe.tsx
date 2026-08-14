import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import { useState } from "react";

export function ConstraintsWireframe() {
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const data = [
    {
      id: "3",
      org: "1",
      branch: "",
      code1: "242",
      code2: "41",
      shift: "Shift 1 (00:...",
      factory: "",
      building: "",
      floor: "",
      machine: "CIN 45 / (...",
      task: "Default",
      constraintType: "Job Card/...",
      constraintDesc: "CIN 45 co...",
      fromDate: "",
      toDate: "",
      status: "Active",
      createdBy: "",
      createDate: "2024-12-09 , 13:12:29",
      updatedBy: "1",
      updateDate: "2024-12-09 , 13:12:29",
      highlight: false,
    },
    {
      id: "4",
      org: "1",
      branch: "",
      code1: "232",
      code2: "41",
      shift: "Shift 1 (00:...",
      factory: "",
      building: "",
      floor: "",
      machine: "LSPD 65/...",
      task: "Default",
      constraintType: "Job Card/...",
      constraintDesc: "HTF 360 P...",
      fromDate: "",
      toDate: "",
      status: "Active",
      createdBy: "",
      createDate: "2024-12-09 , 13:12:29",
      updatedBy: "1",
      updateDate: "2024-12-09 , 13:12:29",
      highlight: false,
    },
    {
      id: "5",
      org: "1",
      branch: "",
      code1: "304",
      code2: "41",
      shift: "Shift 1 (00:...",
      factory: "",
      building: "",
      floor: "",
      machine: "",
      task: "Default",
      constraintType: "Job Card/...",
      constraintDesc: "Planned p...",
      fromDate: "",
      toDate: "",
      status: "Active",
      createdBy: "",
      createDate: "2024-12-09 , 13:12:29",
      updatedBy: "1",
      updateDate: "2024-12-09 , 13:12:29",
      highlight: false,
    },
    {
      id: "14",
      org: "1",
      branch: "",
      code1: "546",
      code2: "41",
      shift: "Shift 1 (00:...",
      factory: "",
      building: "",
      floor: "",
      machine: "KMD 60/2...",
      task: "Default",
      constraintType: "Job Card/...",
      constraintDesc: "vaccum a...",
      fromDate: "",
      toDate: "",
      status: "Active",
      createdBy: "",
      createDate: "2024-12-09 , 13:12:29",
      updatedBy: "1",
      updateDate: "2024-12-09 , 13:12:29",
      highlight: false,
    },
    {
      id: "18",
      org: "1",
      branch: "",
      code1: "291",
      code2: "41",
      shift: "Shift 1 (00:...",
      factory: "",
      building: "",
      floor: "",
      machine: "",
      task: "Default",
      constraintType: "Job Card/...",
      constraintDesc: "Main gear...",
      fromDate: "",
      toDate: "",
      status: "Active",
      createdBy: "",
      createDate: "2024-12-09 , 13:12:29",
      updatedBy: "1",
      updateDate: "2024-12-09 , 13:12:29",
      highlight: true,
    },
    {
      id: "19",
      org: "1",
      branch: "",
      code1: "254",
      code2: "41",
      shift: "Shift 1 (00:...",
      factory: "",
      building: "",
      floor: "",
      machine: "KMD 60/2...",
      task: "Default",
      constraintType: "Job Card/...",
      constraintDesc: "Moulding...",
      fromDate: "",
      toDate: "",
      status: "Active",
      createdBy: "",
      createDate: "2024-12-09 , 13:12:29",
      updatedBy: "1",
      updateDate: "2024-12-09 , 13:12:29",
      highlight: false,
    },
  ];

  return (
    <div className="space-y-6 mt-4">
      {/* Header Actions */}
      <div className="flex justify-end items-center gap-4">
        <button className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer">
          Add Constraint
        </button>
        <button
          className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          title="Export to Excel"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 text-emerald-600 fill-current">
            <path d="M21.17 3.25Q22.4 3.25 22.4 4.47v15.06q0 1.22-1.23 1.22H2.83Q1.6 20.75 1.6 19.53V4.47Q1.6 3.25 2.83 3.25h18.34zM7.6 17.5l2.79-3.79-2.61-3.79h2.36l1.24 2.22 1.34-2.22h2.23l-2.67 3.76 2.84 3.82h-2.43l-1.52-2.39-1.46 2.39H7.6z" />
            <path d="M12.92 13.62l1.32-2.13h-2.14l1.17 2h1.49l-1.39-2.15z" className="fill-white" />
          </svg>
        </button>
      </div>

      {/* Main Card Container */}
      <div className="rounded-2xl border border-slate-100 dark:border-border/60 bg-white dark:bg-card overflow-hidden shadow-sm">
        {/* Data Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap min-w-max">
            <thead>
              <tr className="bg-[#f8f9fa] dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-border/50">
                <th className="p-4 sm:p-5">Constraint ID</th>
                <th className="p-4 sm:p-5">Organizatio...</th>
                <th className="p-4 sm:p-5">Branch Code</th>
                <th className="p-4 sm:p-5">Constraint ...</th>
                <th className="p-4 sm:p-5">Constraint ...</th>
                <th className="p-4 sm:p-5">Shift ID</th>
                <th className="p-4 sm:p-5">Factory Code</th>
                <th className="p-4 sm:p-5">Building</th>
                <th className="p-4 sm:p-5">Floor</th>
                <th className="p-4 sm:p-5">Machine</th>
                <th className="p-4 sm:p-5">Task</th>
                <th className="p-4 sm:p-5">Constraint ...</th>
                <th className="p-4 sm:p-5">Constraint ...</th>
                <th className="p-4 sm:p-5">From Date</th>
                <th className="p-4 sm:p-5">To Date</th>
                <th className="p-4 sm:p-5">Status</th>
                <th className="p-4 sm:p-5">Created by</th>
                <th className="p-4 sm:p-5">Create Date & Time</th>
                <th className="p-4 sm:p-5">Updated by</th>
                <th className="p-4 sm:p-5">Updated date & Time</th>
                <th className="p-4 sm:p-5 w-12 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-border/40 text-slate-700 dark:text-slate-200">
              {data.map((row, i) => (
                <tr
                  key={i}
                  className={`transition-colors ${
                    row.highlight
                      ? "bg-[#e8f7f0] dark:bg-emerald-900/10 hover:bg-[#dcf3e8] dark:hover:bg-emerald-900/20"
                      : "bg-white dark:bg-card hover:bg-slate-50/60 dark:hover:bg-slate-800/30"
                  }`}
                >
                  <td className="p-4 sm:p-5">{row.id}</td>
                  <td className="p-4 sm:p-5">{row.org}</td>
                  <td className="p-4 sm:p-5">{row.branch}</td>
                  <td className="p-4 sm:p-5">{row.code1}</td>
                  <td className="p-4 sm:p-5">{row.code2}</td>
                  <td className="p-4 sm:p-5">{row.shift}</td>
                  <td className="p-4 sm:p-5">{row.factory}</td>
                  <td className="p-4 sm:p-5">{row.building}</td>
                  <td className="p-4 sm:p-5">{row.floor}</td>
                  <td className="p-4 sm:p-5">{row.machine}</td>
                  <td className="p-4 sm:p-5">{row.task}</td>
                  <td className="p-4 sm:p-5">{row.constraintType}</td>
                  <td className="p-4 sm:p-5">{row.constraintDesc}</td>
                  <td className="p-4 sm:p-5">{row.fromDate}</td>
                  <td className="p-4 sm:p-5">{row.toDate}</td>
                  <td className="p-4 sm:p-5">{row.status}</td>
                  <td className="p-4 sm:p-5">{row.createdBy}</td>
                  <td className="p-4 sm:p-5">{row.createDate}</td>
                  <td className="p-4 sm:p-5">{row.updatedBy}</td>
                  <td className="p-4 sm:p-5">{row.updateDate}</td>
                  <td className="p-4 sm:p-5 text-center">
                    <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Custom fake scrollbar indicator underneath table */}
          <div className="px-4 mt-1 mb-2">
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto sm:ml-40" />
            </div>
          </div>
        </div>

        {/* Footer Pagination Bar */}
        <div className="flex items-center justify-end gap-6 px-6 py-4 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-border/50">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="bg-transparent font-medium text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-slate-500 ml-1"
            >
              <path d="M0 0L5 6L10 0H0Z" fill="currentColor" />
            </svg>
          </div>
          <div>1–6 of 6</div>
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
