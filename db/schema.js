/**
 * MongoDB / Mongoose Schema Definitions for PulseChat Real-Time Messaging Platform
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Profile & Presence Schema
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatarUrl: { type: String, default: null },
  status: { 
    type: String, 
    enum: ['online', 'idle', 'dnd', 'offline'], 
    default: 'offline' 
  },
  customStatus: { type: String, default: 'Building real-time systems' },
  role: { type: String, enum: ['owner', 'admin', 'member'], default: 'member' },
  createdAt: { type: Date, default: Date.now },
  lastSeenAt: { type: Date, default: Date.now },
});

// Communication Channel Schema
const ChannelSchema = new Schema({
  name: { type: String, required: true, unique: true },
  topic: { type: String, default: '' },
  isPrivate: { type: Boolean, default: false },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

// Attachment Schema
const AttachmentSchema = new Schema({
  fileName: { type: String, required: true },
  fileSize: { type: String, required: true },
  fileType: { type: String, required: true },
  url: { type: String, required: true },
});

// Emoji Reaction Schema
const ReactionSchema = new Schema({
  emoji: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  count: { type: Number, default: 1 },
});

// Message Schema with Channel / DM Indexing
const MessageSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  channelId: { type: Schema.Types.ObjectId, ref: 'Channel', default: null },
  recipientId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  content: { type: String, required: true },
  attachments: [AttachmentSchema],
  reactions: [ReactionSchema],
  isEdited: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Index for high-velocity chronological message retrieval
MessageSchema.index({ channelId: 1, createdAt: -1 });
MessageSchema.index({ recipientId: 1, senderId: 1, createdAt: -1 });

module.exports = {
  User: mongoose.models.User || mongoose.model('User', UserSchema),
  Channel: mongoose.models.Channel || mongoose.model('Channel', ChannelSchema),
  Message: mongoose.models.Message || mongoose.model('Message', MessageSchema),
};
