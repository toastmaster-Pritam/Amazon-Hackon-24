"use client";

import { useState, React } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/context/Web3Context";
import { shortenAddress } from "@/utils/shortenAddress";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Component({ params }) {
  const {registerProduct,account}=useWeb3();
  const [data, setData] = useState({
    name: "",
    brand: params.id,
    image: null,
    description: "",
  });
  //console.log(data);
  const handleChange = (field, value) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!account){
      toast.error("Connect your wallet first!");
      setData({
        name: "",
        brand: params.id,
        image: null,
        description: "",
      });
      return;
    }
    console.log("Submitting form with data:", data);
    registerProduct(data.name,data.image, data.description, data.brand);
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 ">
       <Link href="/manufacturer">
              <Button className="text-gray-700 bg-gray-100  hover:bg-gray-100 absolute top-5 left-5">
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
      <Card className="w-full max-w-xl shadow-md">
        <CardHeader>
          <CardTitle>Register New Product</CardTitle>
          <CardDescription>
            Fill out the form below to register a new product.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  placeholder="Enter product name"
                  value={data.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand ID</Label>
                <Input
                  id="brand"
                  placeholder="Enter brand ID"
                  value={shortenAddress(data.brand)}
                  onChange={(e) => handleChange("brand", e.target.value)}
                  disabled={true}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Product Image</Label>
              <Input
                id="image"
                type="file"
                onChange={(e) => handleChange("image", e.target.files[0])}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter product description"
                className="min-h-[120px]"
                value={data.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="ml-auto">
              Register Product
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
