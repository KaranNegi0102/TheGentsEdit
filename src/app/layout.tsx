import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/app/redux/Provider"
import InitAuth from "./redux/InitAuth";
import InitProducts from "./redux/InitProducts";
import { Toaster } from "react-hot-toast";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Gents Edit",
  description: "Gents Wardrobe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <InitAuth>
            <InitProducts>
              <Toaster />
                {children}
            </InitProducts>
          </InitAuth>
        </Provider>
      </body>
    </html>
  );
}
