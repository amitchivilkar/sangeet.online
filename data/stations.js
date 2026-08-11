export const groups = [
  {
    id: "mood",
    label: "मूड",
    question: "आजचा मूड काय?",
  },
  {
    id: "tradition",
    label: "परंपरा",
    question: "कोणती परंपरा?",
  },
  {
    id: "form",
    label: "प्रकार",
    question: "कोणता प्रकार?",
  },
];

export const stations = [
  // मूड
  {
    id: "शांत",
    label: "शांत",
    group: "mood",
    background: "/backgrounds/shant.jpg",
    overlay: "rgba(20, 24, 22, 0.42)",
  },
  {
    id: "प्रेम",
    label: "प्रेम",
    group: "mood",
    background: "/backgrounds/prem.jpg",
    overlay: "rgba(28, 18, 16, 0.45)",
  },
  {
    id: "विरह",
    label: "विरह",
    group: "mood",
    background: "/backgrounds/virah.jpg",
    overlay: "rgba(18, 16, 20, 0.48)",
  },
  {
    id: "पाऊस",
    label: "पाऊस",
    group: "mood",
    background: "/backgrounds/paus.jpg",
    overlay: "rgba(16, 22, 28, 0.46)",
  },
  {
    id: "प्रवास",
    label: "प्रवास",
    group: "mood",
    background: "/backgrounds/pravas.jpg",
    overlay: "rgba(18, 20, 24, 0.44)",
  },
  {
    id: "उत्साह",
    label: "उत्साह",
    group: "mood",
    background: "/backgrounds/utsah.jpg",
    overlay: "rgba(22, 16, 12, 0.42)",
  },

  // परंपरा
  {
    id: "गणपती",
    label: "गणपती",
    group: "tradition",
    background: "/backgrounds/ganpati.jpg",
    overlay: "rgba(28, 16, 10, 0.46)",
  },
  {
    id: "शक्ती तुर्रा",
    label: "शक्ती तुर्रा",
    group: "tradition",
    background: "/backgrounds/shakti.jpg",
    overlay: "rgba(14, 16, 24, 0.48)",
  },
  {
    id: "कोळीगीते",
    label: "कोळीगीते",
    group: "tradition",
    background: "/backgrounds/koli.jpg",
    overlay: "rgba(12, 28, 36, 0.44)",
  },
  {
    id: "आई एकवीरा",
    label: "आई एकवीरा",
    group: "tradition",
    background: "/backgrounds/ekveera.jpg",
    overlay: "rgba(18, 20, 24, 0.46)",
  },

  // प्रकार
  {
    id: "भावगीत",
    label: "भावगीत",
    group: "form",
    background: "/backgrounds/bhavgeet.jpg",
    overlay: "rgba(20, 16, 22, 0.46)",
  },
  {
    id: "नाट्यसंगीत",
    label: "नाट्यसंगीत",
    group: "form",
    background: "/backgrounds/natya.jpg",
    overlay: "rgba(16, 12, 18, 0.5)",
  },
];

export function getGroup(groupId) {
  return groups.find((group) => group.id === groupId) ?? null;
}

export function getStationsByGroup(groupId) {
  return stations.filter((station) => station.group === groupId);
}

export function getStation(stationId) {
  return stations.find((station) => station.id === stationId) ?? null;
}
