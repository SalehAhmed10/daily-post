import React from "react";

import { Button } from "../ui/button";
import Link from "next/link";
import { TCategory } from "@/types/types";
import Container from "../ui/container";

const getCategories = async (): Promise<TCategory[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAPP_URL}/api/categories`);
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
  console.log(categories);

  // const sortedCategories = categories?.sort((a, b) => {
  //   return b.posts.length - a.posts.length;
  // });

  return (
    <Container>
      <div className="flex flex-row gap-3 md:flex-wrap my-5 px-2 md:px-0">
        {categories?.map((category) => (
          <Button
            size={"default"}
            variant={"secondary"}
            asChild
            key={category.id}
            className="min-w-fit group"
          >
            <Link
              href={`/categories/${category.categoryName}`}
              className="flex gap-2 items-center"
            >
              <span
                // number of posts in each category badge tailwindcss
                className="flex justify-center items-center bg-accent-foreground text-background text-xs font-bold h-[20px] w-[20px] rounded-full "
              >
                {category?.posts?.length}
              </span>{" "}
              {category.categoryName}
            </Link>
          </Button>
        ))}
      </div>
    </Container>
  );
}
