/**
 * v0 by Vercel.
 * @see https://v0.dev/t/XpKKF42I0p4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/context/Web3Context";
import axios from "axios";
import toast from "react-hot-toast";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import Link from "next/link";

export default function Component() {
  const [products, setProducts] = useState([]);
  const [showQrCode, setShowQrCode] = useState({});
  const { account } = useWeb3();
  const qrRef = useRef({});

  const generateQrCode = (uniqueHash) => {
    setShowQrCode((prevState) => ({
      ...prevState,
      [uniqueHash]: true,
    }));
  };

  const toggleQrCode = (uniqueHash) => {
    setShowQrCode((prevState) => ({
      ...prevState,
      [uniqueHash]: !prevState[uniqueHash],
    }));
  };

  const downloadQrCode = async (uniqueHash,productId) => {
    const qrElement = qrRef.current[uniqueHash];
    console.log(uniqueHash)
    //console.log(qrElement)
    if (qrElement) {
      const canvas = await html2canvas(qrElement);
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${productId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/all/${account}`
      );
      const fetchedProducts = response.data.products.map((product) => ({
        id: product[0],
        name: product[1],
        brandId: product[2],
        manufacturer: product[3],
        currentOwner: product[4],
        details: product[5],
        uniqueHash: product[6],
        isDelisted: product[7],
        image: product[8],
      }));

      setProducts(fetchedProducts);
    } catch (error) {
      toast.error("Error fetching products!");
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [account]);

  return (
    <div className="bg-gray-100 h-screen ">
       <Link href="/manufacturer">
              <Button className="text-gray-700 bg-gray-100 hover:bg-gray-100">
                <svg
                  className="w-6 h-6 text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14M5 12l4-4m-4 4 4 4"
                  />
                </svg>
                Back
              </Button>
            </Link>
    <h1 className="text-2xl font-semibold text-center pt-8">Products</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6 ">
      
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-60 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-center">{product.name}</h3>
            <p className="text-muted-foreground text-sm text-center">{product.details}</p>
            <div className="mt-4 flex items-center justify-center">
              {showQrCode[product.uniqueHash] ? (
                <div className="flex flex-col justify-center items-center gap-4">
                  <div ref={(el) => (qrRef.current[product.uniqueHash] = el)}>
                    <QRCode
                      value={product.uniqueHash}
                      size={128}
                      onClick={() => toggleQrCode(product.uniqueHash)}
                    />
                  </div>
                  <Button onClick={() => downloadQrCode(product.uniqueHash,product.id)} size="sm">
                    Download QR Code
                  </Button>
                </div>
              ) : (
                <Button className="" onClick={() => generateQrCode(product.uniqueHash)} size="sm">
                  Generate QR Code
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
