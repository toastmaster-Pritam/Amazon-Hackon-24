/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Q8eV4gn9LI4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useWeb3 } from "@/context/Web3Context"

export default function Component() {
  const [brandData, setBrandData] = useState({
    image: null,
    name: "",
  })
  const {registerBrand}=useWeb3()
  const handleBrandChange = (event) => {
    const { name, files } = event.target
    setBrandData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files[0] : event.target.value,
    }))
  }
  const handleRegisterBrand = () => {

    registerBrand(brandData.name, brandData.image)
   
    
    console.log("Registering brand:", brandData)
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register Brand</CardTitle>
          <CardDescription>Register your brand to the blockchain system.</CardDescription>
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
  )
}