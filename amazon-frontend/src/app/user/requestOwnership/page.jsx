"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useWeb3 } from "@/context/Web3Context";
import { verifyProduct } from "@/services/verifyProduct";
import { getProductDetails } from "@/services/getProductDetails";
import { getProductOwners } from "@/services/getProductOwners";
import { shortenAddress } from "@/utils/shortenAddress";
import { sendEmail } from "@/services/sendEmail";
import toast from "react-hot-toast";

export default function Component() {
  const [isVerified, setIsVerified] = useState(null); // null means not checked, true or false for verified status
  const [qrvalue, setQrValue] = useState("");
  const [clicked, setClicked] = useState(false);
  const { account,requestOwnership } = useWeb3();
  const [productDetails, setProductDetails] = useState({});
  const [productOwners, setProductOwners] = useState([]);

  const handleClick = () => {
    setClicked(true);
    const qrCodeScanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: {
        width: 500,
        height: 500,
      },
    });
    qrCodeScanner.render(success, error);

    async function success(data) {
      qrCodeScanner.clear();
      setQrValue(data);

      const response = await verifyProduct(data);
      const owners = await getProductOwners(data);
      const details = await getProductDetails(data);
      

      setProductDetails(details);

      if (response && response.verified) {
        setIsVerified(true);
        toast.success("Product verified successfully!");
        console.log("Product details:", details);
        console.log("Product owners:", owners);
        setProductOwners(owners);
      } else {
        setIsVerified(false);
        toast.error("Product verification failed.");
      }

      setClicked(false);
    }

    function error(err) {
      console.warn(err);
    }
  };

  const requestOwnershipHandler = async() => {
    requestOwnership(productDetails.uniqueHash);
    await sendEmail(
      productDetails.currentOwner,
      productDetails.uniqueHash,
      account,
      productDetails.id,
      productDetails.name,
      productDetails.brandId,
      productDetails.productImage
    );
  };

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 md:px-6">
      <div className="max-w-md w-full space-y-6">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-muted rounded-lg p-6 w-full">
            <div className="flex flex-col items-center gap-4">
              <QrCodeIcon className="w-12 h-12 text-primary" />
              <h2 className="text-2xl font-bold">
                Verify Product Authenticity
              </h2>
              <p className="text-muted-foreground">
                Scan the QR code on your product to verify its authenticity.
              </p>
              <Button size="lg" className="w-full" onClick={handleClick}>
                Scan QR Code
              </Button>
              <div id="qr-reader"></div>
            </div>
          </div>
          {isVerified === true && (
            <div className="bg-muted rounded-lg p-6 w-full flex flex-col md:flex-row">
              <div className="w-full md:w-1/3 flex items-center justify-center mb-4 md:mb-0">
                <img
                  src={productDetails.productImage}
                  alt="Product"
                  className="max-w-full h-auto"
                />
              </div>
              <div className="w-full md:w-2/3 md:pl-4 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <CircleCheckIcon className="w-8 h-8 text-green-500" />
                  <h3 className="text-xl font-semibold">Product Verified</h3>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Product Name:</span>
                    <span>{productDetails.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Product ID:</span>
                    <span>{shortenAddress(productDetails.id)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Current Owner:</span>
                    <span>{shortenAddress(productDetails.currentOwner)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isVerified === true && (
            <div className="bg-muted rounded-lg p-6 w-full">
              <Separator />
              <h4 className="text-lg font-semibold">Previous Owners</h4>
              <div className="grid gap-4">
                {productOwners.map((owner, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="w-10 h-10 border">
                        <AvatarImage src={owner.avatar} />
                        <AvatarFallback>{owner.role.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{"Wallet Address"}</span>
                        <span className="font-medium">{owner.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {shortenAddress(owner.address)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full" onClick={requestOwnershipHandler}>
                Request Ownership
              </Button>
            </div>
          )}
          {isVerified === false && (
            <div className="bg-muted rounded-lg p-6 w-full">
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                  <CircleXIcon className="w-8 h-8 text-red-500" />
                  <h3 className="text-xl font-semibold">
                    Product Not Verified
                  </h3>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Product Name:</span>
                    <span>{productDetails.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Product ID:</span>
                    <span>{shortenAddress(productDetails.id)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Manufacturer:</span>
                    <span>{productDetails.manufacturer}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CircleCheckIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CircleXIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}

function QrCodeIcon(props) {
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
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </svg>
  );
}
