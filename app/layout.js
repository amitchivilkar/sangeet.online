import { Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://sangeet.online";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sangeet Online — आज काय ऐकायचे?",
  description:
    "मराठी संगीत ऐकण्यासाठी एक साधा, सुंदर आणि curated digital experience.",
  applicationName: "Sangeet Online",
  keywords: [
    "Marathi music",
    "Sangeet Online",
    "मराठी संगीत",
    "mood radio",
    "गणपती",
    "भावगीत",
    "नाट्यसंगीत",
    "sangeet.online",
  ],
  authors: [{ name: "Sangeet Online" }],
  openGraph: {
    type: "website",
    locale: "mr_IN",
    url: siteUrl,
    siteName: "Sangeet Online",
    title: "Sangeet Online — आज काय ऐकायचे?",
    description:
      "मराठी संगीत ऐकण्यासाठी एक साधा, सुंदर आणि curated digital experience.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sangeet Online — आज काय ऐकायचे?",
    description:
      "मराठी संगीत ऐकण्यासाठी एक साधा, सुंदर आणि curated digital experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#f7f4ef",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="mr" className={`${notoDevanagari.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
