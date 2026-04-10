"use client"

import Image from "next/image"

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`w-12 h-12 rounded-2xl overflow-hidden ${className ?? ""}`}>
      <Image
        src="/логотип.png"
        alt="Логотип"
        width={48}
        height={48}
        className="w-full h-full object-cover"
      />
    </div>
  )
}
