"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const NotFount = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 4000);
  }, [router]);
  return (
    <MaxWidthWrapper>
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl">
          Page Not Found
        </h1>
        <p className="mt-6 text-lg max-w-prose flex items-center gap-1  text-muted-foreground">
          let&apos;s get you back home <Loader2 className="animate-spin" />
        </p>
      </div>
    </MaxWidthWrapper>
  );
};
export default NotFount;
