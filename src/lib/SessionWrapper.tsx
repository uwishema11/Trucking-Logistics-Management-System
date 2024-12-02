"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SessionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    router.push("/");
    return null;
  }
  return <>{children}</>;
}
