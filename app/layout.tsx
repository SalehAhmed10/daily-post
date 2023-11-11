import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/context/ThemeProvider";
import Header from "@/components/Header";
import { switchThemeDuration } from "@/constants/page";
import Footer from "@/components/Footer";
import { NextAuthProvider } from "../components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: `Daily Post`,
    template: `%s | Daily Post`,
  },
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
        // className={`${inter.className} min-h-screen flex flex-col transition-colors ${switchThemeDuration}`}

        className={`${inter.className} min-h-screen flex flex-col `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
          <NextAuthProvider>
            <Header />
            <main className="flex-1 relative">
              <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272A_1px,transparent_1px)] [background-size:24px_24px]"></div>
              {/* <div className="absolute inset-0 -z-10 h-full w-full bg-[size:6rem_4rem] bg-background bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] dark:bg-background dark:bg-[linear-gradient(to_right,#27272A_1px,transparent_1px),linear-gradient(to_bottom,#27272A_1px,transparent_1px)]"></div> */}
              {children}
            </main>
            <Toaster />

            <Footer />
          </NextAuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
