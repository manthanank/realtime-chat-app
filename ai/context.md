# PulseChat Enterprise - AI Architecture & Context Blueprint

## Overview
PulseChat is a high-performance, real-time messaging application designed for modern engineering teams and developer communities. It provides multi-channel collaboration, direct messaging, live presence tracking, typing indicators, rich markdown/code previews, emoji reactions, and team communication analytics.

## Tech Stack
- Framework: Next.js 15 (App Router)
- Language: TypeScript 5.7+
- Styling: Tailwind CSS & Lucide Icons
- Animation: Framer Motion
- Analytics: Vercel Analytics & Speed Insights
- Data Modeling: MongoDB with Mongoose document schemas
- Protocol: WebSockets / Socket.IO event simulation

## Routes & Pages
- `/`: Enterprise marketing landing page with interactive WebSockets latency & message throughput simulator, pricing tiers, feature deep dive, and FAQ.
- `/chat`: Main chat workstation with channel switcher, direct messages list, message history stream, interactive input with typing status, and channel member drawer.
- `/channels`: Dedicated channel discovery and creation directory.
- `/analytics`: Team engagement metrics, message distribution by channel, and peak communication hours.
- `/settings`: User profile, notification preferences, end-to-end encryption keys, and JSON export.
- `/api/socket`: Heartbeat and real-time connection status check.
