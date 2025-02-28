"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Image
        src="/yt.svg"
        width={50}
        height={50}
        priority
        style={{
          width: "50px",
          height: "50px",
        }}
        alt="yt"
      />
      <h1 className=" text-xl font-semibold tracking-tight">Home</h1>
    </div>
  );
}
