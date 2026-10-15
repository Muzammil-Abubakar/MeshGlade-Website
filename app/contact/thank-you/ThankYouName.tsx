"use client";

import { useEffect } from "react";
import { clearBriefContext } from "@/lib/attribution";
import { useLocationSearch } from "@/lib/hooks";

export function ThankYouName() {
  const name = new URLSearchParams(useLocationSearch()).get("name")?.slice(0, 30);
  useEffect(() => clearBriefContext(), []);
  return <span>{name ? `Thanks, ${name}.` : "Thank you."}</span>;
}
