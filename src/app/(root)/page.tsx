"use client";

import { Suspense } from "react";
import CarList from "../components/car-list";

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-[200px]" />}>
      <CarList />
    </Suspense>
  );
}
