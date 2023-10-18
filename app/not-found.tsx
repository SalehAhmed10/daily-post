import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function NotFound() {
  return (
    <div className="global grid place-content-center min-h-[88vh]">
      <div className="flex flex-col items-center gap-y-2">
        <h1 className="text-2xl font-bold">Not Found</h1>
        <p>Could not find requested resource</p>
        <Button asChild size={"default"}>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
