"use client";

import Header from "./Header";
import RoadmapCard from "./RoadmapCard";
import FloatingEddy from "./FloatingEddy";

import { ROADMAPS } from "../data/constants";
import { Roadmap } from "../types/roadmap";
import SnakeGame from "./games/SnakeGame";

interface Props {
  goExplore: () => void;
  goHome: () => void;
  openRoadmap: (
    item: Roadmap
  ) => void;
  earnCoins: () => void;
}

export default function Landing({
  goExplore,
  openRoadmap,
  earnCoins,
  goHome,
}: Props) {
  return (
    <main>
      <Header
        goExplore={goExplore}
        goHome={goHome}
      />

      <section className="max-w-6xl mx-auto text-center pt-9">
        <h1 className="text-4xl font-semibold">
          Good afternoon, <b>manan</b>
        </h1>

        <p className="mt-3 text-lg text-zinc-600">
          Grow and level up in your role
          Higher studies, Build projects,
          Learn a new skill, Personal
          Growth{" "}
          <button className="text-blue-600 underline">
            Edit goal, Time availability,
            Skill interest
          </button>{" "}
          ✎
        </p>

        <div className="mt-10 flex justify-center items-center gap-4">
          <b>
            Know Your Learner Type
          </b>

          <button className="rounded-full bg-[#FFC857] px-5 py-3 font-bold">
            View report
          </button>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto mt-8 px-4">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold">
            Suggested Roadmaps
          </h2>

          <button
            onClick={goExplore}
            className="bg-[#F7C600] rounded-xl px-4 py-2 font-black"
          >
            All Free 500+ Roadmaps List
          </button>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-7 snap-x scrollbar-hide">
          {ROADMAPS.slice(0, 5).map(
            (item, index) => (
              <RoadmapCard
                key={index}
                item={item}
                openRoadmap={
                  openRoadmap
                }
                earnCoins={
                  earnCoins
                }
              />
            )
          )}
        </div>

        <div className="flex justify-center gap-2">
          <span className="w-3 h-3 rounded-full bg-zinc-400" />

          <span className="w-16 h-3 rounded-full bg-zinc-400" />

          {Array.from({
            length: 7,
          }).map((_, index) => (
            <span
              key={index}
              className="w-3 h-3 rounded-full bg-zinc-300"
            />
          ))}
        </div>
      </section>

      <SnakeGame />

      <FloatingEddy />
    </main>
  );
}