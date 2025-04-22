import React from "react";

export default function ProductSkeleton() {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-4">
        <div className="h-4 w-1/3 bg-gray-200 rounded mb-2" />
        <div className="h-5 w-3/4 bg-gray-200 rounded mb-4" />
        <div className="flex justify-between items-center">
          <div className="h-5 w-16 bg-gray-200 rounded" />
          <div className="flex space-x-2">
            <div className="h-7 w-7 bg-gray-200 rounded-full" />
            <div className="h-7 w-7 bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
