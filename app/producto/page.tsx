// Suspense permite mostrar un fallback (skeleton) mientras un hijo async está cargando.
// Next.js App Router lo usa para hacer streaming: envía cada tarjeta al navegador
// en cuanto su Server Component termina, sin esperar a que acaben todas.
import { Suspense } from "react";
import Navbar from "@/app/components/Navbar";
// Tarjeta async que simula carga lenta — muestra el producto tras un delay
import ProductCard from "@/app/components/ProductCard";
// Placeholder animado que ocupa el espacio mientras ProductCard carga
import SkeletonCard from "@/app/components/SkeletonCard";
import { getCategorias } from "@/data/categorias";
import { getProductos, getProductosByCategoriaSlug } from "@/data/productos";

// Esta es la página principal. Es un Server Component (async) — se ejecuta en el servidor
// y consulta la base de datos antes de enviar el HTML al navegador.
export default async function Home({
  searchParams,
}: {
  // searchParams contiene los parámetros de la URL, ej: ?categoria=zapatillas
  // En Next.js 16 es una Promise, por eso hay que hacer await
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Extraemos el valor de ?categoria= de la URL
  const { categoria } = await searchParams;

  // Nos aseguramos de que sea un string simple (no un array)
  const categoriaSlug = typeof categoria === "string" ? categoria : undefined;

  // Pedimos a la vez las categorías (para el navbar) y los productos (para la grid)
  // Promise.all ejecuta las dos consultas en paralelo, más rápido que una tras otra
  const [categorias, productos] = await Promise.all([
    getCategorias(),
    // Si hay categoría seleccionada filtramos, si no traemos todos
    categoriaSlug ? getProductosByCategoriaSlug(categoriaSlug) : getProductos(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Pasamos las categorías al navbar y cuál está activa */}
      <Navbar categorias={categorias} categoriaActual={categoriaSlug} basePath="/producto" />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Si no hay productos mostramos un mensaje */}
        {productos.length === 0 ? (
          <p className="text-center text-gray-500 py-16">No hay productos en esta categoría.</p>
        ) : (
          // Grid responsive: 1 columna en móvil, hasta 4 en escritorio
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productos.map((producto, i) => (
              // Cada tarjeta tiene su propio Suspense independiente:
              // las que cargan antes (2 s) aparecen sin esperar a las lentas (3 s).
              // fallback es lo que se ve mientras ProductCard no ha resuelto su await.
              // i % 2 === 0 → posiciones pares tardan 2 s, impares 3 s.
              <Suspense key={producto.id} fallback={<SkeletonCard />}>
                <ProductCard
                  producto={producto}
                  delayMs={i % 2 === 0 ? 2000 : 3000}
                />
              </Suspense>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
