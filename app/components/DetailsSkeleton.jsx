import React from "react";

export default function DetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-6 w-64 bg-[#e5e7eb] rounded mb-8"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-[#e5e7eb] rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-[#e5e7eb] rounded"></div>
            <div className="h-4 w-1/4 bg-[#e5e7eb] rounded"></div>
            <div className="h-6 w-1/3 bg-[#e5e7eb] rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-[#e5e7eb] rounded"></div>
              <div className="h-4 bg-[#e5e7eb] rounded"></div>
              <div className="h-4 bg-[#e5e7eb] rounded"></div>
              <div className="h-4 w-3/4 bg-[#e5e7eb] rounded"></div>
            </div>
            <div className="h-12 bg-[#e5e7eb] rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
