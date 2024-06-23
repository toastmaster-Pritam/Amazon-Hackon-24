"use client";
import { BeatLoader } from "react-spinners";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="h-screen flex items-center justify-center">
      <BeatLoader color="#000000" />
    </div>
  );
}
