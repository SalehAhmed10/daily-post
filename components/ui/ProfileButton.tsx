import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function ProfileButton() {
  const { data: session, status } = useSession();
  const productionUrlRedirect = "https://daily-post-app.vercel.app/auth/signin";
  const developmentUrlRedirect = "http://localhost:3000/auth/signin";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={session?.user?.image as string}
            alt={session?.user?.name as string}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
        <Link href="/create-post">
          <DropdownMenuItem className="cursor-pointer">
            Create Post
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() =>
            signOut({
              callbackUrl:
                process.env.NODE_ENV === "production"
                  ? `${productionUrlRedirect}`
                  : `${developmentUrlRedirect}`,
            })
          }
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
