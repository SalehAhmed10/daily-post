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
import { cn } from "@/lib/utils";
import Image from "next/image";

import DarkLogo from "@/public/assets/logob.png";
import LightLogo from "@/public/assets/logow.png";

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
  const [isScrolled, setIsScrolled] = useState(false);

  // if theme is dark then show black logo else show white logo
  const { theme, setTheme } = useTheme();
  // console.log(theme);
  // let logo = "";
  // if (theme === "dark") {
  //   logo = "/assets/logow.png";
  // } else {
  //   logo = "/assets/logob.png";
  // }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    //     `sm:flex sm:justify-between py-3   h-[90px]  flex items-center sticky top-0 z-50 backdrop-filter backdrop-blur-lg bg-opacity-60 dark:bg-opacity-60 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100
    //     transition-all duration-300 ease-in-out ${
    //       isScrolled
    //         ? "bg-background/50 dark:bg-background-dark/50 shadow-md"
    //         : "bg-transparent dark:bg-transparent"
    //     }
    // `
    <header
      className={cn(
        `
       sm:flex sm:justify-between py-3   h-[90px]  flex items-center sticky top-0 z-50 backdrop-filter backdrop-blur-lg  
        ${
          isScrolled
            ? "bg-background/50 dark:bg-background-dark/50 shadow-md"
            : "bg-transparent dark:bg-transparent"
        }`
      )}
    >
      <Container>
        <div className="relative px-4   flex  items-center justify-between w-full">
          <div className="flex items-center">
            <Link href={`/`} className="flex items-center">
              <div className="w-[100px] h-[50px] ">
                <Image
                  src={DarkLogo}
                  alt="Logo"
                  width={100}
                  height={100}
                  className="dark:hidden h-auto w-auto logo"
                />
                <Image
                  src={LightLogo}
                  alt="Logo"
                  width={100}
                  height={100}
                  className="hidden dark:block h-auto w-auto logo"
                />
              </div>

              {/* <h1 className="text-xl font-bold">Daily Post</h1> */}
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
              <Button
                variant={"outline"}
                size={"sm"}
                asChild
                className="hidden md:flex"
              >
                <Link href={`/auth/signin`}>Sign In</Link>
              </Button>
            )}

            <Sheet>
              <SheetTrigger>
                <BiMenu className="h-6 w-6 md:hidden" />
              </SheetTrigger>
              <SheetContent side={"left"} className="w-[300px] sm:w-[400px] ">
                <div className="flex flex-col gap-4 pt-2 h-[100%]">
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

                  <div className="h-[100%] flex flex-col justify-end ">
                    <div className="flex justify-between items-center gap-2">
                      {status === "authenticated" && <ProfileButton />}
                      {status === "unauthenticated" && (
                        <Button
                          variant={"outline"}
                          size={"lg"}
                          asChild
                          className="w-full"
                        >
                          <Link href={`/auth/signin`}>Sign In</Link>
                        </Button>
                      )}
                      <Button
                        variant={"secondary"}
                        size={"sm"}
                        className=" items-center h-[100%]   md:hidden"
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
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}
