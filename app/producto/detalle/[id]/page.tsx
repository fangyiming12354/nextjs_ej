import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductoById } from "@/data/productos";
import { getStockByProducto } from "@/data/stock";
import BotonVolver from "@/app/components/BotonVolver";

// Next.js pasa los segmentos dinámicos de la URL en params.
// Para /producto/detalle/3 → params.id === "3"
export default async function DetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productoId = Number(id);

  // Consultamos el producto y su stock en paralelo para no esperar uno tras otro
  const [producto, stock] = await Promise.all([
    getProductoById(productoId),
    getStockByProducto(productoId),
  ]);

  // Si el id no existe en la BD mostramos la página 404 de Next.js
  if (!producto) notFound();

  const imageUrl = producto.imagen?.startsWith("/")
    ? producto.imagen
    : `/productos/${producto.imagen}`;

  // Stock total: suma de todas las cantidades de todas las tallas/colores
  const totalStock = stock.reduce((acc, s) => acc + s.cantidad, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* Botón volver — usa router.back() para regresar a la página anterior */}
        <div className="mb-6">
          <BotonVolver />
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Columna izquierda: imagen del producto — altura grande para que se vea bien */}
            <div className="relative h-[500px] lg:h-[600px] bg-gray-100">
              {producto.imagen ? (
                <Image
                  src={imageUrl}
                  alt={producto.nombre}
                  fill
                  className="object-contain p-6"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Sin imagen
                </div>
              )}
            </div>

            {/* Columna derecha: info del producto */}
            <div className="p-10 flex flex-col gap-5">
              <h1 className="text-3xl font-bold text-gray-900">{producto.nombre}</h1>

              {producto.descripcion && (
                <p className="text-gray-500 leading-relaxed">{producto.descripcion}</p>
              )}

              <p className="text-4xl font-bold text-indigo-700">
                {Number(producto.precio).toFixed(2)}€
              </p>

              {/* Indicador de stock total */}
              <div className="flex items-center gap-2">
                {/* Punto verde/rojo/naranja según cantidad disponible */}
                <span className={`w-2.5 h-2.5 rounded-full ${
                  totalStock === 0 ? "bg-red-500" :
                  totalStock < 10 ? "bg-orange-400" :
                  "bg-green-500"
                }`} />
                <span className="text-sm text-gray-600">
                  {totalStock === 0
                    ? "Sin stock"
                    : totalStock < 10
                    ? `Pocas unidades (${totalStock} disponibles)`
                    : `${totalStock} unidades disponibles`}
                </span>
              </div>

              {/* Tabla de stock por talla y color */}
              {stock.length > 0 && (
                <div className="mt-2">
                  <h2 className="text-sm font-semibold text-gray-700 mb-3">Stock por talla</h2>
                  <div className="border border-gray-100 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                        <tr>
                          <th className="px-4 py-3 text-left">Talla</th>
                          <th className="px-4 py-3 text-left">Color</th>
                          <th className="px-4 py-3 text-right">Cantidad</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {stock.map((s) => (
                          <tr key={s.id} className="hover:bg-gray-50">
                            {/* Talla en indigo-700, igual que el precio */}
                            <td className="px-4 py-3 font-semibold text-indigo-700">{s.talla ?? "—"}</td>
                            <td className="px-4 py-3 text-gray-600">{s.color ?? "—"}</td>
                            <td className="px-4 py-3 text-right">
                              {/* Resalta en rojo las filas con pocas unidades */}
                              <span className={s.cantidad === 0 ? "text-red-500 font-medium" : s.cantidad < 5 ? "text-orange-500 font-medium" : "text-gray-900"}>
                                {s.cantidad}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
