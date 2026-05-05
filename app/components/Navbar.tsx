import Link from "next/link";
import { Categoria } from "@/data/categorias";

interface NavbarProps {
  categorias: Categoria[];      // Lista de categorías que viene de la BD
  categoriaActual?: string;     // Slug de la categoría seleccionada (puede no haber ninguna)
}

// Server Component — no necesita "use client" porque no usa estado ni eventos del navegador
export default function Navbar({ categorias, categoriaActual }: NavbarProps) {
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto">

        {/* Enlace "Todos" — va a la raíz sin parámetros, muestra todos los productos */}
        <Link
          href="/"
          className={`px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
            // Si no hay categoría activa, este enlace se subraya en negro
            !categoriaActual
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          Todos
        </Link>

        {/* Recorremos las categorías de la BD y creamos un enlace por cada una */}
        {categorias.map((cat) => (
          <Link
            key={cat.id}
            // Al hacer clic añade ?categoria=slug a la URL, ej: /?categoria=zapatillas
            href={`/?categoria=${cat.slug}`}
            className={`px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              // Si el slug coincide con la categoría activa, se subraya en negro
              categoriaActual === cat.slug
                ? "border-black text-black"
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
