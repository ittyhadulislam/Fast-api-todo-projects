import React, { useState } from 'react';
import {
  Search,
  Filter,
  X,
  LayoutList,
  Kanban,
  ArrowUpDown,
  RotateCcw,
} from 'lucide-react';

export default function TaskFilters({
  searchQuery,
  onSearchChange,
  priorityFilter,
  onPriorityFilterChange,
  statusFilter,
  onStatusFilterChange,
  assigneeFilter,
  onAssigneeFilterChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onResetFilters,
  teamMembers = [],
  currentUser,
}) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const isFiltered =
    searchQuery !== '' ||
    priorityFilter !== 'all' ||
    statusFilter !== 'all' ||
    assigneeFilter !== 'all';

  const priorities = [
    { id: 'all', label: 'All Priorities' },
    { id: 'urgent', label: 'Urgent' },
    { id: 'high', label: 'High' },
    { id: 'medium', label: 'Medium' },
    { id: 'low', label: 'Low' },
  ];

  const statuses = [
    { id: 'all', label: 'All Status' },
    { id: 'todo', label: 'To Do' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="space-y-3">
      {/* Primary Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, description, or category..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-9 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* View Switcher & Mobile Filter Toggle */}
        <div className="flex items-center gap-2 justify-between sm:justify-end">
          {/* Mobile Filter Sheet Trigger */}
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className={`sm:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
              isFiltered
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-semibold'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
            {isFiltered && (
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            )}
          </button>

          {/* Sort By Dropdown */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent border-none text-xs font-medium text-slate-700 focus:ring-0 cursor-pointer py-1 pr-6"
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="createdAt">Sort by Creation</option>
            </select>
          </div>

          {/* View Mode Segmented Control */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200/60">
            <button
              onClick={() => onViewModeChange('list')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="List View"
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">List</span>
            </button>
            <button
              onClick={() => onViewModeChange('board')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'board'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Priority Board"
            >
              <Kanban className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Board</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Row (Desktop) & Collapsible (Mobile) */}
      <div
        className={`${
          isMobileFilterOpen ? 'block' : 'hidden'
        } sm:block bg-white sm:bg-transparent p-4 sm:p-0 rounded-xl sm:rounded-none border sm:border-none border-slate-200 space-y-3 sm:space-y-0`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          {/* Priority Filter Segmented Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-xs font-medium text-slate-500 mr-1.5 shrink-0">
              Priority:
            </span>
            {priorities.map((item) => (
              <button
                key={item.id}
                onClick={() => onPriorityFilterChange(item.id)}
                className={`px-2.5 py-1 text-xs rounded-md transition-all whitespace-nowrap shrink-0 font-medium ${
                  priorityFilter === item.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white sm:bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Status & Assignee Selector */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Selector */}
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium text-slate-500">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => onStatusFilterChange(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 py-1 px-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                {statuses.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Assignee Filter */}
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium text-slate-500">Assignee:</span>
              <select
                value={assigneeFilter}
                onChange={(e) => onAssigneeFilterChange(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 py-1 px-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer max-w-[150px] truncate"
              >
                <option value="all">Everyone</option>
                {currentUser && <option value="me">Assigned to Me</option>}
                {teamMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters */}
            {isFiltered && (
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1 px-2 py-1 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-md transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
