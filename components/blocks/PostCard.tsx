import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from "../ui/card";
import { MdEditNote } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

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

// export const getSession = async () => {
//   try {
//     const session = await getServerSession(authOptions);
//     return session;
//   } catch (error) {
//     throw new Error("Failed to get session");
//   }
// };

export default async function PostCard({ post }: { post: TPost }) {
  // const PostCard = async ({ post }: { post: TPost }) => {

  const session = await getServerSession(authOptions);
  console.log(session);

  const isEditable = session && session?.user?.email === post.authorEmail;

  return (
    <Card className="border-2 overflow-hidden  hover:bg-accent transition duration-300 outline-0 focus:ring-2 hover:ring-2 ring-primary ">
      <CardImage className="max-h-60 overflow-hidden">
        <Image
          src={post.imageUrl ? post.imageUrl : NoThumbnail}
          alt={post.title}
          className="aspect-video object-cover  transition-all duration-300 hover:scale-105"
          width={1000}
          height={1000}
          priority={true}
        />
      </CardImage>
      <CardHeader className="py-2">
        {post.title && <CardTitle className="text-lg ">{post.title}</CardTitle>}
      </CardHeader>
      <CardContent className="flex flex-col justify-between pb-2  min-h-[120px]">
        {post.content && (
          <p className="text-sm font-light ">
            {post.content.slice(0, 150) + "..."}
          </p>
        )}
        <div className="flex justify-between w-full">
          <Button
            size={"sm"}
            variant={"outline"}
            className="border border-primary/80"
          >
            <Link href={`/posts/${post.id}`}> Read More</Link>
          </Button>

          {isEditable && (
            <div className=" rounded-md bg-secondary-foreground text-secondary transform translate-x-[82%]  hover:translate-x-[20%]  transition-all duration-300">
              <div className="flex items-center w-[140px] h-full ">
                <span className="flex items-center justify-center text-[24px] text-center w-[38px] ">
                  <MdEditNote />
                </span>
                <Link href={`/edit-post/${post.id}`}> | Edit Post</Link>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start pt-2">
        {/* FOOTER CONTENT */}
        <hr className="w-full border-primary/80 " />

        {post.categoryName && post.author && (
          <div className="flex w-full justify-between pt-2">
            <div className="flex justify-end items-center text-primary/80">
              {post.categoryName && (
                <Button size={"sm"} variant={"link"}>
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
  );
}
