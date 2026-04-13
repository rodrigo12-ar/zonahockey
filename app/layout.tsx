import type { Metadata } from "next";
import "@/app/globals.css";
import { CartProvider } from "@/components/cart/cart-provider";

export const metadata: Metadata = {
  title: "Zona Hockey Store",
  description: "Tienda deportiva de hockey con productos, fotografías y panel de administración.",
  metadataBase: new URL("https://zona-hockey-store.vercel.app"),
  openGraph: {
    title: "Zona Hockey Store",
    description: "Compra palos, patines, accesorios y fotografías deportivas.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
