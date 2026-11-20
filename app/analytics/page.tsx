"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ChatNavbar from "@/components/ChatNavbar";
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  Tooltip, ResponsiveContainer, Cell 
} from "recharts";
import { 
  BarChart2, MessageSquare, Zap, Clock, Users, 
  ArrowUpRight, Sparkles, Database 
} from "lucide-react";

export default function TeamAnalyticsPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const messageVolumeData = [
    { day: "Mon", messages: 1240, activeUsers: 38 },
    { day: "Tue", messages: 1890, activeUsers: 44 },
    { day: "Wed", messages: 2450, activeUsers: 48 },
    { day: "Thu", messages: 2120, activeUsers: 46 },
    { day: "Fri", messages: 2840, activeUsers: 51 },
    { day: "Sat", messages: 680, activeUsers: 14 },
    { day: "Sun", messages: 920, activeUsers: 19 },
  ];

  const channelActivityData = [
    { channel: "#general", count: 820, fill: "#10b981" },
    { channel: "#engineering", count: 1140, fill: "#06b6d4" },
    { channel: "#product-design", count: 480, fill: "#6366f1" },
    { channel: "#incident-war-room", count: 190, fill: "#f43f5e" },
    { channel: "#watercooler", count: 650, fill: "#f59e0b" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <ChatNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Team Communication & Velocity Analytics
            </h1>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-time messaging frequency, channel throughput, and peak team collaboration windows.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Median Delivery Latency: 11.8ms</span>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Weekly Messages Sent", val: "12,140", change: "+18.2%", sub: "vs last week" },
            { label: "Peak Active Members", val: "51", change: "+4 users", sub: "Friday 2:00 PM" },
            { label: "Total Reactions Logged", val: "3,840", change: "+24.1%", sub: "Team sentiment high" },
            { label: "WebSocket Cluster Uptime", val: "99.99%", change: "0 packet drops", sub: "14 POPs" }
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800"
            >
              <div className="text-xs font-semibold text-slate-400">{item.label}</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5">{item.val}</div>
              <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-400">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{item.change}</span>
                <span className="text-slate-500 text-[11px] font-normal">({item.sub})</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Weekly Message Flow */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-white">Weekly Message Dispatch Trends</h3>
              <p className="text-xs text-slate-400">Total messages delivered via edge WebSockets per day</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Messages
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={messageVolumeData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="msgGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#fff" }}
                  />
                  <Area type="monotone" dataKey="messages" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#msgGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Channel Activity Breakdown */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Channel Message Volume Distribution</h3>
            <p className="text-xs text-slate-400">Total messages per engineering and company channel</p>
          </div>

          <div className="h-64 w-full pt-4">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channelActivityData} layout="vertical" margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
                  <XAxis type="number" stroke="#64748b" fontSize={11} />
                  <YAxis dataKey="channel" type="category" stroke="#94a3b8" fontSize={12} width={140} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#fff" }}
                    formatter={(val) => [`${val} messages`, "Throughput"]}
                  />
                  <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                    {channelActivityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
