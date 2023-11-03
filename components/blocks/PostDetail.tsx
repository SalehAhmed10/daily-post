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

  // console.log(post);

  return (
    <>
      <div className="p-4 flex-1 flex flex-col py-5 ">
        <div className="post-hero overflow-hidden">
          <Image
            src={imageUrl ? imageUrl : NoThumbnail}
            alt="Blog image"
            className="w-full h-96 object-cover rounded-md hover:scale-105 transition duration-500 ease-in-out transform hover:shadow-2xl"
            height={1000}
            style={{
              aspectRatio: "500/300",
              objectFit: "cover",
            }}
            width={1000}
          />
        </div>

        <div className="flex flex-col pt-5 gap-5 ">
          <div className="title ">
            <h1 className="text-2xl font-semibold text-justify  ">{title}</h1>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center space-x-2 text-sm ">
              <span aria-hidden="true">&middot;</span>
              <time dateTime={createdAt}>
                {new Date(createdAt).toLocaleDateString()}
              </time>
            </div>

            <div className="flex items-center gap-1">
              <Image
                src={author?.image}
                alt={author.name}
                width={100}
                height={100}
                className="w-8 h-8 rounded-full"
              />

              <p>{author?.name}</p>
            </div>
          </div>
        </div>

        {/* <div className="flex items-center space-x-2 text-sm text-gray-500">
          <p>{author?.email}</p>
          <span aria-hidden="true">&middot;</span>
          <time dateTime={createdAt}>
            {new Date(createdAt).toLocaleDateString()}
          </time>
        </div> */}

        <div className="flex-1 my-5">
          <p className="text-gray-600 dark:text-gray-400">{content}</p>
        </div>
      </div>
    </>
  );
};
