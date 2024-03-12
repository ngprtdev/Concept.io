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
        {/* Color panel: 83c5be(turquoise) 219ebc(light blue)  */}
        <div className="h-[100dvh] sm:h-screen w-full bg-gradient-to-b from-[#219ebc] to-[#b2f7ef] text-white flex items-center max-sm:overflow-y-scroll">
          {children}
        </div>
      </body>
    </html>
  );
}
