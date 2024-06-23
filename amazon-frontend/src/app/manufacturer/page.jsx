"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useWeb3 } from "@/context/Web3Context";
import { shortenAddress } from "@/utils/shortenAddress";
import withRoleProtection from "@/components/middleware/protected";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function Component() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const { account } = useWeb3();

  const getBrands = async () => {
    if (!account) {
      console.log("Account is not available");

      return;
    } else {
      console.log(account);
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/brand/all/${account}`
      );
      console.log("Response data:", response.data);

      setBrands(response.data.brands);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  useEffect(() => {
    getBrands();
  }, [account]);

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[220px_1fr]">
      <div
        className={`border-r bg-muted/40 lg:block ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link
              href="#"
              className="flex items-center gap-2 font-semibold"
              prefetch={false}
            >
              <Package2Icon className="h-6 w-6" />
              <span className="">Manufacturer</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium gap-y-2">
              <Link
                href="/manufacturer"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-gray-200 focus:outline-none focus:ring focus:ring-primary"
                prefetch={false}
              >
                <HomeIcon className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/manufacturer/brandRegistration"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-gray-200 focus:outline-none focus:ring focus:ring-primary"
                prefetch={false}
              >
                <PlusIcon className="h-4 w-4" />
                Register Brand
              </Link>
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-gray-200 focus:outline-none focus:ring focus:ring-primary"
                prefetch={false}
              >
                
                Back
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex items-center justify-between border-b bg-muted/40 px-4 py-3 lg:hidden">
          <Link
            href="#"
            className="flex items-center gap-2 font-semibold"
            prefetch={false}
          >
            <Package2Icon className="h-6 w-6" />
            <span className="">Dashboard</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-gray-100">
          <div className="flex items-center">
            <h1 className="font-semibold text-lg md:text-2xl">Brands</h1>
          </div>
          <div className="border shadow-sm rounded-lg">
            <div className="overflow-x-auto">
              <Table className="bg-white">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Logo</TableHead>
                    <TableHead className="max-w-[150px]">Name</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {brands.length > 0 &&
                    brands.map((brand, index) => (
                      <TableRow key={brand[0]}>
                        <TableCell>
                          <img
                            src={brand[4] || "/placeholder.svg"}
                            width="64"
                            height="64"
                            alt="Brand logo"
                            className="aspect-square rounded-md object-contain"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {brand[1]}
                        </TableCell>
                        <TableCell>{shortenAddress(brand[0])}</TableCell>
                        <TableCell>
                          <Link
                            href={`/manufacturer/products/productRegistration/${brand[0]}`}
                            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 text-gray-50 px-2.5 py-1.5 text-xs font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            prefetch={false}
                          >
                            Register Product
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function CheckIcon(props) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function HomeIcon(props) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function Package2Icon(props) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
