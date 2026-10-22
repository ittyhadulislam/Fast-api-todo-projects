import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  AlertCircle,
  Check,
  Flame,
  AlertTriangle,
  Layers,
  CheckCircle2,
  Trash2,
} from 'lucide-react';

export default function TaskModal({
  isOpen,
  onClose,
  task = null,
  teamMembers = [],
  onSaveTask,
  onDeleteTask,
  currentUser,
}) {
  const isEditing = Boolean(task);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState('todo');
  const [assignedToId, setAssignedToId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('Engineering');
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setPriority(task.priority || 'medium');
      setStatus(task.status || 'todo');
      setAssignedToId(task.assignedToId || '');
      setDueDate(task.dueDate || '');
      setCategory(task.category || 'Engineering');
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setStatus('todo');
      setAssignedToId(currentUser?.id || teamMembers[0]?.id || '');
      const d = new Date();
      d.setDate(d.getDate() + 3);
      setDueDate(d.toISOString().split('T')[0]);
      setCategory('Engineering');
    }
    setError('');
  }, [task, isOpen, currentUser, teamMembers]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    onSaveTask({
      id: isEditing ? task.id : `task-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      assignedToId: assignedToId || null,
      dueDate: dueDate || null,
      category: category.trim(),
      createdAt: isEditing ? task.createdAt : new Date().toISOString(),
      createdBy: isEditing ? task.createdBy : currentUser?.name || 'Sarah Jenkins',
    });

    onClose();
  };

  const handleDateShortcut = (daysToAdd) => {
    const d = new Date();
    d.setDate(d.getDate() + daysToAdd);
    setDueDate(d.toISOString().split('T')[0]);
  };

  const priorityOptions = [
    {
      id: 'urgent',
      label: 'Urgent',
      desc: 'Immediate action',
      icon: Flame,
      color: 'border-rose-300 bg-rose-50/50 text-rose-700',
      activeColor: 'border-rose-600 ring-2 ring-rose-500/20 bg-rose-50 text-rose-800',
    },
    {
      id: 'high',
      label: 'High',
      desc: 'Sprint critical',
      icon: AlertTriangle,
      color: 'border-amber-300 bg-amber-50/50 text-amber-700',
      activeColor: 'border-amber-600 ring-2 ring-amber-500/20 bg-amber-50 text-amber-800',
    },
    {
      id: 'medium',
      label: 'Medium',
      desc: 'Standard roadmap',
      icon: Layers,
      color: 'border-indigo-300 bg-indigo-50/50 text-indigo-700',
      activeColor: 'border-indigo-600 ring-2 ring-indigo-500/20 bg-indigo-50 text-indigo-800',
    },
    {
      id: 'low',
      label: 'Low',
      desc: 'Backlog enhancement',
      icon: CheckCircle2,
      color: 'border-slate-300 bg-slate-50 text-slate-700',
      activeColor: 'border-slate-700 ring-2 ring-slate-500/20 bg-slate-100 text-slate-900',
    },
  ];

  const categories = [
    'Engineering',
    'Design & UX',
    'Planning',
    'Accessibility',
    'Authentication',
    'QA & Testing',
    'Roadmap',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/50">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {isEditing ? 'Update Task' : 'Create New Task'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isEditing
                  ? 'Modify task details, priority level, and team assignment'
                  : 'Assign team members and define target priorities'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Task Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Finalize mobile layout & touch target ergonomics"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Description & Notes
              </label>
              <textarea
                rows={3}
                placeholder="Provide clear notes, acceptance criteria, and details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 text-xs text-slate-800 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
              />
            </div>

            {/* Priority Level Matrix Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Priority Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {priorityOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = priority === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPriority(opt.id)}
                      className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        isSelected ? opt.activeColor : opt.color
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Icon className="w-4 h-4" />
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="mt-2">
                        <div className="text-xs font-bold">{opt.label}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Assignee & Status Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Assign To Team Member */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Assign To Team Member
                </label>
                <select
                  value={assignedToId}
                  onChange={(e) => setAssignedToId(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 text-xs font-medium bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
                >
                  <option value="">Unassigned</option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} ({member.role})
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Status Workflow
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
                >
                  <option value="todo">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Due Date & Shortcuts */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Target Due Date
                </label>
                {/* Date Shortcuts */}
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <button
                    type="button"
                    onClick={() => handleDateShortcut(0)}
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Today
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => handleDateShortcut(1)}
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Tomorrow
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => handleDateShortcut(7)}
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Next Week
                  </button>
                </div>
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs font-mono tabular-nums bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Category / Department Tag */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category
              </label>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-2.5 py-1 text-[11px] rounded-md transition-colors font-medium ${
                      category === cat
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
              {isEditing ? (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onDeleteTask(task.id);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Task</span>
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
                >
                  <span>{isEditing ? 'Save Changes' : 'Create Task'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
