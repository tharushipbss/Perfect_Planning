import { useState, useEffect } from "react";

export interface UserAccount {
  id: string;
  userName: string;
  email: string;
  fullName: string;
  role: string;
  designation: string;
  department: string;
  status: boolean; // true = active, false = inactive
  lastLogin: string;
}

export interface ModulePermission {
  userId: string;
  module: string;
  subModule: string;
  active: boolean;
}

export const defaultUsers: UserAccount[] = [
  {
    id: "37",
    userName: "Roshan",
    email: "roshan@rainco.lk",
    fullName: "Roshan Perera",
    role: "Planner",
    designation: "Production Planner",
    department: "SEWING",
    status: true,
    lastLogin: "2026-03-18, 09:03",
  },
  {
    id: "39",
    userName: "Udana",
    email: "udana@rainco.lk",
    fullName: "Udana Ravishanka",
    role: "Planner",
    designation: "Production Planner",
    department: "CUTTING",
    status: true,
    lastLogin: "2026-03-19, 09:03",
  },
  {
    id: "38",
    userName: "Chandika",
    email: "chandika@rainco.lk",
    fullName: "Chandika Wedagedara",
    role: "Planner",
    designation: "Production Planner",
    department: "PACKING",
    status: true,
    lastLogin: "2026-03-20, 09:03",
  },
  {
    id: "36",
    userName: "Govindra",
    email: "govindra@rainco.lk",
    fullName: "Govindra Herath",
    role: "Planner",
    designation: "Factory Manager",
    department: "SEWING",
    status: true,
    lastLogin: "2025-11-08, 11:11",
  },
  {
    id: "35",
    userName: "Jeyan",
    email: "jeyan@rainco.lk",
    fullName: "Jeyan",
    role: "Planner",
    designation: "Senior Planner",
    department: "CUTTING",
    status: true,
    lastLogin: "2025-10-08, 09:10",
  },
  {
    id: "32",
    userName: "Test",
    email: "test@rainco.lk",
    fullName: "Test",
    role: "Admin",
    designation: "System Administrator",
    department: "ADMIN",
    status: true,
    lastLogin: "2026-08-12, 21:12",
  },
];

export const raincoModulesList: { module: string; subModule: string }[] = [
  { module: "Home", subModule: "N/A" },
  { module: "Dashboard", subModule: "N/A" },
  { module: "Order-Scheduling", subModule: "N/A" },
  { module: "Planning Board", subModule: "N/A" },
  { module: "Scheduling Timeline", subModule: "N/A" },
  { module: "Masters Data", subModule: "Building" },
  { module: "Masters Data", subModule: "Calendar Setup" },
  { module: "Masters Data", subModule: "Customer" },
  { module: "Masters Data", subModule: "Factory" },
  { module: "Masters Data", subModule: "Labour" },
  { module: "Masters Data", subModule: "Production Line" },
  { module: "Masters Data", subModule: "Priority" },
  { module: "Masters Data", subModule: "Product" },
  { module: "Masters Data", subModule: "Shift" },
  { module: "Constraints", subModule: "Constraints" },
  { module: "Constraints", subModule: "Semi-Constraints" },
  { module: "Planning Input", subModule: "ERP Sync" },
  { module: "Planning Input", subModule: "Master Process Routes" },
  { module: "Planning Output", subModule: "Line Utilization" },
  { module: "Planning Output", subModule: "Planned Vs Actuals" },
  { module: "Planning Output", subModule: "SAP Based Performance Report" },
  { module: "Planning Output", subModule: "Schedule History Report" },
  { module: "Administration", subModule: "User Management" },
  { module: "Administration", subModule: "User Registration" },
];

const USERS_STORAGE_KEY = "rainco_users_list";
const PERMISSIONS_STORAGE_KEY = "rainco_user_permissions";

export function getStoredUsers(): UserAccount[] {
  if (typeof window === "undefined") return defaultUsers;
  const saved = localStorage.getItem(USERS_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return defaultUsers;
    }
  }
  return defaultUsers;
}

export function saveStoredUsers(users: UserAccount[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }
}

export function getStoredPermissions(): Record<string, Record<string, boolean>> {
  if (typeof window === "undefined") return {};
  const saved = localStorage.getItem(PERMISSIONS_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return {};
    }
  }
  return {};
}

export function saveStoredPermissions(perms: Record<string, Record<string, boolean>>) {
  if (typeof window !== "undefined") {
    localStorage.setItem(PERMISSIONS_STORAGE_KEY, JSON.stringify(perms));
  }
}
