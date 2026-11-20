# PulseChat — Distributed Real-Time Team Collaboration Suite

PulseChat is an enterprise communication application built with Next.js 15, TypeScript, WebSockets simulation, and responsive channel navigation.

## Key Features

- **Multi-Channel Navigation (`/channels` & `/chat`)**: Public team channels, private project rooms, and direct message threads with unread counters.
- **Dynamic Messages API (`/api/messages`)**: Full REST endpoint for sending, querying, and updating channel messages.
- **Rich Message Interactions**: Emoji reactions, file attachment previews, pinned notices, and real-time typing indicators.
- **Member Presence & Status**: Online, away, and do-not-disturb status toggles with custom activity messages.
- **Telemetry & Network Analytics (`/analytics`)**: Message volume metrics, peak traffic hours, and regional latency graphs.

## Tech Stack

- **Framework**: Next.js 15 (App Router, Server Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Lucide Icons
- **Real-Time Layer**: Edge Route Handlers (`/api/socket`, `/api/messages`)
- **Deployment**: Vercel

## API Endpoints

- `GET /api/messages`: Query channel message stream.
- `POST /api/messages`: Dispatch a new message with reactions and attachments.
- `GET /api/socket`: WebSockets negotiation and handshake endpoint.

## Getting Started

1. Navigate to the project directory:
   ```bash
   cd c:\Users\manth\projects\realtime-chat-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

