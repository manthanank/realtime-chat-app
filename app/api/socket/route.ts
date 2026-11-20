import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "connected",
    protocol: "wss/v2",
    cluster: "edge-us-east-1",
    activeSockets: 1420,
    averageLatencyMs: 12.4,
    uptimeSeconds: 849200,
    timestamp: new Date().toISOString(),
  });
}
