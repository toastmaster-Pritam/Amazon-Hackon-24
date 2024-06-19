import { Inter } from "next/font/google";
import "./globals.css";
import { Comfortaa } from "next/font/google";
import { Gabarito } from "next/font/google";
import { Web3Provider } from "@/context/Web3Context";
import "./styles.css";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-comfortaa",
});
const gabarito = Gabarito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-gabarito",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={
          inter.className + " " + comfortaa.variable + " " + gabarito.variable
        }
      >
        <Web3Provider>
        {children}
        </Web3Provider>
      </body>
    </html>
  );
}
