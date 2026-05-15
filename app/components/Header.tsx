"use client";

function MiniIcon({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
    >
      {children}
    </span>
  );
}

interface Props {
  goExplore: () => void;
  goHome: () => void;
}

export default function Header({
  goExplore,
  goHome,
}: Props) {
  return (
    <header>
      <div className="h-9 bg-zinc-500 text-white flex items-center gap-10 overflow-hidden whitespace-nowrap text-sm font-semibold px-6">
        {Array.from({ length: 9 }).map(
          (_, index) => (
            <span
              key={index}
              className="flex items-center gap-3 opacity-95"
            >
              <MiniIcon>◈</MiniIcon>

              {index % 3 === 0
                ? "92% Success Stories"
                : index % 3 === 1
                ? "350+ Skill Quest"
                : "50000+ Learners"}
            </span>
          )
        )}
      </div>

      <div className="mx-auto mt-3 max-w-6xl rounded-full bg-white px-7 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-5">
          <button
            onClick={goHome}
            className="text-3xl font-black tracking-tight"
          >
            edQuest
          </button>

          <button
            onClick={goExplore}
            className="rounded-full bg-[#FFC857] px-5 py-3 font-semibold flex gap-2 items-center"
          >
            Explore
            <span>⌄</span>
          </button>

          <button className="rounded-full bg-black text-[#FFC857] border border-[#FFC857] px-5 py-3 font-semibold">
            Pro
          </button>
        </div>

        <div className="hidden md:flex rounded-2xl bg-zinc-100 px-4 py-3 min-w-[360px] items-center gap-3">
          <span className="text-zinc-500 flex-1">
            What do you want to learn?
          </span>

          <span className="bg-slate-950 text-white rounded-full px-3 py-2">
            ⌕
          </span>
        </div>

        <div className="flex items-center gap-4 font-semibold">
          <button onClick={goExplore}>
            Start here
          </button>

          <span className="rounded-full bg-orange-100 px-3 py-2">
            🔥 2
          </span>

          <span className="rounded-full bg-zinc-900 text-white px-3 py-2">
            👤
          </span>
        </div>
      </div>
    </header>
  );
}