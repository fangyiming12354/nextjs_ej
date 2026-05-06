import Link from "next/link";
import Carrusel from "@/app/components/Carrusel";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Carrusel */}
      <Carrusel />

      {/* Sección de categorías destacadas */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">Categorías</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { nombre: "Zapatillas", slug: "zapatillas", emoji: "👟" },
            { nombre: "Ropa", slug: "ropa", emoji: "👕" },
            { nombre: "Pantalones", slug: "pantalones", emoji: "👖" },
            { nombre: "Calcetines", slug: "calcetines", emoji: "🧦" },
          ].map((cat) => (
            <Link
              key={cat.slug}
              href={`/producto?categoria=${cat.slug}`}
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-3">{cat.emoji}</div>
              <p className="font-medium text-gray-900">{cat.nombre}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
