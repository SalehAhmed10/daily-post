import { Button } from "@/components/ui/button";

import Link from "next/link";
import { notFound } from "next/navigation";

export default function NotFound() {
  return (
    <div className="main-tag flex flex-col gap-3 justify-center items-center">
      <h1 className="text-2xl font-bold">Not Found</h1>
      <p>Could not find requested resource</p>
      <Button
        size={"default"}
        className="filter grayscale backdrop-filter backdrop-blur-sm"
        asChild
      >
        <Link href={"/"}>Return to Home</Link>
      </Button>
    </div>

    // <>
    //   <div className="main-tag flex justify-center items-center">
    //     <h1>Not Found</h1>
    //   </div>
    // </>
  );
}
