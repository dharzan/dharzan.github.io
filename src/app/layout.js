import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dharsan Guruparan",
  description: "Project Portfolio",
  icons: {
    icon: './images/dharzan2.png',
    shortcut: './images/dharzan2.png',
    apple: './images/dharzan2.png',
    other: {
      rel: './images/dharzan2.png',
      url: './images/dharzan2.png',
    },
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
