"use client";

import Link from "next/link";
import Container from "./ui/container";
import { Button } from "./ui/button";
import { Menu, Moon, Sun } from "lucide-react";
import ProfileButton from "./ui/ProfileButton";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useEffect, useState } from "react";

const routes = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/blog",
    label: "Blog",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

export default function Header() {
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) {
  //   return null;
  // }

  // wait for theme to be loaded before rendering the header to avoid flash of light theme on dark theme
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <header className="sm:flex sm:justify-between py-3 px-4 border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-[8vh] items-center justify-between w-full">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 w-6 md:hidden" />
              </SheetTrigger>
              <SheetContent side={"left"} className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 ">
                  {routes.map((route, i) => (
                    <Link
                      href={route.href}
                      className="block px-2 py-1 text-lg "
                      key={i}
                    >
                      {route.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href={`/`} className="ml-4 lg:ml-0">
              <h1 className="text-xl font-bold">Daily Post</h1>
            </Link>
          </div>
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block">
            {routes.map((route, i) => (
              <Button asChild variant={"ghost"} key={i}>
                <Link
                  href={route.href}
                  className="text-sm font-medium transition-colors"
                >
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="flex items-center">
            {/* Avatar from shadcn on clicking avatar show menu */}
            {/* <Button
              variant={"ghost"}
              size={"icon"}
              className="mr-2"
              aria-label="Menu"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button> */}

            {/* Theme Toggle */}
            <Button
              variant={"ghost"}
              size={"icon"}
              className="mr-2"
              aria-label="Menu"
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
            >
              <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100" />
              <span className="sr-only">Menu</span>
            </Button>
            <ProfileButton />
          </div>
        </div>
      </Container>
    </header>
  );
}
