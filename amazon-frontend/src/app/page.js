"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/sRaGAaVSUeb
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Coverpic from "../assets/Security-cuate.svg";
import { useWeb3 } from "@/context/Web3Context";

export default function Home() {
  const { account, connectWallet } = useWeb3();

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-[#0077b6] text-white">
        <Link href="#" className="text-xl font-bold" prefetch={false}>
          Amazon
        </Link>
        <Link href="/register">
          <Button className="inline-flex items-center gap-2">
            Register
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </Link>
      </header>
      <section className="relative w-full bg-gradient-to-br from-[#0077b6] to-[#00b894] py-24 md:py-32 lg:py-40">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter text-gray-50 sm:text-5xl md:text-6xl lg:text-7xl">
                Authenticate Your Products
              </h1>
              <p className=" text-gray-200/90 md:text-lg">
                Harness the power of AI and blockchain technology to safeguard
                your brand and ensure product authenticity. Our advanced
                solution detects counterfeit goods and provides transparent
                supply chain tracking, ensuring your customers receive only
                genuine products. Enhance trust and protect your brand today.
              </p>
              {account ? (
                <div>{account}</div>
              ) : (
                <Button className="inline-flex" onClick={() => connectWallet()}>
                  Connect to Wallet
                </Button>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-[url('/polygon-pattern.svg')] bg-repeat opacity-20" />
              <div className="relative flex justify-center">
                <img
                  src={Coverpic.src}
                  width={500}
                  height={500}
                  alt="Blockchain Graphic"
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-28 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4 group transition-all duration-300 hover:scale-105">
              <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm font-medium dark:bg-gray-700 dark:text-gray-300">
                AI-Powered Authentication
              </div>
              <h3 className="text-2xl font-bold tracking-tighter">
                Detect Counterfeits with AI
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Our advanced AI algorithms analyze product details and compare
                them to authentic items, ensuring you can identify counterfeit
                goods with confidence.
              </p>
            </div>
            <div className="space-y-4 group transition-all duration-300 hover:scale-105">
              <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm font-medium dark:bg-gray-700 dark:text-gray-300">
                Decentralized Ledger
              </div>
              <h3 className="text-2xl font-bold tracking-tighter">
                Secure Product Tracking
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Our blockchain-based ledger provides a tamper-proof record of
                product ownership and authenticity, giving you unparalleled
                visibility into your supply chain.
              </p>
            </div>
            <div className="space-y-4 group transition-all duration-300 hover:scale-105">
              <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm font-medium dark:bg-gray-700 dark:text-gray-300">
                Brand Protection
              </div>
              <h3 className="text-2xl font-bold tracking-tighter">
                Safeguard Your Brand
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Protect your brand's reputation and customer trust by ensuring
                the authenticity of your products across the supply chain.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                AI Fake Review Detection
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Protecting your business from fraudulent reviews is crucial in
                today's digital landscape. Our AI-powered fake review detection
                tool helps you identify and remove misleading content, ensuring
                your customers can trust the feedback they see.
              </p>
            </div>
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-800 px-8 text-sm font-medium text-gray-100 shadow transition-colors hover:bg-gray-800/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Check Prototype
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ChevronRightIcon(props) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
