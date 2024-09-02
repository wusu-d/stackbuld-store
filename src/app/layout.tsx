import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const comfortaa = Comfortaa({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Wusu Stores",
    default: "Wusu Stores",
  },
  description:
    "Enjoy seamless shopping experience at our e-commerce store, offering a wide range of products across categories like fashion, electronics, beauty, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={comfortaa.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
