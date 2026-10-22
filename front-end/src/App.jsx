import React, { useState, useMemo } from "react";
import { Plus, Users } from "lucide-react";
import Navbar from "./components/Navbar.jsx";
import StatsBar from "./components/StatsBar.jsx";
import TaskFilters from "./components/TaskFilters.jsx";
import TaskList from "./components/TaskList.jsx";
import TaskBoard from "./components/TaskBoard.jsx";
import TaskModal from "./components/TaskModal.jsx";
import DeleteConfirmModal from "./components/DeleteConfirmModal.jsx";
import AuthModal from "./components/AuthModal.jsx";
import TeamModal from "./components/TeamModal.jsx";
import { INITIAL_TASKS, INITIAL_MEMBERS } from "./data/mockData.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./pages/auth/Authentication.jsx";
import Profile from "./pages/projectPage/Profile.jsx";
import PublicRoute from "./components/auth/PublicRoute.jsx";
import PrivateRoute from "./components/auth/PrivateRoute.jsx";

const PRIORITY_ORDER = {
  urgent: 4,
  high: 3,
  medium: 2,
  low: 1,
};

export default function App() {
  // Core Mock State
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [teamMembers, setTeamMembers] = useState(INITIAL_MEMBERS);
  const [currentUser, setCurrentUser] = useState(INITIAL_MEMBERS[0]);

  // Filtering & View State
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");
  const [viewMode, setViewMode] = useState("list"); // 'list' | 'board'

  // Modal State
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login");
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  // Filter & Sort Logic
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description && t.description.toLowerCase().includes(q)) ||
          (t.category && t.category.toLowerCase().includes(q)),
      );
    }

    // 2. Priority Filter
    if (priorityFilter !== "all") {
      result = result.filter((t) => t.priority === priorityFilter);
    }

    // 3. Status Filter
    if (statusFilter !== "all") {
      result = result.filter((t) => t.status === statusFilter);
    }

    // 4. Assignee Filter
    if (assigneeFilter === "me") {
      result = result.filter((t) => t.assignedToId === currentUser?.id);
    } else if (assigneeFilter !== "all") {
      result = result.filter((t) => t.assignedToId === assigneeFilter);
    }

    // 5. Sorting
    result.sort((a, b) => {
      if (sortBy === "priority") {
        const pa = PRIORITY_ORDER[a.priority] || 0;
        const pb = PRIORITY_ORDER[b.priority] || 0;
        return pb - pa;
      }
      if (sortBy === "createdAt") {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      // Default: dueDate
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

    return result;
  }, [
    tasks,
    searchQuery,
    priorityFilter,
    statusFilter,
    assigneeFilter,
    currentUser,
    sortBy,
  ]);

  // Task Actions
  const handleSaveTask = (taskData) => {
    setTasks((prev) => {
      const exists = prev.some((t) => t.id === taskData.id);
      if (exists) {
        return prev.map((t) => (t.id === taskData.id ? taskData : t));
      }
      return [taskData, ...prev];
    });
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleToggleComplete = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            status: t.status === "completed" ? "todo" : "completed",
          };
        }
        return t;
      }),
    );
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    );
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setPriorityFilter("all");
    setStatusFilter("all");
    setAssigneeFilter("all");
  };

  // Auth & Team Actions
  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleRegister = (newUser) => {
    setTeamMembers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleAddMember = (newMember) => {
    setTeamMembers((prev) => [...prev, newMember]);
  };

  // Modal Handlers
  const openCreateTask = () => {
    setEditingTaskId(null);
    setIsTaskModalOpen(true);
  };

  const openEditTask = (taskId) => {
    setEditingTaskId(taskId);
    setIsTaskModalOpen(true);
  };

  const openDeleteModal = (taskId) => {
    setDeletingTaskId(taskId);
    setIsDeleteModalOpen(true);
  };

  const openAuth = (mode = "login") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const editingTask = editingTaskId
    ? tasks.find((t) => t.id === editingTaskId)
    : null;
  const deletingTask = deletingTaskId
    ? tasks.find((t) => t.id === deletingTaskId)
    : null;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/authentication"
            element={
              <PublicRoute>
                <Authentication />
              </PublicRoute>
            }
          />
        </Routes>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
    // <div className="min-h-screen bg-slate-50 flex flex-col">
    //   {/* Top Navbar */}
    //   <Navbar
    //     currentUser={currentUser}
    //     teamMembers={teamMembers}
    //     onSwitchUser={setCurrentUser}
    //     onLogout={handleLogout}
    //     onOpenAuthModal={openAuth}
    //     onOpenTaskModal={openCreateTask}
    //     onOpenTeamModal={() => setIsTeamModalOpen(true)}
    //     viewMode={viewMode}
    //     onViewModeChange={setViewMode}
    //   />

    //   {/* Main Container */}
    //   <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
    //     {/* Workspace Hero / Context Header */}
    //     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
    //       <div>
    //         <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
    //           <span>Sprint Workspace</span>
    //           <span className="text-slate-300" aria-hidden="true">
    //             /
    //           </span>
    //           <span className="text-slate-500 font-normal">Team Deliverables</span>
    //         </div>
    //         <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
    //           Task Priority & Assignment
    //         </h1>
    //         <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-2xl">
    //           Organize team responsibilities, track real-time priority levels, and
    //           collaborate efficiently with authenticated workflows.
    //         </p>
    //       </div>

    //       {/* Quick Actions */}
    //       <div className="flex items-center gap-2.5 shrink-0">
    //         <button
    //           type="button"
    //           onClick={() => setIsTeamModalOpen(true)}
    //           className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors shadow-2xs"
    //         >
    //           <Users className="w-3.5 h-3.5 text-slate-500" />
    //           <span>Team Roster ({teamMembers.length})</span>
    //         </button>
    //         <button
    //           type="button"
    //           onClick={openCreateTask}
    //           className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] rounded-lg transition-all shadow-xs"
    //         >
    //           <Plus className="w-4 h-4 stroke-[2.5]" />
    //           <span>Add Task</span>
    //         </button>
    //       </div>
    //     </div>

    //     {/* Stats Metrics Bar */}
    //     <StatsBar
    //       tasks={tasks}
    //       currentPriorityFilter={priorityFilter}
    //       currentStatusFilter={statusFilter}
    //       onPriorityFilterChange={setPriorityFilter}
    //       onStatusFilterChange={setStatusFilter}
    //     />

    //     {/* Filter & Search Controls */}
    //     <div className="pt-2">
    //       <TaskFilters
    //         searchQuery={searchQuery}
    //         onSearchChange={setSearchQuery}
    //         priorityFilter={priorityFilter}
    //         onPriorityFilterChange={setPriorityFilter}
    //         statusFilter={statusFilter}
    //         onStatusFilterChange={setStatusFilter}
    //         assigneeFilter={assigneeFilter}
    //         onAssigneeFilterChange={setAssigneeFilter}
    //         sortBy={sortBy}
    //         onSortChange={setSortBy}
    //         viewMode={viewMode}
    //         onViewModeChange={setViewMode}
    //         onResetFilters={handleResetFilters}
    //         teamMembers={teamMembers}
    //         currentUser={currentUser}
    //       />
    //     </div>

    //     {/* Active Content: List View or Board View */}
    //     <div className="pt-2 pb-12">
    //       {viewMode === 'board' ? (
    //         <TaskBoard
    //           tasks={filteredTasks}
    //           teamMembers={teamMembers}
    //           onToggleComplete={handleToggleComplete}
    //           onStatusChange={handleStatusChange}
    //           onEditTask={openEditTask}
    //           onDeleteTask={openDeleteModal}
    //           onCreateTaskClick={openCreateTask}
    //         />
    //       ) : (
    //         <TaskList
    //           tasks={filteredTasks}
    //           teamMembers={teamMembers}
    //           onToggleComplete={handleToggleComplete}
    //           onStatusChange={handleStatusChange}
    //           onEditTask={openEditTask}
    //           onDeleteTask={openDeleteModal}
    //           onCreateTaskClick={openCreateTask}
    //           onResetFilters={handleResetFilters}
    //           isFiltered={
    //             searchQuery !== '' ||
    //             priorityFilter !== 'all' ||
    //             statusFilter !== 'all' ||
    //             assigneeFilter !== 'all'
    //           }
    //         />
    //       )}
    //     </div>
    //   </main>

    //   {/* Footer */}
    //   <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-400">
    //     <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
    //       <div className="flex items-center gap-2">
    //         <span className="font-semibold text-slate-700">TaskFlow</span>
    //         <span aria-hidden="true">·</span>
    //         <span>Team Task & Priority Management</span>
    //       </div>
    //       <div className="flex items-center gap-4 text-slate-500">
    //         <span>Responsive Mobile & Desktop</span>
    //         <span aria-hidden="true">·</span>
    //         <span>Tailwind CSS</span>
    //       </div>
    //     </div>
    //   </footer>

    //   {/* Modals */}
    //   <TaskModal
    //     isOpen={isTaskModalOpen}
    //     onClose={() => setIsTaskModalOpen(false)}
    //     task={editingTask}
    //     teamMembers={teamMembers}
    //     onSaveTask={handleSaveTask}
    //     onDeleteTask={openDeleteModal}
    //     currentUser={currentUser}
    //   />
    //   <DeleteConfirmModal
    //     isOpen={isDeleteModalOpen}
    //     onClose={() => setIsDeleteModalOpen(false)}
    //     task={deletingTask}
    //     onConfirmDelete={handleDeleteTask}
    //   />
    //   <AuthModal
    //     isOpen={isAuthModalOpen}
    //     onClose={() => setIsAuthModalOpen(false)}
    //     mode={authModalMode}
    //     onModeChange={setAuthModalMode}
    //     onLogin={handleLogin}
    //     onRegister={handleRegister}
    //     teamMembers={teamMembers}
    //   />
    //   <TeamModal
    //     isOpen={isTeamModalOpen}
    //     onClose={() => setIsTeamModalOpen(false)}
    //     teamMembers={teamMembers}
    //     tasks={tasks}
    //     currentUser={currentUser}
    //     onSwitchUser={setCurrentUser}
    //     onAddMember={handleAddMember}
    //   />
    // </div>
  );
}
