"use client";
import { AuthProvider } from "@/context/AuthContext";
import Sidebar from "@/ui/Sidebar";

import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/global/Navbar";
import { ProfileProvider } from "@/context/ProfileContext";
import { GlobalProvider } from "@/context/GlobalContext";
import { usePathname } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex w-screen`}
      >
        <GlobalProvider>
          <AuthProvider>
            <ProfileProvider>
              <div className="flex w-full h-full">
                <Sidebar />
                <div className="content-container flex flex-col w-full h-full">
                  <Navbar />

                  {children}
                </div>
              </div>
            </ProfileProvider>
          </AuthProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
