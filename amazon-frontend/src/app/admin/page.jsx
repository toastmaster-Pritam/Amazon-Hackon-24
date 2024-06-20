"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Component() {
  const brands = [
    {
      id: 1,
      name: "Acme Inc",
      logo: "/placeholder-logo.svg",
      whitelisted: true,
    },
    {
      id: 2,
      name: "Globex Corporation",
      logo: "/placeholder-logo.svg",
      whitelisted: false,
    },
    {
      id: 3,
      name: "Stark Industries",
      logo: "/placeholder-logo.svg",
      whitelisted: true,
    },
    {
      id: 4,
      name: "Wayne Enterprises",
      logo: "/placeholder-logo.svg",
      whitelisted: false,
    },
    {
      id: 5,
      name: "Umbrella Corporation",
      logo: "/placeholder-logo.svg",
      whitelisted: true,
    },
  ]

  const getBrands = async () => {
   
    if (!account) {
      console.log("Account is not available");

      return;
    }
    else{
      console.log(account)
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/brand/all/${account}`
      );
      //console.log("Response data:", response.data);

      setBrands(response.data.brands);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };
  const [whitelistedBrands, setWhitelistedBrands] = useState(brands.filter((brand) => brand.whitelisted))
  const handleWhitelist = (brandId) => {
    setWhitelistedBrands((prevBrands) => {
      const updatedBrands = prevBrands.map((brand) => (brand.id === brandId ? { ...brand, whitelisted: true } : brand))
      return updatedBrands
    })
  }
  const handleRemove = (brandId) => {
    setWhitelistedBrands((prevBrands) => prevBrands.filter((brand) => brand.id !== brandId))
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Brand Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className={`bg-white rounded-lg shadow-md p-4 ${
              whitelistedBrands.some((b) => b.id === brand.id)
                ? "border-4 border-green-500"
                : "border-4 border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <img src="/placeholder.svg" alt={brand.name} width={60} height={60} className="rounded-full" />
              <div className="flex gap-2">
                {whitelistedBrands.some((b) => b.id === brand.id) ? (
                  <Button variant="outline" size="sm" className="bg-green-500 text-white hover:bg-green-600" disabled>
                    Whitelisted
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-blue-500 text-white hover:bg-blue-600"
                    onClick={() => handleWhitelist(brand.id)}
                  >
                    Whitelist
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-red-500 text-white hover:bg-red-600"
                  onClick={() => handleRemove(brand.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold">{brand.name}</h3>
              <p className="text-gray-500">Brand ID: {brand.id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}