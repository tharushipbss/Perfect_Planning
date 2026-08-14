import { useState } from "react";
import {
  FileSpreadsheet,
  Plus,
  Edit2,
  Trash2,
  X as CloseIcon,
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreVertical,
  Search,
  CheckCircle2,
  AlertCircle,
  Users,
  Award,
  Zap,
  Layers,
  Info,
} from "lucide-react";

export interface LabourSkillItem {
  id: string;
  skillName: string;
  skillLevel: "Beginner" | "Intermediate" | "Skilled" | "Expert";
  efficiencyPercent: number;
}

export interface LabourRecord {
  labourId: string;
  employeeName: string;
  department: string;
  defaultLine: string;
  primarySkill: string;
  skillLevel: "Beginner" | "Intermediate" | "Skilled" | "Expert";
  efficiencyPercent: number;
  shift: string;
  availabilityStatus: "Available" | "Leave" | "Training" | "Unavailable";
  status: "Active" | "Inactive";
  skills: LabourSkillItem[];
  createdDateTime?: string;
  updatedDateTime?: string;
}

const initialRecords: LabourRecord[] = [
  {
    labourId: "L-1001",
    employeeName: "Kamal Perera",
    department: "Main Sewing Dept",
    defaultLine: "Line 01 - Sewing & Stitching",
    primarySkill: "Single Needle Stitching",
    skillLevel: "Skilled",
    efficiencyPercent: 90,
    shift: "Shift 1 (Day)",
    availabilityStatus: "Available",
    status: "Active",
    skills: [
      {
        id: "s1",
        skillName: "Single Needle Stitching",
        skillLevel: "Skilled",
        efficiencyPercent: 90,
      },
      {
        id: "s2",
        skillName: "Overlock Machine",
        skillLevel: "Intermediate",
        efficiencyPercent: 75,
      },
      {
        id: "s3",
        skillName: "Bartack Machine",
        skillLevel: "Skilled",
        efficiencyPercent: 85,
      },
    ],
    createdDateTime: "2026-01-15 , 08:30",
    updatedDateTime: "2026-08-01 , 10:15",
  },
  {
    labourId: "L-1002",
    employeeName: "Nimali Fernando",
    department: "Waterproof Cutting Dept",
    defaultLine: "Line 02 - Automated Fabric Cutting",
    primarySkill: "Automated Laser Cutting",
    skillLevel: "Expert",
    efficiencyPercent: 95,
    shift: "Shift 1 (Day)",
    availabilityStatus: "Available",
    status: "Active",
    skills: [
      {
        id: "s1",
        skillName: "Automated Laser Cutting",
        skillLevel: "Expert",
        efficiencyPercent: 95,
      },
      {
        id: "s2",
        skillName: "Fabric Spreading",
        skillLevel: "Skilled",
        efficiencyPercent: 88,
      },
    ],
    createdDateTime: "2026-01-20 , 09:12",
    updatedDateTime: "2026-08-05 , 14:20",
  },
  {
    labourId: "L-1003",
    employeeName: "Sunil Shantha",
    department: "Bonding & Heat Sealing Dept",
    defaultLine: "Line 03 - Heat Sealing & Assembly",
    primarySkill: "Heat Sealing & Tape Seaming",
    skillLevel: "Skilled",
    efficiencyPercent: 88,
    shift: "Shift 1 (Day)",
    availabilityStatus: "Available",
    status: "Active",
    skills: [
      {
        id: "s1",
        skillName: "Heat Sealing & Tape Seaming",
        skillLevel: "Skilled",
        efficiencyPercent: 88,
      },
      {
        id: "s2",
        skillName: "Ultrasonic Bonding",
        skillLevel: "Intermediate",
        efficiencyPercent: 80,
      },
    ],
    createdDateTime: "2026-02-01 , 11:00",
    updatedDateTime: "2026-07-28 , 16:45",
  },
  {
    labourId: "L-1004",
    employeeName: "Kasun Silva",
    department: "Main Sewing Dept",
    defaultLine: "Line 01 - Sewing & Stitching",
    primarySkill: "Overlock Machine",
    skillLevel: "Intermediate",
    efficiencyPercent: 78,
    shift: "Shift 2 (Night)",
    availabilityStatus: "Training",
    status: "Active",
    skills: [
      {
        id: "s1",
        skillName: "Overlock Machine",
        skillLevel: "Intermediate",
        efficiencyPercent: 78,
      },
      {
        id: "s2",
        skillName: "Single Needle Stitching",
        skillLevel: "Beginner",
        efficiencyPercent: 60,
      },
    ],
    createdDateTime: "2026-03-10 , 13:40",
    updatedDateTime: "2026-08-10 , 11:30",
  },
  {
    labourId: "L-1005",
    employeeName: "Sanduni De Silva",
    department: "Finishing & Packaging Line",
    defaultLine: "Line 04 - Finishing & Packaging",
    primarySkill: "Quality Inspection & Testing",
    skillLevel: "Expert",
    efficiencyPercent: 96,
    shift: "Shift 1 (Day)",
    availabilityStatus: "Available",
    status: "Active",
    skills: [
      {
        id: "s1",
        skillName: "Quality Inspection & Testing",
        skillLevel: "Expert",
        efficiencyPercent: 96,
      },
      {
        id: "s2",
        skillName: "Garment Pressing & Ironing",
        skillLevel: "Skilled",
        efficiencyPercent: 90,
      },
      {
        id: "s3",
        skillName: "Final Packaging",
        skillLevel: "Expert",
        efficiencyPercent: 98,
      },
    ],
    createdDateTime: "2026-02-14 , 10:20",
    updatedDateTime: "2026-08-08 , 09:10",
  },
  {
    labourId: "L-1006",
    employeeName: "Roshan Wickramasinghe",
    department: "Umbrella Frame & Metalwork",
    defaultLine: "Line 05 - Umbrella Frame & Metalwork",
    primarySkill: "Frame Assembly & Riveting",
    skillLevel: "Skilled",
    efficiencyPercent: 85,
    shift: "Shift 1 (Day)",
    availabilityStatus: "Leave",
    status: "Active",
    skills: [
      {
        id: "s1",
        skillName: "Frame Assembly & Riveting",
        skillLevel: "Skilled",
        efficiencyPercent: 85,
      },
      {
        id: "s2",
        skillName: "Metal Shaft Cutting",
        skillLevel: "Skilled",
        efficiencyPercent: 82,
      },
    ],
    createdDateTime: "2026-03-01 , 08:15",
    updatedDateTime: "2026-08-11 , 15:00",
  },
  {
    labourId: "L-1007",
    employeeName: "Dilrukshi Samarasinghe",
    department: "Main Sewing Dept",
    defaultLine: "Line 01 - Sewing & Stitching",
    primarySkill: "Bartack & Button Attaching",
    skillLevel: "Skilled",
    efficiencyPercent: 92,
    shift: "Shift 1 (Day)",
    availabilityStatus: "Available",
    status: "Active",
    skills: [
      {
        id: "s1",
        skillName: "Bartack & Button Attaching",
        skillLevel: "Skilled",
        efficiencyPercent: 92,
      },
      {
        id: "s2",
        skillName: "Single Needle Stitching",
        skillLevel: "Intermediate",
        efficiencyPercent: 80,
      },
    ],
    createdDateTime: "2026-04-05 , 14:00",
    updatedDateTime: "2026-08-12 , 08:45",
  },
  {
    labourId: "L-1008",
    employeeName: "Anura Jayawardena",
    department: "Waterproof Cutting Dept",
    defaultLine: "Line 02 - Automated Fabric Cutting",
    primarySkill: "Manual Spreading",
    skillLevel: "Intermediate",
    efficiencyPercent: 70,
    shift: "Shift 2 (Night)",
    availabilityStatus: "Unavailable",
    status: "Inactive",
    skills: [
      {
        id: "s1",
        skillName: "Manual Spreading",
        skillLevel: "Intermediate",
        efficiencyPercent: 70,
      },
    ],
    createdDateTime: "2026-05-12 , 11:20",
    updatedDateTime: "2026-07-01 , 12:00",
  },
];

