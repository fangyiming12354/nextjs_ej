"use client";

// usePathname necesita "use client" — detecta la ruta actual para marcar el enlace activo
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const enlaces = [
  { href: "/producto", label: "Productos" },
  { href: "/formulario", label: "Formulario" },
];

export default function NavbarPrincipal() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm h-16">
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={120}
            height={40}
            className="object-contain h-10 w-auto"
          />
        </Link>

        <nav className="flex gap-6">
          {enlaces.map(({ href, label }) => {
            // El enlace está activo si la ruta actual empieza por su href
            // (así /producto?categoria=ropa también activa el enlace de Productos)
            const activo = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors ${
                  activo
                    ? "text-black border-b-2 border-black pb-0.5"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
