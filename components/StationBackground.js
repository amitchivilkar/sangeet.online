"use client";

import { useEffect, useState } from "react";
import { getStation } from "@/data/stations";

function layerFromStation(stationId) {
  const config = stationId ? getStation(stationId) : null;
  return {
    key: stationId || "home",
    src: config?.background ?? null,
    overlay: config?.overlay ?? "rgba(247, 244, 239, 1)",
  };
}

function BackgroundLayer({ layer, className }) {
  return (
    <div className={`mood-bg__layer ${className}`}>
      {layer.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={layer.src} alt="" className="mood-bg__image" />
      ) : (
        <div className="mood-bg__plain" />
      )}
      <div
        className="mood-bg__overlay"
        style={{ background: layer.overlay }}
      />
    </div>
  );
}

export default function StationBackground({ stationId }) {
  const [current, setCurrent] = useState(() => layerFromStation(stationId));
  const [previous, setPrevious] = useState(null);
  const nextKey = stationId || "home";

  if (nextKey !== current.key) {
    setPrevious(current);
    setCurrent(layerFromStation(stationId));
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
