const HEARTBEAT_TTL_MS = 45_000;

const globalStore = globalThis;

if (!globalStore.__sangeetPresence) {
  globalStore.__sangeetPresence = new Map();
}

function prune(now = Date.now()) {
  const store = globalStore.__sangeetPresence;
  for (const [id, lastSeen] of store.entries()) {
    if (now - lastSeen > HEARTBEAT_TTL_MS) {
      store.delete(id);
    }
  }
  return store;
}

export function touchPresence(visitorId) {
  if (!visitorId || typeof visitorId !== "string") {
    return getOnlineCount();
  }

  const id = visitorId.slice(0, 64);
  const store = prune();
  store.set(id, Date.now());
  return store.size;
}

export function leavePresence(visitorId) {
  if (!visitorId || typeof visitorId !== "string") {
    return getOnlineCount();
  }

  const store = prune();
  store.delete(visitorId.slice(0, 64));
  return store.size;
}

export function getOnlineCount() {
  return prune().size;
}

export { HEARTBEAT_TTL_MS };
