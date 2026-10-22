import React, { useState } from 'react';
import {
  X,
  Users,
  UserPlus,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export default function TeamModal({
  isOpen,
  onClose,
  teamMembers = [],
  tasks = [],
  currentUser,
  onSwitchUser,
  onAddMember,
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Frontend Engineer');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Please provide a name and work email.');
      return;
    }

    const colors = [
      'bg-indigo-600',
      'bg-emerald-600',
      'bg-blue-600',
      'bg-amber-600',
      'bg-rose-600',
      'bg-purple-600',
    ];
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    onAddMember({
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      role: role.trim() || 'Team Member',
      initials: initials || 'TM',
      color: colors[teamMembers.length % colors.length],
    });

    setName('');
    setEmail('');
    setRole('Frontend Engineer');
    setShowAddForm(false);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Team Members & Workload
                </h3>
                <p className="text-xs text-slate-500">
                  Assign tasks, track team capacity, and manage collaborators
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Top Action to Invite/Add */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Workspace Roster ({teamMembers.length} Members)
              </span>
              <button
                type="button"
                onClick={() => setShowAddForm(!showAddForm)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{showAddForm ? 'Cancel Form' : 'Add Team Member'}</span>
              </button>
            </div>

            {/* Add Team Member inline form */}
            {showAddForm && (
              <form
                onSubmit={handleAddMember}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
              >
                <h4 className="text-xs font-bold text-slate-900">
                  Add New Team Member
                </h4>
                {error && (
                  <p className="text-xs text-rose-600 font-medium">{error}</p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. David Kim"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Work Email
                    </label>
                    <input
                      type="email"
                      placeholder="david.k@company.io"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Role / Title
                    </label>
                    <input
                      type="text"
                      placeholder="Product Designer"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                  >
                    Save Member
                  </button>
                </div>
              </form>
            )}

            {/* Members List */}
            <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
              {teamMembers.map((member) => {
                const assignedTasks = tasks.filter((t) => t.assignedToId === member.id);
                const activeTasks = assignedTasks.filter((t) => t.status !== 'completed');
                const completedTasks = assignedTasks.filter((t) => t.status === 'completed');
                const isCurrent = currentUser?.id === member.id;

                return (
                  <div
                    key={member.id}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0 ${
                          member.color || 'bg-slate-700'
                        }`}
                      >
                        {member.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-900">
                            {member.name}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.2 rounded">
                              Current You
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>{member.role}</span>
                          <span>·</span>
                          <span className="text-slate-400">{member.email}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats & Switch User Action */}
                    <div className="flex items-center gap-4 self-end sm:self-center">
                      <div className="flex items-center gap-3 text-xs">
                        <div
                          className="flex items-center gap-1 text-slate-600"
                          title="Active Tasks"
                        >
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          <span className="font-mono tabular-nums font-semibold">
                            {activeTasks.length}
                          </span>
                          <span className="text-slate-400 text-[11px]">active</span>
                        </div>
                        <div
                          className="flex items-center gap-1 text-slate-600"
                          title="Completed Tasks"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="font-mono tabular-nums font-semibold">
                            {completedTasks.length}
                          </span>
                          <span className="text-slate-400 text-[11px]">done</span>
                        </div>
                      </div>

                      {!isCurrent && (
                        <button
                          type="button"
                          onClick={() => onSwitchUser(member)}
                          className="px-2.5 py-1 text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-md transition-colors"
                        >
                          Switch User
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
