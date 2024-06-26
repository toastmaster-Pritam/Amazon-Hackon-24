"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/context/Web3Context";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

export default function Component() {
  const [data, setData] = useState({
    username: "",
    role: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const { registerUser, account } = useWeb3();

  const handleChange = (field, value) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    console.log(account);
    if (!account) {
      toast.error("Connect your wallet first!");
      setData({
        username: "",
        role: "",
        email: "",
        phone: "",
      });

      return;
    }
    // Perform form validation and handle form submission
    if (!data.username || !data.role || !data.email || !data.phone) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }
    // Submit data to the server

    console.log("Form submitted:", data);
    // Reset the form

    if (data.role === "manufacturer") {
      await registerUser(1, data.username, data.email, data.phone);
    } else if (data.role === "customer") {
      await registerUser(3, data.username, data.email, data.phone);
    } else if (data.role === "seller") {
      await registerUser(2, data.username, data.email, data.phone);
    }

    setLoading(false);
    setData({
      username: "",
      role: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-md rounded-md bg-white p-8 shadow-lg dark:bg-gray-900">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Register</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Create your account to get started.
          </p>
        </div>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="username" className="font-bold">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={data.username}
              onChange={(e) => handleChange("username", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="role" className="font-bold">
              Role
            </Label>
            <Select
              id="role"
              value={data.role}
              onValueChange={(value) => handleChange("role", value)}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manufacturer">Manufacturer</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="seller">Seller</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="email" className="font-bold">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone" className="font-bold">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={data.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              required
            />
          </div>
          {loading ? (
            <Button disabled>
              <BeatLoader />
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Register
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
