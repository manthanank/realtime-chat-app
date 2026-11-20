export type UserStatus = "online" | "idle" | "dnd" | "offline";

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: "admin" | "moderator" | "member";
  status: UserStatus;
  customStatus?: string;
}

export interface Attachment {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: "image" | "code" | "pdf" | "zip";
  url?: string;
}

export interface Reaction {
  emoji: string;
  count: number;
  users: string[]; // User IDs who reacted
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole?: "admin" | "moderator" | "member";
  channelId?: string;
  recipientId?: string; // For DMs
  content: string;
  timestamp: string;
  attachments?: Attachment[];
  reactions?: Reaction[];
  isPinned?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  topic: string;
  isPrivate: boolean;
  memberCount: number;
  unreadCount?: number;
}

export interface DirectConversation {
  id: string;
  user: User;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
}
