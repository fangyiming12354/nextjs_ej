import Link from "next/link";
import { Categoria } from "@/data/categorias";

interface NavbarProps {
  categorias: Categoria[];
  categoriaActual?: string;
  // basePath indica en qué ruta está montado el navbar.
  // Los links añaden ?categoria=slug a esta ruta para que el filtro funcione
  // en la página correcta y no redirija a la raíz ("/").
  basePath?: string;
}

// Server Component — no necesita "use client" porque no usa estado ni eventos.
export default function Navbar({ categorias, categoriaActual, basePath = "/" }: NavbarProps) {
  // Cambia el color del navbar según dónde esté montado:
  // en /producto usa fondo azul oscuro para diferenciarse del header principal blanco.
  const isProductos = basePath === "/producto";

  return (
    <nav className={isProductos ? "bg-indigo-800 shadow-md" : "bg-white border-b shadow-sm"}>
      <div className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto">

        {/* Enlace "Todos": va a basePath sin parámetros, mostrando todos los productos.
            El subrayado activo cambia de negro (header blanco) a blanco (header azul). */}
        <Link
          href={basePath}
          className={`px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
            !categoriaActual
              ? isProductos
                ? "border-white text-white"
                : "border-black text-black"
              : isProductos
                ? "border-transparent text-indigo-200 hover:text-white"
                : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          Todos
        </Link>

        {/* Un enlace por cada categoría de la BD.
            Al hacer clic añade ?categoria=slug a basePath, ej: /producto?categoria=zapatillas */}
        {categorias.map((cat) => (
          <Link
            key={cat.id}
            href={`${basePath}?categoria=${cat.slug}`}
            className={`px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              categoriaActual === cat.slug
                ? isProductos
                  ? "border-white text-white"
                  : "border-black text-black"
                : isProductos
                  ? "border-transparent text-indigo-200 hover:text-white"
                  : "border-transparent text-gray-500 hover:text-black"
            }`}
          >
            {cat.nombre}
          </Link>
        ))}
      </div>
    </nav>
  );
}
