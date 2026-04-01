import type { Metadata } from "next";
import { BlogContent } from "@/components/blog-content";

export const metadata: Metadata = {
  title: "Journal — Activewear Guides & Brand Comparisons | The Active Collection",
  description:
    "In-depth activewear brand comparisons, honest reviews, and guides to help you find the gear that actually suits how you train.",
};

export default function BlogPage() {
  return <BlogContent />;
}
