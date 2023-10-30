import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "Page Not Found",
};

export default function NotFoundCatchAll() {
  notFound();
}
