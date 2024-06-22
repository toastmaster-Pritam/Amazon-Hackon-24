"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
// import { Button } from "@/components/ui/button"

export default function Component() {
  const [valid, setValid] = useState(null);
  const [highestConfidence, setHighestConfidence] = useState(null);
  const [label, setLabel] = useState(null);

  const handleClick = async () => {
    const fileInput = document.getElementById("logo");
    const file = fileInput.files[0];

    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("input_image", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/predict-logo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = res.data;
      setValid(result.label === "Puma Real");

      // Find the highest confidence
      const highestConfidence = result.confidences.reduce((max, confidence) => {
        return confidence.confidence > max.confidence ? confidence : max;
      }, result.confidences[0]);

      setHighestConfidence(highestConfidence);
      setLabel(result.label);
      toast.success("Logo verified successfully!");
    } catch (error) {
      console.error("Error verifying logo:", error);
      toast.error("Error verifying logo. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-12 md:py-24">
      <div className="absolute top-3 left-5">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeftIcon className="h-6 w-6" />
            <span className="sr-only">Previous</span>
          </Button>
        </Link>
      </div>
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Verify Your Brand Logo
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed">
          Upload your brand logo and let our AI-powered authenticity checker
          verify its legitimacy.
        </p>
        <div className="grid w-full items-center gap-1.5">
          {/* <Label htmlFor="logo">Brand Logo</Label> */}
          <Input id="logo" type="file" className="w-full" />
        </div>
        <Button type="submit" className="w-full" onClick={handleClick}>
          Verify Logo
        </Button>
        {valid !== null && (
          <div className="grid gap-4 mt-4">
            {valid ? (
              <div className="rounded-lg border p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <CheckIcon className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold">
                  Authentic Logo Detected
                </h3>
                <p className="text-muted-foreground">
                  Our AI model has confirmed that this is a legitimate brand
                  logo.
                </p>
              </div>
            ) : (
              <div className="rounded-lg border p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <XIcon className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold">Fake Logo Detected</h3>
                <p className="text-muted-foreground">
                  Our AI model has detected that this logo is not authentic.
                </p>
              </div>
            )}
            <div className="rounded-lg border p-6 text-center">
              <h3 className="text-xl font-semibold">
                Highest Confidence Score
              </h3>
              {highestConfidence && (
                <p className="text-muted-foreground">
                  {highestConfidence.label}:{" "}
                  {(highestConfidence.confidence * 100).toFixed(2)}%
                </p>
              )}
            </div>
          </div>
        )}
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

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function ArrowLeftIcon(props) {
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
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}
