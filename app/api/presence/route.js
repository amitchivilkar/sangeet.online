import { getOnlineCount, leavePresence, touchPresence } from "@/lib/presence";

export async function GET() {
  return Response.json({
    online: getOnlineCount(),
  });
}

export async function POST(request) {
  let visitorId = null;
  let leave = false;

  try {
    const body = await request.json();
    visitorId = body?.visitorId ?? null;
    leave = Boolean(body?.leave);
  } catch {
    visitorId = null;
  }

  const online = leave ? leavePresence(visitorId) : touchPresence(visitorId);

  return Response.json({ online });
}
