"use client";

import Link from "next/link";
import Container from "./ui/container";
import { Button } from "./ui/button";
import { BiMoon, BiSun, BiMenu } from "react-icons/bi";
import ProfileButton from "./ui/ProfileButton";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const routes = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

export default function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // wait for theme to be loaded before rendering the header to avoid flash of light theme on dark theme
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <header className="sm:flex sm:justify-between py-3  border-b h-[90px]  flex items-center">
      <Container>
        <div className="relative px-4   flex  items-center justify-between w-full">
          <div className="flex items-center">
            {/* <Sheet>
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
            </Sheet> */}
            <Link href={`/`} className="">
              <h1 className="text-xl font-bold">Daily Post</h1>
            </Link>
          </div>
          <nav className="mx-6 md:flex items-center space-x-4 lg:space-x-6 hidden ">
            {routes.map((route, i) => (
              <Button asChild variant={"ghost"} key={i}>
                <Link
                  href={route.href}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-primary/80 active:text-primary/80 ${
                    pathname === route.href
                      ? "text-primary  outline outline-1  "
                      : ""
                  } `}
                >
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="flex items-center">
            {/* Theme Toggle */}
            <Button
              variant={"ghost"}
              size={"icon"}
              className="mr-2 hidden md:flex"
              aria-label="Menu"
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
            >
              {/* <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /> */}
              <BiMoon className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

              <BiSun className="h-6 w-6 absolute rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100" />
              <span className="sr-only">Menu</span>
            </Button>

            {status === "authenticated" && (
              <div className="hidden md:block">
                <ProfileButton />
              </div>
            )}

            {status === "unauthenticated" && (
              <Button variant={"outline"} size={"sm"} asChild>
                <Link href={`/signin`}>Sign In</Link>
              </Button>
            )}

            <Sheet>
              <SheetTrigger>
                <BiMenu className="h-6 w-6 md:hidden" />
              </SheetTrigger>
              <SheetContent side={"left"} className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 pt-7">
                  {routes.map((route, i) => (
                    <Link
                      href={route.href}
                      // className="block px-2 py-1 text-lg "
                      className={`block px-2 py-1 text-lg font-medium transition-colors duration-200 hover:text-primary/80 active:text-primary/80 ${
                        pathname === route.href
                          ? "text-primary  outline outline-1  "
                          : ""
                      } `}
                      key={i}
                    >
                      {route.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}
