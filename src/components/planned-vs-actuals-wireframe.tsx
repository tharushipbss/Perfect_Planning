import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "(603) - T.C.T.F 110 MM BE",
    planned: 71,
    actual: 0,
  },
  {
    name: "(605) - T.C.T.F 110 MM BE",
    planned: 2,
    actual: 0,
  },
  {
    name: "(606) - T.C.T.F 50MM SS",
    planned: 20,
    actual: 0,
  },
  {
    name: "(601) - PIPE PNT/11 4 X 75 PE",
    planned: 100,
    actual: 0,
  },
  {
    name: "(598) - PIPE PNT/7 4 X 75 SS",
    planned: 190,
    actual: 0,
  },
];

export function PlannedVsActualsWireframe() {
  return (
    <div className="space-y-6 mt-4">
      <div className="rounded-2xl border border-slate-100 dark:border-border/60 bg-white dark:bg-card p-6 shadow-sm overflow-hidden">
        <div className="w-full h-[550px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 40, right: 40, left: 20, bottom: 100 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
                dark:stroke="#334155"
              />
              <XAxis
                dataKey="name"
                angle={-30}
                textAnchor="end"
                height={100}
                tick={{ fill: "#64748b", fontSize: 13 }}
                axisLine={{ stroke: "#94a3b8" }}
                tickLine={true}
                dy={10}
              />
              <YAxis
                label={{
                  value: "Quantity",
                  position: "top",
                  offset: 20,
                  fill: "#64748b",
                  fontSize: 14,
                  dx: -20,
                }}
                ticks={[0, 30, 60, 90, 120, 150, 180, 210]}
                domain={[0, 210]}
                tick={{ fill: "#64748b", fontSize: 13 }}
                axisLine={{ stroke: "#94a3b8" }}
                tickLine={false}
                dx={-10}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend
                verticalAlign="top"
                height={60}
                iconType="circle"
                wrapperStyle={{ fontSize: "14px", color: "#334155", fontWeight: 500 }}
              />
              <Line
                type="linear"
                dataKey="planned"
                name="Planned"
                stroke="#4f71d5"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2, fill: "white", stroke: "#4f71d5" }}
                activeDot={{ r: 6, fill: "#4f71d5" }}
              />
              <Line
                type="linear"
                dataKey="actual"
                name="Actual"
                stroke="#a4d977"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2, fill: "white", stroke: "#a4d977" }}
                activeDot={{ r: 6, fill: "#a4d977" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
