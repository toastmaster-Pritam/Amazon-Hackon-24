"use client";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/context/Web3Context";
import Link from "next/link";

export default function Component() {
  const [brandData, setBrandData] = useState({
    image: null,
    name: "",
  });
  const { registerBrand } = useWeb3();
  const handleBrandChange = (event) => {
    const { name, files } = event.target;
    setBrandData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files[0] : event.target.value,
    }));
  };
  const handleRegisterBrand = () => {
    registerBrand(brandData.name, brandData.image);
    console.log("Registering brand:", brandData);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="py-4 px-8">
        <Link href="/manufacturer">
          <Button className="text-gray-700 bg-gray-100">
            <svg
              class="w-6 h-6 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 12h14M5 12l4-4m-4 4 4 4"
              />
            </svg>
            Back
          </Button>
        </Link>
      </div>
      <Card className="w-full max-w-md mx-auto shadow-md">
        <CardHeader>
          <CardTitle>Register Brand</CardTitle>
          <CardDescription>
            Register your brand to the blockchain system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" encType="multipart/form-data">
            <div className="grid gap-2">
              <Label htmlFor="brand-image">Brand Image</Label>
              <div className="border rounded-md p-4">
                <Input
                  id="brand-image"
                  name="image"
                  type="file"
                  className="block w-full"
                  onChange={handleBrandChange}
                />
                <img
                  src="/placeholder.svg"
                  alt="Brand Image"
                  width={200}
                  height={200}
                  className="mt-4 mx-auto object-cover rounded-md"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="brand-name">Brand Name</Label>
              <Input
                id="brand-name"
                name="name"
                placeholder="Enter your brand name"
                value={brandData.name}
                onChange={handleBrandChange}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto" onClick={handleRegisterBrand}>
            Register Brand
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
