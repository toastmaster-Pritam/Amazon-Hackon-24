"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios"; // Import axios for HTTP requests
import { useWeb3 } from "@/context/Web3Context";
import { shortenAddress } from "@/utils/shortenAddress";
import toast from "react-hot-toast";

export default function Component() {
  const [brands, setBrands] = useState([]);
  const { account, whitelistBrand, removeWhitelistedBrand } = useWeb3();

  useEffect(() => {
    
      getAllBrands();
    
  }, [account]);

  const getAllBrands = async () => {
    // if (!account) {
    //   toast.error("Please connect your wallet to view brands!");
    //   return;
    // }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/brand/all`
      );
      console.log("Response data:", response.data);

      const fetchedBrands = response.data.brands.map((brand) => ({
        id: brand[0],
        name: brand[1],
        manufacturer: brand[2],
        isWhitelisted: brand[3],
        logo: brand[4],
      }));

      setBrands(fetchedBrands);
    } catch (error) {
      toast.error("Error fetching brands!")
      console.error("Error fetching brands:", error);
    }
  };

  const handleWhitelist = async (brandId) => {
    try {
     const res= await whitelistBrand(brandId); // Call the whitelistBrand function from useWeb3
     if(res!==undefined) return;
      console.log(`Brand with ID ${brandId} whitelisted successfully.`);
      
      setBrands((prevBrands) =>
        prevBrands.map((brand) =>
          brand.id === brandId ? { ...brand, isWhitelisted: true } : brand
        )
      );
    } catch (error) {
      console.error("Error whitelisting brand:", error);
    }
  };

  const handleRemove = async (brandId) => {
    try {
      const res=await removeWhitelistedBrand(brandId); // Call the removeWhitelistedBrand function from useWeb3
      if(res!==undefined) return;
      console.log(`Whitelisting removed for brand with ID ${brandId} successfully.`);
      
      setBrands((prevBrands) =>
        prevBrands.map((brand) =>
          brand.id === brandId ? { ...brand, isWhitelisted: false } : brand
        )
      );
    } catch (error) {
      console.error("Error removing whitelisting from brand:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Brand Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className={`bg-white rounded-lg shadow-md p-4 border-4 ${
              brand.isWhitelisted ? "border-green-500" : "border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <img
                src={brand.logo} // Assuming brand.logo is the correct property for the logo URL
                alt={brand.name}
                width={60}
                height={60}
                className="rounded-full"
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={`${
                    brand.isWhitelisted
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  onClick={() => handleWhitelist(brand.id)}
                  disabled={brand.isWhitelisted}
                >
                  Whitelist
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-red-500 text-white hover:bg-red-600"
                  onClick={() => handleRemove(brand.id)}
                  disabled={!brand.isWhitelisted}
                >
                  Remove
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold">{brand.name}</h3>
              <p className="text-gray-500">Brand ID: {shortenAddress(brand.id)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
