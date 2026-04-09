import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Compass,
  PieChart,
  Shield,
  Sparkles,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { useEffect } from 'react';
import { prefetchLandingRoutes, prefetchPublicRoute } from '../../routePrefetch';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  useEffect(() => {
    prefetchLandingRoutes();
  }, []);

  const features = [
    {
      icon: Compass,
      title: 'Beginner Mode',
      description: 'Plain-language tips explain every recommendation before you invest a single rupee or dollar.',
    },
    {
      icon: Shield,
      title: 'Risk Guardrails',
      description: 'Set your comfort level once. AI keeps your portfolio inside safe boundaries automatically.',
    },
    {
      icon: PieChart,
      title: 'Starter Portfolios',
      description: 'Pick curated starter mixes like Balanced Builder, Growth Sprint, or Low-Stress Start.',
    },
    {
      icon: BarChart3,
      title: 'Micro-Learning Feed',
      description: 'Learn with short cards while you invest: one concept, one minute, one action.',
    },
    {
      icon: Wallet,
      title: 'Small Amount Friendly',
      description: 'Start with tiny amounts and build momentum through auto-invest habits.',
    },
    {
      icon: Sparkles,
      title: 'AI Weekly Plan',
      description: 'Receive a simple weekly checklist: what to review, what to ignore, what to do next.',
    },
  ];

  const steps = [
    {
      title: 'Take a 90-second quiz',
      body: 'We map your goals, timeline, and comfort with risk.',
    },
    {
      title: 'Get your starter plan',
      body: 'You receive a beginner-friendly portfolio and a learning path.',
    },
    {
      title: 'Grow with confidence',
      body: 'Track progress, learn continuously, and upgrade strategy over time.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#fffef8] text-slate-900">
      <nav className="sticky top-0 z-50 border-b border-amber-200/60 bg-[#fffef8]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-md">
              <TrendingUp className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight md:text-xl">AI Invest</h1>
              <p className="text-xs font-medium text-orange-600">Start Small. Build Big.</p>
            </div>
          </div>

          <div className="hidden items-center gap-7 md:flex">
            <a href="#features" className="font-semibold text-slate-700 transition-colors hover:text-orange-600">Features</a>
            <a href="#how-it-works" className="font-semibold text-slate-700 transition-colors hover:text-orange-600">How It Works</a>
            <a href="#learn" className="font-semibold text-slate-700 transition-colors hover:text-orange-600">Learn</a>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => onNavigate('login')}
              onMouseEnter={() => prefetchPublicRoute('login')}
              onFocus={() => prefetchPublicRoute('login')}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:text-orange-600 md:px-4"
            >
              Login
            </button>
            <button
              onClick={() => onNavigate('signup')}
              onMouseEnter={() => prefetchPublicRoute('signup')}
              onFocus={() => prefetchPublicRoute('signup')}
              className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 md:px-5"
            >
              Join Free
            </button>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_#fff6dc_0%,_#fffef8_45%,_#f0f9ff_100%)] py-14 md:py-20">
        <div className="pointer-events-none absolute -left-16 top-10 h-44 w-44 rounded-full bg-orange-300/30 blur-3xl"></div>
        <div className="pointer-events-none absolute -right-10 top-28 h-52 w-52 rounded-full bg-cyan-300/30 blur-3xl"></div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm">
              <Sparkles size={16} />
              Built for first-time investors
            </div>

            <h2 className="text-4xl font-black leading-tight tracking-tight text-slate-900 md:text-6xl">
              Your first
              <span className="block bg-gradient-to-r from-orange-500 to-cyan-600 bg-clip-text text-transparent">investment journey</span>
              starts here.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-xl">
              No finance jargon. No scary dashboards. Just a smart AI coach that helps you invest confidently,
              even if you are starting from zero.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => onNavigate('signup')}
                onMouseEnter={() => prefetchPublicRoute('signup')}
                onFocus={() => prefetchPublicRoute('signup')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-7 py-4 text-base font-extrabold text-white shadow-xl transition-transform hover:-translate-y-0.5"
              >
                Start In 2 Minutes
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => onNavigate('login')}
                onMouseEnter={() => prefetchPublicRoute('login')}
                onFocus={() => prefetchPublicRoute('login')}
                className="rounded-xl border-2 border-slate-200 bg-white px-7 py-4 text-base font-bold text-slate-700 transition-colors hover:border-cyan-400 hover:text-cyan-700"
              >
                I Already Have Account
              </button>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-slate-600">
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600" /> Beginner-safe defaults</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600" /> Start with low amount</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-600" /> AI explains every move</span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-amber-200 bg-white p-5 shadow-2xl md:p-7">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-500">Starter Dashboard</p>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">+8.4% this month</span>
              </div>

              <div className="rounded-2xl bg-slate-900 p-5 text-white">
                <p className="text-xs uppercase tracking-wide text-slate-400">Portfolio Value</p>
                <p className="mt-2 text-3xl font-black">$1,240.80</p>
                <p className="mt-1 text-sm text-emerald-300">On track for your Travel Fund goal</p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">Risk Meter</p>
                  <p className="mt-2 text-xl font-black text-orange-600">Balanced</p>
                </div>
                <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">AI Confidence</p>
                  <p className="mt-2 text-xl font-black text-cyan-700">91%</p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-500">This Week</p>
                <p className="mt-1 text-sm font-semibold text-slate-700">Invest $25 in Starter Mix and complete 1 learning card.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 text-center md:mb-14">
            <h3 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">Made for Gen Z & young earners</h3>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:text-lg">Everything is built to help new investors build habits first, confidence second, returns third.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <article key={index} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md transition-transform group-hover:scale-105">
                    <Icon size={22} />
                  </div>
                  <h4 className="text-lg font-extrabold text-slate-900">{feature.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-10 text-center">
            <h3 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">How your first month works</h3>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {steps.map((step, idx) => (
              <div key={step.title} className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-amber-50/40 p-6">
                <p className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-black text-white">{idx + 1}</p>
                <h4 className="text-lg font-extrabold text-slate-900">{step.title}</h4>
                <p className="mt-2 text-sm text-slate-600">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="learn" className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-900 px-6 py-10 text-center text-white shadow-2xl md:px-10 md:py-12">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
              <BookOpen size={24} />
            </div>
            <h3 className="text-3xl font-black tracking-tight md:text-4xl">Invest smart, not stressed</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-cyan-100 md:text-lg">Get bite-sized lessons, beginner-safe suggestions, and action plans that match your real income.</p>
            <button
              onClick={() => onNavigate('signup')}
              onMouseEnter={() => prefetchPublicRoute('signup')}
              onFocus={() => prefetchPublicRoute('signup')}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 text-base font-extrabold text-slate-900 transition-transform hover:-translate-y-0.5"
            >
              Create My Starter Plan
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-5 md:flex-row md:items-center md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500">
              <TrendingUp className="text-white" size={20} />
            </div>
            <div>
              <p className="text-sm font-black text-slate-900">AI Invest</p>
              <p className="text-xs text-slate-500">For first-time investors</p>
            </div>
          </div>
          <p className="text-xs text-slate-500">© 2026 AI Invest. Built for the next generation of investors.</p>
        </div>
      </footer>
    </div>
  );
}
