import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useUserLoginMutation } from "@/src/redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { SocialAuthButtons } from './SocialAuthButtons.jsx';

function Login({
  onSuccess,
  onForgotPassword,
  onSwitchToRegister,
  onSocialAuth,
  onAutoFillDemo,
}) {
  const navigate = useNavigate()

  const rhf = useForm();
  // console.log("rhf", rhf.watch());

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [passPayload] = useUserLoginMutation();
  const handleSubmit = async (e) => {
    try {
      const payload = {
        email: rhf.watch().email,
        password: rhf.watch().password,
      };
      const res = await passPayload(payload)
      if(res?.data){
        navigate("/")
        rhf.reset()
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={rhf.handleSubmit(handleSubmit)}
        className="mt-5 space-y-4"
      >
        {/* Email Field */}
        <div>
          <label
            htmlFor="login-email"
            className="block text-xs font-medium text-slate-300"
          >
            Work Email
          </label>

          <div className="relative mt-1.5">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
              <Mail className="h-4 w-4" />
            </div>

            <input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              {...rhf.register("email", { required: true })}
              // value={email}
              // onChange={(e) => {
              //   setEmail(e.target.value);

              //   if (errors.email) {
              //     setErrors((prev) => ({
              //       ...prev,
              //       email: undefined,
              //     }));
              //   }
              // }}
              placeholder="alex@company.com"
              className={`h-11 w-full rounded-xl border bg-slate-900/80 pl-10 pr-4 text-sm text-white placeholder-slate-500 transition-all focus:bg-slate-900 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/30"
                  : "border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/40"
              }`}
            />
          </div>

          {/* {errors.email && (
            <p className="mt-1.5 text-xs text-rose-400">
              {errors.email}
            </p>
          )} */}
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="login-password"
              className="block text-xs font-medium text-slate-300"
            >
              Password
            </label>

            <button
              type="button"
              onClick={onForgotPassword}
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors focus-visible:outline-none focus-visible:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          <div className="relative mt-1.5">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
              <Lock className="h-4 w-4" />
            </div>

            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              {...rhf.register("password", { required: true })}
              // value={password}
              // onChange={(e) => {
              //   setPassword(e.target.value);

              //   if (errors.password) {
              //     setErrors((prev) => ({
              //       ...prev,
              //       password: undefined,
              //     }));
              //   }
              // }}
              placeholder="••••••••••••"
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

          {/* {errors.password && (
            <p className="mt-1.5 text-xs text-rose-400">{errors.password}</p>
          )} */}
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              {...rhf.register("checked")}
              // checked={rememberMe}
              // onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500/30 focus:ring-offset-0"
            />

            <span className="text-xs text-slate-400">
              Remember this device for 30 days
            </span>
          </label>
        </div>

        {/* Primary Action Button */}
        <button
          type="submit"
          disabled={isLoading || isSuccess}
          className="group relative flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 font-semibold text-white text-sm shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 active:scale-[0.98] transition-all duration-200 disabled:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer"
        >
          {isSuccess ? (
            <div className="flex items-center gap-2 text-emerald-300">
              <CheckCircle2 className="h-5 w-5 animate-in zoom-in" />
              <span>Signed in successfully</span>
            </div>
          ) : isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Authenticating...</span>
            </div>
          ) : (
            <>
              <span>Sign In to Workspace</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </form>

      {/* Switch to Registration */}
      <div className="mt-6 text-center text-xs text-slate-400">
        Don&apos;t have an account yet?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors focus-visible:outline-none focus-visible:underline cursor-pointer"
        >
          Create an account
        </button>
      </div>
    </div>
  );
}

export default Login;
