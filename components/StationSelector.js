"use client";

import { groups, getGroup, getStationsByGroup } from "@/data/stations";

export default function StationSelector({
  visible,
  selectedGroup,
  onSelectGroup,
  onSelectStation,
  onBack,
}) {
  if (!visible) return null;

  if (!selectedGroup) {
    return (
      <section className="station-selector" aria-labelledby="station-question">
        <h1 id="station-question" className="station-selector__question">
          आज काय ऐकायचे?
        </h1>

        <ul
          className="station-selector__grid station-selector__grid--groups"
          role="list"
        >
          {groups.map((group) => (
            <li key={group.id}>
              <button
                type="button"
                className="station-selector__option"
                onClick={() => onSelectGroup(group.id)}
                aria-label={`${group.label} निवडा`}
              >
                {group.label}
              </button>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  const group = getGroup(selectedGroup);
  const stationList = getStationsByGroup(selectedGroup);

  return (
    <section className="station-selector" aria-labelledby="station-question">
      <button
        type="button"
        className="station-selector__back"
        onClick={onBack}
        aria-label="मागे जा"
      >
        ← मागे
      </button>

      <h1 id="station-question" className="station-selector__question">
        {group?.question ?? "काय ऐकायचे?"}
      </h1>

      <ul
        className={`station-selector__grid ${
          stationList.length > 4
            ? "station-selector__grid--wide"
            : "station-selector__grid--groups"
        }`}
        role="list"
      >
        {stationList.map((station) => (
          <li key={station.id}>
            <button
              type="button"
              className="station-selector__option"
              onClick={() => onSelectStation(station.id)}
              aria-label={`${station.label} निवडा`}
            >
              {station.label}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
