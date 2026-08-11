"use client";

import { getCoverUrl } from "@/data/songs";

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function IconPrev() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6 6h2v12H6V6zm3.5 6 8.5 6V6l-8.5 6z"
      />
    </svg>
  );
}

function IconNext() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16 6h2v12h-2V6zM5 18l8.5-6L5 6v12z"
      />
    </svg>
  );
}

function IconPlay() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

function IconPause() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
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
      <div
        className={`media-player__art${isPlaying ? " media-player__art--spinning" : ""}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cover} alt="" width={52} height={52} />
      </div>

      <div className="media-player__meta">
        <p className="media-player__title">{song.title}</p>
        <p className="media-player__artist">{song.artist}</p>

        <div
          className="media-player__progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={Math.floor(duration) || 0}
          aria-valuenow={Math.floor(currentTime) || 0}
          aria-label="गाण्याची प्रगती"
        >
          <div className="media-player__track">
            <div
              className="media-player__fill"
              style={{ width: `${progress}%` }}
            >
              <span className="media-player__knob" />
            </div>
          </div>
          <p className="media-player__time">
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
        </div>
      </div>

      <div className="media-player__controls">
        <button
          type="button"
          className="media-player__icon-btn"
          onClick={onPrev}
          disabled={!canGoPrev || !canControl}
          aria-label="मागील गाणे"
        >
          <IconPrev />
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
          className="media-player__icon-btn"
          onClick={onNext}
          disabled={!canControl}
          aria-label="पुढील गाणे"
        >
          <IconNext />
        </button>
      </div>
    </div>
  );
}
