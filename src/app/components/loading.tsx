import LoadingSkeleton from "./loading-sceleton";


export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-48 mb-2" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-64" />
      </header>

      <div className="mb-6">
        <div className="h-10 bg-gray-200 rounded animate-pulse w-64" />
      </div>

      <LoadingSkeleton />
    </div>
  )
}