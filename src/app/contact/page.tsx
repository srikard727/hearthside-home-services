import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <PlaceholderPage
      eyebrow="Contact us"
      title="Tell us how we can help."
      description="A contact form and company contact information will be added here in a future step."
    />
  );
}
