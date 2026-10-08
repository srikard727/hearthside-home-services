import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <PlaceholderPage
      eyebrow="About Hearthside"
      title="Care for every corner of home."
      description="This page will introduce the people, values, and standards behind Hearthside Home Services."
    />
  );
}
