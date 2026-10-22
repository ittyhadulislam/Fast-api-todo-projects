import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import PasswordStrengthMeter from "@/src/components/auth/PasswordStrengthMeter";
import { useForm } from "react-hook-form";
import { useUserRegistrationMutation } from "../../redux/features/auth/authApi";

function Registration({
  onSuccess,
  onSwitchToLogin,
  onOpenTerms,
  onSocialAuth,
}) {
  const rhf = useForm();

  console.log("rhf", rhf.watch());

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [passPayloadForRegister] = useUserRegistrationMutation();

  const handleSubmit = async () => {
    try {
      const payload = {
        full_name: rhf.watch()?.fullName,
        email: rhf.watch()?.email,
        password: rhf.watch()?.password,
      };
      const res = await passPayloadForRegister(payload).unwrap();
      if (res?.data) {
        rhf.reset();
      }
      console.log("res", res);
    } catch (error) {
      console.log(error);
    }
  };

  const passwordsMatch =
    rhf.watch()?.confirmPassword?.length > 0 &&
    rhf.watch()?.confirmPassword === rhf.watch()?.password;

  return (
    <div className="w-full">
      {/* Main Form */}
      <form
        onSubmit={rhf.handleSubmit(handleSubmit)}
        className="mt-5 space-y-3.5"
      >
        {/* Full Name */}
        <div>
          <label
            htmlFor="reg-name"
            className="block text-xs font-medium text-slate-300"
          >
            Full Name
          </label>

          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
              <User className="h-4 w-4" />
            </div>

            <input
              id="reg-name"
              type="text"
              autoComplete="name"
              required
              {...rhf.register("fullName", { required: true })}
              placeholder="Alex Morgan"
              className={`h-11 w-full rounded-xl border bg-slate-900/80 pl-10 pr-4 text-sm text-white placeholder-slate-500 transition-all focus:bg-slate-900 focus:outline-none focus:ring-2 ${
                errors.fullName
                  ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/30"
                  : "border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/40"
              }`}
            />
          </div>

          {/* {errors.fullName && (
            <p className="mt-1 text-xs text-rose-400">{errors.fullName}</p>
          )} */}
        </div>

        {/* Work Email */}
        <div>
          <label
            htmlFor="reg-email"
            className="block text-xs font-medium text-slate-300"
          >
            Work Email
          </label>

          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
              <Mail className="h-4 w-4" />
            </div>

            <input
              id="reg-email"
              type="email"
              autoComplete="email"
              required
              {...rhf.register("email", { required: true })}
              placeholder="alex@company.com"
              className={`h-11 w-full rounded-xl border bg-slate-900/80 pl-10 pr-4 text-sm text-white placeholder-slate-500 transition-all focus:bg-slate-900 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/30"
                  : "border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/40"
              }`}
            />
          </div>

          {/* {errors.email && (
            <p className="mt-1 text-xs text-rose-400">{errors.email}</p>
          )} */}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="reg-password"
            className="block text-xs font-medium text-slate-300"
          >
            Create Password
          </label>

          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
              <Lock className="h-4 w-4" />
            </div>

            <input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              required
              {...rhf.register("password", { required: true })}
              placeholder="At least 8 characters"
              className={`h-11 w-full rounded-xl border bg-slate-900/80 pl-10 pr-11 text-sm text-white placeholder-slate-500 transition-all focus:bg-slate-900 focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/30"
                  : "border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/40"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-xs text-rose-400">{errors.password}</p>
          )}

          {/* Interactive Password Strength Indicator */}
          <PasswordStrengthMeter password={rhf.watch().password} />
        </div>

        {/* Confirm Password */}
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="reg-confirm"
              className="block text-xs font-medium text-slate-300"
            >
              Confirm Password
            </label>

            {passwordsMatch && (
              <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                <CheckCircle2 className="h-3 w-3" />
                <span>Passwords match</span>
              </span>
            )}
          </div>

          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
              <ShieldCheck className="h-4 w-4" />
            </div>

            <input
              id="reg-confirm"
              type={showPassword ? "text" : "password"}
              required
              {...rhf.register("confirmPassword", { required: true })}
              placeholder="Re-enter password"
              className={`h-11 w-full rounded-xl border bg-slate-900/80 pl-10 pr-4 text-sm text-white placeholder-slate-500 transition-all focus:bg-slate-900 focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/30"
                  : "border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/40"
              }`}
            />
          </div>

          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-rose-400">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Terms Agreement Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              {...rhf.register("agreedToTerms", {
                required:
                  "You must agree to the Terms of Service and Privacy Policy",
              })}
              className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500/30 focus:ring-offset-0"
            />

            <span className="text-xs text-slate-400 leading-normal">
              I agree to the{" "}
              <button
                type="button"
                onClick={onOpenTerms}
                className="font-medium text-indigo-400 hover:text-indigo-300 underline underline-offset-2 cursor-pointer"
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                type="button"
                onClick={onOpenTerms}
                className="font-medium text-indigo-400 hover:text-indigo-300 underline underline-offset-2 cursor-pointer"
              >
                Privacy Policy
              </button>
            </span>
          </label>

          {errors.terms && (
            <p className="mt-1 text-xs text-rose-400">{errors.terms}</p>
          )}
        </div>

        {/* Create Account Button */}
        <button
          type="submit"
          disabled={isLoading || isSuccess}
          className="group relative mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 font-semibold text-white text-sm shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 active:scale-[0.98] transition-all duration-200 disabled:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer"
        >
          {isSuccess ? (
            <div className="flex items-center gap-2 text-emerald-300">
              <CheckCircle2 className="h-5 w-5 animate-in zoom-in" />
              <span>Account created! Redirecting...</span>
            </div>
          ) : isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Creating your workspace...</span>
            </div>
          ) : (
            <>
              <span>Create Free Account</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </form>

      {/* Switch to Login */}
      <div className="mt-5 text-center text-xs text-slate-400">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors focus-visible:outline-none focus-visible:underline cursor-pointer"
        >
          Sign in instead
        </button>
      </div>
    </div>
  );
}

export default Registration;
