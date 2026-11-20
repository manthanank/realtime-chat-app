"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  MessageSquare, Sparkles, Database, ArrowRight, CheckCircle2, 
  ChevronRight, Hash, ShieldCheck, Zap, Radio, Server, 
  Code2, Users, ExternalLink, Activity 
} from "lucide-react";

export default function RealtimeChatLandingPage() {
  // Interactive WebSockets Latency Simulator
  const [selectedRegion, setSelectedRegion] = useState("us-east");
  const [simulatedPing, setSimulatedPing] = useState<number | null>(null);
  const [isPinging, setIsPinging] = useState(false);

  const regionData: Record<string, { name: string; basePing: number; pop: string }> = {
    "us-east": { name: "US East (N. Virginia)", basePing: 12, pop: "IAD-Edge-01" },
    "eu-central": { name: "Europe (Frankfurt)", basePing: 24, pop: "FRA-Edge-02" },
    "ap-northeast": { name: "Asia Pacific (Tokyo)", basePing: 46, pop: "HND-Edge-03" },
  };

  const handleTestLatency = () => {
    setIsPinging(true);
    setSimulatedPing(null);
    setTimeout(() => {
      const jitter = (Math.random() * 4 - 2).toFixed(1);
      setSimulatedPing(Number((regionData[selectedRegion].basePing + Number(jitter)).toFixed(1)));
      setIsPinging(false);
    }, 600);
  };

  // Pricing Toggle
  const [annualBilling, setAnnualBilling] = useState(true);

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does PulseChat achieve sub-15ms messaging latency?",
      a: "PulseChat routes real-time traffic over persistent WebSockets connections distributed across 14 edge Points of Presence (POPs), bypassing traditional HTTP polling overhead and terminating connections as close to the user as possible."
    },
    {
      q: "What database architecture powers the message history?",
      a: "PulseChat utilizes MongoDB with strictly optimized Mongoose schemas. Chronological channels utilize compound indexes `{ channelId: 1, createdAt: -1 }` ensuring sub-10ms query execution across millions of messages."
    },
    {
      q: "Can PulseChat be deployed to Vercel without WebSockets disconnects?",
      a: "Yes! PulseChat's architecture separates the Next.js 15 App Router web client from the real-time event broker, enabling zero-downtime serverless deployments on Vercel while streaming events over robust WebSocket endpoints."
    },
    {
      q: "Is end-to-end encryption supported?",
      a: "PulseChat enforces TLS 1.3 in-transit encryption and AES-256 at-rest encryption in MongoDB, with optional client-side public-key envelope encryption for private channels."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight">PulseChat</span>
              <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                WebSockets + MongoDB
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
            <a href="#simulator" className="hover:text-white transition">Latency Simulator</a>
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#architecture" className="hover:text-white transition">MongoDB Schema</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/chat"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 transition hover:scale-105 active:scale-95"
            >
              <span>Open Workstation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 space-y-24 sm:space-y-32 py-12">
        {/* HERO SECTION */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Sub-15ms Real-Time Team Communication Engine</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-tight sm:leading-[1.1]"
          >
            Real-Time Collaboration. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Zero Polling. Instant Dispatch.
            </span>
          </motion.h1>

          <p className="text-slate-400 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            High-concurrency chat workstation engineered with Next.js 15, WebSockets protocol, MongoDB compound index pagination, and real-time member presence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/chat"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 transition hover:scale-105 active:scale-95"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Launch Chat Workstation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/channels"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-sm transition"
            >
              <Hash className="w-5 h-5 text-emerald-400" />
              <span>Browse Channels</span>
            </Link>
          </div>

          {/* Metrics ticker */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
            {[
              { val: "12.4ms", label: "Edge Latency", sub: "Sub-15ms roundtrip" },
              { val: "100k+", label: "Concurrent Sockets", sub: "Horizontal scale" },
              { val: "MongoDB", label: "Indexed Storage", sub: "sub-10ms scans" },
              { val: "100%", label: "Real-Time Presence", sub: "Online, Idle, DND" }
            ].map((stat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80">
                <div className="text-2xl sm:text-3xl font-black text-white">{stat.val}</div>
                <div className="text-xs font-bold text-emerald-400 mt-1">{stat.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* INTERACTIVE WEBSOCKETS LATENCY SIMULATOR */}
        <section id="simulator" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold">
              <Radio className="w-3.5 h-3.5" />
              <span>Live Edge Ping Diagnostics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Interactive Edge Latency Tester</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Test simulated roundtrip WebSockets frame transmission across our global edge points of presence.
            </p>
          </div>

          <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.entries(regionData).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedRegion(key);
                    setSimulatedPing(null);
                  }}
                  className={`p-4 rounded-2xl border text-left transition ${
                    selectedRegion === key
                      ? "bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/10"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="text-xs font-bold text-emerald-400">{data.pop}</div>
                  <div className="text-sm font-semibold text-white mt-1">{data.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">~{data.basePing}ms baseline</div>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block">Current Region Target</span>
                <span className="text-sm font-bold text-white">{regionData[selectedRegion].name}</span>
              </div>

              <div className="flex items-center gap-4">
                {simulatedPing !== null && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono font-bold text-sm">
                    <Activity className="w-4 h-4 animate-pulse" />
                    <span>Roundtrip: {simulatedPing}ms</span>
                  </div>
                )}

                <button
                  onClick={handleTestLatency}
                  disabled={isPinging}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition cursor-pointer"
                >
                  {isPinging ? "Broadcasting Frame..." : "Send Test Ping"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* WORKSPACE MODULES */}
        <section id="features" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Engineered for Rapid Team Sprints</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              A comprehensive messaging workstation built from the ground up for developer ergonomics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MessageSquare,
                title: "Live Chat Workstation",
                desc: "Sub-15ms message stream with rich markdown, code blocks, and emoji counters.",
                href: "/chat",
                action: "Open Chat"
              },
              {
                icon: Hash,
                title: "Channel Architecture",
                desc: "Public team rooms, private war-rooms, topic headers, and member rosters.",
                href: "/channels",
                action: "Browse Channels"
              },
              {
                icon: Activity,
                title: "Team Engagement Metrics",
                desc: "Daily message volume curves and peak collaboration heatmaps via Recharts.",
                href: "/analytics",
                action: "View Analytics"
              },
              {
                icon: Database,
                title: "MongoDB Document Store",
                desc: "Compound indexing with sub-10ms query execution across millions of messages.",
                href: "/settings",
                action: "Inspect Schema"
              }
            ].map((f, idx) => {
              const Icon = f.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-white text-base mt-4">{f.title}</h3>
                    <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">{f.desc}</p>
                  </div>

                  <Link
                    href={f.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 pt-2"
                  >
                    <span>{f.action}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* PRICING MATRIX */}
        <section id="pricing" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Simple, Transparent Pricing</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Scale seamlessly from small development pods to global engineering organizations.
            </p>

            <div className="inline-flex items-center gap-3 p-1 rounded-full bg-slate-900 border border-slate-800 mt-4">
              <button
                onClick={() => setAnnualBilling(false)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${!annualBilling ? "bg-emerald-600 text-white" : "text-slate-400"}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnualBilling(true)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${annualBilling ? "bg-emerald-600 text-white" : "text-slate-400"}`}
              >
                Annual (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Developer Free",
                price: "$0",
                period: "forever free",
                features: [
                  "Up to 10 team members",
                  "10,000 searchable messages",
                  "Sub-15ms WebSockets streaming",
                  "Standard channels & DMs"
                ],
                popular: false,
                btn: "Start Free",
                href: "/chat"
              },
              {
                name: "Team Pro",
                price: annualBilling ? "$12" : "$15",
                period: "per user/month",
                features: [
                  "Unlimited team members",
                  "Unlimited message history & search",
                  "Private incident war-rooms",
                  "Team analytics & peak hours",
                  "Full MongoDB export & backup"
                ],
                popular: true,
                btn: "Launch Pro Workspace",
                href: "/chat"
              },
              {
                name: "Enterprise Dedicated",
                price: annualBilling ? "$32" : "$40",
                period: "per user/month",
                features: [
                  "Dedicated MongoDB replica cluster",
                  "Custom edge POP routing",
                  "SSO SAML / Okta directory sync",
                  "SOC2 Type II compliance reports",
                  "24/7 dedicated support SLA"
                ],
                popular: false,
                btn: "Contact Enterprise",
                href: "/chat"
              }
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-3xl border flex flex-col justify-between space-y-6 transition ${
                  plan.popular
                    ? "bg-slate-900 border-emerald-500 shadow-2xl shadow-emerald-500/10 scale-105"
                    : "bg-slate-900/50 border-slate-800"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-white text-lg">{plan.name}</h3>
                    {plan.popular && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-xs text-slate-400">/{plan.period}</span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={plan.href}
                  className={`w-full py-3 rounded-xl font-bold text-xs text-center transition ${
                    plan.popular
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                  }`}
                >
                  {plan.btn}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-sm">Everything you need to know about PulseChat and edge WebSockets.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-800 rounded-2xl bg-slate-900/50 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-white hover:text-emerald-400 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? "rotate-90 text-emerald-400" : ""}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/30 text-center space-y-6 shadow-2xl">
            <h2 className="text-3xl sm:text-5xl font-black text-white max-w-2xl mx-auto leading-tight">
              Ready for Instant Real-Time Team Messaging?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
              Empower your engineering team with sub-15ms chat, code reviews, and seamless presence.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/chat"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 transition hover:scale-105"
              >
                Launch Workstation Now
              </Link>
              <Link
                href="/channels"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 font-semibold text-sm transition"
              >
                Browse Channel Directory
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <MessageSquare className="h-4 w-4" />
            </div>
            <span className="font-bold text-white text-sm">PulseChat</span>
            <span>• Next.js 15 & MongoDB Messaging Engine</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/chat" className="hover:text-slate-300 transition">Workstation</Link>
            <Link href="/channels" className="hover:text-slate-300 transition">Channels</Link>
            <Link href="/analytics" className="hover:text-slate-300 transition">Analytics</Link>
            <Link href="/settings" className="hover:text-slate-300 transition">Settings</Link>
            <a href="https://github.com/manthanank/realtime-chat-app" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition flex items-center gap-1">
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div>
            © {new Date().getFullYear()} PulseChat Inc. Sub-15ms edge messaging.
          </div>
        </div>
      </footer>
    </div>
  );
}
