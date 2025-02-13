
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Poppins } from "next/font/google"

const poppins=Poppins({
  subsets:['latin'],
  weight:['300','400','500','600','700','800']
})

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <Navbar/>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
