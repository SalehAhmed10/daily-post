import React from "react";

import { TCategory } from "@/types/types";
import Container from "../ui/container";

import CategoriesBtn from "./CategoriesBtn";

const getCategories = async (): Promise<TCategory[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAPP_URL}/api/categories`, {
      cache: "no-store",
    });
    if (res.ok) {
      const categories = await res.json();
      return categories;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default async function CategoriesList() {
  const categories = await getCategories();
  // console.log(categories);

  // const sortedCategories = categories?.sort((a, b) => {
  //   return b.posts.length - a.posts.length;
  // });

  return (
    <Container>
      <div className="flex flex-row gap-3 md:flex-wrap my-5 px-5 md:px-0 ">
        {categories?.map((category) => {
          return <CategoriesBtn key={category.id} category={category} />;
        })}
        {/* 
           <Button
            size={"default"}
            variant={"secondary"}
            asChild
            key={category.id}
            className="min-w-fit group"
          >
            <Link
              href={`/categories/${category.categoryName}`}
              className={cn(
                "flex gap-2 items-center"
                // check what getegory is active
              )}
            >
              <span
                // number of posts in each category badge tailwindcss
                className="flex justify-center items-center bg-accent-foreground text-background text-xs font-bold h-[20px] w-[20px] rounded-full "
              >
                {category?.posts?.length}
              </span>{" "}
              {category.categoryName}
            </Link>
          </Button> */}
      </div>
    </Container>
  );
}
