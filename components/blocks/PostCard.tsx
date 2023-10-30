// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardImage,
//   CardTitle,
// } from "../ui/card";
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
// import { cx } from "@/utils/all";
import { cn } from "@/lib/utils";

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
    <div className="flex flex-col relative group overflow-hidden bg-[#F5F5F5] shadow-sm rounded-md dark:bg-zinc-800 h-full ">
      <Image
        alt="Blog image"
        src={post.imageUrl ? post.imageUrl : NoThumbnail}
        className="w-full h-48 object-cover"
        height={300}
        style={{
          aspectRatio: "500/300",
          objectFit: "cover",
        }}
        width={500}
      />
      <div className="p-4 flex-1 flex flex-col">
        {post.title && (
          <h2 className="font-semibold text-xl line-clamp-2 mb-2">
            {post.title}
          </h2>
        )}

        {post.content && (
          <p className="flex-grow line-clamp-3 mb-4 text-gray-500 dark:text-gray-400">
            {post.content}
          </p>
        )}

        {post.id && (
          <Button
            size={"sm"}
            variant={"outline"}
            className="border border-primary/30 group-focus:border-primary/80"
            asChild
          >
            <Link href={`/posts/${post.id}`}> Read Post Here</Link>
          </Button>
        )}

        <div className="flex justify-between items-end mt-auto pt-4  border-zinc-200 dark:border-zinc-700">
          <Link href={`/categories/${post.category.categorySlug}`}>
            <span className="text-sm text-gray-500 dark:text-gray-400  group-hover:underline ">
              {post.categoryName}
            </span>
          </Link>
          {/* <span className="text-sm text-zinc-500 dark:text-zinc-400">
            Author Name
          </span> */}
          <div className="flex items-center gap-1">
            <Image
              src={post.author.image}
              alt={post.author.name}
              className="rounded-full object-cover transition-all duration-300 group-hover:scale-110"
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
      </div>
      {isEditable && (
        <div className="absolute top-0 right-0 p-2 transition-transform transform group-hover:translate-x-0 translate-x-full">
          <Button size="icon" variant="default" className="text-3xl" asChild>
            <Link href={`/edit-post/${post.id}`} tabIndex={-1}>
              <MdEditNote />
              <span className="sr-only">Edit Post</span>
            </Link>
          </Button>
        </div>
      )}
    </div>
    // <Card
    //   className={cn(
    //     `border-2 overflow-hidden  hover:bg-accent transition duration-300 outline-0 focus:ring-2 hover:ring-2 ring-primary group flex flex-col`
    //     // isEditable === null && "cursor-not-allowed"
    //   )}
    // >
    //   <CardImage className="max-h-60 overflow-hidden">
    //     <Image
    //       src={post.imageUrl ? post.imageUrl : NoThumbnail}
    //       alt={post.title}
    //       className="aspect-video object-cover  transition-all duration-300 hover:scale-105"
    //       width={1000}
    //       height={1000}
    //       priority={true}
    //     />
    //   </CardImage>

    //   <div className="flex flex-col  h-[200px]">
    //     <CardHeader className="py-2">
    //       {post.title && (
    //         <CardTitle className="text-lg line-clamp-2 font-normal ">
    //           {post.title}
    //         </CardTitle>
    //       )}
    //     </CardHeader>
    //     <CardContent className="flex flex-col justify-between h-full ">
    //       {post.content && (
    //         <p className="text-sm  line-clamp-3 text-gray-500 whitespace-pre-line dark:text-gray-400  letter-spacing-[0.2px]">
    //           {/* {post.content.slice(0, 120) + "..."} */}
    //           {post.content}
    //         </p>
    //       )}
    //       <div className="flex justify-between items-end w-full py-1">
    //         <Button
    //           size={"sm"}
    //           variant={"outline"}
    //           className="border group-hover:border-primary/80 group-focus:border-primary/80"
    //         >
    //           <Link href={`/posts/${post.id}`}> Read More</Link>
    //         </Button>

    //         {isEditable && (
    //           <div className=" rounded-md bg-secondary-foreground text-secondary transform translate-x-[82%]  hover:translate-x-[20%]  transition-all duration-300">
    //             <div className="flex items-center w-[140px] h-[30px] ">
    //               <span className="flex items-center justify-center text-[24px] text-center w-[38px] ">
    //                 <MdEditNote />
    //               </span>
    //               <Link href={`/edit-post/${post.id}`} tabIndex={-1}>
    //                 {" "}
    //                 | edit post
    //               </Link>
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     </CardContent>
    //     {/* <CardContent className="flex flex-col justify-between h-full ">
    //       {post.content && (
    //         <p className="text-sm font-light ">
    //           {post.content.slice(0, 120) + "..."}
    //         </p>
    //       )}
    //       <div className="flex justify-between items-end w-full pb-2">
    //         <Button
    //           size={"sm"}
    //           variant={"outline"}
    //           className="border group-hover:border-primary/80 group-focus:border-primary/80"
    //         >
    //           <Link href={`/posts/${post.id}`}> Read More</Link>
    //         </Button>

    //         {isEditable && (
    //           <div className=" rounded-md bg-secondary-foreground text-secondary transform translate-x-[82%]  hover:translate-x-[20%]  transition-all duration-300">
    //             <div className="flex items-center w-[140px] h-[30px] ">
    //               <span className="flex items-center justify-center text-[24px] text-center w-[38px] ">
    //                 <MdEditNote />
    //               </span>
    //               <Link href={`/edit-post/${post.id}`}> | edit post</Link>
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     </CardContent> */}
    //   </div>
    //   <CardFooter className="flex-col items-start ">
    //     {/* FOOTER CONTENT */}
    //     <hr className="w-full border-primary/20 " />

    //     {post.categoryName && post.author && (
    //       <div className="flex w-full justify-between pt-2">
    //         <div className="flex justify-end items-center text-primary/80">
    //           {post.categoryName && (
    //             <Button size={"sm"} variant={"link"} asChild>
    //               <Link href={`/categories/${post.categoryName}`}>
    //                 {post.categoryName}
    //               </Link>
    //             </Button>
    //           )}
    //         </div>
    //         <div className="flex items-center gap-1">
    //           <Image
    //             src={post.author.image}
    //             alt={post.author.name}
    //             className="rounded-full object-cover transition-all duration-300 hover:scale-105"
    //             width={20}
    //             height={20}
    //           />
    //           {/* keep author name maximum 12 letter length show rest as ... and add tooltip */}
    //           <TooltipProvider>
    //             <Tooltip>
    //               <TooltipTrigger>
    //                 <p className="text-xs font-light ">
    //                   {post.author.name.length > 12
    //                     ? post.author.name.slice(0, 12) + "..."
    //                     : post.author.name}
    //                 </p>
    //               </TooltipTrigger>
    //               <TooltipContent>{post.author.name}</TooltipContent>
    //             </Tooltip>
    //           </TooltipProvider>
    //         </div>
    //       </div>
    //     )}
    //   </CardFooter>
    // </Card>
  );
}
