"use client";

// post detail with breadcrumb and edit button

import { Fragment } from "react";

import { TPost } from "@/types/types";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { MdEditNote } from "react-icons/md";
import NoThumbnail from "@/public/no-thumbnail.webp";
import { useRouter } from "next/navigation";

interface PostDetailProps {
  post: TPost;
}
export const PostDetail = ({ post }: PostDetailProps) => {
  const {
    title,
    content,
    imageUrl,
    author,
    createdAt,
    updatedAt,
    authorEmail,
    category,
    categoryName,
    links,
  } = post;

  console.log(post);

  return (
    <>
      <Image
        src={imageUrl ? imageUrl : NoThumbnail}
        alt="Blog image"
        className="w-full h-96 object-cover rounded-md"
        height={1000}
        style={{
          aspectRatio: "500/300",
          objectFit: "cover",
        }}
        width={1000}
      />

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h1>

          <div className="flex items-center gap-1">
            <Image
              src={author?.image}
              alt={author?.name}
              className="rounded-full object-cover transition-all duration-300 group-hover:scale-110"
              width={20}
              height={20}
            />
            <p className="text-xs font-light ">
              {author?.name.length > 12
                ? author?.name.slice(0, 12) + "..."
                : author?.name}
            </p>
            {/* keep author name maximum 12 letter length show rest as ... and add tooltip */}
          </div>
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger> */}
          {/* <p className="text-xs font-light ">
                  {post.author.name.length > 12
                    ? post.author.name.slice(0, 12) + "..."
                    : post.author.name}
                </p> */}
          {/* {post.authorEmail}
              </TooltipTrigger>
              <TooltipContent>{post.authorEmail}</TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <p>{author?.email}</p>
          <span aria-hidden="true">&middot;</span>
          <time dateTime={createdAt}>
            {new Date(createdAt).toLocaleDateString()}
          </time>
        </div>
        <div className="flex-1 mt-2">
          <p className="text-gray-600 dark:text-gray-400">{content}</p>
        </div>
        <div className="flex items-center justify-between mt-4"></div>
      </div>
    </>
  );
};
