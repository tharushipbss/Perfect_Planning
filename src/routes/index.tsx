import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import {
  Home as HomeIcon,
  Gauge,
  ClipboardList,
  LayoutGrid,
  LineChart,
  Settings,
  Bell,
  FileCheck2,
  MonitorPlay,
  CalendarDays,
  Building2,
  Timer,
  Factory,
  ClipboardCheck,
  ShieldCheck,
  Bot,
  Boxes,
  BadgeCheck,
  History,
  Users,
  Package,
  LogOut,
  FileText,
  Gauge as GaugeIcon,
  Lock,
  Workflow,
  Network,
  Server,
  ChevronRight,
  ChevronLeft,
  Menu,
  type LucideIcon,
} from "lucide-react";
//import logoAsset from "@/assets/pbss-logo.png.asset.json";
import { AUTH_KEY } from "./login";

import { SettingsPanel } from "@/components/settings-panel";
import { SettingsProvider, useAppSettings } from "@/hooks/use-app-settings";
import { useUserProfile } from "@/hooks/use-user-profile";
import { DashboardWireframe } from "@/components/dashboard-wireframe";
import { OrderSchedulingWireframe } from "@/components/order-scheduling-wireframe";
import { BuildingMasterWireframe } from "@/components/building-master-wireframe";
import { CalendarMasterWireframe } from "@/components/calendar-master-wireframe";
import { CustomerMasterWireframe } from "@/components/customer-master-wireframe";
import { ProductionLineMasterWireframe } from "@/components/production-line-master-wireframe";
import { FactoryMasterWireframe } from "@/components/factory-master-wireframe";
import { LabourMasterWireframe } from "@/components/labour-master-wireframe";
import { PriorityMasterWireframe } from "@/components/priority-master-wireframe";
import { ProductMasterWireframe } from "@/components/product-master-wireframe";
import { ShiftMasterWireframe } from "@/components/shift-master-wireframe";
import { UserManagementWireframe } from "@/components/user-management-wireframe";
import { UserRegistrationWireframe } from "@/components/user-registration-wireframe";
import { SchedulingTimelineWireframe } from "@/components/scheduling-timeline-wireframe";
import { PlanningBoardWireframe } from "@/components/planning-board-wireframe";
import { ErpSyncWireframe } from "@/components/erp-sync-wireframe";
import { MasterProcessRoutesWireframe } from "@/components/master-process-routes-wireframe";
import { MachineUtilizationWireframe } from "@/components/machine-utilization-wireframe";
import { SapBasedPerformanceReportWireframe } from "@/components/sap-based-performance-report-wireframe";
import { PlannedVsActualsWireframe } from "@/components/planned-vs-actuals-wireframe";
import { ScheduleHistoryReportWireframe } from "@/components/schedule-history-report-wireframe";
import { SemiConstraintsWireframe } from "@/components/semi-constraints-wireframe";
import { ConstraintsWireframe } from "@/components/constraints-wireframe";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Production Planning — Home" },
      {
        name: "description",
        content:
          "Rainco production planning module: order scheduling, planning boards, line and process masters in one console.",
      },
      { property: "og:title", content: "Production Planning — Home" },
      {
        property: "og:description",
        content:
          "Rainco production planning module: order scheduling, planning boards, line and process masters in one console.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type NavItem = { label: string; icon: LucideIcon; children?: string[] };

const navItems: NavItem[] = [
  { label: "Home", icon: HomeIcon },
  { label: "Dashboard", icon: Gauge },
  { label: "Order-Scheduling", icon: ClipboardList },
  { label: "Planning Board", icon: LayoutGrid },
  { label: "Scheduling Timeline", icon: LineChart },
  {
    label: "Masters Data",
    icon: FileText,
    children: [
      "Building",
      "Calendar",
      "Customer",
      "Factory",
      "Labour",
      "Production Line",
      "Priority",
      "Product",
      "Shift",
    ],
  },
  { label: "Constraints", icon: GaugeIcon },
  { label: "Semi-Constraints", icon: Lock },
  {
    label: "Planning Input",
    icon: Server,
    children: ["ERP Sync", "Master Process Routes"],
  },
  {
    label: "Planning Output",
    icon: Network,
    children: [
      "Line Utilization",
      "Planned Vs Actuals",
      "SAP Based Performance Report",
      "Schedule History Report",
    ],
  },
  {
    label: "Administration",
    icon: Users,
    children: ["User Management", "User Registration"],
  },
];

const ACTIVE_KEY = "rainco.activeNav";

const groups: { title: string; items: { label: string; icon: LucideIcon }[] }[] = [
  {
    title: "Planning",
    items: [
      { label: "Order-Scheduling", icon: ClipboardList },
      { label: "Planning Board", icon: LayoutGrid },
      { label: "Scheduling Timeline", icon: LineChart },
    ],
  },
  {
    title: "Masters Data",
    items: [
      { label: "Building", icon: Building2 },
      { label: "Calendar", icon: CalendarDays },
      { label: "Customer", icon: Users },
      { label: "Factory", icon: Factory },
      { label: "Labour", icon: Users },
      { label: "Production Line", icon: Server },
      { label: "Priority", icon: BadgeCheck },
      { label: "Product", icon: Package },
      { label: "Shift", icon: Timer },
    ],
  },
  {
    title: "Constraints",
    items: [
      { label: "Constraints", icon: GaugeIcon },
      { label: "Semi-Constraints", icon: Lock },
    ],
  },
  {
    title: "Planning Input",
    items: [
      { label: "ERP Sync", icon: Network },
      { label: "Master Process Routes", icon: ClipboardCheck },
    ],
  },
  {
    title: "Planning Output",
    items: [
      { label: "Line Utilization", icon: Gauge },
      { label: "Planned Vs Actuals", icon: FileCheck2 },
      { label: "SAP Based Performance Report", icon: FileText },
      { label: "Schedule History Report", icon: History },
    ],
  },
  {
    title: "Administration",
    items: [
      { label: "User Management", icon: ShieldCheck },
      { label: "User Registration", icon: Bot },
    ],
  },
];

function SidebarNav({
  collapsed,
  active,
  onSelect,
  open,
  onToggleOpen,
}: {
  collapsed: boolean;
  active: string;
  onSelect: (label: string) => void;
  open: string[];
  onToggleOpen: (label: string) => void;
}) {
  return (
    <nav className="flex flex-col gap-0.5 px-2 pb-8">
      {navItems.map((item) => {
        const isOpen = open.includes(item.label);
        return (
          <div key={item.label}>
            <button
              title={item.label}
              aria-current={active === item.label ? "page" : undefined}
              aria-expanded={item.children ? isOpen : undefined}
              onClick={() => {
                if (item.children) {
                  onToggleOpen(item.label);
                } else {
                  onSelect(item.label);
                }
              }}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                active === item.label
                  ? "bg-accent font-medium text-accent-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="h-4.5 w-4.5 shrink-0 text-primary" />
              {!collapsed && (
                <span className="min-w-0 flex-1 truncate text-left">{item.label}</span>
              )}
              {!collapsed && item.children && (
                <ChevronRight
                  className={`h-4 w-4 shrink-0 opacity-60 transition-transform ${
                    isOpen ? "rotate-90" : ""
                  }`}
                />
              )}
            </button>

            {!collapsed && item.children && isOpen && (
              <div className="mb-1 ml-6 flex flex-col gap-0.5 border-l border-border pl-3">
                {item.children.map((child) => (
                  <button
                    key={child}
                    onClick={() => onSelect(child)}
                    aria-current={active === child ? "page" : undefined}
                    className={`truncate rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                      active === child
                        ? "bg-accent font-medium text-accent-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {child}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

function Index() {
  return (
    <SettingsProvider>
      <Dashboard />
    </SettingsProvider>
  );
}

function Dashboard() {
  const { settings } = useAppSettings();
  const { currentUser, setIsProfileOpen } = useUserProfile();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [openSections, setOpenSections] = useState<string[]>([]);

  // Demo gate: send visitors to the sign-in page until they authenticate.
  useEffect(() => {
    if (!localStorage.getItem(AUTH_KEY)) navigate({ to: "/login", replace: true });
  }, [navigate]);

  const signOut = () => {
    localStorage.removeItem(AUTH_KEY);
    navigate({ to: "/login", replace: true });
  };

  const iconsOnly = settings.navLayout === "icons" || collapsed;
  const navWidth =
    settings.navLayout === "icons" || collapsed
      ? "w-[76px]"
      : settings.navLayout === "condensed"
        ? "w-52"
        : "w-64";
  const navSurface = settings.navColor === "apparent" ? "bg-secondary" : "bg-card";

  // Restore the active section across reloads (client-only to avoid hydration mismatch).
  useEffect(() => {
    const saved = localStorage.getItem(ACTIVE_KEY);
    if (saved) {
      setActive(saved);
      const parent = navItems.find((i) => i.children?.includes(saved));
      if (parent) setOpenSections((s) => (s.includes(parent.label) ? s : [...s, parent.label]));
    }

    const handleNav = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setActive(customEvent.detail);
      } else {
        const currentSaved = localStorage.getItem(ACTIVE_KEY);
        if (currentSaved) setActive(currentSaved);
      }
    };

    window.addEventListener("rainco:navigate", handleNav);
    window.addEventListener("storage", handleNav);
    return () => {
      window.removeEventListener("rainco:navigate", handleNav);
      window.removeEventListener("storage", handleNav);
    };
  }, []);

  const handleSelect = (label: string) => {
    const item = navItems.find((i) => i.label === label);
    if (item?.children) {
      if (!openSections.includes(label)) {
        setOpenSections((prev) => [...prev, label]);
      }
      return;
    }
    setActive(label);
    localStorage.setItem(ACTIVE_KEY, label);
    setMobileOpen(false);
  };

  const toggleSection = (label: string) =>
    setOpenSections((s) => (s.includes(label) ? s.filter((l) => l !== label) : [...s, label]));

  const brand = (size: string) => (
    <>
      <img
        src={"src/assets/logo.png"}
        alt="Rainco production planning logo"
        className={`${size} shrink-0 object-contain`}
      />
      <span className="truncate text-sm font-semibold tracking-tight">Perfect Planning</span>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <aside
          className={`relative hidden shrink-0 border-r border-border transition-[width] duration-200 md:block ${navSurface} ${navWidth}`}
        >
          <div className="flex h-16 items-center gap-3 px-4">
            <img
              src={"src/assets/logo.png"}
              alt="Rainco production planning logo"
              className="h-9 w-9 shrink-0 object-contain"
            />
            {!iconsOnly && (
              <span className="truncate text-sm font-semibold tracking-tight">
                Perfect Planning
              </span>
            )}
          </div>

          <button
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="absolute -right-3 top-7 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:text-foreground rtl:-left-3 rtl:right-auto"
          >
            {collapsed ? (
              <ChevronRight className="h-3.5 w-3.5" />
            ) : (
              <ChevronLeft className="h-3.5 w-3.5" />
            )}
          </button>

          <SidebarNav
            collapsed={iconsOnly}

            active={active}
            onSelect={handleSelect}
            open={openSections}
            onToggleOpen={toggleSection}
          />
        </aside>

        <div className="min-w-0 flex-1">
          <header className="flex h-16 items-center justify-between gap-3 border-b border-border bg-card px-4 md:px-6">
            <div className="flex min-w-0 items-center gap-2 md:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger
                  aria-label="Open navigation"
                  className="shrink-0 rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Menu className="h-5 w-5" />
                </SheetTrigger>
                <SheetContent side="left" className="w-[17rem] overflow-y-auto p-0">
                  <SheetTitle className="sr-only">Navigation</SheetTitle>
                  <div className="flex h-16 items-center gap-3 px-4">{brand("h-8 w-8")}</div>
                  <SidebarNav
                    collapsed={false}
                    active={active}
                    onSelect={handleSelect}
                    open={openSections}
                    onToggleOpen={toggleSection}
                  />
                </SheetContent>
              </Sheet>
              <div className="flex min-w-0 items-center gap-2">{brand("h-8 w-8")}</div>
            </div>
            <div className="hidden min-w-0 truncate text-sm text-muted-foreground md:block">
              Home <span className="mx-2">•</span>
              <span className="text-muted-foreground/70">{active}</span>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <button
                aria-label="Notifications"
                className="relative rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
              </button>
              <SettingsPanel>
                <button
                  aria-label="Settings"
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Settings className="h-5 w-5" />
                </button>
              </SettingsPanel>

              <button
                onClick={signOut}
                aria-label="Sign out"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <LogOut className="h-5 w-5" />
              </button>

              <button
                onClick={() => setIsProfileOpen(true)}
                aria-label="User profile"
                title={`Logged in as ${currentUser.name}`}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer shadow-xs active:scale-95"
              >
                {currentUser.initials}
              </button>
            </div>
          </header>

          <main className="p-6 md:p-8 space-y-8">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                {active === "Building" || active === "Building Master"
                  ? "Building Master"
                  : active === "Calendar" || active === "Calendar Setup"
                    ? "Calendar"
                    : active === "Customer" || active === "Customer Master"
                      ? "Customer Master"
                      : active === "Production Line" || active === "Production Line Master"
                        ? "Production Line Master"
                        : active === "Factory" || active === "Factory Master"
                          ? "Factory Master"
                          : active === "Labour" || active === "Labour Master"
                            ? "Labour Master"
                            : active === "Priority" || active === "Priority Master"
                              ? "Priority Master"
                              : active === "Product" || active === "Product Master"
                                ? "Product Master"
                                : active === "Shift" || active === "Shift Master"
                                  ? "Shift Master"
                                  : active === "User Management"
                                    ? "User-Management"
                                    : active === "User Registration"
                                      ? "User-Registration"
                                      : active === "Planning Board"
                                        ? "Planning Board - (Molding Department)"
                                        : active === "ERP Sync"
                                          ? "ERP Sync"
                                          : active === "Master Process Routes"
                                            ? "Master Process Route"
                                            : active === "Machine Utilization"
                                              ? "Machine Utilization"
                                              : active === "SAP Based Performance Report"
                                                ? "SAP Based Performance Report"
                                                : active === "Planned Vs Actuals"
                                                  ? "Planned Vs Actuals"
                                                  : active === "Schedule History Report"
                                                    ? "Schedule History Report"
                                                    : active === "Semi-Constraints"
                                                      ? "Semi-Constraints"
                                                      : active === "Constraints"
                                                        ? "Constraints"
                                                        : active}
              </h1>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-slate-600 dark:text-slate-300">
                  {active === "Building" ||
                  active === "Building Master" ||
                  active === "Calendar" ||
                  active === "Calendar Setup" ||
                  active === "Customer" ||
                  active === "Customer Master" ||
                  active === "Production Line" ||
                  active === "Production Line Master" ||
                  active === "Factory" ||
                  active === "Factory Master" ||
                  active === "Labour" ||
                  active === "Labour Master" ||
                  active === "Priority" ||
                  active === "Priority Master" ||
                  active === "Product" ||
                  active === "Product Master" ||
                  active === "Shift" ||
                  active === "Shift Master"
                    ? "Masters"
                    : active === "Constraints" || active === "Semi-Constraints"
                      ? "Constraints"
                      : active === "User Management" || active === "User Registration"
                        ? "Administration"
                        : active === "ERP Sync" || active === "Master Process Routes"
                          ? "Planning • Planning Input"
                          : active === "Machine Utilization" ||
                              active === "SAP Based Performance Report" ||
                              active === "Planned Vs Actuals" ||
                              active === "Schedule History Report"
                            ? "Planning Output"
                            : "Home"}
                </span>
                <span className="text-slate-400">•</span>
                <span className="font-medium text-slate-400 dark:text-slate-400">
                  {active === "Building" || active === "Building Master"
                    ? "Building Master"
                    : active === "Calendar" || active === "Calendar Setup"
                      ? "Calendar Setup"
                      : active === "Customer" || active === "Customer Master"
                        ? "Customer Master"
                        : active === "Production Line" || active === "Production Line Master"
                          ? "Production Line Master"
                          : active === "Factory" || active === "Factory Master"
                            ? "Factory Master"
                            : active === "Labour" || active === "Labour Master"
                              ? "Labour Master"
                              : active === "Priority" || active === "Priority Master"
                                ? "Priority Master"
                                : active === "Product" || active === "Product Master"
                                  ? "Product Master"
                                  : active === "Shift" || active === "Shift Master"
                                    ? "Shift Master"
                                    : active === "User Management"
                                      ? "User-Management"
                                      : active === "User Registration"
                                        ? "User-Registration"
                                        : active === "Planning Board"
                                          ? "Planning Board - (All Departments)"
                                          : active === "ERP Sync"
                                            ? "ERP Sync"
                                            : active === "Master Process Routes"
                                              ? "Master Process Route"
                                              : active === "Machine Utilization"
                                                ? "Machine Utilization"
                                                : active === "SAP Based Performance Report"
                                                  ? "SAP Based Performance Report"
                                                  : active === "Planned Vs Actuals"
                                                    ? "Planned Vs Actuals"
                                                    : active === "Schedule History Report"
                                                      ? "Schedule History Report"
                                                      : active === "Semi-Constraints"
                                                        ? "Semi-Constraints"
                                                        : active === "Constraints"
                                                          ? "Constraints"
                                                          : active}
                </span>
              </div>
            </div>

            {active === "Home" && (
              <div className="space-y-9">
                {groups.map((group) => (
                  <section key={group.title}>
                    <h2 className="text-lg font-semibold tracking-tight">{group.title}</h2>
                    <div className="mt-4 flex flex-wrap gap-x-8 gap-y-6">
                      {group.items.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => handleSelect(item.label)}
                          className="group flex w-[104px] flex-col items-center gap-2 text-center cursor-pointer"
                        >
                          <span className="app-tile flex h-[92px] w-[92px] items-center justify-center rounded-xl border border-primary/30 bg-card transition-all group-hover:-translate-y-0.5 group-hover:border-primary group-hover:shadow-[var(--shadow-tile)]">
                            <item.icon
                              className="h-10 w-10 text-primary"
                              strokeWidth={1.4}
                              aria-hidden="true"
                            />
                          </span>
                          <span className="app-tile-label text-xs font-medium text-muted-foreground group-hover:text-foreground">
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {active === "Dashboard" && <DashboardWireframe />}

            {(active === "Order-Scheduling" ||
              active === "Planning Run" ||
              active === "Planning Dashboard") && <OrderSchedulingWireframe />}

            {active === "Scheduling Timeline" && <SchedulingTimelineWireframe />}

            {active === "Planning Board" && <PlanningBoardWireframe />}

            {active === "ERP Sync" && <ErpSyncWireframe />}

            {active === "Master Process Routes" && <MasterProcessRoutesWireframe />}

            {(active === "Line Utilization" || active === "Machine Utilization") && (
              <MachineUtilizationWireframe />
            )}

            {active === "SAP Based Performance Report" && <SapBasedPerformanceReportWireframe />}

            {active === "Planned Vs Actuals" && <PlannedVsActualsWireframe />}

            {active === "Schedule History Report" && <ScheduleHistoryReportWireframe />}

            {active === "Semi-Constraints" && <SemiConstraintsWireframe />}

            {active === "Constraints" && <ConstraintsWireframe />}

            {(active === "Building" || active === "Building Master") && <BuildingMasterWireframe />}

            {(active === "Calendar" || active === "Calendar Setup") && <CalendarMasterWireframe />}

            {(active === "Customer" || active === "Customer Master") && <CustomerMasterWireframe />}

            {(active === "Production Line" || active === "Production Line Master") && (
              <ProductionLineMasterWireframe />
            )}

            {(active === "Factory" || active === "Factory Master") && <FactoryMasterWireframe />}

            {(active === "Labour" || active === "Labour Master") && <LabourMasterWireframe />}

            {(active === "Priority" || active === "Priority Master") && <PriorityMasterWireframe />}

            {(active === "Product" || active === "Product Master") && <ProductMasterWireframe />}

            {(active === "Shift" || active === "Shift Master") && <ShiftMasterWireframe />}

            {active === "User Management" && <UserManagementWireframe />}

            {active === "User Registration" && <UserRegistrationWireframe />}

            {active !== "Home" &&
              active !== "Dashboard" &&
              active !== "Order-Scheduling" &&
              active !== "Planning Board" &&
              active !== "Scheduling Timeline" &&
              active !== "Building" &&
              active !== "Building Master" &&
              active !== "Calendar" &&
              active !== "Calendar Setup" &&
              active !== "Customer" &&
              active !== "Customer Master" &&
              active !== "Production Line" &&
              active !== "Production Line Master" &&
              active !== "Factory" &&
              active !== "Factory Master" &&
              active !== "Labour" &&
              active !== "Labour Master" &&
              active !== "Priority" &&
              active !== "Priority Master" &&
              active !== "Product" &&
              active !== "Product Master" &&
              active !== "Shift" &&
              active !== "Shift Master" &&
              active !== "User Management" &&
              active !== "User Registration" &&
              active !== "ERP Sync" &&
              active !== "Master Process Routes" &&
              active !== "Line Utilization" &&
              active !== "Machine Utilization" &&
              active !== "SAP Based Performance Report" &&
              active !== "Planned Vs Actuals" &&
              active !== "Schedule History Report" &&
              active !== "Semi-Constraints" &&
              active !== "Constraints" && (
                <div className="rounded-2xl border border-slate-100 dark:border-border/60 bg-white dark:bg-card p-12 shadow-xs text-center space-y-4">
                  <div className="p-4 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 w-fit mx-auto">
                    <Gauge className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    {active} Prototype View
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    This is the prototype view for{" "}
                    <strong className="text-slate-800 dark:text-slate-200">{active}</strong>. You
                    can manage production schedules, masters records, and operational inputs here.
                  </p>
                </div>
              )}
          </main>
        </div>
      </div>
    </div>
  );
}
