import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dharzan-github-io.vercel.app"),
  title: {
    default: "Dharsan Guruparan | Software Engineer",
    template: "%s | Dharsan Guruparan",
  },
  description:
    "Terminal portfolio for backend, SDET, and AI-assisted engineering — built to show work, not impress bots.",
  openGraph: {
    title: "Dharsan Guruparan | Software Engineer",
    description:
      "Terminal portfolio for backend, SDET, and AI-assisted engineering.",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="min-h-screen bg-phosphor-950 font-mono text-phosphor antialiased">
        {children}
      </body>
    </html>
  );
}
