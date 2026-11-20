"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatNavbar from "@/components/ChatNavbar";
import { 
  CURRENT_USER, INITIAL_USERS, INITIAL_CHANNELS, INITIAL_MESSAGES 
} from "@/lib/mock-data";
import { Channel, Message, User, UserStatus } from "@/lib/types";
import { 
  Hash, Lock, Users, Send, Paperclip, Smile, Search, 
  MoreVertical, Pin, Sparkles, Check, CheckCheck, Code2, 
  AlertCircle, X, ChevronRight, Circle 
} from "lucide-react";

export default function ChatWorkstationPage() {
  const [channels, setChannels] = useState<Channel[]>(INITIAL_CHANNELS);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [activeChannelId, setActiveChannelId] = useState<string>("chn-general");
  const [messages, setMessages] = useState<Record<string, Message[]>>(INITIAL_MESSAGES);
  const [inputContent, setInputContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [showMemberDrawer, setShowMemberDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const storedMsgs = localStorage.getItem("pulsechat_messages");
      if (storedMsgs) setMessages(JSON.parse(storedMsgs));

      const storedChans = localStorage.getItem("pulsechat_channels");
      if (storedChans) setChannels(JSON.parse(storedChans));
    } catch (e) {}
  }, []);

  const saveMessages = (updated: Record<string, Message[]>) => {
    setMessages(updated);
    try {
      localStorage.setItem("pulsechat_messages", JSON.stringify(updated));
    } catch (e) {}
  };

  const activeChannel = channels.find((c) => c.id === activeChannelId) || channels[0];
  const channelMessages = (messages[activeChannelId] || []).filter((m) =>
    m.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.senderName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Auto-scroll when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChannelId]);

  // Periodic active colleague typing indicator
  useEffect(() => {
    const timer = setTimeout(() => {
      setTypingUser("Marcus Chen");
      setIsTyping(true);

      const stopTimer = setTimeout(() => {
        setIsTyping(false);
        setTypingUser(null);
      }, 3500);

      return () => clearTimeout(stopTimer);
    }, 8000);

    return () => clearTimeout(timer);
  }, [activeChannelId]);

  // Send message handler
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputContent.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: CURRENT_USER.id,
      senderName: CURRENT_USER.name,
      senderAvatar: CURRENT_USER.avatar,
      senderRole: CURRENT_USER.role,
      channelId: activeChannelId,
      content: inputContent,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      reactions: [],
    };

    const nextState = {
      ...messages,
      [activeChannelId]: [...(messages[activeChannelId] || []), newMessage],
    };
    saveMessages(nextState);

    const sentText = inputContent;
    setInputContent("");

    // Bot automated assistant response
    if (sentText.toLowerCase().includes("deploy") || sentText.toLowerCase().includes("status") || sentText.toLowerCase().includes("help")) {
      setTimeout(() => {
        const botReply: Message = {
          id: `msg-${Date.now() + 1}`,
          senderId: "usr-bot",
          senderName: "PulseBot",
          senderAvatar: "PB",
          senderRole: "moderator",
          channelId: activeChannelId,
          content: "⚡ PulseBot Edge Telemetry: WebSockets frame delivered across 14 edge PoPs. Zero packet drops, 11ms mesh roundtrip.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          reactions: [{ emoji: "⚡", count: 1, users: [CURRENT_USER.id] }],
        };
        saveMessages({
          ...nextState,
          [activeChannelId]: [...(nextState[activeChannelId] || []), botReply],
        });
      }, 900);
    }
  };

  const handleAddReaction = (msgId: string, emoji: string) => {
    const channelList = messages[activeChannelId] || [];
    const updated = channelList.map((m) => {
      if (m.id !== msgId) return m;
      const existingReaction = m.reactions?.find((r) => r.emoji === emoji);
      let newReactions = m.reactions ? [...m.reactions] : [];

      if (existingReaction) {
        if (existingReaction.users.includes(CURRENT_USER.id)) {
          newReactions = newReactions
            .map((r) =>
              r.emoji === emoji
                ? { ...r, count: r.count - 1, users: r.users.filter((u) => u !== CURRENT_USER.id) }
                : r
            )
            .filter((r) => r.count > 0);
        } else {
          newReactions = newReactions.map((r) =>
            r.emoji === emoji
              ? { ...r, count: r.count + 1, users: [...r.users, CURRENT_USER.id] }
              : r
          );
        }
      } else {
        newReactions.push({ emoji, count: 1, users: [CURRENT_USER.id] });
      }
      return { ...m, reactions: newReactions };
    });

    saveMessages({ ...messages, [activeChannelId]: updated });
    setShowEmojiPicker(null);
  };

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case "online": return "bg-emerald-400";
      case "idle": return "bg-amber-400";
      case "dnd": return "bg-rose-400";
      default: return "bg-slate-500";
    }
  };

  return (
    <div className="h-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
      <ChatNavbar />

      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR: Channels & Users */}
        <aside className="w-64 sm:w-72 bg-slate-900/70 border-r border-slate-800 flex flex-col shrink-0">
          {/* Workspace Title */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-white text-sm">Pulse Engineering</h2>
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>142 team members active</span>
              </span>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-800 text-slate-400">
              <Hash className="w-4 h-4" />
            </div>
          </div>

          {/* Scrollable list */}
          <div className="flex-1 overflow-y-auto p-3 space-y-6">
            {/* Channels */}
            <div>
              <div className="flex items-center justify-between px-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <span>Channels ({channels.length})</span>
                <span className="text-emerald-400 hover:text-emerald-300 cursor-pointer">+</span>
              </div>
              <div className="space-y-1">
                {channels.map((chn) => {
                  const isActive = chn.id === activeChannelId;
                  return (
                    <button
                      key={chn.id}
                      onClick={() => setActiveChannelId(chn.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition ${
                        isActive
                          ? "bg-emerald-600/20 text-emerald-300 font-semibold border border-emerald-500/30"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {chn.isPrivate ? (
                          <Lock className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                        ) : (
                          <Hash className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                        )}
                        <span className="truncate">{chn.name}</span>
                      </div>
                      {chn.unreadCount ? (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-slate-950">
                          {chn.unreadCount}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Direct Messages & Colleague Presence */}
            <div>
              <div className="px-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <span>Team Presence</span>
              </div>
              <div className="space-y-1">
                {users.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs text-slate-400 hover:bg-slate-800/60 transition group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="relative">
                        <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-[10px] text-slate-200">
                          {u.avatar}
                        </div>
                        <span className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-slate-900 ${getStatusColor(u.status)}`} />
                      </div>
                      <span className="truncate group-hover:text-white transition">{u.name}</span>
                    </div>
                    {u.role === "admin" && (
                      <span className="text-[9px] font-mono px-1 rounded bg-indigo-500/20 text-indigo-300">
                        admin
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Current User Bar */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center text-xs">
                  {CURRENT_USER.avatar}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-white truncate">{CURRENT_USER.name}</div>
                <div className="text-[10px] text-slate-500 truncate">{CURRENT_USER.customStatus}</div>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CHAT AREA */}
        <main className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
          {/* Channel Header */}
          <div className="h-16 px-4 sm:px-6 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950/70 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 font-bold text-white text-base">
                <Hash className="w-5 h-5 text-emerald-400" />
                <span>{activeChannel.name}</span>
              </div>
              <span className="hidden md:inline-block text-xs text-slate-400 max-w-md truncate border-l border-slate-800 pl-3">
                {activeChannel.topic}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Search Filter */}
              <div className="relative hidden sm:block">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Members Toggle */}
              <button
                onClick={() => setShowMemberDrawer(!showMemberDrawer)}
                className={`p-2 rounded-xl border transition ${
                  showMemberDrawer
                    ? "bg-emerald-600/20 text-emerald-400 border-emerald-500/40"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
                title="Channel Members"
              >
                <Users className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {channelMessages.map((msg) => {
              const isMe = msg.senderId === CURRENT_USER.id;
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group flex items-start gap-3.5 hover:bg-slate-900/30 p-2 -mx-2 rounded-2xl transition"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-md">
                    {msg.senderAvatar}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{msg.senderName}</span>
                      {msg.senderRole && (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          {msg.senderRole}
                        </span>
                      )}
                      <span className="text-[11px] text-slate-500">{msg.timestamp}</span>
                      {msg.isPinned && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                          <Pin className="w-2.5 h-2.5" /> Pinned
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-slate-200 leading-relaxed break-words whitespace-pre-wrap">
                      {msg.content}
                    </p>

                    {/* Attachments */}
                    {msg.attachments && (
                      <div className="pt-1.5 flex flex-wrap gap-2">
                        {msg.attachments.map((att) => (
                          <div
                            key={att.id}
                            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300"
                          >
                            <Code2 className="w-4 h-4 text-emerald-400" />
                            <div>
                              <div className="font-semibold text-white">{att.fileName}</div>
                              <span className="text-[10px] text-slate-500">{att.fileSize}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reactions Bar */}
                    <div className="pt-1 flex flex-wrap items-center gap-1.5">
                      {msg.reactions?.map((r, idx) => {
                        const hasReacted = r.users.includes(CURRENT_USER.id);
                        return (
                          <button
                            key={idx}
                            onClick={() => handleAddReaction(msg.id, r.emoji)}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs transition ${
                              hasReacted
                                ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
                                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                            }`}
                          >
                            <span>{r.emoji}</span>
                            <span className="text-[11px] font-semibold">{r.count}</span>
                          </button>
                        );
                      })}

                      {/* Add reaction trigger */}
                      <button
                        onClick={() => setShowEmojiPicker(showEmojiPicker === msg.id ? null : msg.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
                        title="Add reaction"
                      >
                        <Smile className="w-3.5 h-3.5" />
                      </button>

                      {/* Emoji Quick Picker */}
                      {showEmojiPicker === msg.id && (
                        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 shadow-xl z-20">
                          {["🚀", "🔥", "👍", "❤️", "🎉", "👀"].map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => handleAddReaction(msg.id, emoji)}
                              className="p-1 hover:bg-slate-800 rounded text-sm transition"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Typing Indicator */}
          {isTyping && typingUser && (
            <div className="px-6 py-1 text-xs text-slate-400 flex items-center gap-2">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </span>
              <span>{typingUser} is typing...</span>
            </div>
          )}

          {/* Composer Input */}
          <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/80 backdrop-blur-md">
            <form onSubmit={handleSendMessage} className="relative bg-slate-900 border border-slate-800 rounded-2xl p-2 sm:p-3 focus-within:border-emerald-500 transition">
              <textarea
                rows={2}
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={`Message #${activeChannel.name}...`}
                className="w-full bg-transparent resize-none text-sm text-slate-200 placeholder-slate-500 focus:outline-none"
              />

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setInputContent((prev) => prev + " ```\n// code snippet\n```")}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                    title="Insert Code Snippet"
                  >
                    <Code2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputContent((prev) => prev + " 🚀 ")}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                    title="Emoji"
                  >
                    <Smile className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline text-[11px] text-slate-500 font-mono">
                    Enter to send
                  </span>
                  <button
                    type="submit"
                    disabled={!inputContent.trim()}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
                      inputContent.trim()
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 cursor-pointer"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>

        {/* RIGHT DRAWER: Channel Members & Details */}
        <AnimatePresence>
          {showMemberDrawer && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 260, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="bg-slate-900/60 border-l border-slate-800 flex flex-col shrink-0 overflow-hidden"
            >
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="font-bold text-white text-xs uppercase tracking-wider">Channel Details</h3>
                <button
                  onClick={() => setShowMemberDrawer(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 space-y-6 flex-1 overflow-y-auto text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px] uppercase font-bold">About</span>
                  <p className="text-slate-300 mt-1 leading-relaxed">{activeChannel.topic}</p>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px] uppercase font-bold mb-2">
                    Members ({users.length})
                  </span>
                  <div className="space-y-2">
                    {users.map((u) => (
                      <div key={u.id} className="flex items-center gap-2.5">
                        <div className="relative">
                          <div className="w-7 h-7 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center text-[10px]">
                            {u.avatar}
                          </div>
                          <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-slate-900 ${getStatusColor(u.status)}`} />
                        </div>
                        <div className="truncate">
                          <div className="font-semibold text-white truncate">{u.name}</div>
                          <span className="text-[10px] text-slate-500 capitalize">{u.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

