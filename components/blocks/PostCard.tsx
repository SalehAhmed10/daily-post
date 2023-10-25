import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import image404 from "@/public/image-404.jpg";
import NoThumbnail from "@/public/no-thumbnail.webp";
import { TPost } from "@/types/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "../ui/button";

//Promise<TPost[] | null>

export const getSession = async () => {
  try {
    const session = await getServerSession(authOptions);
    return session;
  } catch (error) {
    throw new Error("Failed to get session");
  }
};

export default async function PostCard({ post }: { post: TPost }) {
  // const PostCard = async ({ post }: { post: TPost }) => {
  const session = await getSession();
  console.log(session);

  const isEditor = session && session.user?.email === post.author.email;

  return (
    <Link
      href={`/posts/${post.id}`}
      className="transition duration-300 rounded-lg h-fit "
    >
      <Card className=" border-2  hover:bg-primary/10 transition duration-300 outline-0 focus:ring-2 hover:ring-2 ring-primary ">
        <CardImage className="max-h-60 overflow-hidden">
          <Image
            src={post.imageUrl ? post.imageUrl : NoThumbnail}
            alt={post.title as string}
            className="aspect-video object-cover  transition-all duration-300 hover:scale-105"
            width={1000}
            height={1000}
            priority={true}
          />
        </CardImage>
        <CardHeader className="py-2">
          {post.title && (
            <CardTitle className="text-lg ">{post.title}</CardTitle>
          )}
        </CardHeader>
        <CardContent className="flex flex-col pb-2 min-h-[108px]">
          {post.content && (
            <p className="text-sm font-light ">{post.content.slice(0, 150)}</p>
          )}
        </CardContent>
        <CardFooter className="flex-col items-start pt-2">
          {/* FOOTER CONTENT */}
          <hr className="w-full border-gray-300" />

          {post.categoryName && post.author && (
            <div className="flex w-full justify-between pt-2">
              <div className="flex justify-end items-center text-primary/80">
                {post.categoryName && (
                  <Button size={"sm"} variant={"outline"}>
                    {post.categoryName}
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  className="rounded-full object-cover transition-all duration-300 hover:scale-105"
                  width={20}
                  height={20}
                />
                {/* keep author name maximum 12 letter length show rest as ... and add tooltip */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <p className="text-xs font-light ">
                        {post.author.name.length > 12
                          ? post.author.name.slice(0, 12) + "..."
                          : post.author.name}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>{post.author.name}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
