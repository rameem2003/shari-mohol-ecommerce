import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/common/Navigation";
import Footer from "@/components/common/Footer";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/hooks/useCart";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Shari Mohol || by ROL Studio Bangladesh",
  description: "A Concept E-commerce Website",
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
