"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Brand from "@/components/Brand";
import MediaPlayer from "@/components/MediaPlayer";
import StationBackground from "@/components/StationBackground";
import StatusBar from "@/components/StatusBar";
import YouTubePlayer from "@/components/YouTubePlayer";
import { songFromPlayer } from "@/data/songs";

const YT_PLAYING = 1;
const YT_PAUSED = 2;
const YT_ENDED = 0;
const YT_CUED = 5;

function getAdjacentStation(stations, stationId, direction = 1) {
  if (!stations?.length) return null;
  const index = stations.findIndex((station) => station.id === stationId);
  if (index === -1) return stations[0];
  const nextIndex = (index + direction + stations.length) % stations.length;
  return stations[nextIndex];
}

function isTypingTarget(target) {
  const tag = target?.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target?.isContentEditable
  );
}

export default function MusicExperience({ stations = [] }) {
  const defaultStationId = stations[0]?.id ?? null;
  const [selectedStation, setSelectedStation] = useState(defaultStationId);
  const [song, setSong] = useState(null);
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);

  const playerRef = useRef(null);
  const pollRef = useRef(null);
  const transitionTimerRef = useRef(null);
  const videoIdRef = useRef(null);

  const currentStation = useMemo(
    () => stations.find((station) => station.id === selectedStation) ?? null,
    [selectedStation, stations]
  );

  const playlistId = currentStation?.youtubePlaylist || "";
  const showCategoryNav = stations.length > 1;

  const clearPoll = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const startPoll = useCallback(
    (player) => {
      clearPoll();
      pollRef.current = setInterval(() => {
        if (!player?.getCurrentTime) return;
        try {
          setCurrentTime(player.getCurrentTime() || 0);
          const nextDuration = player.getDuration?.() || 0;
          if (nextDuration > 0) setDuration(nextDuration);
        } catch {
          // Player may be mid-destroy.
        }
      }, 400);
    },
    [clearPoll]
  );

  useEffect(() => {
    return () => {
      clearPoll();
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, [clearPoll]);

  const syncFromPlayer = useCallback((player) => {
    if (!player) return;
    const next = songFromPlayer(player);
    if (!next) return;

    if (next.youtubeId !== videoIdRef.current) {
      videoIdRef.current = next.youtubeId;
      setCurrentTime(0);
      setTransitioning(true);
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
      transitionTimerRef.current = setTimeout(() => {
        setTransitioning(false);
      }, 280);
    }

    setSong(next);

    try {
      const d = player.getDuration?.() || 0;
      if (d > 0) setDuration(d);
      const index = player.getPlaylistIndex?.();
      if (typeof index === "number" && index >= 0) {
        setPlaylistIndex(index);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleShiftCategory = useCallback(
    (direction) => {
      if (!selectedStation || stations.length < 2) return;
      const next = getAdjacentStation(stations, selectedStation, direction);
      if (!next || next.id === selectedStation) return;
      setPlayerReady(false);
      setSong(null);
      setPlaylistIndex(0);
      videoIdRef.current = null;
      playerRef.current = null;
      setSelectedStation(next.id);
    },
    [selectedStation, stations]
  );

  const handleNext = useCallback(() => {
    try {
      playerRef.current?.nextVideo?.();
    } catch {
      // ignore
    }
  }, []);

  const handlePrev = useCallback(() => {
    try {
      playerRef.current?.previousVideo?.();
    } catch {
      // ignore
    }
  }, []);

  const handlePlayerReady = useCallback(
    (player) => {
      playerRef.current = player;
      setPlayerReady(true);
      startPoll(player);
      syncFromPlayer(player);
    },
    [startPoll, syncFromPlayer]
  );

  const handleStateChange = useCallback(
    (event) => {
      const state = event.data;
      const player = event.target;
      if (player) playerRef.current = player;

      if (state === YT_PLAYING) {
        setIsPlaying(true);
        if (player) {
          startPoll(player);
          syncFromPlayer(player);
        }
      } else if (state === YT_PAUSED) {
        setIsPlaying(false);
      } else if (state === YT_CUED) {
        if (player) syncFromPlayer(player);
      } else if (state === YT_ENDED) {
        setIsPlaying(false);
        try {
          player?.nextVideo?.();
        } catch {
          // Playlist loop may already advance.
        }
      }
    },
    [startPoll, syncFromPlayer]
  );

  const handlePlayerError = useCallback(() => {
    try {
      playerRef.current?.nextVideo?.();
    } catch {
      // ignore
    }
  }, []);

  const togglePlay = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    try {
      const state = player.getPlayerState?.();
      if (state === YT_PLAYING) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    function onKeyDown(event) {
      if (isTypingTarget(event.target)) return;

      if (event.key === " " || event.code === "Space") {
        event.preventDefault();
        togglePlay();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrev();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
        return;
      }

      if (showCategoryNav && event.key === "[") {
        event.preventDefault();
        handleShiftCategory(-1);
      }
      if (showCategoryNav && event.key === "]") {
        event.preventDefault();
        handleShiftCategory(1);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleNext, handlePrev, handleShiftCategory, showCategoryNav, togglePlay]);

  const stationLabel = currentStation?.label ?? selectedStation;
  const displaySong = song || {
    title: stationLabel || "Sangeet Online",
    artist: "YouTube Music",
    youtubeId: "",
  };

  return (
    <div className="experience experience--listening">
      <StationBackground station={currentStation} />

      <div className="experience__content">
        <StatusBar inverted rightSlot={<Brand inverted compact />} />

        <div className="experience__stage">
          {showCategoryNav && (
            <button
              type="button"
              className="category-nav category-nav--prev"
              onClick={() => handleShiftCategory(-1)}
              aria-label="मागील category"
            >
              ‹
            </button>
          )}

          <h1 className="experience__mood">{stationLabel}</h1>

          {showCategoryNav && (
            <button
              type="button"
              className="category-nav category-nav--next"
              onClick={() => handleShiftCategory(1)}
              aria-label="पुढील category"
            >
              ›
            </button>
          )}
        </div>
      </div>

      {playlistId && (
        <MediaPlayer
          song={displaySong}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          transitioning={transitioning}
          canControl={playerReady}
          onTogglePlay={togglePlay}
          onNext={handleNext}
          onPrev={handlePrev}
          canGoPrev={playerReady && playlistIndex > 0}
        />
      )}

      {playlistId && (
        <a
          className="experience__ytm"
          href={`https://music.youtube.com/playlist?list=${playlistId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            className="experience__ytm-icon"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z"
            />
          </svg>
          YouTube Music
        </a>
      )}

      {playlistId && (
        <YouTubePlayer
          key={playlistId}
          playlistId={playlistId}
          onReady={handlePlayerReady}
          onStateChange={handleStateChange}
          onError={handlePlayerError}
        />
      )}
    </div>
  );
}
