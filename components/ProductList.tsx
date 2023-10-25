import { Product } from "@/types/types";
import ProductCard from "./ui/ProductCard";
import Container from "./ui/container";
import CategoriesList from "./blocks/CategoriesList";

interface ProductListProps {
  items: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ items }) => {
  return (
    <Container>
      <div className="space-y-4 my-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {items.map((item) => (
            <ProductCard product={item} key={item.id} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ProductList;
