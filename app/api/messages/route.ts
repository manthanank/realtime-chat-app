import { NextResponse } from "next/server";
import { Message } from "@/lib/types";
import { INITIAL_MESSAGES } from "@/lib/mock-data";

let serverMessages: Record<string, Message[]> = { ...INITIAL_MESSAGES };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const channelId = searchParams.get("channelId");

  if (channelId) {
    const list = serverMessages[channelId] || [];
    return NextResponse.json({
      success: true,
      channelId,
      count: list.length,
      messages: list,
      syncedAt: new Date().toISOString(),
    });
  }

  return NextResponse.json({
    success: true,
    channelsCount: Object.keys(serverMessages).length,
    messages: serverMessages,
    syncedAt: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.content || !body.channelId) {
      return NextResponse.json({ error: "Content and channelId are required" }, { status: 400 });
    }

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      channelId: body.channelId,
      senderId: body.senderId || "usr-me",
      senderName: body.senderName || "Manthan Ank",
      senderAvatar: body.senderAvatar || "MA",
      content: body.content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      reactions: [],
      attachments: body.attachments || [],
    };

    if (!serverMessages[body.channelId]) {
      serverMessages[body.channelId] = [];
    }
    serverMessages[body.channelId].push(newMsg);

    return NextResponse.json({
      success: true,
      message: "Message dispatched to channel",
      data: newMsg,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to dispatch message" }, { status: 500 });
  }
}
