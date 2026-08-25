import type { Metadata } from "next";
import About from "@/sections/About";

export const metadata: Metadata = {
  title: "About — thisislohit",
  description: "Hyderabad-based, building payments and hospitality software that has to work.",
};

export default function AboutPage() {
  return <About />;
}
