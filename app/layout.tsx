import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://realtime-chat-app-eight-sable.vercel.app"),
  title: "PulseChat • Enterprise Real-Time Messaging & Collaboration",
  description:
    "Ultra-fast WebSockets messaging workstation with multi-channel streams, MongoDB document storage, live presence, and team analytics.",
  keywords: ["chat", "realtime", "websockets", "socket.io", "nextjs", "mongodb", "team collaboration"],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "PulseChat Enterprise",
    description: "Ultra-fast WebSockets messaging platform for engineering teams.",
    type: "website",
    url: "https://realtime-chat-app-eight-sable.vercel.app",
    siteName: "PulseChat",
  },
  twitter: {
    card: "summary_large_image",
    title: "PulseChat • Enterprise Real-Time Messaging",
    description: "Multi-channel WebSockets streams with MongoDB storage and live presence indicators.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PulseChat Real-Time Messaging",
    applicationCategory: "CommunicationApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Manthan Ank",
      url: "https://github.com/manthanank",
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500 selection:text-white">
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
