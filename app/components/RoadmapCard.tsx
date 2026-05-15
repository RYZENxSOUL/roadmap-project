"use client";

import { Roadmap } from "../types/roadmap";

interface Props {
  item: Roadmap;
  openRoadmap: (
    item: Roadmap
  ) => void;
  earnCoins: () => void;
}

function RoadmapIcon({
  category,
}: {
  category: string;
}) {
  const icons: Record<string, string> = {
    AI: "🤖",
    Product: "📊",
    Data: "🗄️",
    Design: "🎨",
    Frontend: "⌘",
  };

  return (
    <span className="text-5xl drop-shadow-sm">
      {icons[category] || "🌐"}
    </span>
  );
}

export default function RoadmapCard({
  item,
  openRoadmap,
  earnCoins,
}: Props) {
  return (
    <article className="min-w-[330px] max-w-[330px] bg-white rounded-[28px] p-3 shadow-sm border border-zinc-100 overflow-hidden transition-transform hover:-translate-y-1">
      <button
        onClick={() =>
          openRoadmap(item)
        }
        className="block w-full text-left h-40 rounded-t-[22px] relative overflow-hidden"
        style={{
          background: item.image,
        }}
      >
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_20%,white,transparent_25%),radial-gradient(circle_at_75%_70%,white,transparent_18%)]" />

        <span className="absolute top-0 left-4 rounded-b-lg bg-black/70 text-white px-3 py-1 text-sm">
          {item.tag}
        </span>

        <div className="absolute bottom-5 left-5 text-white">
          <RoadmapIcon
            category={item.category}
          />
        </div>
      </button>

      <div className="p-2">
        <button
          onClick={() =>
            openRoadmap(item)
          }
          className="text-left text-xl font-bold leading-tight hover:underline mt-3"
        >
          {item.title}
        </button>

        <p className="text-sm text-zinc-500 mt-3 line-clamp-2">
          <b className="text-zinc-800">
            Skills you will gain:
          </b>{" "}
          {item.skills.join(", ")}.
        </p>

        <div className="mt-5 flex items-center gap-4 text-zinc-600 font-semibold text-sm">
          <span>
            🏅 {item.time} hrs
          </span>

          <span>
            🪙 {item.cost} cost
          </span>

          <span>
            👥 {item.enrolled}
          </span>
        </div>

        <div className="mt-5 bg-zinc-100 w-36 py-2 px-4 font-bold relative">
          🏵️ Badge

          <span className="absolute right-[-18px] top-0 border-y-[18px] border-l-[18px] border-y-transparent border-l-zinc-100" />
        </div>

        <div className="border-t border-dashed border-zinc-500 mt-3 pt-3 flex items-center justify-between">
          <span>
            ❤️ {item.likes}
          </span>

          <button
            onClick={() =>
              openRoadmap(item)
            }
            className="rounded-full bg-[#FFC857] px-8 py-3 font-bold"
          >
            Enroll
          </button>
        </div>
      </div>
    </article>
  );
}