import React from 'react';
import { CheckCircle2, Clock, Flame } from 'lucide-react';

export default function StatsBar({
  tasks = [],
  currentPriorityFilter = 'all',
  currentStatusFilter = 'all',
  onPriorityFilterChange,
  onStatusFilterChange,
}) {
  const total = tasks.length;
  const urgentCount = tasks.filter((t) => t.priority === 'urgent').length;
  const highCount = tasks.filter((t) => t.priority === 'high').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length;
  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const completionRate = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {/* 1. Total Tasks */}
      <div
        onClick={() => {
          onPriorityFilterChange('all');
          onStatusFilterChange('all');
        }}
        className={`p-4 rounded-xl border bg-white cursor-pointer transition-all hover:border-slate-300 ${
          currentPriorityFilter === 'all' && currentStatusFilter === 'all'
            ? 'border-indigo-500 ring-1 ring-indigo-500/30'
            : 'border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-xs font-medium">All Tasks</span>
          <span className="text-[11px] text-slate-400">Total</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold font-mono tabular-nums text-slate-900">
            {total}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            {completionRate}% done
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
          <div
            className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* 2. Urgent Priorities */}
      <div
        onClick={() => {
          onPriorityFilterChange(currentPriorityFilter === 'urgent' ? 'all' : 'urgent');
        }}
        className={`p-4 rounded-xl border bg-white cursor-pointer transition-all hover:border-rose-300 ${
          currentPriorityFilter === 'urgent'
            ? 'border-rose-500 ring-1 ring-rose-500/30'
            : 'border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-xs font-medium flex items-center gap-1.5 text-rose-700">
            <Flame className="w-3.5 h-3.5 text-rose-600" />
            Urgent Priorities
          </span>
          <span className="text-[11px] text-slate-400">High: {highCount}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold font-mono tabular-nums text-rose-600">
            {urgentCount}
          </span>
          <span className="text-xs text-slate-500 font-medium">Requires focus</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
          <div
            className="bg-rose-500 h-1.5 rounded-full transition-all duration-300"
            style={{
              width: `${total > 0 ? ((urgentCount + highCount) / total) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      {/* 3. In Progress */}
      <div
        onClick={() => {
          onStatusFilterChange(
            currentStatusFilter === 'in_progress' ? 'all' : 'in_progress'
          );
        }}
        className={`p-4 rounded-xl border bg-white cursor-pointer transition-all hover:border-amber-300 ${
          currentStatusFilter === 'in_progress'
            ? 'border-amber-500 ring-1 ring-amber-500/30'
            : 'border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-xs font-medium flex items-center gap-1.5 text-amber-700">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            In Active Sprint
          </span>
          <span className="text-[11px] text-slate-400">Active</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold font-mono tabular-nums text-amber-600">
            {inProgressCount}
          </span>
          <span className="text-xs text-slate-500 font-medium">in execution</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
          <div
            className="bg-amber-500 h-1.5 rounded-full transition-all duration-300"
            style={{
              width: `${total > 0 ? (inProgressCount / total) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      {/* 4. Completed */}
      <div
        onClick={() => {
          onStatusFilterChange(
            currentStatusFilter === 'completed' ? 'all' : 'completed'
          );
        }}
        className={`p-4 rounded-xl border bg-white cursor-pointer transition-all hover:border-emerald-300 ${
          currentStatusFilter === 'completed'
            ? 'border-emerald-500 ring-1 ring-emerald-500/30'
            : 'border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between text-slate-500 mb-1">
          <span className="text-xs font-medium flex items-center gap-1.5 text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Completed
          </span>
          <span className="text-[11px] text-slate-400">Shipped</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold font-mono tabular-nums text-emerald-600">
            {completedCount}
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {total > 0 ? `${completedCount}/${total}` : '0/0'}
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
          <div
            className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
}
