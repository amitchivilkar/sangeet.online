"use client";

import { useEffect, useState } from "react";

function layerFromStation(station) {
  return {
    key: station?.id || "home",
    src: station?.background ?? null,
    type: station?.backgroundType ?? "image",
    poster: station?.poster ?? null,
    overlay: station?.overlay ?? "rgba(247, 244, 239, 1)",
  };
}

function BackgroundMedia({ layer }) {
  if (!layer.src) {
    return <div className="mood-bg__plain" />;
  }

  if (layer.type === "video") {
    return (
      <video
        className="mood-bg__image mood-bg__video"
        src={layer.src}
        poster={layer.poster || undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={layer.src} alt="" className="mood-bg__image" />
  );
}

function BackgroundLayer({ layer, className }) {
  return (
    <div className={`mood-bg__layer ${className}`}>
      <BackgroundMedia layer={layer} />
      <div
        className="mood-bg__overlay"
        style={layer.src ? undefined : { background: layer.overlay }}
      />
    </div>
  );
}

export default function StationBackground({ station }) {
  const [current, setCurrent] = useState(() => layerFromStation(station));
  const [previous, setPrevious] = useState(null);
  const nextKey = station?.id || "home";

  if (nextKey !== current.key) {
    setPrevious(current);
    setCurrent(layerFromStation(station));
  }

  useEffect(() => {
    if (!previous) return undefined;
    const timer = setTimeout(() => {
      setPrevious(null);
    }, 1100);
    return () => clearTimeout(timer);
  }, [previous]);

  return (
    <div className="mood-bg" aria-hidden="true">
      {previous && (
        <BackgroundLayer layer={previous} className="is-leaving" />
      )}
      <BackgroundLayer layer={current} className="is-active" />
    </div>
  );
}
