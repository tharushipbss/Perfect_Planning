import { useState, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Check, X, Save, CheckCircle2 } from "lucide-react";
import {
  UserAccount,
  getStoredUsers,
  getStoredPermissions,
  saveStoredPermissions,
  raincoModulesList,
} from "@/hooks/use-permissions";

export function UserManagementWireframe() {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("37");
  const [userPermissions, setUserPermissions] = useState<Record<string, Record<string, boolean>>>(
    {},
  );
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  useEffect(() => {
    const loadedUsers = getStoredUsers();
    setUsers(loadedUsers);
    if (loadedUsers.length > 0 && !loadedUsers.some((u) => u.id === selectedUserId)) {
      setSelectedUserId(loadedUsers[0].id);
    }
    setUserPermissions(getStoredPermissions());
  }, [selectedUserId]);

  const selectedUser = users.find((u) => u.id === selectedUserId) || users[0];

  // Helper to get active state for a module for the currently selected user
  const isModuleActive = (moduleName: string, subModuleName: string) => {
    const key = `${moduleName}::${subModuleName}`;
    const userPerms = userPermissions[selectedUserId];
    if (!userPerms) {
      // By default, Admin has everything active, others have most standard active
      if (selectedUser?.role === "Admin" || selectedUserId === "32") return true;
      return true;
    }
    if (userPerms[key] !== undefined) {
      return userPerms[key];
    }
    return true;
  };

  const toggleModuleActive = (moduleName: string, subModuleName: string) => {
    const key = `${moduleName}::${subModuleName}`;
    const currentVal = isModuleActive(moduleName, subModuleName);
    setUserPermissions((prev) => {
      const userObj = prev[selectedUserId] ? { ...prev[selectedUserId] } : {};
      userObj[key] = !currentVal;
      return {
        ...prev,
        [selectedUserId]: userObj,
      };
    });
  };

  const handleSavePermissions = () => {
    saveStoredPermissions(userPermissions);
    window.dispatchEvent(new Event("rainco:permissions-updated"));
    setSaveNotification(`Permissions saved successfully for ${selectedUser?.fullName || "User"}`);
    setTimeout(() => {
      setSaveNotification(null);
    }, 3500);
  };

  // Pagination logic
  const totalRows = raincoModulesList.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const paginatedModules = raincoModulesList.slice(startIndex, endIndex);

  return (
    <div className="space-y-6 mt-2">
      {saveNotification && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-200 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{saveNotification}</span>
        </div>
      )}

      {/* Main Card Container */}
      <div className="rounded-2xl border border-slate-100 dark:border-border/60 bg-white dark:bg-card overflow-hidden shadow-xs">
        {/* Top Controls - User Dropdown */}
        <div className="p-6 border-b border-slate-100 dark:border-border/50">
          <div className="relative w-full max-w-[280px]">
            <label className="absolute -top-2.5 left-3 bg-white dark:bg-slate-900 px-1.5 text-[11px] text-slate-600 dark:text-slate-300 font-semibold z-10">
              User
            </label>
            <select
              value={selectedUserId}
              onChange={(e) => {
                setSelectedUserId(e.target.value);
                setCurrentPage(1);
              }}
              className="relative w-full border-2 border-slate-700 dark:border-slate-500 rounded-lg pl-4 pr-10 py-2.5 bg-transparent text-sm text-slate-800 dark:text-slate-200 outline-none appearance-none focus:border-emerald-500 cursor-pointer font-medium"
            >
              {users.map((u) => (
                <option
                  key={u.id}
                  value={u.id}
                  className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                >
                  {u.fullName}
                </option>
              ))}
            </select>
            <ChevronDown className="w-5 h-5 absolute right-3 top-3 text-slate-500 pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-[#f8f9fa] dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-border/50">
                <th className="p-4 sm:p-5 font-semibold">User</th>
                <th className="p-4 sm:p-5 font-semibold">Module</th>
                <th className="p-4 sm:p-5 font-semibold">Sub Module</th>
                <th className="p-4 sm:p-5 font-semibold text-center w-24">Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-border/40 text-slate-700 dark:text-slate-200">
              {paginatedModules.map((item, index) => {
                const active = isModuleActive(item.module, item.subModule);
                return (
                  <tr
                    key={`${item.module}-${item.subModule}-${index}`}
                    onClick={() => toggleModuleActive(item.module, item.subModule)}
                    className={`cursor-pointer transition-colors ${
                      active
                        ? "bg-white dark:bg-card hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20"
                        : "bg-slate-50/30 dark:bg-slate-900/20 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 opacity-75"
                    }`}
                  >
                    <td className="p-4 sm:p-5 font-medium text-slate-900 dark:text-slate-100">
                      {selectedUserId}
                    </td>
                    <td className="p-4 sm:p-5 font-medium">{item.module}</td>
                    <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-300">
                      {item.subModule}
                    </td>
                    <td className="p-4 sm:p-5 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => toggleModuleActive(item.module, item.subModule)}
                        className={`inline-flex items-center justify-center h-7 w-7 rounded-md transition-all cursor-pointer ${
                          active
                            ? "bg-emerald-500 text-white border-2 border-emerald-500 shadow-xs hover:bg-emerald-600"
                            : "bg-white dark:bg-slate-800 text-slate-400 border border-slate-300 dark:border-slate-600 hover:border-slate-400"
                        }`}
                        title={active ? "Active (Click to disable)" : "Inactive (Click to enable)"}
                      >
                        {active ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-border/50 bg-[#f8f9fa]/50 dark:bg-slate-800/20">
          <div className="text-xs text-slate-500">
            Showing permissions for{" "}
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {selectedUser?.fullName}
            </span>{" "}
            (ID: {selectedUserId})
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-transparent font-medium text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div>
              {totalRows > 0 ? `${startIndex + 1}–${endIndex} of ${totalRows}` : "0–0 of 0"}
            </div>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleSavePermissions}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-200 dark:border-border/70 bg-white dark:bg-card text-slate-800 dark:text-slate-100 font-bold shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <Save className="w-4 h-4 text-emerald-600" />
          Save
        </button>
      </div>
    </div>
  );
}
