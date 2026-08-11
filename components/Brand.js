"use client";

export default function Brand({ inverted = false, compact = false }) {
  return (
    <header
      className={`brand ${compact ? "brand--compact" : ""}`}
      aria-label="Sangeet Online"
    >
      <p className={`brand__name ${inverted ? "brand__name--light" : ""}`}>
        SANGEET
      </p>
      {!compact && (
        <p className={`brand__sub ${inverted ? "brand__sub--light" : ""}`}>
          ONLINE
        </p>
      )}
    </header>
  );
}
