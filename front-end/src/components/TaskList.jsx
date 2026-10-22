import React from 'react';
import { Plus, FolderOpen } from 'lucide-react';
import TaskCard from './TaskCard.jsx';

export default function TaskList({
  tasks = [],
  teamMembers = [],
  onToggleComplete,
  onStatusChange,
  onEditTask,
  onDeleteTask,
  onCreateTaskClick,
  onResetFilters,
  isFiltered = false,
}) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-2xl border border-dashed border-slate-300">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
          <FolderOpen className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-900">
          {isFiltered ? 'No tasks match your filters' : 'No tasks created yet'}
        </h3>
        <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
          {isFiltered
            ? 'Try adjusting your search criteria, priority filter, or assignee selection.'
            : 'Get organized by assigning responsibilities and setting priority deadlines for your team.'}
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          {isFiltered ? (
            <button
              onClick={onResetFilters}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          ) : (
            <button
              onClick={onCreateTaskClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Create First Task</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          teamMembers={teamMembers}
          onToggleComplete={onToggleComplete}
          onStatusChange={onStatusChange}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}
