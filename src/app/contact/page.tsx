import type { Metadata } from "next";
import Contact from "@/sections/Contact";

export const metadata: Metadata = {
  title: "Contact — thisislohit",
  description: "Get in touch — email, phone, GitHub, LinkedIn.",
};

export default function ContactPage() {
  return <Contact />;
}
