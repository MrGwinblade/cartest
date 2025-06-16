"use client";

import CarCard from "../components/car-card";
import CarPagination from "../components/pagination";
import SortSelector from "../components/sort-selector";
import LoadingSkeleton from "../components/loading-sceleton";
import { useSearchParams } from "next/navigation";
import { useCars } from "../lib/useCars";

export default function Home() {
  const searchParams = useSearchParams()

  const page = Number.parseInt(searchParams.get("page") || "1")
  const sort = searchParams.get("sort") || undefined
  const order = searchParams.get("order") || undefined

  const { data, loading, error } = useCars({ page, sort, order })

  return (
    <div className="container mx-auto px-4 py-8">

      <SortSelector />

      {loading && <LoadingSkeleton />}

      {error && (
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Ошибка загрузки</h3>
          <p className="text-gray-600">Не удалось загрузить список автомобилей. Попробуйте обновить страницу.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Обновить страницу
          </button>
        </div>
      )}

      {data && !loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.data.map((car) => (
              <CarCard key={car.unique_id} car={car} />
            ))}
          </div>

          <CarPagination currentPage={data.meta.page} totalPages={data.meta.last_page} />

          <div className="text-center text-sm text-gray-500 mt-4">
            Показано {data.meta.count} из {data.meta.total} автомобилей
          </div>
        </>
      )}
    </div>
  )
}
