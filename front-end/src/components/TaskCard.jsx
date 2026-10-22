import React from 'react';
import {
  Calendar,
  Check,
  Edit2,
  Trash2,
  User,
} from 'lucide-react';

export const PRIORITY_CONFIG = {
  urgent: {
    label: 'Urgent',
    textColor: 'text-rose-700',
    indicatorColor: 'bg-rose-500',
    borderBadge: 'border-rose-200 bg-rose-50/70',
  },
  high: {
    label: 'High',
    textColor: 'text-amber-700',
    indicatorColor: 'bg-amber-500',
    borderBadge: 'border-amber-200 bg-amber-50/70',
  },
  medium: {
    label: 'Medium',
    textColor: 'text-indigo-700',
    indicatorColor: 'bg-indigo-500',
    borderBadge: 'border-indigo-200 bg-indigo-50/70',
  },
  low: {
    label: 'Low',
    textColor: 'text-slate-600',
    indicatorColor: 'bg-slate-400',
    borderBadge: 'border-slate-200 bg-slate-50',
  },
};

export const STATUS_CONFIG = {
  todo: {
    label: 'To Do',
    color: 'text-slate-600',
  },
  in_progress: {
    label: 'In Progress',
    color: 'text-amber-700',
  },
  completed: {
    label: 'Completed',
    color: 'text-emerald-700',
  },
};

export default function TaskCard({
  task,
  teamMembers = [],
  onToggleComplete,
  onStatusChange,
  onEditTask,
  onDeleteTask,
}) {
  const assignee = teamMembers.find((m) => m.id === task.assignedToId);
  const priority = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium;
  const status = STATUS_CONFIG[task.status] || STATUS_CONFIG.todo;
  const isCompleted = task.status === 'completed';

  const isOverdue =
    !isCompleted &&
    task.dueDate &&
    new Date(task.dueDate).setHours(23, 59, 59, 999) < new Date().getTime();

  return (
    <div
      className={`group bg-white rounded-xl border transition-all duration-200 p-4 sm:p-5 relative hover:shadow-xs ${
        isCompleted
          ? 'border-slate-200 bg-slate-50/50 opacity-80'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="flex items-start gap-3.5">
        {/* Completion Checkbox */}
        <button
          type="button"
          onClick={() => onToggleComplete(task.id)}
          className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
            isCompleted
              ? 'bg-emerald-600 border-emerald-600 text-white'
              : 'border-slate-300 hover:border-indigo-500 bg-white'
          }`}
          aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
        >
          {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {/* Header Row: Category / Priority & Actions */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2 text-xs">
              {/* Priority Indicator - Clean unboxed text with indicator dot */}
              <span
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold border ${priority.borderBadge} ${priority.textColor}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${priority.indicatorColor}`}
                />
                <span>{priority.label}</span>
              </span>

              {task.category && (
                <>
                  <span className="text-slate-300" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-slate-500 font-medium">
                    {task.category}
                  </span>
                </>
              )}
            </div>

            {/* Quick Actions (Edit, Delete) */}
            <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => onEditTask(task.id)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                title="Edit task"
                aria-label="Edit task"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onDeleteTask(task.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                title="Delete task"
                aria-label="Delete task"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onEditTask(task.id)}
            className={`text-sm font-semibold text-slate-900 cursor-pointer hover:text-indigo-600 transition-colors ${
              isCompleted ? 'line-through text-slate-500' : ''
            }`}
          >
            {task.title}
          </h3>

          {/* Description */}
          {task.description && (
            <p className="mt-1 text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          )}

          {/* Bottom Metadata: Assignee, Due Date, Status Selector */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Assignee */}
            <div className="flex items-center gap-2">
              {assignee ? (
                <div
                  className="flex items-center gap-2"
                  title={`Assigned to: ${assignee.name} (${assignee.role})`}
                >
                  <div
                    className={`w-6 h-6 rounded-full text-white text-[11px] font-semibold flex items-center justify-center shrink-0 ${
                      assignee.color || 'bg-slate-600'
                    }`}
                  >
                    {assignee.initials || assignee.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-slate-800 leading-tight">
                      {assignee.name}
                    </span>
                    <span className="text-[10px] text-slate-400 leading-tight">
                      {assignee.role}
                    </span>
                  </div>
                </div>
              ) : (
                <span className="text-slate-400 italic flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  <span>Unassigned</span>
                </span>
              )}
            </div>

            {/* Right side: Due Date & Status */}
            <div className="flex items-center gap-3">
              {/* Due Date */}
              {task.dueDate && (
                <div
                  className={`flex items-center gap-1 font-mono text-[11px] tabular-nums ${
                    isOverdue
                      ? 'text-rose-600 font-semibold'
                      : 'text-slate-500'
                  }`}
                  title={isOverdue ? 'Task is past due date!' : 'Due Date'}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{task.dueDate}</span>
                  {isOverdue && (
                    <span className="text-[10px] uppercase font-bold text-rose-600 ml-0.5">
                      (Overdue)
                    </span>
                  )}
                </div>
              )}

              {/* Status Select */}
              <select
                value={task.status}
                onChange={(e) => onStatusChange(task.id, e.target.value)}
                className={`py-1 px-2 rounded-md text-[11px] font-medium border border-slate-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white ${status.color}`}
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
