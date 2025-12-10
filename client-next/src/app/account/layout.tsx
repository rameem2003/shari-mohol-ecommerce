import Container from "@/components/common/Container";
import { Metadata } from "next";
import Link from "next/link";
import AccountNav from "./AccountNav";

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
      <body>
        {/* <Navigation /> */}
        <main>
          <Container>
            <section className=" flex items-start flex-wrap lg:flex-nowrap justify-between gap-8 py-20">
              <aside className=" w-full lg:w-1/4 lg:sticky top-24 self-start">
                {/* Sidebar content could go here */}
                <h2 className=" text-3xl font-semibold text-shari-mohol-primary mb-8">
                  Shari Mohol Account
                </h2>
                <AccountNav />
              </aside>
              <section className=" w-full lg:w-3/4">
                {/* Main profile content could go here */}
                {children}
              </section>
            </section>
          </Container>
        </main>
        {/* <Footer /> */}
        {/* <Toaster richColors position="top-right" /> */}
      </body>
    </html>
  );
}
