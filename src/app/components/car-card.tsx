import Image from "next/image"
import type { Car } from "@@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import React, { useState } from "react"

interface CarCardProps {
  car: Car
}

function CarCard({ car }: CarCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat("ru-RU").format(mileage)
  }


  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? (car.images?.image?.length || 1) - 1 : prev - 1
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === (car.images?.image?.length || 1) - 1 ? 0 : prev + 1
    )
  }


  const currentImage = car.images?.image?.[currentImageIndex] || "/placeholder.svg"

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div 
        className="relative h-48 bg-gray-100"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Image
          src={currentImage}
          alt={`${car.mark_id} ${car.folder_id}`}
          fill
          className="object-cover rounded-tl-xl rounded-tr-xl"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = "/placeholder.svg?height=200&width=300"
          }}
        />


        {car.images?.image?.length > 1 && isHovering && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}


        {car.images_amount > 1 && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            📷 {currentImageIndex + 1}/{car.images_amount}
          </div>
        )}
      </div>

      <CardContent className="px-4 flex-grow">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {car.mark_id} {car.folder_id}
        </h3>

        <div className="text-sm text-gray-600 mb-2">{car.modification_id}</div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Год:</span>
            <span>{car.year}</span>
          </div>
          <div className="flex justify-between">
            <span>Пробег:</span>
            <span>{formatMileage(car.run)} км</span>
          </div>
          <div className="flex justify-between">
            <span>Двигатель:</span>
            <span>
              {car.engine_volume / 1000}л ({car.engine_power})
            </span>
          </div>
          <div className="flex justify-between">
            <span>Коробка:</span>
            <span>{car.gearbox}</span>
          </div>
          {car.drive && (
            <div className="flex justify-between">
                <span>Привод:</span>
                <span>{car.drive}</span>
            </div>
            )}
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          <Badge variant="secondary" className="text-xs">
            {car.engine_type}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {car.body_type}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {car.color}
          </Badge>
          {car.owners_number_num === 1 && (
            <Badge variant="outline" className="text-xs text-green-600">
              1 владелец
            </Badge>
          )}
        </div>

        <div className="mt-3 space-y-1 text-xs text-gray-500">
          <div className="flex justify-between">
            <span>Состояние:</span>
            <span>{car.state}</span>
          </div>
          <div className="flex justify-between">
            <span>Наличие:</span>
            <span className={car.availability === "В наличии" ? "text-green-600" : "text-orange-600"}>
              {car.availability}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 shrink-0">
        <div className="w-full flex justify-between items-center">
          <div className="text-2xl font-bold text-green-600">{formatPrice(car.price)}</div>
          <Button 
            variant="default"
            className="bg-green-600 hover:bg-green-700 transition-colors"
            onClick={() => {
              
              console.log("Buy button clicked for", car.mark_id, car.folder_id)
            }}
          >
            Купить
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default React.memo(CarCard)