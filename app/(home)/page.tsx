"use client";
import { useAppDispath, useAppSelector } from "@/redex/store";
import { increment } from "@/redex/user";

export default function Home() {
  const dispatch = useAppDispath();
  const value = useAppSelector((state) => state.user);

  return (
    <div>
      接下來我會在這邊實作 B<div>{value.value}</div>
      <button onClick={() => dispatch(increment())}>+1</button>
    </div>
  );
}
