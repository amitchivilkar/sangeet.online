"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Brand from "@/components/Brand";
import MediaPlayer from "@/components/MediaPlayer";
import StationBackground from "@/components/StationBackground";
import StatusBar from "@/components/StatusBar";
import YouTubePlayer from "@/components/YouTubePlayer";
import { pickRandomSong } from "@/data/songs";

const YT_PLAYING = 1;
const YT_PAUSED = 2;
const YT_ENDED = 0;

function getAdjacentStation(stations, stationId, direction = 1) {
  if (!stations?.length) return null;
  const index = stations.findIndex((station) => station.id === stationId);
  if (index === -1) return stations[0];
  const nextIndex = (index + direction + stations.length) % stations.length;
  return stations[nextIndex];
}

export default function MusicExperience({ stations = [], songs = [] }) {
  const defaultStationId = stations[0]?.id ?? null;
  const [selectedStation, setSelectedStation] = useState(defaultStationId);
  const [song, setSong] = useState(null);
  const [history, setHistory] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);

  const playerRef = useRef(null);
  const pollRef = useRef(null);
  const transitionTimerRef = useRef(null);
  const songRef = useRef(null);
  const bootedRef = useRef(false);

  const currentStation = useMemo(
    () => stations.find((station) => station.id === selectedStation) ?? null,
    [selectedStation, stations]
  );

  const showCategoryNav = stations.length > 1;

  useEffect(() => {
    songRef.current = song;
  }, [song]);

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

  const applySong = useCallback((nextSong, { pushHistory = false } = {}) => {
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    setPlayerReady(false);
    playerRef.current = null;

    const commit = () => {
      if (pushHistory && songRef.current) {
        setHistory((prev) => [...prev, songRef.current]);
      }
      setSong(nextSong);
      setTransitioning(false);
    };

    if (!songRef.current) {
      commit();
      return;
    }

    setTransitioning(true);
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }
    transitionTimerRef.current = setTimeout(commit, 280);
  }, []);

  const loadSongForStation = useCallback(
    (stationId, excludeId = null, options = {}) => {
      if (!stationId) return;
      const nextSong = pickRandomSong(songs, stationId, excludeId);
      if (!nextSong) return;
      applySong(nextSong, options);
    },
    [applySong, songs]
  );

  useEffect(() => {
    if (!defaultStationId || bootedRef.current) return;
    bootedRef.current = true;
    loadSongForStation(defaultStationId);
  }, [defaultStationId, loadSongForStation]);

  const handleShiftCategory = useCallback(
    (direction) => {
      if (!selectedStation || stations.length < 2) return;
      const next = getAdjacentStation(stations, selectedStation, direction);
      if (!next || next.id === selectedStation) return;
      setHistory([]);
      setPlayerReady(false);
      playerRef.current = null;
      setSelectedStation(next.id);
      loadSongForStation(next.id);
    },
    [loadSongForStation, selectedStation, stations]
  );

  const handleNext = useCallback(() => {
    if (!selectedStation || !song) return;
    loadSongForStation(selectedStation, song.id, { pushHistory: true });
  }, [loadSongForStation, selectedStation, song]);

  const handlePrev = useCallback(() => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    applySong(previous);
  }, [applySong, history]);

  const handlePlayerReady = useCallback(
    (player) => {
      playerRef.current = player;
      setPlayerReady(true);
      startPoll(player);
      try {
        const d = player.getDuration?.() || 0;
        if (d > 0) setDuration(d);
      } catch {
        // ignore
      }
    },
    [startPoll]
  );

  const handleStateChange = useCallback(
    (event) => {
      const state = event.data;
      if (state === YT_PLAYING) {
        setIsPlaying(true);
        if (event.target) startPoll(event.target);
      } else if (state === YT_PAUSED) {
        setIsPlaying(false);
      } else if (state === YT_ENDED) {
        setIsPlaying(false);
        if (selectedStation && song) {
          loadSongForStation(selectedStation, song.id, { pushHistory: true });
        }
      }
    },
    [loadSongForStation, selectedStation, song, startPoll]
  );

  const handlePlayerError = useCallback(() => {
    if (selectedStation && song) {
      loadSongForStation(selectedStation, song.id, { pushHistory: true });
    }
  }, [loadSongForStation, selectedStation, song]);

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
    if (!showCategoryNav) return undefined;

    function onKeyDown(event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handleShiftCategory(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleShiftCategory(1);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleShiftCategory, showCategoryNav]);

  const stationLabel = currentStation?.label ?? selectedStation;

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

      {song && (
        <MediaPlayer
          song={song}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          transitioning={transitioning}
          canControl={playerReady}
          onTogglePlay={togglePlay}
          onNext={handleNext}
          onPrev={handlePrev}
          canGoPrev={history.length > 0}
        />
      )}

      {song && (
        <YouTubePlayer
          key={song.id}
          videoId={song.youtubeId}
          onReady={handlePlayerReady}
          onStateChange={handleStateChange}
          onError={handlePlayerError}
        />
      )}
    </div>
  );
}
