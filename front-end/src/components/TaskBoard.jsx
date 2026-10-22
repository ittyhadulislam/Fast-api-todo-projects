import React, { useState } from 'react';
import { Plus, Flame, AlertTriangle, Layers, CheckCircle2 } from 'lucide-react';
import TaskCard from './TaskCard.jsx';

export default function TaskBoard({
  tasks = [],
  teamMembers = [],
  onToggleComplete,
  onStatusChange,
  onEditTask,
  onDeleteTask,
  onCreateTaskClick,
}) {
  const [boardGrouping, setBoardGrouping] = useState('priority'); // 'priority' | 'status'

  if (boardGrouping === 'priority') {
    const columns = [
      {
        id: 'urgent',
        title: 'Urgent',
        subtitle: 'Immediate resolution',
        borderColor: 'border-t-rose-500',
        badgeBg: 'bg-rose-100 text-rose-700',
        icon: Flame,
      },
      {
        id: 'high',
        title: 'High Priority',
        subtitle: 'Sprint critical items',
        borderColor: 'border-t-amber-500',
        badgeBg: 'bg-amber-100 text-amber-700',
        icon: AlertTriangle,
      },
      {
        id: 'medium',
        title: 'Medium Priority',
        subtitle: 'Standard planned roadmap',
        borderColor: 'border-t-indigo-500',
        badgeBg: 'bg-indigo-100 text-indigo-700',
        icon: Layers,
      },
      {
        id: 'low',
        title: 'Low Priority',
        subtitle: 'Backlog improvements',
        borderColor: 'border-t-slate-400',
        badgeBg: 'bg-slate-100 text-slate-700',
        icon: CheckCircle2,
      },
    ];

    return (
      <div className="space-y-4">
        {/* Board Sub-header with Grouping Toggle */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">Board Grouping:</span>
          <div className="flex items-center gap-1 p-0.5 bg-slate-200/70 rounded-md">
            <button
              type="button"
              onClick={() => setBoardGrouping('priority')}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                boardGrouping === 'priority'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              By Priority Level
            </button>
            <button
              type="button"
              onClick={() => setBoardGrouping('status')}
              className={`px-2 py-1 rounded font-medium transition-colors ${
                boardGrouping === 'status'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              By Progress Status
            </button>
          </div>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
          {columns.map((col) => {
            const colTasks = tasks.filter((t) => t.priority === col.id);
            const Icon = col.icon;

            return (
              <div
                key={col.id}
                className={`bg-slate-100/70 rounded-xl border border-slate-200 p-3 flex flex-col min-h-[300px] border-t-4 ${col.borderColor}`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-slate-500" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {col.title}
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        {col.subtitle}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-mono tabular-nums text-xs font-bold px-2 py-0.5 rounded-full ${col.badgeBg}`}
                  >
                    {colTasks.length}
                  </span>
                </div>

                {/* Task Cards in Column */}
                <div className="space-y-3 flex-1">
                  {colTasks.length === 0 ? (
                    <div className="h-32 flex flex-col items-center justify-center text-center p-3 text-slate-400">
                      <p className="text-xs">No {col.title.toLowerCase()} tasks</p>
                    </div>
                  ) : (
                    colTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        teamMembers={teamMembers}
                        onToggleComplete={onToggleComplete}
                        onStatusChange={onStatusChange}
                        onEditTask={onEditTask}
                        onDeleteTask={onDeleteTask}
                      />
                    ))
                  )}
                </div>

                {/* Add task shortcut in this column */}
                <button
                  type="button"
                  onClick={onCreateTaskClick}
                  className="mt-3 w-full py-2 px-3 border border-dashed border-slate-300 hover:border-slate-400 hover:bg-white text-slate-600 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Task</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // By Status
  const statusColumns = [
    {
      id: 'todo',
      title: 'To Do',
      subtitle: 'Backlog ready for sprint',
      borderColor: 'border-t-slate-500',
      badgeBg: 'bg-slate-200 text-slate-800',
    },
    {
      id: 'in_progress',
      title: 'In Progress',
      subtitle: 'Currently being developed',
      borderColor: 'border-t-amber-500',
      badgeBg: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'completed',
      title: 'Completed',
      subtitle: 'Verified & shipped',
      borderColor: 'border-t-emerald-500',
      badgeBg: 'bg-emerald-100 text-emerald-800',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Board Sub-header */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500 font-medium">Board Grouping:</span>
        <div className="flex items-center gap-1 p-0.5 bg-slate-200/70 rounded-md">
          <button
            type="button"
            onClick={() => setBoardGrouping('priority')}
            className={`px-2 py-1 rounded font-medium transition-colors ${
              boardGrouping === 'priority'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            By Priority Level
          </button>
          <button
            type="button"
            onClick={() => setBoardGrouping('status')}
            className={`px-2 py-1 rounded font-medium transition-colors ${
              boardGrouping === 'status'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            By Progress Status
          </button>
        </div>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        {statusColumns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);

          return (
            <div
              key={col.id}
              className={`bg-slate-100/70 rounded-xl border border-slate-200 p-3.5 flex flex-col min-h-[300px] border-t-4 ${col.borderColor}`}
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {col.title}
                  </h4>
                  <p className="text-[10px] text-slate-400">{col.subtitle}</p>
                </div>
                <span
                  className={`font-mono tabular-nums text-xs font-bold px-2 py-0.5 rounded-full ${col.badgeBg}`}
                >
                  {colTasks.length}
                </span>
              </div>

              <div className="space-y-3 flex-1">
                {colTasks.length === 0 ? (
                  <div className="h-32 flex flex-col items-center justify-center text-center p-3 text-slate-400">
                    <p className="text-xs">No tasks in {col.title.toLowerCase()}</p>
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      teamMembers={teamMembers}
                      onToggleComplete={onToggleComplete}
                      onStatusChange={onStatusChange}
                      onEditTask={onEditTask}
                      onDeleteTask={onDeleteTask}
                    />
                  ))
                )}
              </div>

              <button
                type="button"
                onClick={onCreateTaskClick}
                className="mt-3 w-full py-2 px-3 border border-dashed border-slate-300 hover:border-slate-400 hover:bg-white text-slate-600 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