const departmentOptions = [
  "Main Sewing Dept",
  "Waterproof Cutting Dept",
  "Bonding & Heat Sealing Dept",
  "Umbrella Frame & Metalwork",
  "Finishing & Packaging Line",
];

const lineOptions = [
  "Line 01 - Sewing & Stitching",
  "Line 02 - Automated Fabric Cutting",
  "Line 03 - Heat Sealing & Assembly",
  "Line 04 - Finishing & Packaging",
  "Line 05 - Umbrella Frame & Metalwork",
];

const skillOptions = [
  "Single Needle Stitching",
  "Overlock Machine",
  "Bartack Machine",
  "Bartack & Button Attaching",
  "Automated Laser Cutting",
  "Fabric Spreading",
  "Heat Sealing & Tape Seaming",
  "Ultrasonic Bonding",
  "Quality Inspection & Testing",
  "Garment Pressing & Ironing",
  "Final Packaging",
  "Frame Assembly & Riveting",
  "Metal Shaft Cutting",
];

const skillLevelOptions = ["Beginner", "Intermediate", "Skilled", "Expert"] as const;

const shiftOptions = ["Shift 1 (Day)", "Shift 2 (Night)", "Shift 3 (Overtime)"];

const availabilityOptions = ["Available", "Leave", "Training", "Unavailable"] as const;

