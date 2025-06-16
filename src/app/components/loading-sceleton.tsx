import { Card, CardContent, CardFooter } from "@/components/ui/card"
import React from "react"

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="h-48 bg-gray-200 animate-pulse" />
          <CardContent className="p-4">
            <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-12" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-12" />
              </div>
            </div>
            <div className="flex gap-1 mt-3">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-16" />
              <div className="h-5 bg-gray-200 rounded animate-pulse w-12" />
              <div className="h-5 bg-gray-200 rounded animate-pulse w-14" />
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-24" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default React.memo(LoadingSkeleton)
