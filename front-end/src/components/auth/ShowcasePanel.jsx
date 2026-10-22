import React from 'react';
import { Sparkles, Lock, ArrowUpRight } from 'lucide-react';
import showcaseArtwork from '../../assets/auth_iamge.jpg';
// import sarahAvatar from '../assets/images/avatar_sarah_chen_1791708538686.jpg';

function ShowcasePanel() {
  return (
    <div className="relative hidden lg:flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-800/80 bg-linear-to-br from-slate-900/90 via-[#0c1222] to-slate-950 p-8 xl:p-12 shadow-2xl">
      {/* Background ambient lighting glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      {/* Top Header Section */}
      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-tr from-indigo-500 to-violet-400 font-bold text-white shadow-lg shadow-indigo-500/25">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display text-xl font-bold tracking-tight text-white">
                Aura
              </span>
              <span className="ml-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                Cloud
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs text-slate-300">
            <Lock className="h-3 w-3 text-emerald-400" />
            <span>256-bit TLS Encrypted</span>
          </div>
        </div>

        {/* Feature Narrative */}
        <div className="space-y-2">
          <h2 className="font-display text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Design, deploy, and scale with effortless security.
          </h2>
          <p className="text-sm xl:text-base text-slate-400 max-w-md leading-relaxed">
            Unify your team’s identity infrastructure with next-generation single sign-on, automated access policies, and audited controls.
          </p>
        </div>
      </div>

      {/* Centerpiece Image Showcase Card */}
      <div className="relative z-10 my-6 group overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/40 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-slate-600">
        <div className="relative aspect-video w-full overflow-hidden">
          <img
            src={showcaseArtwork}
            alt="Aura Glass Prism Architecture Showcase"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

          {/* Floating Live Telemetry Badge inside Image */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-medium text-slate-200">
                Global Infrastructure
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono tabular-nums">
              <span>99.99% SLA</span>
              <span className="text-slate-600">/</span>
              <span className="text-emerald-400 font-medium">
                SOC-2 Type II
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Testimonial & Partner Proof */}
      <div className="relative z-10 space-y-6">
        {/* Minimalist Partner Row */}
        <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 text-[11px] font-medium tracking-wide text-slate-400">
          <span>Trusted by 45,000+ teams</span>
          <div className="flex items-center gap-4 text-slate-300">
            <span>VERCEL</span>
            <span>·</span>
            <span>STRIPE</span>
            <span>·</span>
            <span>LINEAR</span>
            <span>·</span>
            <span>RAYCAST</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowcasePanel;