"use client";

import Header from "./Header";
import FloatingEddy from "./FloatingEddy";

import { Roadmap } from "../types/roadmap";

interface Props {
  roadmap: Roadmap;
  goHome: () => void;
  goExplore: () => void;
}

export default function RoadmapDetails({
  roadmap,
  goHome,
  goExplore,
}: Props) {
  return (
    <main className="min-h-screen bg-[#DDE2EA]">
      <Header
        goHome={goHome}
        goExplore={goExplore}
      />

      <section className="max-w-[1180px] mx-auto mt-8">
        <p className="text-zinc-600 text-[15px] mb-4">
          Home / Roadmaps /
          <span className="font-semibold text-black">
            {" "}
            {roadmap.title}
          </span>
        </p>

        <div className="bg-white rounded-[28px] overflow-hidden border border-zinc-200">
          <div className="bg-[#FFD261] p-6 flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-5xl">
              🌐
            </div>

            <div>
              <p className="text-sm text-zinc-700">
                Skill Wise
              </p>

              <h1 className="text-3xl font-black text-[#20212A]">
                {roadmap.title}
              </h1>
            </div>
          </div>

          <div className="p-5">
            <div className="bg-[#E8EEF7] rounded-3xl p-4">
              <p className="text-lg font-medium mb-4">
                Overall Progress
              </p>

              <div className="w-full h-8 rounded-full bg-white overflow-hidden">
                <div className="h-full w-[80%] bg-[#8EBDF5] rounded-full flex items-center justify-center font-bold">
                  80%
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-8">
              <div className="flex gap-4">
                <span className="text-green-500 text-xl">
                  •
                </span>

                <div>
                  <h3 className="text-2xl font-semibold">
                    Roadmap overview
                  </h3>

                  <p className="text-zinc-500">
                    Read | 3 Mins
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-green-500 text-xl">
                  •
                </span>

                <div>
                  <h3 className="text-2xl font-semibold">
                    Core concepts
                  </h3>

                  <p className="text-zinc-500">
                    Read | 3 Mins
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-green-500 text-xl">
                  •
                </span>

                <div>
                  <h3 className="text-2xl font-semibold">
                    Practice task
                  </h3>

                  <p className="text-zinc-500">
                    Read | 3 Mins
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-yellow-500 text-xl">
                  •
                </span>

                <div>
                  <h3 className="text-2xl font-semibold">
                    Assessment
                  </h3>

                  <p className="text-zinc-500">
                    Quiz | 10 Mins
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-zinc-200 pt-5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold">
                  Certification
                </h3>

                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm font-bold">
                  free
                </span>
              </div>

              <button className="font-semibold">
                Get certified
              </button>
            </div>

            <div className="mt-8 flex justify-between items-center">
              <div>
                <h1 className="text-5xl font-black text-[#20212A]">
                  {roadmap.title}
                </h1>

                <span className="inline-block mt-4 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                  {roadmap.level} Level
                </span>
              </div>

              <div className="flex items-center gap-5">
                <span className="font-bold text-xl">
                  🏅 {roadmap.time}
                </span>

                <button className="bg-black text-[#FFD261] px-8 py-4 rounded-full font-bold text-lg">
                  Resume Learning
                </button>
              </div>
            </div>

            <div className="mt-8 border-t border-zinc-200 pt-8">
              <h2 className="text-4xl font-black mb-6">
                What you will learn:
              </h2>

              <div className="grid grid-cols-2 gap-6 text-2xl">
                <div>• Coding</div>
                <div>
                  • Build practical
                  confidence
                </div>
              </div>
            </div>

            <div className="mt-8 border border-zinc-200 rounded-3xl p-6 flex justify-between items-center">
              <div className="font-bold text-2xl">
                🏵 Badge
              </div>

              <div className="font-bold text-2xl">
                🪙 {roadmap.edcoins} Edcoins
              </div>

              <div className="font-bold text-2xl">
                👥 2194 Enrolled
              </div>

              <div className="font-bold text-2xl">
                ⭐ 4.7 Rating
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-4xl font-black mb-6">
                Skills you will gain
              </h2>

              <span className="bg-zinc-100 px-5 py-3 rounded-full text-xl font-medium">
                {roadmap.category}
              </span>
            </div>

            <div className="mt-10">
              <h2 className="text-4xl font-black mb-6">
                Course Modules
              </h2>

              <div className="border border-zinc-200 rounded-3xl overflow-hidden">
                {[
                  "Roadmap overview",
                  "Core concepts",
                  "Practice task",
                  "Assessment",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-6 py-6 border-b border-zinc-200 last:border-none"
                  >
                    <h3 className="text-2xl font-semibold">
                      {index + 1}. {item}
                    </h3>

                    <div className="flex items-center gap-6 text-xl font-semibold">
                      <span>
                        🏅 15 mins
                      </span>

                      <span>
                        🪙 65 Edcoins
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={goExplore}
              className="mt-10 bg-black text-white px-8 py-4 rounded-full text-xl font-bold"
            >
              ← Back to roadmaps
            </button>
          </div>
        </div>
      </section>

      <FloatingEddy />
    </main>
  );
}