"use client";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/lMnMvh2MzSV
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function Component() {
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const approveOwnership = async () => {
    let res; // = await ...api call
  };

  // useEffect(()=>{

  // })
  return (
    <>
      {loading ? (
        <BeatLoader color="#36d7b7"/>
      ) : (
        <div className="flex flex-col items-center justify-center h-[100dvh] gap-6">
          <CircleCheckIcon className="size-24 text-green-500" />
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">
              Ownership Transfer Successful
            </h1>
            <p className="text-muted-foreground">
              Congratulations! You have successfully transferred ownership of
              your account.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <img
                src="/placeholder.svg"
                alt="Product Image"
                width={100}
                height={100}
                className="rounded-md"
              />
              <div className="text-left">
                <h3 className="font-semibold">Premium Headphones</h3>
                <p className="text-sm text-muted-foreground">Brand ID: 12345</p>
                <p className="text-sm text-muted-foreground">
                  Current Owner: John Doe
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
