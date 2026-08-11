"use client";

import { useEffect, useState } from "react";

function formatLocalTime(date) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(date)
    .toLowerCase();
}

function getVisitorId() {
  const key = "sangeet-visitor-id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `v-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(key, id);
  }
  return id;
}

export default function StatusBar({ inverted = false, rightSlot = null }) {
  const [time, setTime] = useState("");
  const [online, setOnline] = useState(1);

  useEffect(() => {
    const tick = () => setTime(formatLocalTime(new Date()));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let visitorId = null;

    try {
      visitorId = getVisitorId();
    } catch {
      visitorId = `tmp-${Date.now()}`;
    }

    async function heartbeat() {
      try {
        const res = await fetch("/api/presence", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitorId }),
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && typeof data.online === "number") {
          setOnline(Math.max(1, data.online));
        }
      } catch {
        // Keep last known count.
      }
    }

    heartbeat();
    const interval = setInterval(heartbeat, 15_000);

    const onLeave = () => {
      try {
        const payload = JSON.stringify({ visitorId, leave: true });
        if (navigator.sendBeacon) {
          navigator.sendBeacon(
            "/api/presence",
            new Blob([payload], { type: "application/json" })
          );
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener("pagehide", onLeave);

    return () => {
      cancelled = true;
      clearInterval(interval);
      window.removeEventListener("pagehide", onLeave);
    };
  }, []);

  return (
    <div className={`status-bar ${inverted ? "status-bar--light" : ""}`}>
      <p className="status-bar__time" aria-live="off">
        {time || "—"}
      </p>

      <p className="status-bar__online" aria-live="polite">
        <span className="status-bar__dot" aria-hidden="true" />
        <span>
          {online} online
        </span>
      </p>

      <div className="status-bar__right">{rightSlot}</div>
    </div>
  );
}
