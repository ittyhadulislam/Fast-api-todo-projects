import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  Users,
  LogIn,
  LogOut,
  ChevronDown,
  UserCheck,
  LayoutList,
  Kanban,
} from 'lucide-react';

export default function Navbar({
  currentUser,
  teamMembers = [],
  onSwitchUser,
  onLogout,
  onOpenAuthModal,
  onOpenTaskModal,
  onOpenTeamModal,
  viewMode,
  onViewModeChange,
}) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
              <CheckSquare className="w-5 h-5 stroke-[2.2]" />
            </div>
            <a
              href="#"
              className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap hover:text-indigo-600 transition-colors"
            >
              TaskFlow
            </a>
          </div>

          {/* Zone 2: Navigation / View Switch Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => onViewModeChange('list')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                viewMode === 'list'
                  ? 'border-indigo-600 text-slate-900 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Task List
            </button>
            <button
              onClick={() => onViewModeChange('board')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                viewMode === 'board'
                  ? 'border-indigo-600 text-slate-900 font-semibold'
                  : 'border-transparent'
              }`}
            >
              Priority Board
            </button>
            <button
              onClick={onOpenTeamModal}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent flex items-center gap-1.5"
            >
              <Users className="w-4 h-4 text-slate-400" />
              <span>Team Roster ({teamMembers.length})</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action & Profile / Auth */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenTaskModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:scale-[0.98] transition-all whitespace-nowrap shadow-sm"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>New Task</span>
            </button>

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200"
                  aria-expanded={isUserMenuOpen}
                  aria-label="User profile menu"
                >
                  <div
                    className={`w-7 h-7 rounded-full text-white text-xs font-semibold flex items-center justify-center shrink-0 ${
                      currentUser.color || 'bg-slate-700'
                    }`}
                  >
                    {currentUser.initials || currentUser.name?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden sm:inline text-xs font-medium text-slate-800 max-w-[110px] truncate">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                      <div className="px-4 py-2.5 border-b border-slate-100">
                        <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">
                          Signed in as
                        </p>
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {currentUser.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {currentUser.email}
                        </p>
                        <div className="mt-1 text-xs text-indigo-600 font-medium">
                          {currentUser.role}
                        </div>
                      </div>

                      {/* Switch Demo Teammate perspective */}
                      <div className="px-3 py-2 border-b border-slate-100">
                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1.5 px-1">
                          Switch Active Teammate
                        </p>
                        <div className="space-y-1 max-h-36 overflow-y-auto">
                          {teamMembers.map((member) => (
                            <button
                              key={member.id}
                              onClick={() => {
                                onSwitchUser(member);
                                setIsUserMenuOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-xs text-left transition-colors ${
                                currentUser.id === member.id
                                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                                  : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <span
                                  className={`w-5 h-5 rounded-full text-[10px] text-white flex items-center justify-center shrink-0 ${
                                    member.color || 'bg-slate-500'
                                  }`}
                                >
                                  {member.initials}
                                </span>
                                <span className="truncate">{member.name}</span>
                              </div>
                              {currentUser.id === member.id && (
                                <UserCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0 ml-1" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="px-1 pt-1">
                        <button
                          onClick={() => {
                            onOpenTeamModal();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Users className="w-4 h-4 text-slate-400" />
                          <span>Manage Team Members</span>
                        </button>
                        <button
                          onClick={() => {
                            onLogout();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4 text-rose-500" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuthModal('login')}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Log In</span>
                </button>
                <button
                  onClick={() => onOpenAuthModal('register')}
                  className="hidden sm:inline-flex px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
