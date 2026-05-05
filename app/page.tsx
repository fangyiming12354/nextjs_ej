import Image from "next/image";
import Navbar from "@/app/components/Navbar";
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
      <Navbar categorias={categorias} categoriaActual={categoriaSlug} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Si no hay productos mostramos un mensaje */}
        {productos.length === 0 ? (
          <p className="text-center text-gray-500 py-16">No hay productos en esta categoría.</p>
        ) : (
          // Grid responsive: 1 columna en móvil, hasta 4 en escritorio
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productos.map((producto) => {
              // Si la imagen ya tiene "/" delante la usamos tal cual,
              // si no le añadimos la carpeta /productos/ donde están guardadas
              const imageUrl = producto.imagen?.startsWith("/")
                ? producto.imagen
                : `/productos/${producto.imagen}`;

              return (
                <div
                  key={producto.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Contenedor de imagen con altura fija */}
                  <div className="relative h-56 bg-gray-100">
                    {producto.imagen ? (
                      // Componente Image de Next.js: optimiza el tamaño y formato automáticamente
                      // fill = ocupa todo el contenedor padre (que tiene position: relative)
                      <Image
                        src={imageUrl}
                        alt={producto.nombre}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      // Si no hay imagen mostramos un placeholder
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        Sin imagen
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 text-sm leading-snug">
                      {producto.nombre}
                    </h3>
                    {/* Solo mostramos la descripción si existe, line-clamp-2 la corta en 2 líneas */}
                    {producto.descripcion && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {producto.descripcion}
                      </p>
                    )}
                    {/* toFixed(2) asegura que el precio siempre tenga 2 decimales */}
                    <p className="text-lg font-bold mt-2">
                      {Number(producto.precio).toFixed(2)}€
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
