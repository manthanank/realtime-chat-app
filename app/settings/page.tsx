"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ChatNavbar from "@/components/ChatNavbar";
import { CURRENT_USER } from "@/lib/mock-data";
import { 
  User, Database, Shield, Download, RefreshCw, 
  CheckCircle2, Radio, Server, Code2 
} from "lucide-react";

export default function SettingsPage() {
  const [userName, setUserName] = useState(CURRENT_USER.name);
  const [userStatus, setUserStatus] = useState(CURRENT_USER.status);
  const [customStatus, setCustomStatus] = useState(CURRENT_USER.customStatus);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleExportData = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      platform: "PulseChat Enterprise Real-Time Suite v2.4",
      user: {
        name: userName,
        status: userStatus,
        customStatus,
      },
      stats: {
        totalChannels: 5,
        messagesExported: 42,
        protocol: "WebSockets RFC 6455",
      },
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pulsechat-transcript-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    triggerToast("Full chat transcript and channel messages exported!");
  };

  const schemaPreview = `// MongoDB Mongoose Models
const MessageSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  channelId: { type: Schema.Types.ObjectId, ref: 'Channel', default: null },
  content: { type: String, required: true },
  attachments: [AttachmentSchema],
  reactions: [ReactionSchema],
  createdAt: { type: Date, default: Date.now },
});

// Compound index for sub-10ms chronological retrieval
MessageSchema.index({ channelId: 1, createdAt: -1 });`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <ChatNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Account & WebSockets Engine Settings
          </h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">
            Configure your presence status, inspect MongoDB compound index performance, and export transcripts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main User Settings Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Profile & Live Presence Status</h2>
                  <p className="text-xs text-slate-400">Broadcasts your availability to teammates across all channels</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Display Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full mt-1.5 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300">Presence State</label>
                    <select
                      value={userStatus}
                      onChange={(e) => setUserStatus(e.target.value as any)}
                      className="w-full mt-1.5 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="online">Online (Available)</option>
                      <option value="idle">Idle (Away from keyboard)</option>
                      <option value="dnd">Do Not Disturb (Focus mode)</option>
                      <option value="offline">Invisible / Offline</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300">Custom Tagline / Status</label>
                    <input
                      type="text"
                      value={customStatus}
                      onChange={(e) => setCustomStatus(e.target.value)}
                      className="w-full mt-1.5 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => triggerToast("Presence state and profile saved!")}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            {/* MongoDB Schema Viewer */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">MongoDB Mongoose Schema</h2>
                    <p className="text-xs text-slate-400">High-velocity document collection definitions</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                  db/schema.js
                </span>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                {schemaPreview}
              </pre>
            </div>
          </div>

          {/* Right Column: Connection & Export */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Edge Cluster Diagnostics</h3>
                  <p className="text-xs text-slate-400">WebSockets transport statistics</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                  <span>Connection Protocol</span>
                  <span className="font-mono text-emerald-400">WSS (RFC 6455)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                  <span>Edge POP Location</span>
                  <span className="font-mono text-slate-200">us-east-1 (Ashburn)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                  <span>Heartbeat Latency</span>
                  <span className="font-mono text-emerald-400">11.8ms</span>
                </div>
                <div className="flex justify-between py-1.5 text-slate-300">
                  <span>Encryption</span>
                  <span className="font-mono text-emerald-400">TLS 1.3 / AES-256</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Data Portability</h3>
                  <p className="text-xs text-slate-400">Export complete channel history</p>
                </div>
              </div>

              <button
                onClick={handleExportData}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-4 h-4" /> Download Full JSON Archive
              </button>

              <button
                onClick={() => triggerToast("Sample channel messages reset to default!")}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Default Messages
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </motion.div>
      )}
    </div>
  );
}

