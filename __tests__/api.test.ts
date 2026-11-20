import { describe, it, expect } from "vitest";
import { GET as getMessages } from "../app/api/messages/route";

describe("Realtime Chat App API Routes", () => {
  it("GET /api/messages returns channel message history", async () => {
    const req = new Request("http://localhost:3000/api/messages?channelId=general");
    const res = await getMessages(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(Array.isArray(data.messages)).toBe(true);
  });
});