export function LabourMasterWireframe() {
  const [records, setRecords] = useState<LabourRecord[]>(initialRecords);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal / Drawer state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecordForView, setSelectedRecordForView] = useState<LabourRecord | null>(null);
  const [editingRecord, setEditingRecord] = useState<LabourRecord | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<LabourRecord>>({
    labourId: "",
    employeeName: "",
    department: "Main Sewing Dept",
    defaultLine: "Line 01 - Sewing & Stitching",
    primarySkill: "Single Needle Stitching",
    skillLevel: "Skilled",
    efficiencyPercent: 85,
    shift: "Shift 1 (Day)",
    availabilityStatus: "Available",
    status: "Active",
    skills: [],
  });

  // Temporary skill row input state inside form
  const [newSkillName, setNewSkillName] = useState(skillOptions[0]);
  const [newSkillLevel, setNewSkillLevel] = useState<
    "Beginner" | "Intermediate" | "Skilled" | "Expert"
  >("Skilled");
  const [newSkillEff, setNewSkillEff] = useState<number>(85);

  const handleOpenAddModal = () => {
    const nextNum =
      Math.max(
        ...records.map((r) => {
          const num = parseInt(r.labourId.replace(/\D/g, ""), 10);
          return isNaN(num) ? 1000 : num;
        }),
        1000,
      ) + 1;

    const newId = `L-${nextNum}`;
    setEditingRecord(null);
    setFormData({
      labourId: newId,
      employeeName: "",
      department: "Main Sewing Dept",
      defaultLine: "Line 01 - Sewing & Stitching",
      primarySkill: "Single Needle Stitching",
      skillLevel: "Skilled",
      efficiencyPercent: 85,
      shift: "Shift 1 (Day)",
      availabilityStatus: "Available",
      status: "Active",
      skills: [
        {
          id: `sk-${Date.now()}-1`,
          skillName: "Single Needle Stitching",
          skillLevel: "Skilled",
          efficiencyPercent: 85,
        },
      ],
    });
    setIsModalOpen(true);
    setActionMenuOpen(null);
  };

  const handleOpenEditModal = (rec: LabourRecord) => {
    setEditingRecord(rec);
    setFormData({
      ...rec,
      skills: rec.skills ? [...rec.skills] : [],
    });
    setIsModalOpen(true);
    setActionMenuOpen(null);
  };

  const handleDeleteRecord = (id: string) => {
    if (confirm(`Are you sure you want to delete Labour record ${id}?`)) {
      setRecords((prev) => prev.filter((r) => r.labourId !== id));
    }
    setActionMenuOpen(null);
  };

  const handleAddSkillToForm = () => {
    if (!newSkillName) return;
    const currentSkills = formData.skills || [];

    // Check if skill already exists
    if (currentSkills.some((s) => s.skillName === newSkillName)) {
      alert(`Skill "${newSkillName}" is already added.`);
      return;
    }

    const newItem: LabourSkillItem = {
      id: `sk-${Date.now()}`,
      skillName: newSkillName,
      skillLevel: newSkillLevel,
      efficiencyPercent: Number(newSkillEff) || 80,
    };

    setFormData({
      ...formData,
      skills: [...currentSkills, newItem],
    });
  };

  const handleRemoveSkillFromForm = (skillId: string) => {
    setFormData({
      ...formData,
      skills: (formData.skills || []).filter((s) => s.id !== skillId),
    });
  };

  const handleSaveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const nowStr = new Date().toISOString().replace("T", " , ").substring(0, 18);

    if (editingRecord) {
      setRecords((prev) =>
        prev.map((r) =>
          r.labourId === editingRecord.labourId
            ? {
                ...(formData as LabourRecord),
                updatedDateTime: nowStr,
              }
            : r,
        ),
      );
    } else {
      const newRec: LabourRecord = {
        ...(formData as LabourRecord),
        labourId: formData.labourId || `L-${Date.now().toString().slice(-4)}`,
        createdDateTime: nowStr,
        updatedDateTime: nowStr,
      };
      setRecords((prev) => [newRec, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleExportCSV = () => {
    const headers = [
      "Labour ID",
      "Employee Name",
      "Department",
      "Default Line",
      "Primary Skill",
      "Skill Level",
      "Efficiency %",
      "Shift",
      "Availability",
      "Active Status",
      "Secondary Skills Count",
    ];

    const rows = records.map((r) => [
      r.labourId,
      r.employeeName,
      r.department,
      r.defaultLine,
      r.primarySkill,
      r.skillLevel,
      `${r.efficiencyPercent}%`,
      r.shift,
      r.availabilityStatus,
      r.status,
      (r.skills || []).length,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join(
        "\n",
      );

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Rainco_Labour_Master_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered records
  const filteredRecords = records.filter((r) => {
    if (departmentFilter !== "All" && r.department !== departmentFilter) {
      return false;
    }
    if (availabilityFilter !== "All" && r.availabilityStatus !== availabilityFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.labourId.toLowerCase().includes(q) ||
        r.employeeName.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.defaultLine.toLowerCase().includes(q) ||
        r.primarySkill.toLowerCase().includes(q) ||
        r.skills?.some((s) => s.skillName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // KPI Calculations
  const totalLabour = records.length;
  const availableLabour = records.filter((r) => r.availabilityStatus === "Available").length;
  const expertLabour = records.filter(
    (r) => r.skillLevel === "Expert" || r.skillLevel === "Skilled",
  ).length;
  const avgEfficiency = Math.round(
    records.reduce((sum, r) => sum + r.efficiencyPercent, 0) / (records.length || 1),
  );

  return (
    <div className="space-y-6 font-sans text-slate-800 dark:text-slate-100 pb-12">
      {/* Top Controls & Action Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search ID, Name, Skill, Line..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-emerald-500 shadow-2xs"
            />
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <span className="text-slate-400">Dept:</span>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 dark:text-slate-100 outline-none cursor-pointer"
            >
              <option value="All">All Departments</option>
              {departmentOptions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Availability Filter */}
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <span className="text-slate-400">Status:</span>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 dark:text-slate-100 outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              {availabilityOptions.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-bold text-xs shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4 text-emerald-600" />
            <span>Add Labour</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-emerald-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer shadow-2xs"
            title="Export to Excel / CSV"
          >
            <FileSpreadsheet className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200/80 dark:border-slate-800">
                <th className="p-3.5 font-bold text-slate-700 dark:text-slate-200">Labour ID</th>
                <th className="p-3.5 font-bold text-slate-700 dark:text-slate-200">
                  Employee Name
                </th>
                <th className="p-3.5 font-bold text-slate-700 dark:text-slate-200">Department</th>
                <th className="p-3.5 font-bold text-slate-700 dark:text-slate-200">Default Line</th>
                <th className="p-3.5 font-bold text-slate-700 dark:text-slate-200">
                  Primary Skill
                </th>
                <th className="p-3.5 font-bold text-slate-700 dark:text-slate-200">Skill Level</th>
                <th className="p-3.5 font-bold text-slate-700 dark:text-slate-200">Efficiency %</th>
                <th className="p-3.5 font-bold text-slate-700 dark:text-slate-200">Shift</th>
                <th className="p-3.5 font-bold text-slate-700 dark:text-slate-200">Availability</th>
                <th className="p-3.5 font-bold text-slate-700 dark:text-slate-200">
                  Active Status
                </th>
                <th className="p-3.5 font-bold text-center sticky right-0 bg-slate-50/80 dark:bg-slate-800/40 backdrop-blur w-12">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-200">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={11} className="p-8 text-center text-slate-400 italic">
                    No labour records found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredRecords.slice(0, rowsPerPage).map((row) => {
                  return (
                    <tr
                      key={row.labourId}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group relative"
                    >
                      {/* Labour ID */}
                      <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100 font-mono">
                        {row.labourId}
                      </td>

                      {/* Employee Name */}
                      <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100">
                        {row.employeeName}
                      </td>

                      {/* Department */}
                      <td className="p-3.5 font-medium text-slate-600 dark:text-slate-300">
                        {row.department}
                      </td>

                      {/* Default Line */}
                      <td className="p-3.5 font-semibold text-slate-800 dark:text-slate-200">
                        {row.defaultLine}
                      </td>

                      {/* Primary Skill */}
                      <td className="p-3.5 font-semibold text-emerald-700 dark:text-emerald-400">
                        {row.primarySkill}
                        {row.skills && row.skills.length > 1 && (
                          <span className="ml-1.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500">
                            +{row.skills.length - 1} more
                          </span>
                        )}
                      </td>

                      {/* Skill Level Badge */}
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide border ${
                            row.skillLevel === "Expert"
                              ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800"
                              : row.skillLevel === "Skilled"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800"
                                : row.skillLevel === "Intermediate"
                                  ? "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800"
                                  : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800"
                          }`}
                        >
                          {row.skillLevel}
                        </span>
                      </td>

                      {/* Efficiency % */}
                      <td className="p-3.5 font-bold font-mono">
                        <span
                          className={
                            row.efficiencyPercent >= 90
                              ? "text-emerald-600 dark:text-emerald-400"
                              : row.efficiencyPercent >= 80
                                ? "text-sky-600 dark:text-sky-400"
                                : "text-amber-600 dark:text-amber-400"
                          }
                        >
                          {row.efficiencyPercent}%
                        </span>
                      </td>

                      {/* Shift */}
                      <td className="p-3.5 font-medium text-slate-700 dark:text-slate-300">
                        {row.shift}
                      </td>

                      {/* Availability Status */}
                      <td className="p-3.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border inline-flex items-center gap-1 ${
                            row.availabilityStatus === "Available"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800"
                              : row.availabilityStatus === "Training"
                                ? "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800"
                                : row.availabilityStatus === "Leave"
                                  ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800"
                                  : "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              row.availabilityStatus === "Available"
                                ? "bg-emerald-500"
                                : row.availabilityStatus === "Training"
                                  ? "bg-sky-500"
                                  : row.availabilityStatus === "Leave"
                                    ? "bg-amber-500"
                                    : "bg-rose-500"
                            }`}
                          />
                          {row.availabilityStatus}
                        </span>
                      </td>

                      {/* Active Status */}
                      <td className="p-3.5 font-semibold">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[11px] ${
                            row.status === "Active"
                              ? "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 font-bold"
                              : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-bold"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-center sticky right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur group-hover:bg-slate-50/90 dark:group-hover:bg-slate-800/90 transition-colors">
                        <div className="relative flex justify-center">
                          <button
                            onClick={() =>
                              setActionMenuOpen(
                                actionMenuOpen === row.labourId ? null : row.labourId,
                              )
                            }
                            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>

                          {actionMenuOpen === row.labourId && (
                            <div className="absolute right-8 top-0 mt-0 w-36 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-100">
                              <button
                                onClick={() => {
                                  setSelectedRecordForView(row);
                                  setActionMenuOpen(null);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                              >
                                <Eye className="h-3.5 w-3.5 text-slate-400" />
                                View Details
                              </button>
                              <button
                                onClick={() => handleOpenEditModal(row)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                              >
                                <Edit2 className="h-3.5 w-3.5 text-slate-400" />
                                Edit Labour
                              </button>
                              <div className="h-px bg-slate-100 dark:bg-slate-700/50 my-1"></div>
                              <button
                                onClick={() => handleDeleteRecord(row.labourId)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="bg-transparent font-semibold text-slate-800 dark:text-slate-200 outline-none cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <span>
              1-{Math.min(filteredRecords.length, rowsPerPage)} of {filteredRecords.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                disabled
                className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Labour Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 my-8 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {editingRecord ? "Edit Labour Details" : "Add New Labour Record"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Maintain line-wise operator attributes, primary skill level, and skill matrix.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRecord} className="mt-4 space-y-5 text-xs">
              {/* Basic Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Labour ID */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Labour ID <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.labourId || ""}
                    onChange={(e) => setFormData({ ...formData, labourId: e.target.value })}
                    placeholder="e.g. L-1009"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                {/* Employee Name */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Employee Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.employeeName || ""}
                    onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                    placeholder="e.g. Kamal Perera"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Department
                  </label>
                  <select
                    value={formData.department || departmentOptions[0]}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 outline-none focus:border-emerald-500 font-medium"
                  >
                    {departmentOptions.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Default Production Line */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Default Production Line
                  </label>
                  <select
                    value={formData.defaultLine || lineOptions[0]}
                    onChange={(e) => setFormData({ ...formData, defaultLine: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 outline-none focus:border-emerald-500 font-medium"
                  >
                    {lineOptions.map((line) => (
                      <option key={line} value={line}>
                        {line}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Primary Skill */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Primary Skill
                  </label>
                  <select
                    value={formData.primarySkill || skillOptions[0]}
                    onChange={(e) => setFormData({ ...formData, primarySkill: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 outline-none focus:border-emerald-500 font-medium"
                  >
                    {skillOptions.map((sk) => (
                      <option key={sk} value={sk}>
                        {sk}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Skill Level */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Skill Level
                  </label>
                  <select
                    value={formData.skillLevel || "Skilled"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        skillLevel: e.target.value as
                          "Beginner" | "Intermediate" | "Skilled" | "Expert",
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 outline-none focus:border-emerald-500 font-medium"
                  >
                    {skillLevelOptions.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Efficiency % */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Efficiency %
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="150"
                    required
                    value={formData.efficiencyPercent || 85}
                    onChange={(e) =>
                      setFormData({ ...formData, efficiencyPercent: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 outline-none focus:border-emerald-500 font-mono font-bold"
                  />
                </div>

                {/* Shift */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Shift
                  </label>
                  <select
                    value={formData.shift || shiftOptions[0]}
                    onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 outline-none focus:border-emerald-500 font-medium"
                  >
                    {shiftOptions.map((sh) => (
                      <option key={sh} value={sh}>
                        {sh}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Availability Status */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Availability Status
                  </label>
                  <select
                    value={formData.availabilityStatus || "Available"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        availabilityStatus: e.target.value as
                          "Available" | "Leave" | "Training" | "Unavailable",
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 outline-none focus:border-emerald-500 font-medium"
                  >
                    {availabilityOptions.map((av) => (
                      <option key={av} value={av}>
                        {av}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Active Status */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Active Status
                  </label>
                  <select
                    value={formData.status || "Active"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as "Active" | "Inactive",
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 outline-none focus:border-emerald-500 font-medium"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* SECTION: Labour Skills (Multi-Skill Table inside form) */}
              <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      <Layers className="h-4 w-4 text-emerald-600" />
                      Labour Skills Section
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Add all secondary skills possessed by this worker for line balance
                      optimization.
                    </p>
                  </div>
                </div>

                {/* Add Skill Control Row */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center gap-2">
                  <div className="flex-1 min-w-[160px]">
                    <span className="block text-[10px] font-semibold text-slate-400 mb-0.5">
                      Skill
                    </span>
                    <select
                      value={newSkillName}
                      onChange={(e) => setNewSkillName(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium outline-none"
                    >
                      {skillOptions.map((sk) => (
                        <option key={sk} value={sk}>
                          {sk}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-32">
                    <span className="block text-[10px] font-semibold text-slate-400 mb-0.5">
                      Level
                    </span>
                    <select
                      value={newSkillLevel}
                      onChange={(e) =>
                        setNewSkillLevel(
                          e.target.value as "Beginner" | "Intermediate" | "Skilled" | "Expert",
                        )
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium outline-none"
                    >
                      {skillLevelOptions.map((lvl) => (
                        <option key={lvl} value={lvl}>
                          {lvl}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-24">
                    <span className="block text-[10px] font-semibold text-slate-400 mb-0.5">
                      Eff %
                    </span>
                    <input
                      type="number"
                      min="1"
                      max="150"
                      value={newSkillEff}
                      onChange={(e) => setNewSkillEff(Number(e.target.value))}
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono font-bold outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleAddSkillToForm}
                    className="mt-4 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Skill</span>
                  </button>
                </div>

                {/* Skills Table */}
                <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200/80 dark:border-slate-800">
                        <th className="p-2.5 pl-3">Skill</th>
                        <th className="p-2.5">Skill Level</th>
                        <th className="p-2.5">Efficiency %</th>
                        <th className="p-2.5 text-center w-16">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {!formData.skills || formData.skills.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="p-4 text-center text-slate-400 italic">
                            No skills assigned yet. Add at least one skill above.
                          </td>
                        </tr>
                      ) : (
                        formData.skills.map((s) => (
                          <tr
                            key={s.id}
                            className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40"
                          >
                            <td className="p-2.5 pl-3 font-semibold text-slate-800 dark:text-slate-200">
                              {s.skillName}
                            </td>
                            <td className="p-2.5">
                              <span
                                className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                  s.skillLevel === "Expert"
                                    ? "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                                    : s.skillLevel === "Skilled"
                                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                                      : s.skillLevel === "Intermediate"
                                        ? "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
                                        : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                                }`}
                              >
                                {s.skillLevel}
                              </span>
                            </td>
                            <td className="p-2.5 font-bold font-mono text-slate-800 dark:text-slate-200">
                              {s.efficiencyPercent}%
                            </td>
                            <td className="p-2.5 text-center">
                              <button
                                type="button"
                                onClick={() => handleRemoveSkillFromForm(s.id)}
                                className="p-1 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                                title="Remove skill"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  {editingRecord ? "Save Changes" : "Create Labour Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Drawer / Modal */}
      {selectedRecordForView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {selectedRecordForView.employeeName}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Labour ID: {selectedRecordForView.labourId}
                </p>
              </div>
              <button
                onClick={() => setSelectedRecordForView(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Department</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.department}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Default Line</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.defaultLine}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                  <span className="text-slate-400 font-medium">Primary Skill</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedRecordForView.primarySkill}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                  <span className="text-slate-400 font-medium">Skill Level</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.skillLevel}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                  <span className="text-slate-400 font-medium">Efficiency %</span>
                  <span className="font-bold font-mono text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.efficiencyPercent}%
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                  <span className="text-slate-400 font-medium">Shift</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.shift}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                  <span className="text-slate-400 font-medium">Availability</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedRecordForView.availabilityStatus}
                  </span>
                </div>
              </div>

              {/* Skills breakdown */}
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200 mb-2">
                  Assigned Skills Matrix ({selectedRecordForView.skills?.length || 0}):
                </p>
                <div className="space-y-1.5">
                  {selectedRecordForView.skills?.map((sk) => (
                    <div
                      key={sk.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800"
                    >
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {sk.skillName}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {sk.skillLevel}
                        </span>
                        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {sk.efficiencyPercent}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedRecordForView(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
