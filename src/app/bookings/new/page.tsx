import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = {
  title: "Book a Service",
};

export default function NewBookingPage() {
  return (
    <PlaceholderPage
      eyebrow="Book a service"
      title="Let’s get your home back on track."
      description="The guided booking flow will live here once services, customer accounts, and scheduling are ready."
    />
  );
}
