import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://realtime-chat-app-manthan.vercel.app"),
  title: "PulseChat • Enterprise Real-Time Messaging & Collaboration",
  description: "Ultra-fast WebSockets messaging workstation with multi-channel streams, MongoDB document storage, live presence, and team analytics.",
  keywords: ["chat", "realtime", "websockets", "socket.io", "nextjs", "mongodb", "team collaboration"],
  openGraph: {
    title: "PulseChat Enterprise",
    description: "Ultra-fast WebSockets messaging platform for engineering teams.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500 selection:text-white">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
