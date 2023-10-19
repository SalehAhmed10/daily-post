import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/context/ThemeProvider";
import Header from "@/components/Header";
import { switchThemeDuration } from "@/constants/page";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daily Post",
  description: "daily post project by @SalehAhmed10",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen flex flex-col transition-colors ${switchThemeDuration}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
          <Header />
          <main className="flex-1 ">{children}</main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
