"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const SUDO_SEQUENCE = "sudo";
const BUFFER_LIMIT = 12;

export default function SudoListener() {
  const router = useRouter();
  const bufferRef = useRef("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        return;
      }

      if (event.key.length !== 1) return;

      bufferRef.current = (bufferRef.current + event.key.toLowerCase()).slice(
        -BUFFER_LIMIT,
      );

      if (bufferRef.current.endsWith(SUDO_SEQUENCE)) {
        bufferRef.current = "";
        router.push("/admin/login");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return null;
}
