"use client";

import Header from "./Header";
import FloatingEddy from "./FloatingEddy";

interface Props {
  goExplore: () => void;
  goHome: () => void;
}

export default function EarnCoins({
  goExplore,
  goHome,
}: Props) {
  return (
    <main className="min-h-screen bg-[#DDE2EA]">
      <Header
        goExplore={goExplore}
        goHome={goHome}
      />

      <section className="max-w-[1180px] mx-auto mt-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-[32px] p-8">
            <p className="text-sm font-bold text-zinc-500 uppercase">
              EDCOIN LABS
            </p>

            <h1 className="text-[48px] leading-[1] font-black mt-4 text-[#20212A]">
              Need more edcoins?
              <br />
              Play. Practice.
              Unlock.
            </h1>

            <p className="mt-5 text-zinc-600 text-[20px] leading-relaxed">
              Complete quick labs,
              quizzes and challenges
              to earn more coins.
            </p>

            <div className="mt-8 space-y-4">
              <button className="w-full rounded-2xl bg-[#FFC857] px-6 py-5 text-left font-bold text-[22px] flex justify-between">
                <span>
                  Start 5-min quiz
                </span>

                <span>
                  +120 coins
                </span>
              </button>

              <button className="w-full rounded-2xl bg-zinc-100 px-6 py-5 text-left font-bold text-[22px] flex justify-between">
                <span>
                  Complete daily streak
                </span>

                <span>
                  +80 coins
                </span>
              </button>

              <button className="w-full rounded-2xl bg-zinc-100 px-6 py-5 text-left font-bold text-[22px] flex justify-between">
                <span>
                  Submit mini project
                </span>

                <span>
                  +250 coins
                </span>
              </button>
            </div>

            <button
              onClick={goExplore}
              className="mt-10 rounded-full bg-black text-white px-8 py-4 font-bold text-[18px]"
            >
              Back to roadmaps →
            </button>
          </div>

          <div className="rounded-[32px] bg-black text-white p-8">
            <div className="w-28 h-28 rounded-full bg-[#FFC857] flex items-center justify-center text-5xl">
              🏛️
            </div>

            <h2 className="text-[88px] font-black mt-6 leading-none">
              4444
            </h2>

            <p className="text-[28px] mt-3 leading-snug text-zinc-200">
              Potential edcoins after
              completing today’s lab
              stack.
            </p>

            <div className="mt-10 rounded-[28px] bg-zinc-900 p-6">
              <p className="font-bold text-[24px]">
                Best next action
              </p>

              <p className="mt-3 text-zinc-300 text-[20px] leading-relaxed">
                Finish one quiz now
                and unlock at least
                one premium roadmap
                today.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FloatingEddy />
    </main>
  );
}