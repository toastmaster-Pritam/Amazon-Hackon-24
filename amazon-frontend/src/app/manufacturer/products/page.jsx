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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6 bg-gradient-to-r from-blue-500 to-green-400">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-background rounded-lg shadow-md overflow-hidden"
        >
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-60 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-muted-foreground text-sm">{product.details}</p>
            <div className="mt-4">
              {showQrCode[product.uniqueHash] ? (
                <div className="flex justify-center items-center gap-4">
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
                <Button onClick={() => generateQrCode(product.uniqueHash)} size="sm">
                  Generate QR Code
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
