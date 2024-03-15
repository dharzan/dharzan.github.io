import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dharsan Guruparan",
  description: "Project Portfolio",
  icons: {
    icon: './images/dharzan.png',
    shortcut: './images/dharzan.png',
    apple: './images/dharzan.png',
    other: {
      rel: './images/dharzan.png',
      url: './images/dharzan.png',
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
