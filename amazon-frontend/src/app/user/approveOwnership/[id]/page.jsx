"use client";

import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useWeb3 } from "@/context/Web3Context";
import { shortenAddress } from "@/utils/shortenAddress";
import { getProductDetails } from "@/services/getProductDetails";

export default function Component({ params }) {
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [ownershipVerified, setOwnershipVerified] = useState(false);

  const { account, approveOwnership } = useWeb3();

  const accept = async () => {
    try {
      await approveOwnership(params.id);
      const res = await getProductDetails(params.id);

      if (res.currentOwner === account) {
        setProductDetails(res);
        setOwnershipVerified(true);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (account) {
      accept();
    }
  }, [account]);

  return (
    <>
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <BeatLoader color="#36d7b7" />
        </div>
      ) : ownershipVerified ? (
        <div className="flex flex-col items-center justify-center h-screen gap-6">
          <CircleCheckIcon className="w-24 h-24 text-green-500" />
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Ownership Transfer Successful</h1>
            <p className="text-gray-600">
              Congratulations! You have successfully transferred ownership of your account.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <img
                src={productDetails.productImage}
                alt="Product Image"
                width={100}
                height={100}
                className="rounded-md"
              />
              <div className="text-left">
                <h3 className="font-semibold">{productDetails.name}</h3>
                <p className="text-sm text-gray-500">
                  Product ID: {shortenAddress(productDetails.id)}
                </p>
                <p className="text-sm text-gray-500">
                  Current Owner: {shortenAddress(productDetails.currentOwner)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500">Error</h1>
            <p className="text-gray-600">
              Ownership transfer was not successful. Please try again.
            </p>
            <button
          className="px-4 py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
          onClick={() => reset()}
        >
          Try Again
        </button>
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
