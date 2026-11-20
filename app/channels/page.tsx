"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ChatNavbar from "@/components/ChatNavbar";
import { INITIAL_CHANNELS } from "@/lib/mock-data";
import { Channel } from "@/lib/types";
import { 
  Hash, Lock, Plus, Search, Users, MessageSquare, 
  ArrowRight, ShieldCheck, Sparkles 
} from "lucide-react";

export default function ChannelsDirectoryPage() {
  const [channels, setChannels] = useState<Channel[]>(INITIAL_CHANNELS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChannel, setNewChannel] = useState({
    name: "",
    topic: "",
    isPrivate: false,
  });

  const filtered = channels.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.topic.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChannel.name.trim()) return;

    const created: Channel = {
      id: `chn-${Date.now()}`,
      name: newChannel.name.toLowerCase().replace(/\s+/g, "-"),
      topic: newChannel.topic || "Discussion channel",
      isPrivate: newChannel.isPrivate,
      memberCount: 1,
    };

    setChannels([...channels, created]);
    setIsModalOpen(false);
    setNewChannel({ name: "", topic: "", isPrivate: false });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <ChatNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Channels & Team Rooms
            </h1>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Browse public engineering spaces, join incident war-rooms, or create private discussion channels.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 transition hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Channel</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search channels by name or topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((chn, idx) => (
            <motion.div
              key={chn.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {chn.isPrivate ? <Lock className="w-4 h-4" /> : <Hash className="w-4 h-4" />}
                    </div>
                    <h3 className="font-bold text-white text-base">#{chn.name}</h3>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                    chn.isPrivate 
                      ? "bg-rose-500/10 text-rose-400 border-rose-500/30" 
                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  }`}>
                    {chn.isPrivate ? "Private" : "Public"}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mt-4 leading-relaxed line-clamp-2">
                  {chn.topic}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    <span>{chn.memberCount} active members</span>
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <Link
                  href="/chat"
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 text-xs font-semibold transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Enter Channel Stream</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl"
          >
            <h2 className="text-lg font-bold text-white">Create New Channel</h2>
            <form onSubmit={handleCreateChannel} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400">Channel Name *</label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-2.5 text-slate-500 text-sm">#</span>
                  <input
                    required
                    type="text"
                    value={newChannel.name}
                    onChange={(e) => setNewChannel({ ...newChannel, name: e.target.value })}
                    placeholder="e.g. mobile-infra"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-7 pr-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400">Topic or Goal</label>
                <textarea
                  rows={2}
                  value={newChannel.topic}
                  onChange={(e) => setNewChannel({ ...newChannel, topic: e.target.value })}
                  placeholder="What is this channel for?"
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <input
                  type="checkbox"
                  id="private-check"
                  checked={newChannel.isPrivate}
                  onChange={(e) => setNewChannel({ ...newChannel, isPrivate: e.target.checked })}
                  className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0"
                />
                <label htmlFor="private-check" className="text-xs text-slate-300 cursor-pointer">
                  <strong className="text-white block">Make Private</strong>
                  Only invited team members will be able to view and message.
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20"
                >
                  Create Channel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
