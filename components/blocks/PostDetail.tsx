"use client";

import { TPost } from "@/types/types";
import Image from "next/image";

import { Button } from "../ui/button";
import { MdEditNote } from "react-icons/md";
import NoThumbnail from "@/public/no-thumbnail.webp";

import Link from "next/link";

// import MDEditor from "@uiw/react-md-editor";

import Container from "../ui/container";
import DeleteButton from "./DeleteButton";
import { useSession } from "next-auth/react";

import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import MarkdownPreview from "@uiw/react-markdown-preview";
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

  // const { theme, setTheme } = useTheme();

  // if (theme === "dark") {
  //   document.documentElement.setAttribute("data-color-mode", "dark");
  // }
  // if (theme === "light") {
  //   document.documentElement.setAttribute("data-color-mode", "light");
  // }

  const { data: session, status } = useSession();

  const isAuthor = session?.user?.email === authorEmail;

  // console.log(session?.user?.email);

  return (
    <>
      <div className="p-4 flex-1 flex flex-col py-5 ">
        <div className="post-hero overflow-hidden rounded-lg">
          <Image
            src={imageUrl ? imageUrl : NoThumbnail}
            alt="Blog image"
            className="w-full h-[500px] rounded-lg hover:scale-105 transition duration-500 ease-in-out transform hover:shadow-2xl "
            height={1000}
            style={{
              aspectRatio: "16/9",
              objectFit: "cover",
            }}
            width={1000}
          />
        </div>
        <Container>
          <div className="flex flex-col pt-5 gap-5 ">
            <div className="title ">
              <h1 className="text-2xl font-semibold text-justify ">{title}</h1>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center space-x-2 text-sm ">
                <span aria-hidden="true">-</span>
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
            {isAuthor && (
              <div className="flex gap-2">
                <Button size="default" variant="default" className="" asChild>
                  <Link
                    href={`/edit-post/${post.id}`}
                    tabIndex={-1}
                    className="flex items-center "
                  >
                    <span className="text-2xl">
                      <MdEditNote />
                    </span>
                    Edit Post
                    <span className="sr-only">Edit Post</span>
                  </Link>
                </Button>

                <DeleteButton id={post.id} btnVariant={"destructive"} />
              </div>
            )}

            <hr className="border-gray-300 dark:border-gray-600" />
          </div>

          {/* <div className="flex items-center space-x-2 text-sm text-gray-500">
          <p>{author?.email}</p>
          <span aria-hidden="true">&middot;</span>
          <time dateTime={createdAt}>
            {new Date(createdAt).toLocaleDateString()}
          </time>
        </div> */}
          {/* 
        <div className="flex-1 my-5">
          <p className="text-gray-600 dark:text-gray-400">{content}</p>
        </div> */}

          <MarkdownPreview
            source={content}
            style={{ whiteSpace: "normal" }}
            className="px-0 md:px-5 py-5 "
            components={{
              // add blank target to all links
              a({ node, ...props }) {
                return (
                  <a {...props} target="_blank" rel="noopener noreferrer" />
                );
              },
            }}
          />
          {/* <Markdown>{content}</Markdown> */}
          {/* links exists or null */}
          {links && links.length > 0 ? (
            <div className="flex flex-col gap-2 mt-5">
              <h3 className="text-xl font-semibold">Links</h3>
              <ul className="flex flex-col gap-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>
              <span className="text-gray-600 dark:text-gray-400">
                No links added
              </span>
            </p>
          )}
        </Container>
      </div>
    </>
  );
};
