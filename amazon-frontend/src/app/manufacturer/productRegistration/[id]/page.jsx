/**
 * v0 by Vercel.
 * @see https://v0.dev/t/GJauvhBorFT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState, useEffect, React } from "react";
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
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Component() {
  const router = useRouter();
  const [brandId, setBrandId] = useState("");

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      setBrandId(id);
    }
  }, [router.isReady, router.query]);
  const [data, setData] = useState({
    name: "",
    brand: brandId,
    image: null,
    description: "",
  });
  console.log(data);
  const handleChange = (field, value) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", data);
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
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
                  value={data.brand}
                  onChange={(e) => handleChange("brand", e.target.value)}
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
