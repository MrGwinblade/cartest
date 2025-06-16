"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCallback } from "react"

export default function SortSelector() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentSort = searchParams.get("sort")
  const currentOrder = searchParams.get("order")

  const getSortValue = () => {
    if (!currentSort || !currentOrder) return "none"
    return `${currentSort}-${currentOrder}`
  }

  const handleSortChange = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value === "none") {
      params.delete("sort")
      params.delete("order")
    } else {
      const [sort, order] = value.split("-")
      params.set("sort", sort)
      params.set("order", order)
    }

    
    params.set("page", "1")

    router.push(`/?${params.toString()}`)
  }, [router, searchParams])

  return (
    <div className="flex items-center gap-2 mb-6">
      <label htmlFor="sort" className="text-sm font-medium">
        Сортировка по цене:
      </label>
      <Select value={getSortValue()} onValueChange={handleSortChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Выберите сортировку" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">Не выбрана</SelectItem>
          <SelectItem value="price-asc">По возрастанию</SelectItem>
          <SelectItem value="price-desc">По убыванию</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
