import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const workOrderData = [
  { name: "Planned", value: 1, color: "#00d284", textColor: "text-[#00d284]" },
  { name: "Pending", value: 98.5, color: "#0082fb", textColor: "text-[#0082fb]" },
  { name: "Hold", value: 0.25, color: "#ff6b35", textColor: "text-[#ff6b35]" },
  { name: "Others", value: 0.25, color: "#ffc107", textColor: "text-[#ffc107]" },
];

const machineData = [
  {
    name: "Available",
    value: 96,
    color: "#22c55e",
    textColor: "text-slate-700 dark:text-slate-200",
  },
  {
    name: "Under Maintenance",
    value: 4,
    color: "#ff4d2e",
    textColor: "text-slate-700 dark:text-slate-200",
  },
  {
    name: "Unavailable",
    value: 0,
    color: "#94a3b8",
    textColor: "text-slate-700 dark:text-slate-200",
  },
];

export function DashboardWireframe() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Card 1: Work Order Distribution */}
        <div className="rounded-2xl border border-slate-100 dark:border-border/60 bg-white dark:bg-card p-6 md:p-8 shadow-xs hover:shadow-md transition-shadow">
          <h2 className="text-lg font-bold text-center text-slate-800 dark:text-slate-100 mb-6">
            Work Order Distribution
          </h2>
          <div className="h-64 sm:h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={workOrderData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  strokeWidth={2}
                  stroke="var(--background, #ffffff)"
                >
                  {workOrderData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} className="outline-none" />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value}%`, ""]}
                  contentStyle={{
                    backgroundColor: "var(--card, #ffffff)",
                    borderColor: "var(--border, #e2e8f0)",
                    borderRadius: "0.75rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    fontSize: "12px",
                  }}
                  cursor={{ fill: "transparent" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 pt-4 border-t border-border/40 text-xs font-semibold">
            {workOrderData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 cursor-default">
                <span
                  className="h-3.5 w-7 rounded-md shrink-0 shadow-2xs"
                  style={{ backgroundColor: item.color }}
                />
                <span className={`font-semibold ${item.textColor}`}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Machine Availability */}
        <div className="rounded-2xl border border-slate-100 dark:border-border/60 bg-white dark:bg-card p-6 md:p-8 shadow-xs hover:shadow-md transition-shadow">
          <h2 className="text-lg font-bold text-center text-slate-800 dark:text-slate-100 mb-6">
            Machine Availability
          </h2>
          <div className="h-64 sm:h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={machineData}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={100}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  strokeWidth={2}
                  stroke="var(--background, #ffffff)"
                >
                  {machineData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} className="outline-none" />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value}%`, ""]}
                  contentStyle={{
                    backgroundColor: "var(--card, #ffffff)",
                    borderColor: "var(--border, #e2e8f0)",
                    borderRadius: "0.75rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    fontSize: "12px",
                  }}
                  cursor={{ fill: "transparent" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 pt-4 border-t border-border/40 text-xs font-semibold">
            {machineData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 cursor-default">
                <span
                  className="h-3.5 w-7 rounded-md shrink-0 shadow-2xs"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-700 dark:text-slate-300 font-semibold">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
