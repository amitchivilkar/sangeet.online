"use client";

import { useEffect, useRef } from "react";

const YT_SCRIPT_SRC = "https://www.youtube.com/iframe_api";

function loadYouTubeAPI() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Window unavailable"));
  }

  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  return new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previous === "function") previous();
      resolve(window.YT);
    };

    const existing = document.querySelector(`script[src="${YT_SCRIPT_SRC}"]`);
    if (!existing) {
      const tag = document.createElement("script");
      tag.src = YT_SCRIPT_SRC;
      tag.async = true;
      document.body.appendChild(tag);
    }
  });
}

export default function YouTubePlayer({
  videoId,
  onReady,
  onStateChange,
  onError,
}) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const callbacksRef = useRef({ onReady, onStateChange, onError });

  useEffect(() => {
    callbacksRef.current = { onReady, onStateChange, onError };
  }, [onReady, onStateChange, onError]);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (!videoId || !containerRef.current) return;

      const YT = await loadYouTubeAPI();
      if (cancelled) return;

      if (playerRef.current?.loadVideoById) {
        playerRef.current.loadVideoById({ videoId });
        return;
      }

      playerRef.current = new YT.Player(containerRef.current, {
        videoId,
        width: 320,
        height: 180,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          enablejsapi: 1,
          origin:
            typeof window !== "undefined" ? window.location.origin : undefined,
        },
        events: {
          onReady: (event) => {
            callbacksRef.current.onReady?.(event.target);
            try {
              event.target.playVideo();
            } catch {
              // Autoplay may be blocked; user can interact to start.
            }
          },
          onStateChange: (event) => {
            callbacksRef.current.onStateChange?.(event);
          },
          onError: (event) => {
            callbacksRef.current.onError?.(event);
          },
        },
      });
    }

    init();

    return () => {
      cancelled = true;
    };
  }, [videoId]);

  useEffect(() => {
    return () => {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="yt-engine" aria-hidden="true">
      <div ref={containerRef} />
    </div>
  );
}
