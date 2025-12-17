import type { Metadata } from "next";
import Navigation from "@/components/common/Navigation";
import Footer from "@/components/common/Footer";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/hooks/useCart";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shari Mohol || by ROL Studio Bangladesh",
  description: "A Concept E-commerce Website",
  keywords: [
    "Best web development company in Dhaka",
    "Best web development company in Bangladesh",
    "react js development",
    "Mahmood Hassan Rameem",
    "MERN stack development",
    "web development",
    "web design",
    "Bangladesh",
    "ROL Studio Bangladesh",
    "Next.js",
  ],
  openGraph: {
    title: "SHari Mohol || by ROL Studio Banglades",
    description: "A Concept E-commerce Website for Traditional Ladies Clothes",
    url: "https://shari-mohol-next.onrender.com/",
    siteName: "Shari Mohol",
    images: [
      {
        url: "https://shari-mohol-next.onrender.com/logo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <CartProvider>
          <body className={`${inter.variable}  antialiased font-inter`}>
            <Navigation />
            {children}
            <Footer />
            <Toaster richColors position="top-right" />
          </body>
        </CartProvider>
      </AuthProvider>
    </html>
  );
}
