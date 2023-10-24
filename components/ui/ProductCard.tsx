import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/types/types";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    // <section className="py-10">
    <Link
      href={`/products/${product.id}`}
      className="outline-0 focus:ring-2 hover:ring-2 ring-primary transition duration-300 rounded-lg"
    >
      <Card className="rounded-lg border-2">
        <CardContent className="pt-4">
          <div className="aspect-square relative bg-foreground/5 dark:bg-background rounded-lg">
            <Image
              src={product.images?.[0]}
              alt={product.name as string}
              width={1000}
              height={1000}
              sizes="fill"
              className="aspect-square object-cover rounded-lg transition-all duration-300 hover:scale-105"
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start">
          <div>
            <p className="font-semibold text-lg">{product.name}</p>
            <p className="text-sm text-primary/80">{product.category}</p>
          </div>
          <div className="flex items-center justify-between">
            {product?.price}
          </div>
        </CardFooter>
      </Card>
    </Link>
    // </section>
  );
};

export default ProductCard;
