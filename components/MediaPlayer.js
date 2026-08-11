"use client";

import { getCoverUrl } from "@/data/songs";

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function IconSkipBack() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path
        d="M19 18L9 12l10-6v12zM5 6v12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSkipForward() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path
        d="M5 6l10 6-10 6V6zM19 6v12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPlay() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M8 5.5v13l11-6.5L8 5.5z" />
    </svg>
  );
}

function IconPause() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M7 5h3.5v14H7V5zm6.5 0H17v14h-3.5V5z" />
    </svg>
  );
}

export default function MediaPlayer({
  song,
  isPlaying,
  currentTime,
  duration,
  transitioning,
  canControl,
  onTogglePlay,
  onNext,
  onPrev,
  canGoPrev,
}) {
  if (!song) return null;

  const progress =
    duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const cover = getCoverUrl(song);

  return (
    <div
      className={`media-player ${transitioning ? "media-player--transitioning" : ""}`}
      role="region"
      aria-label="संगीत प्लेयर"
    >
      <div className="media-player__row">
        <div className="media-player__art">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover} alt="" width={52} height={52} />
        </div>

        <div className="media-player__meta">
          <p className="media-player__title">{song.title}</p>
          <p className="media-player__artist">{song.artist}</p>
        </div>

        <div className="media-player__controls">
          <button
            type="button"
            className="media-player__ghost"
            onClick={onPrev}
            disabled={!canGoPrev || !canControl}
            aria-label="मागील गाणे"
          >
            <IconSkipBack />
          </button>

          <button
            type="button"
            className="media-player__play"
            onClick={onTogglePlay}
            disabled={!canControl}
            aria-label={isPlaying ? "थांबवा" : "सुरू करा"}
          >
            {isPlaying ? <IconPause /> : <IconPlay />}
          </button>

          <button
            type="button"
            className="media-player__ghost"
            onClick={onNext}
            disabled={!canControl}
            aria-label="पुढील गाणे"
          >
            <IconSkipForward />
          </button>
        </div>
      </div>

      <div
        className="media-player__progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={Math.floor(duration) || 0}
        aria-valuenow={Math.floor(currentTime) || 0}
        aria-label="गाण्याची प्रगती"
      >
        <span className="media-player__time">{formatTime(currentTime)}</span>
        <div className="media-player__track">
          <div
            className="media-player__fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="media-player__time">{formatTime(duration)}</span>
      </div>
    </div>
  );
}
