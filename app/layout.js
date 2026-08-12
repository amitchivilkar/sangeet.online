import { Arya, Noto_Sans_Devanagari } from "next/font/google";
import PwaRegister from "@/components/PwaRegister";
import "./globals.css";

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const arya = Arya({
  variable: "--font-arya",
  subsets: ["devanagari", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

const siteUrl = "https://sangeet.online";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sangeet Online — शांत मन",
  description:
    "मराठी संगीत ऐकण्यासाठी एक साधा, सुंदर आणि curated digital experience.",
  applicationName: "Sangeet Online",
  keywords: [
    "Marathi music",
    "Sangeet Online",
    "मराठी संगीत",
    "शांत मन",
    "YouTube Music",
    "sangeet.online",
  ],
  authors: [{ name: "Sangeet Online" }],
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  appleWebApp: {
    capable: true,
    title: "Sangeet Online",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    locale: "mr_IN",
    url: siteUrl,
    siteName: "Sangeet Online",
    title: "Sangeet Online — शांत मन",
    description:
      "मराठी संगीत ऐकण्यासाठी एक साधा, सुंदर आणि curated digital experience.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sangeet Online — शांत मन",
    description:
      "मराठी संगीत ऐकण्यासाठी एक साधा, सुंदर आणि curated digital experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#2A1248",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="mr"
      className={`${notoDevanagari.variable} ${arya.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
