import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Concept IO",
  description: "Learn new things everyday!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="h-[100dvh] sm:h-screen w-full bg-gradient-to-b from-[#83c5be] to-[#b2f7ef] text-white flex items-center">
          {children}
        </div>
      </body>
    </html>
  );
}
