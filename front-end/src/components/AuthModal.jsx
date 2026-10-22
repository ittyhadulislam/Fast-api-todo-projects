import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  Briefcase,
  AlertCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function AuthModal({
  isOpen,
  onClose,
  mode = 'login',
  onModeChange,
  onLogin,
  onRegister,
  teamMembers = [],
}) {
  const isLogin = mode === 'login';

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Product Engineer');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (isLogin) {
      if (!email.trim() || !password) {
        setErrorMessage('Please fill in both email and password.');
        return;
      }
      const matched = teamMembers.find(
        (m) => m.email.toLowerCase() === email.trim().toLowerCase()
      );
      if (matched) {
        onLogin(matched);
        onClose();
      } else {
        // Fallback create user session with this email
        const user = {
          id: `user-${Date.now()}`,
          name: email.split('@')[0],
          email: email.trim(),
          role: 'Team Contributor',
          initials: email.slice(0, 2).toUpperCase(),
          color: 'bg-indigo-600',
        };
        onLogin(user);
        onClose();
      }
    } else {
      if (!name.trim() || !email.trim() || !password) {
        setErrorMessage('Please fill in all required fields.');
        return;
      }
      const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

      const newUser = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        role: role.trim() || 'Contributor',
        initials: initials || 'U',
        color: 'bg-indigo-600',
      };
      onRegister(newUser);
      onClose();
    }
  };

  const handleDemoSignIn = (member) => {
    onLogin(member);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isLogin ? 'Welcome Back' : 'Create an Account'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isLogin
                  ? 'Sign in to manage tasks and prioritize deliverables'
                  : 'Join the team workspace and start organizing work'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mode Switch Tabs */}
          <div className="px-6 pt-4">
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-lg">
              <button
                type="button"
                onClick={() => {
                  onModeChange('login');
                  setErrorMessage('');
                }}
                className={`py-1.5 text-xs font-semibold rounded-md transition-all ${
                  isLogin
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  onModeChange('register');
                  setErrorMessage('');
                }}
                className={`py-1.5 text-xs font-semibold rounded-md transition-all ${
                  !isLogin
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Register
              </button>
            </div>
          </div>

          {/* Quick Demo Logins for Instant Testing */}
          <div className="px-6 pt-4">
            <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-indigo-900 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  Instant 1-Click Demo Profiles
                </span>
                <span className="text-[10px] text-indigo-500 font-medium">Click to test</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {teamMembers.slice(0, 3).map((member) => (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => handleDemoSignIn(member)}
                    className="p-1.5 bg-white border border-indigo-100 hover:border-indigo-300 rounded-lg text-left transition-all hover:shadow-xs group"
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-4 h-4 rounded-full text-[9px] text-white flex items-center justify-center shrink-0 ${
                          member.color || 'bg-indigo-600'
                        }`}
                      >
                        {member.initials}
                      </span>
                      <span className="text-[11px] font-medium text-slate-800 truncate group-hover:text-indigo-600">
                        {member.name.split(' ')[0]}
                      </span>
                    </div>
                    <p className="text-[9px] text-slate-400 truncate mt-0.5">
                      {member.role}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-3.5">
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {!isLogin && (
              <>
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jordan Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Role / Job Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Job Title / Role
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Frontend Developer"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Work Email <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="name@company.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <span>{isLogin ? 'Sign In to Workspace' : 'Create Account'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
