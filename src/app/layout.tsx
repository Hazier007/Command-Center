import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { BottomNav } from "@/components/bottom-nav";
import { QuickCapture } from "@/components/quick-capture";
import { CommandSearch } from "@/components/command-search";
import { AppShell } from "@/components/app-shell";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Command Center",
  description: "Bart's business command center for assets, projects, pipeline, team, and operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Navigation />
          <AppShell>
            {children}
          </AppShell>
          <BottomNav />
          <QuickCapture />
          <CommandSearch />
        </SessionProvider>
      </body>
    </html>
  );
}
