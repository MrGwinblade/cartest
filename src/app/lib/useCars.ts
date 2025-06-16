import { useState, useEffect } from "react"
import type { ApiResponse } from "./types"

interface UseCarsParams {
  page: number
  sort?: string
  order?: string
}

interface UseCarsReturn {
  data: ApiResponse | null
  loading: boolean
  error: string | null
}

export function useCars({ page, sort, order }: UseCarsParams): UseCarsReturn {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const abortController = new AbortController()

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Updated to use the proxied API route
        let url = `/api/cars?_page=${page}`

        if (sort && order) {
          url += `&_sort=${sort}&_order=${order}`
        }

        const response = await fetch(url, {
          headers: {
            Accept: "application/json",
          },
          signal: abortController.signal,
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          console.log('Fetch aborted');
          return;
        }

        console.error("Error fetching cars:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch cars")
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      abortController.abort()
    }
  }, [page, sort, order])

  return { data, loading, error }
}