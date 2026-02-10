'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white gap-6 p-4">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Sayaç</h1>
      
      <p className="text-8xl md:text-9xl font-black text-emerald-400">
        {count}
      </p>

      <div className="flex flex-wrap gap-4 justify-center mt-8">
        <button
          onClick={() => setCount(count + 1)}
          className="px-10 py-5 bg-green-600 hover:bg-green-500 rounded-xl text-2xl md:text-3xl font-bold active:scale-95 transition shadow-lg"
        >
          +1
        </button>

        <button
          onClick={() => setCount(count - 1)}
          className="px-10 py-5 bg-red-600 hover:bg-red-500 rounded-xl text-2xl md:text-3xl font-bold active:scale-95 transition shadow-lg"
        >
          -1
        </button>

        <button
          onClick={() => setCount(0)}
          className="px-10 py-5 bg-gray-700 hover:bg-gray-600 rounded-xl text-2xl md:text-3xl font-bold active:scale-95 transition shadow-lg"
        >
          Sıfırla
        </button>
      </div>
    </div>
  )
}