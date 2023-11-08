"use client";

import { TCategory } from "@/types/types";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";

import { useEffect, useState } from "react";

// export default async function CategoriesBtn({
export default function CategoriesBtn({ category }: { category: TCategory }) {
  // keep track of categories post length and update ui when new post is added to a category
  // const [postsLength, setPostsLength] = useState(category.posts.length);

  // useEffect(() => {
  //   setPostsLength(category.posts.length);
  // }, [category.posts.length]);
  const router = usePathname();
  // console.log(router);

  const currentCategory = decodeURI(router?.split("/")[2]);
  // console.log(currentCategory);

  const { toast } = useToast();

  // state to keep track of current category count
  const [categoryCount, setCategoryCount] = useState(category._count.posts);

  // useEffect to update category count when new post is added to a category
  useEffect(() => {
    setCategoryCount(category._count.posts);
  }, [category._count.posts]);

  const checkActive = (category: TCategory) => {
    if (category.categorySlug === currentCategory) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Button
      size={"default"}
      variant={"outline"}
      asChild
      key={category.id}
      //   className={cn(`min-w-fit group` && checkActive(category) && "bg-red-500")}
      className={cn(
        `min-w-fit group shadow-sm hover:shadow-lg hover:bg-secondary
        ${checkActive(category) ? "bg-secondary" : ""}
        
        `
      )}
      onClick={() => {
        toast({
          title: `Category: ${category?.categoryName} `,
          description: `Number of posts: ${categoryCount}`,
          className: "bg-blue-500 text-white",
        });
      }}
    >
      <Link
        href={`/categories/${category.categorySlug}`}
        className={cn(
          `flex gap-2 items-center`

          // check what getegory is active
        )}
      >
        {/* <span
          // number of posts in each category badge tailwindcss
          className="flex justify-center items-center bg-accent-foreground text-background text-xs font-bold h-[20px] w-[20px] rounded-full "
        >
          {category?.posts?.length}
        </span> */}
        <span
          // number of posts in each category badge tailwindcss
          className="flex justify-center items-center bg-accent-foreground text-background text-xs font-bold h-[20px] w-[20px] rounded-full "
        >
          {categoryCount}
        </span>
        {category.categoryName}
      </Link>
    </Button>
  );
}
