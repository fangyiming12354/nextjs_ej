import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Productos | Tienda",
  description: "Explora nuestro catálogo de productos",
};

export default function ProductoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
