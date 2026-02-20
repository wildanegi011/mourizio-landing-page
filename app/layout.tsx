import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premium Portfolio | Designer & Developer",
  description: "A high-end, immersive digital experience showcasing creative works.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${montserrat.variable} antialiased selection:bg-accent selection:text-black`}
      >
        <div className="fixed inset-0 pointer-events-none bg-noise z-9998" />
        {children}
      </body>
    </html>
  );
}
