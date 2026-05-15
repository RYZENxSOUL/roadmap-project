"use client";

export default function FloatingEddy() {
  return (
    <div className="fixed right-5 top-1/2 z-20 flex flex-col items-center gap-4">
      <div className="bg-white border-2 border-zinc-900 rounded-xl p-2 font-bold">
        🪙 4444
      </div>

      <button className="bg-white rounded-2xl border p-2 shadow">
        <span className="text-4xl">
          🤖
        </span>

        <p className="font-bold">
          Ask Eddy
        </p>
      </button>
    </div>
  );
}