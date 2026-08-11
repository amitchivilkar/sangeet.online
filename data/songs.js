const songs = [
  // मूड — शांत
  {
    id: 1,
    title: "मन उधाण वार्याचे",
    artist: "Shankar Mahadevan, Ajay-Atul",
    category: "शांत",
    youtubeId: "2JZTIVd4XN0",
    cover: "/covers/default.svg",
  },
  {
    id: 2,
    title: "जीव रंगला",
    artist: "Hariharan, Shreya Ghoshal",
    category: "शांत",
    youtubeId: "en60_iC0u2M",
    cover: "/covers/default.svg",
  },

  // मूड — प्रेम
  {
    id: 3,
    title: "का काळेना",
    artist: "Swapnil Joshi, Mukta Barve",
    category: "प्रेम",
    youtubeId: "FupW3gNXowI",
    cover: "/covers/default.svg",
  },
  {
    id: 4,
    title: "मला वेड लागले",
    artist: "Timepass",
    category: "प्रेम",
    youtubeId: "I1sDYBVc8sQ",
    cover: "/covers/default.svg",
  },
  {
    id: 5,
    title: "तुझ्यात जीव रंगला",
    artist: "Shubham Yeole Patil",
    category: "प्रेम",
    youtubeId: "jgPU05x3XBw",
    cover: "/covers/default.svg",
  },

  // मूड — विरह
  {
    id: 6,
    title: "याद लागला",
    artist: "Ajay-Atul",
    category: "विरह",
    youtubeId: "VmU1ZsXUbG0",
    cover: "/covers/default.svg",
  },
  {
    id: 7,
    title: "तुला जपणार आहे",
    artist: "Adarsh Shinde, Ronkini Gupta",
    category: "विरह",
    youtubeId: "GGcueYucwXk",
    cover: "/covers/default.svg",
  },

  // मूड — पाऊस
  {
    id: 8,
    title: "गारवा",
    artist: "Milind Ingle",
    category: "पाऊस",
    youtubeId: "CGVIAiNSHy4",
    cover: "/covers/default.svg",
  },
  {
    id: 9,
    title: "पाऊस आला",
    artist: "Nil Deogade",
    category: "पाऊस",
    youtubeId: "RR_ldHtrWF8",
    cover: "/covers/default.svg",
  },

  // मूड — प्रवास
  {
    id: 10,
    title: "बाई गं",
    artist: "Aarya Ambekar",
    category: "प्रवास",
    youtubeId: "ujZAfdm1cfg",
    cover: "/covers/default.svg",
  },
  {
    id: 11,
    title: "अप्सरा आली",
    artist: "Bela Shende, Ajay-Atul",
    category: "प्रवास",
    youtubeId: "s5tPzvgjJ0Q",
    cover: "/covers/default.svg",
  },

  // मूड — उत्साह
  {
    id: 12,
    title: "झिंगाट",
    artist: "Ajay-Atul",
    category: "उत्साह",
    youtubeId: "DKSsOb8pOog",
    cover: "/covers/default.svg",
  },
  {
    id: 13,
    title: "शिट्टी वाजली",
    artist: "Anand Shinde, Avadhoot Gupte",
    category: "उत्साह",
    youtubeId: "VYq4GRO2A5Y",
    cover: "/covers/default.svg",
  },

  // परंपरा — गणपती
  {
    id: 14,
    title: "सुखकर्ता दुःखहर्ता",
    artist: "Traditional",
    category: "गणपती",
    youtubeId: "4ncAlDhIfTw",
    cover: "/covers/default.svg",
  },
  {
    id: 15,
    title: "जय देव जय देव",
    artist: "Traditional",
    category: "गणपती",
    youtubeId: "q72FRIUFcvM",
    cover: "/covers/default.svg",
  },
  {
    id: 16,
    title: "सुखकर्ता दुःखहर्ता",
    artist: "Devotional",
    category: "गणपती",
    youtubeId: "gFr5p5AyuD0",
    cover: "/covers/default.svg",
  },

  // परंपरा — शक्ती तुर्रा
  {
    id: 17,
    title: "शक्ती तुर्रा",
    artist: "Shahir Vasant Bhoir",
    category: "शक्ती तुर्रा",
    youtubeId: "W_t4Zh9rd3c",
    cover: "/covers/default.svg",
  },
  {
    id: 18,
    title: "आळवितो मी हे श्री गणा",
    artist: "Traditional",
    category: "शक्ती तुर्रा",
    youtubeId: "s6F7uKr1m84",
    cover: "/covers/default.svg",
  },
  {
    id: 19,
    title: "टॉप शक्ती तुर्रा गण",
    artist: "Traditional",
    category: "शक्ती तुर्रा",
    youtubeId: "VVZHvr3-PKs",
    cover: "/covers/default.svg",
  },

  // परंपरा — कोळीगीते
  {
    id: 20,
    title: "मी आहे कोळी",
    artist: "Shrikant Narayan",
    category: "कोळीगीते",
    youtubeId: "ga-H_bIGGAE",
    cover: "/covers/default.svg",
  },
  {
    id: 21,
    title: "कोळीगीते नॉनस्टॉप",
    artist: "Traditional",
    category: "कोळीगीते",
    youtubeId: "CgaU-C84ESc",
    cover: "/covers/default.svg",
  },

  // परंपरा — आई एकवीरा
  {
    id: 22,
    title: "आई तुझ देऊल",
    artist: "Yogesh Agravkar",
    category: "आई एकवीरा",
    youtubeId: "BRHlEt213uY",
    cover: "/covers/default.svg",
  },
  {
    id: 23,
    title: "कार्ले गडाची एकवीरा माऊली",
    artist: "Sonali",
    category: "आई एकवीरा",
    youtubeId: "8tXHUdQul14",
    cover: "/covers/default.svg",
  },

  // प्रकार — भावगीत
  {
    id: 24,
    title: "रंगा येई वो",
    artist: "Lata Mangeshkar",
    category: "भावगीत",
    youtubeId: "Z8bDdMNmQV0",
    cover: "/covers/default.svg",
  },
  {
    id: 25,
    title: "मी रात टाकली",
    artist: "Lata Mangeshkar",
    category: "भावगीत",
    youtubeId: "IcaSmFI9rUQ",
    cover: "/covers/default.svg",
  },

  // प्रकार — नाट्यसंगीत
  {
    id: 26,
    title: "मला मदन भेटला",
    artist: "Balgandharva",
    category: "नाट्यसंगीत",
    youtubeId: "4w_a8fTgcKk",
    cover: "/covers/default.svg",
  },
  {
    id: 27,
    title: "बालगंधर्व ज्यूकबॉक्स",
    artist: "Balgandharva",
    category: "नाट्यसंगीत",
    youtubeId: "I-YNnDu0LsQ",
    cover: "/covers/default.svg",
  },
];

export function getSongsByCategory(category) {
  return songs.filter((song) => song.category === category);
}

export function getSongsByMood(mood) {
  return getSongsByCategory(mood);
}

export function pickRandomSong(category, excludeId = null) {
  const pool = getSongsByCategory(category).filter(
    (song) => song.id !== excludeId
  );
  const list = pool.length > 0 ? pool : getSongsByCategory(category);
  if (list.length === 0) return null;
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

export function getCoverUrl(song) {
  if (song?.cover && song.cover !== "/covers/default.svg") {
    return song.cover;
  }
  if (song?.youtubeId) {
    return `https://i.ytimg.com/vi/${song.youtubeId}/hqdefault.jpg`;
  }
  return "/covers/default.svg";
}

export default songs;
