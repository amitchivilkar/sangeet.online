export default function manifest() {
  return {
    id: "https://sangeet.online/",
    name: "Sangeet Online",
    short_name: "Sangeet",
    description:
      "मराठी संगीत ऐकण्यासाठी एक साधा, सुंदर आणि curated digital experience.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#2A1248",
    theme_color: "#2A1248",
    lang: "mr",
    categories: ["music", "entertainment"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
