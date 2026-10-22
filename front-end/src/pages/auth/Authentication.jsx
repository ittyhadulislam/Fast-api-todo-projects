import ShowcasePanel from "@/src/components/auth/ShowcasePanel";
import React, { useState } from "react";
import Login from "../../components/auth/Login";
import Registration from "../../components/auth/Registration";

const Authentication = () => {
  const [authMode, setAuthMode] = useState("login");
  return (
    <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="hidden lg:block lg:col-span-6 xl:col-span-7">
            <ShowcasePanel />
          </div>
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center">
            <div className="w-full rounded-3xl border border-slate-800/90 bg-[#0b101c]/90 p-6 sm:p-9 shadow-2xl backdrop-blur-xl">
              <div className="mb-6 grid grid-cols-2 rounded-xl bg-slate-900/90 p-1.5 border border-slate-800">
                <button
                  type="button"
                  onClick={() => setAuthMode("login")}
                  className={`flex h-9 items-center justify-center rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    authMode === "login"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode("register")}
                  className={`flex h-9 items-center justify-center rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    authMode === "register"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Create Account
                </button>
              </div>

              <div className="mb-6">
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {authMode === "login"
                    ? "Welcome back"
                    : "Get started with Aura"}
                </h1>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-400">
                  {authMode === "login"
                    ? "Sign in to access your dashboard, teams, and active projects."
                    : "Deploy your first enterprise workspace in less than 2 minutes."}
                </p>
              </div>

              {/* Render Form */}
              {authMode === "login" ? (
                <Login
                //   onSuccess={handleLoginSuccess}
                //   onForgotPassword={() => setIsForgotModalOpen(true)}
                  onSwitchToRegister={() => setAuthMode("register")}
                //   onSocialAuth={handleSocialAuth}
                //   onAutoFillDemo={handleAutoFillDemo}
                />
              ) : (
                <Registration
                //   onSuccess={handleRegisterSuccess}
                  onSwitchToLogin={() => setAuthMode("login")}
                //   onOpenTerms={() => setIsTermsModalOpen(true)}
                //   onSocialAuth={handleSocialAuth}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Authentication;
