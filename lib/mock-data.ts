import { User, Channel, Message, DirectConversation } from "./types";

export const CURRENT_USER: User = {
  id: "usr-me",
  name: "Alex Vance",
  avatar: "AV",
  email: "alex.vance@pulsechat.io",
  role: "admin",
  status: "online",
  customStatus: "Deploying WebSockets cluster to edge POPs 🚀",
};

export const INITIAL_USERS: User[] = [
  CURRENT_USER,
  {
    id: "usr-1",
    name: "Elena Rostova",
    avatar: "ER",
    email: "elena@pulsechat.io",
    role: "admin",
    status: "online",
    customStatus: "Reviewing pull requests",
  },
  {
    id: "usr-2",
    name: "Marcus Chen",
    avatar: "MC",
    email: "marcus@pulsechat.io",
    role: "member",
    status: "idle",
    customStatus: "Away for lunch",
  },
  {
    id: "usr-3",
    name: "Sarah Jenkins",
    avatar: "SJ",
    email: "sarah.j@pulsechat.io",
    role: "moderator",
    status: "dnd",
    customStatus: "Deep work • Architecture RFC",
  },
  {
    id: "usr-4",
    name: "Devon Kim",
    avatar: "DK",
    email: "devon@pulsechat.io",
    role: "member",
    status: "offline",
    customStatus: "Back tomorrow at 9am EST",
  },
];

export const INITIAL_CHANNELS: Channel[] = [
  {
    id: "chn-general",
    name: "general",
    topic: "Company-wide announcements and engineering discussions",
    isPrivate: false,
    memberCount: 48,
    unreadCount: 0,
  },
  {
    id: "chn-engineering",
    name: "engineering",
    topic: "Architecture RFCs, Next.js 15, and MongoDB performance",
    isPrivate: false,
    memberCount: 32,
    unreadCount: 2,
  },
  {
    id: "chn-product",
    name: "product-design",
    topic: "Figma specs, UX design tokens, and user interviews",
    isPrivate: false,
    memberCount: 24,
    unreadCount: 0,
  },
  {
    id: "chn-incident",
    name: "incident-war-room",
    topic: "P0/P1 production incident triaging & status page updates",
    isPrivate: true,
    memberCount: 12,
    unreadCount: 0,
  },
  {
    id: "chn-watercooler",
    name: "watercooler",
    topic: "Casual banter, tech memes, coffee brewing recipes",
    isPrivate: false,
    memberCount: 56,
    unreadCount: 5,
  },
];

export const INITIAL_MESSAGES: Record<string, Message[]> = {
  "chn-general": [
    {
      id: "msg-101",
      senderId: "usr-1",
      senderName: "Elena Rostova",
      senderAvatar: "ER",
      senderRole: "admin",
      channelId: "chn-general",
      content: "Welcome to PulseChat v2.4! WebSockets clusters are now distributed across 14 edge regions with sub-15ms message dispatch.",
      timestamp: "10:14 AM",
      reactions: [
        { emoji: "🚀", count: 8, users: ["usr-me", "usr-2", "usr-3"] },
        { emoji: "⚡", count: 5, users: ["usr-me", "usr-4"] },
      ],
      isPinned: true,
    },
    {
      id: "msg-102",
      senderId: "usr-2",
      senderName: "Marcus Chen",
      senderAvatar: "MC",
      senderRole: "member",
      channelId: "chn-general",
      content: "The message delivery speed is noticeably instant compared to legacy polling. Huge win for the team!",
      timestamp: "10:17 AM",
      reactions: [{ emoji: "🙌", count: 4, users: ["usr-1", "usr-3"] }],
    },
    {
      id: "msg-103",
      senderId: "usr-me",
      senderName: "Alex Vance",
      senderAvatar: "AV",
      senderRole: "admin",
      channelId: "chn-general",
      content: "Thanks Marcus! We also added full end-to-end typing indicators and rich code syntax highlighting in this build.",
      timestamp: "10:20 AM",
      reactions: [{ emoji: "🔥", count: 6, users: ["usr-1", "usr-2"] }],
    },
  ],
  "chn-engineering": [
    {
      id: "msg-201",
      senderId: "usr-3",
      senderName: "Sarah Jenkins",
      senderAvatar: "SJ",
      senderRole: "moderator",
      channelId: "chn-engineering",
      content: "Benchmarked MongoDB compound index `{ channelId: 1, createdAt: -1 }`. Query latency dropped from 142ms down to 4.8ms for 50k document scans.",
      timestamp: "09:45 AM",
      attachments: [
        {
          id: "att-1",
          fileName: "mongo_explain_analyze.json",
          fileSize: "14.2 KB",
          fileType: "code",
        },
      ],
      reactions: [
        { emoji: "🧠", count: 7, users: ["usr-me", "usr-1"] },
        { emoji: "💯", count: 4, users: ["usr-2"] },
      ],
    },
    {
      id: "msg-202",
      senderId: "usr-me",
      senderName: "Alex Vance",
      senderAvatar: "AV",
      senderRole: "admin",
      channelId: "chn-engineering",
      content: "Phenomenal work Sarah. Let's merge that into the staging pipeline and deploy with zero downtime.",
      timestamp: "09:50 AM",
      reactions: [{ emoji: "🚀", count: 3, users: ["usr-3"] }],
    },
  ],
};

