import ProductList from "@/components/ProductList";

export default function Home() {
  const products = [
    {
      id: "1",
      category: "Camera",
      name: "Sony FX3",
      price: "$3,999.00",
      // random un
      images: ["https://source.unsplash.com/random/1920x1080.png"],
    },
    {
      id: "2",
      category: "Camera",
      name: "Sony A7S III",
      price: "$3,499.00",
      // random un
      images: ["https://source.unsplash.com/random/1920x1080.png"],
    },
    {
      id: "3",
      category: "Camera",
      name: "Sony A7C",
      price: "$1,599.00",
      // random un
      images: ["https://source.unsplash.com/random/1920x1080.png"],
    },
    {
      id: "4",
      category: "Camera",
      name: "Sony A7 IV",
      price: "$2,399.00",
      // random un
      images: ["https://source.unsplash.com/random/1920x1080.png"],
    },
    {
      id: "5",
      category: "Camera",
      name: "Sony A7R III",
      price: "$2,499.00",
      // random un
      images: ["https://source.unsplash.com/random/1920x1080.png"],
    },
    {
      id: "6",
      category: "Camera",
      name: "Sony A7R V",
      price: "$3,899.00",
      // random un
      images: ["https://source.unsplash.com/random/1920x1080.png"],
    },
    {
      id: "7",
      category: "Camera",
      name: "Sony A6700",
      price: "$1,799.00",
      // random un
      images: ["https://source.unsplash.com/random/1920x1080.png"],
    },
    {
      id: "8",
      category: "Camera",
      name: "Sony AZV-E10",
      price: "$699.00",
      // random un
      images: ["https://source.unsplash.com/random/1920x1080.png"],
    },
  ];

  return (
    // <main className="grid place-items-center h-screen">
    <div className="space-y-10 pb-10 ">
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <ProductList items={products} />
      </div>
    </div>
  );
}
