import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function NotFound() {
  return (
    <div className="main-tag flex flex-col gap-3 justify-center items-center">
      <h1 className="text-2xl font-bold">Not Found</h1>
      <p>Could not find requested resource</p>
      <Button asChild size={"default"}>
        <Link href="/">Return Home</Link>
      </Button>
    </div>

    // <>
    //   <div className="main-tag flex justify-center items-center">
    //     <h1>Not Found</h1>
    //   </div>
    // </>
  );
}
