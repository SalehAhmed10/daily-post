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

  return (
    <Container>
      <div className="flex flex-row gap-3 md:flex-wrap my-5">
        {categories &&
          categories.map((category) => (
            <Button
              size={"default"}
              variant={"secondary"}
              asChild
              key={category.id}
              className="min-w-fit"
            >
              <Link href={`/categories/${category.categoryName}`}>
                {category.categoryName}
              </Link>
            </Button>
          ))}
      </div>
    </Container>
  );
}
