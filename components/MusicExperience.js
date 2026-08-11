"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Brand from "@/components/Brand";
import MediaPlayer from "@/components/MediaPlayer";
import StationBackground from "@/components/StationBackground";
import StationSelector from "@/components/StationSelector";
import StatusBar from "@/components/StatusBar";
import YouTubePlayer from "@/components/YouTubePlayer";
import { getStation } from "@/data/stations";
import { pickRandomSong } from "@/data/songs";

const YT_PLAYING = 1;
const YT_PAUSED = 2;
const YT_ENDED = 0;

export default function MusicExperience() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
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
      const nextSong = pickRandomSong(stationId, excludeId);
      if (!nextSong) return;
      applySong(nextSong, options);
    },
    [applySong]
  );

  const handleSelectGroup = useCallback((groupId) => {
    setSelectedGroup(groupId);
  }, []);

  const handleBackToGroups = useCallback(() => {
    setSelectedGroup(null);
  }, []);

  const handleSelectStation = useCallback(
    (stationId) => {
      setSelectedStation(stationId);
      setHistory([]);
      setPlayerReady(false);
      playerRef.current = null;
      loadSongForStation(stationId);
    },
    [loadSongForStation]
  );

  const handleChangeStation = useCallback(() => {
    clearPoll();
    setSelectedStation(null);
    setSong(null);
    setHistory([]);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setPlayerReady(false);
    playerRef.current = null;
  }, [clearPoll]);

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

  const isListening = Boolean(selectedStation);
  const stationLabel = getStation(selectedStation)?.label ?? selectedStation;

  return (
    <div className={`experience ${isListening ? "experience--listening" : ""}`}>
      <StationBackground stationId={selectedStation} />

      <div className="experience__content">
        <StatusBar
          inverted={isListening}
          rightSlot={
            isListening ? (
              <button
                type="button"
                className="change-mood"
                onClick={handleChangeStation}
                aria-label="बदल"
              >
                बदल
              </button>
            ) : (
              <Brand inverted={false} compact />
            )
          }
        />

        <StationSelector
          visible={!isListening}
          selectedGroup={selectedGroup}
          onSelectGroup={handleSelectGroup}
          onSelectStation={handleSelectStation}
          onBack={handleBackToGroups}
        />

        {isListening && (
          <div className="experience__stage">
            <h1 className="experience__mood">{stationLabel}</h1>
          </div>
        )}
      </div>

      {isListening && song && (
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
