import React from 'react';
import { Check, X } from 'lucide-react';

export function evaluatePassword(pwd) {
  const passwordStr = pwd || '';

  const hasLength = passwordStr.length >= 8;
  const hasUpper = /[A-Z]/.test(passwordStr);
  const hasNumber = /[0-9]/.test(passwordStr);
  const hasSpecial = /[^A-Za-z0-9]/.test(passwordStr);

  const criteria = [
    hasLength,
    hasUpper,
    hasNumber,
    hasSpecial,
  ];

  const score = criteria.filter(Boolean).length;

  let label = 'Weak';
  let color = 'bg-rose-500';

  if (score <= 1) {
    label = 'Weak';
    color = 'bg-rose-500';
  } else if (score === 2) {
    label = 'Fair';
    color = 'bg-amber-500';
  } else if (score === 3) {
    label = 'Good';
    color = 'bg-sky-500';
  } else if (score === 4) {
    label = 'Strong';
    color = 'bg-emerald-500';
  }

  return {
    score,
    label,
    color,
    hasLength,
    hasUpper,
    hasNumber,
    hasSpecial,
  };
}

function PasswordStrengthMeter({ password }) {
  if (!password) return null;

  const evaluation = evaluatePassword(password);

  return (
    <div className="mt-2 space-y-2 rounded-lg bg-slate-900/60 p-2.5 border border-slate-800/80">
      {/* Password Strength Label */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400">
          Password strength
        </span>

        <span
          className={`font-semibold ${
            evaluation.score <= 1
              ? 'text-rose-400'
              : evaluation.score === 2
              ? 'text-amber-400'
              : evaluation.score === 3
              ? 'text-sky-400'
              : 'text-emerald-400'
          }`}
        >
          {evaluation.label}
        </span>
      </div>

      {/* Segmented Meter Bar */}
      <div className="grid grid-cols-4 gap-1.5 h-1.5">
        {[1, 2, 3, 4].map((step) => {
          const isFilled = evaluation.score >= step;

          return (
            <div
              key={step}
              className={`h-full rounded-full transition-all duration-300 ${
                isFilled
                  ? evaluation.color
                  : 'bg-slate-800'
              }`}
            />
          );
        })}
      </div>

      {/* Criteria Checklist */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-1 pt-1 text-[11px]">
        <div
          className={`flex items-center gap-1.5 ${
            evaluation.hasLength
              ? 'text-emerald-400'
              : 'text-slate-500'
          }`}
        >
          {evaluation.hasLength ? (
            <Check className="h-3 w-3 shrink-0" />
          ) : (
            <X className="h-3 w-3 shrink-0" />
          )}

          <span>8+ characters</span>
        </div>

        <div
          className={`flex items-center gap-1.5 ${
            evaluation.hasUpper
              ? 'text-emerald-400'
              : 'text-slate-500'
          }`}
        >
          {evaluation.hasUpper ? (
            <Check className="h-3 w-3 shrink-0" />
          ) : (
            <X className="h-3 w-3 shrink-0" />
          )}

          <span>Uppercase letter</span>
        </div>

        <div
          className={`flex items-center gap-1.5 ${
            evaluation.hasNumber
              ? 'text-emerald-400'
              : 'text-slate-500'
          }`}
        >
          {evaluation.hasNumber ? (
            <Check className="h-3 w-3 shrink-0" />
          ) : (
            <X className="h-3 w-3 shrink-0" />
          )}

          <span>At least 1 number</span>
        </div>

        <div
          className={`flex items-center gap-1.5 ${
            evaluation.hasSpecial
              ? 'text-emerald-400'
              : 'text-slate-500'
          }`}
        >
          {evaluation.hasSpecial ? (
            <Check className="h-3 w-3 shrink-0" />
          ) : (
            <X className="h-3 w-3 shrink-0" />
          )}

          <span>Special symbol</span>
        </div>
      </div>
    </div>
  );
}

export default PasswordStrengthMeter;