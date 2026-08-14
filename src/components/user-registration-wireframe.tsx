import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreVertical,
  Edit2,
  Trash2,
  X as CloseIcon,
  UserPlus,
  CheckCircle2,
  Power,
  Shield,
} from "lucide-react";
import { UserAccount, getStoredUsers, saveStoredUsers } from "@/hooks/use-permissions";

export function UserRegistrationWireframe() {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [viewingUser, setViewingUser] = useState<UserAccount | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<UserAccount>>({
    id: "",
    userName: "",
    email: "",
    fullName: "",
    role: "Planner",
    designation: "Production Planner",
    department: "SEWING",
    status: true,
  });

  useEffect(() => {
    setUsers(getStoredUsers());
  }, []);

  const handleOpenAddModal = () => {
    const nextId = String(Math.max(...users.map((u) => Number(u.id) || 0), 30) + 1);
    setFormData({
      id: nextId,
      userName: "",
      email: "",
      fullName: "",
      role: "Planner",
      designation: "Production Planner",
      department: "SEWING",
      status: true,
      lastLogin: "Never",
    });
    setEditingUserId(null);
    setIsModalOpen(true);
    setActionMenuOpen(null);
  };

  const handleOpenEditModal = (user: UserAccount) => {
    setFormData({ ...user });
    setEditingUserId(user.id);
    setIsModalOpen(true);
    setActionMenuOpen(null);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userName || !formData.fullName) return;

    let updatedList: UserAccount[];
    if (editingUserId) {
      updatedList = users.map((u) =>
        u.id === editingUserId ? ({ ...u, ...formData } as UserAccount) : u,
      );
      setNotification(`User ${formData.fullName} updated successfully.`);
    } else {
      const newUser: UserAccount = {
        id: formData.id || String(Date.now()),
        userName: formData.userName || "",
        email: formData.email || `${formData.userName}@rainco.lk`,
        fullName: formData.fullName || "",
        role: formData.role || "Planner",
        designation: formData.designation || "",
        department: formData.department || "SEWING",
        status: formData.status ?? true,
        lastLogin: "Just now",
      };
      updatedList = [newUser, ...users];
      setNotification(`User ${newUser.fullName} added successfully.`);
    }

    setUsers(updatedList);
    saveStoredUsers(updatedList);
    setIsModalOpen(false);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleToggleStatus = (user: UserAccount) => {
    const updatedList = users.map((u) => (u.id === user.id ? { ...u, status: !u.status } : u));
    setUsers(updatedList);
    saveStoredUsers(updatedList);
    setActionMenuOpen(null);
    setNotification(
      `Status for ${user.fullName} changed to ${!user.status ? "Active" : "Inactive"}.`,
    );
    setTimeout(() => setNotification(null), 3500);
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    const updatedList = users.filter((u) => u.id !== userId);
    setUsers(updatedList);
    saveStoredUsers(updatedList);
    setActionMenuOpen(null);
    setNotification(`User ${userName} deleted.`);
    setTimeout(() => setNotification(null), 3500);
  };

  // Pagination logic
  const totalRows = users.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const paginatedUsers = users.slice(startIndex, endIndex);

  return (
    <div className="space-y-6 mt-2">
      {notification && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-200 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Header Actions Bar */}
      <div className="flex items-center justify-end">
        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-border/70 bg-white dark:bg-card text-slate-800 dark:text-slate-100 font-bold text-xs shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <UserPlus className="w-4 h-4 text-emerald-600" />
          Add User
        </button>
      </div>

      {/* Main Table Container */}
      <div className="rounded-2xl border border-slate-100 dark:border-border/60 bg-white dark:bg-card overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="bg-[#f8f9fa] dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-border/50">
                <th className="p-4 sm:p-5 font-semibold">ID</th>
                <th className="p-4 sm:p-5 font-semibold">User Name</th>
                <th className="p-4 sm:p-5 font-semibold">Email</th>
                <th className="p-4 sm:p-5 font-semibold">Full Name</th>
                <th className="p-4 sm:p-5 font-semibold">Role</th>
                <th className="p-4 sm:p-5 font-semibold">Designation</th>
                <th className="p-4 sm:p-5 font-semibold">Department</th>
                <th className="p-4 sm:p-5 font-semibold">Status</th>
                <th className="p-4 sm:p-5 font-semibold">Last Login</th>
                <th className="p-4 sm:p-5 font-semibold text-center w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-border/40 text-slate-700 dark:text-slate-200">
              {paginatedUsers.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="p-4 sm:p-5 font-medium text-slate-900 dark:text-slate-100">
                    {row.id}
                  </td>
                  <td className="p-4 sm:p-5 font-medium">{row.userName}</td>
                  <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-300">{row.email}</td>
                  <td className="p-4 sm:p-5 font-medium text-slate-800 dark:text-slate-200">
                    {row.fullName}
                  </td>
                  <td className="p-4 sm:p-5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-medium text-[11px] ${
                        row.role === "Admin"
                          ? "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/50"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {row.role === "Admin" && <Shield className="w-3 h-3 text-purple-600" />}
                      {row.role}
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-300">
                    {row.designation || "-"}
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-300">
                    {row.department}
                  </td>
                  <td className="p-4 sm:p-5">
                    <span
                      className={`font-semibold ${
                        row.status ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"
                      }`}
                    >
                      {row.status ? "true" : "false"}
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-500 dark:text-slate-400">{row.lastLogin}</td>
                  <td className="p-4 sm:p-5 text-center">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() => setActionMenuOpen(actionMenuOpen === row.id ? null : row.id)}
                        className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>

                      {actionMenuOpen === row.id && (
                        <div className="absolute right-0 top-6 w-36 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-100">
                          <button
                            onClick={() => {
                              setViewingUser(row);
                              setActionMenuOpen(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                          >
                            <Eye className="h-3.5 w-3.5 text-slate-400" />
                            View
                          </button>
                          <button
                            onClick={() => handleOpenEditModal(row)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                          >
                            <Edit2 className="h-3.5 w-3.5 text-slate-400" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleToggleStatus(row)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                          >
                            <Power className="h-3.5 w-3.5 text-slate-400" />
                            {row.status ? "Deactivate" : "Activate"}
                          </button>
                          <div className="h-px bg-slate-100 dark:bg-slate-700/50 my-1"></div>
                          <button
                            onClick={() => handleDeleteUser(row.id, row.fullName)}
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-border/50 bg-[#f8f9fa]/50 dark:bg-slate-800/20">
          <div>
            Showing{" "}
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {paginatedUsers.length}
            </span>{" "}
            of {totalRows} registered users
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

      {/* Add / Edit User Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-card border border-slate-200 dark:border-border/80 shadow-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-border/60">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-600" />
                {editingUserId ? "Edit User Registration" : "Add User Registration"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    User ID
                  </label>
                  <input
                    type="text"
                    value={formData.id || ""}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    User Name
                  </label>
                  <input
                    type="text"
                    value={formData.userName || ""}
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                    placeholder="e.g. Roshan"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName || ""}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Roshan Perera"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. roshan@rainco.lk"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Role
                  </label>
                  <select
                    value={formData.role || "Planner"}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="Planner">Planner</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Operator">Operator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Department
                  </label>
                  <select
                    value={formData.department || "SEWING"}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="SEWING">SEWING</option>
                    <option value="CUTTING">CUTTING</option>
                    <option value="PACKING">PACKING</option>
                    <option value="MOLDING">MOLDING</option>
                    <option value="EXTRUDER">EXTRUDER</option>
                    <option value="ROTO">ROTO</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Designation
                </label>
                <input
                  type="text"
                  value={formData.designation || ""}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="e.g. Production Planner"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-1">
                <input
                  type="checkbox"
                  id="userStatus"
                  checked={formData.status ?? true}
                  onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <label
                  htmlFor="userStatus"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  Active User (Allowed access)
                </label>
              </div>

              <div className="mt-6 pt-4 flex justify-end gap-3 border-t border-slate-100 dark:border-border/60">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-xs transition-colors cursor-pointer"
                >
                  Save User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View User Modal */}
      {viewingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-card border border-slate-200 dark:border-border/80 shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-border/60">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                User Details
              </h3>
              <button
                onClick={() => setViewingUser(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">User ID</span>
                <span className="font-semibold">{viewingUser.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Username</span>
                <span className="font-semibold">{viewingUser.userName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Full Name</span>
                <span className="font-semibold">{viewingUser.fullName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Email</span>
                <span className="font-semibold">{viewingUser.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Role</span>
                <span className="font-semibold">{viewingUser.role}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Designation</span>
                <span className="font-semibold">{viewingUser.designation || "-"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Department</span>
                <span className="font-semibold">{viewingUser.department}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Status</span>
                <span className="font-semibold text-emerald-600">
                  {viewingUser.status ? "Active (true)" : "Inactive (false)"}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Last Login</span>
                <span>{viewingUser.lastLogin}</span>
              </div>
            </div>

            <div className="mt-6 pt-3 flex justify-end">
              <button
                onClick={() => setViewingUser(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
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
