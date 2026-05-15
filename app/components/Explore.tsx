"use client";

import { useEffect, useMemo, useState } from "react";

import Header from "./Header";
import FloatingEddy from "./FloatingEddy";

interface Roadmap {
  _id?: string;
  title: string;
  category: string;
  level: string;
  duration: string;
  time: string;
  edcoins: number;
  sort: number;
  action: string;
}

interface Props {
  goExplore: () => void;
  goHome: () => void;
  openRoadmap: (item: Roadmap) => void;
  earnCoins: () => void;
}

export default function Explore({
  goExplore,
  goHome,
  openRoadmap,
  earnCoins,
}: Props) {
  const [roadmaps, setRoadmaps] =
    useState<Roadmap[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [query, setQuery] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [level, setLevel] =
    useState("All");

  const [duration, setDuration] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("recommended");

  useEffect(() => {
    async function fetchRoadmaps() {
      try {
        const response = await fetch(
          "/api/roadmaps"
        );

        const data =
          await response.json();

        setRoadmaps(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchRoadmaps();
  }, []);

  const categories = [
    "All",
    ...new Set(
      roadmaps.map(
        (item) => item.category
      )
    ),
  ];

  const levels = [
    "All",
    "Basic",
    "Intermediate",
    "Advanced",
  ];

  const durations = [
    "All",
    "Under 1 hour",
    "1–2 hours",
    "2–3 hours",
    "3+ hours",
  ];

  const filteredRoadmaps =
    useMemo(() => {
      let rows = [...roadmaps];

      if (query) {
        rows = rows.filter((item) =>
          item.title
            .toLowerCase()
            .includes(
              query.toLowerCase()
            )
        );
      }

      if (category !== "All") {
        rows = rows.filter(
          (item) =>
            item.category ===
            category
        );
      }

      if (level !== "All") {
        rows = rows.filter(
          (item) =>
            item.level === level
        );
      }

      if (duration !== "All") {
        rows = rows.filter(
          (item) =>
            item.duration ===
            duration
        );
      }

      rows.sort((a, b) => {
        if (sortBy === "shortest") {
          return a.sort - b.sort;
        }

        if (sortBy === "longest") {
          return b.sort - a.sort;
        }

        if (sortBy === "az") {
          return a.title.localeCompare(
            b.title
          );
        }

        if (sortBy === "coins") {
          return a.edcoins - b.edcoins;
        }

        return b.sort - a.sort;
      });

      return rows;
    }, [
      roadmaps,
      query,
      category,
      level,
      duration,
      sortBy,
    ]);

  if (loading) {
  return (
    <main className="min-h-screen bg-[#DDE2EA]">
      <Header
        goExplore={goExplore}
        goHome={goHome}
      />

      <section className="max-w-[1180px] mx-auto mt-6 px-3 animate-pulse">
        <div className="bg-white rounded-[24px] p-5 border border-zinc-200">
          <div className="h-5 w-60 bg-zinc-200 rounded"></div>

          <div className="mt-4 h-20 w-[420px] bg-zinc-200 rounded"></div>

          <div className="mt-4 h-5 w-[520px] bg-zinc-200 rounded"></div>

          <div className="mt-6 flex gap-3">
            <div className="h-12 w-36 bg-zinc-200 rounded-full"></div>

            <div className="h-12 w-40 bg-zinc-200 rounded-full"></div>

            <div className="h-12 w-28 bg-zinc-200 rounded-full"></div>

            <div className="h-12 w-48 bg-zinc-200 rounded-full"></div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-[20px] border border-zinc-300 p-4">
          {Array.from({ length: 6 }).map(
            (_, index) => (
              <div
                key={index}
                className="h-16 bg-zinc-100 rounded mb-3"
              ></div>
            )
          )}
        </div>
      </section>
    </main>
  );
}

  return (
    <main>
      <Header
        goExplore={goExplore}
        goHome={goHome}
      />

      <section className="max-w-[1180px] mx-auto mt-6 px-3">
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-zinc-200">
          <p className="text-zinc-500 font-medium text-[14px]">
            Home / Roadmaps / All roadmap
            list
          </p>

          <div className="mt-2 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-[48px] leading-[0.95] font-black text-[#20212A]">
                Explore 500+ <br />
                Roadmaps
              </h1>

              <p className="text-zinc-600 mt-3 text-[15px]">
                Search roadmaps instantly.
                Use the filters inside
                each column header, just
                like a spreadsheet.
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-100 px-4 py-3 w-[360px] flex items-center gap-3">
              <span className="text-zinc-500">
                ⌕
              </span>

              <input
                value={query}
                onChange={(e) =>
                  setQuery(
                    e.target.value
                  )
                }
                placeholder="Dynamic search by roadmap title..."
                className="bg-transparent outline-none flex-1 min-w-0 font-semibold text-[15px]"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 items-center">
            <span className="rounded-full bg-[#FFF3CF] px-4 py-2.5 font-semibold text-[14px]">
              {
                filteredRoadmaps.length
              }{" "}
              roadmaps
            </span>

            <span className="rounded-full bg-blue-50 px-4 py-2.5 font-semibold text-[14px]">
              119 learning hrs
            </span>

            <span className="rounded-full bg-green-50 px-4 py-2.5 font-semibold text-[14px]">
              21 free
            </span>

            <button
              onClick={earnCoins}
              className="rounded-full bg-black text-white px-5 py-2.5 font-bold text-[14px]"
            >
              🪙 Earn edcoins
            </button>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value
                )
              }
              className="rounded-full border border-zinc-300 bg-white px-4 py-2.5 font-semibold text-[14px]"
            >
              <option value="recommended">
                Recommended
              </option>

              <option value="shortest">
                Shortest
              </option>

              <option value="longest">
                Longest
              </option>

              <option value="az">
                A-Z
              </option>

              <option value="coins">
                Coins
              </option>
            </select>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-[20px] overflow-hidden border border-zinc-300">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] border-collapse text-[14px]">
              <thead>
                <tr className="bg-[#E8EAED]">
                  <th className="border border-zinc-300 px-3 py-2 text-left">
                    #
                  </th>

                  <th className="border border-zinc-300 px-3 py-2 text-left">
                    ROADMAP TITLE
                  </th>

                  <th className="border border-zinc-300 px-3 py-2 text-left">
                    CATEGORY
                  </th>

                  <th className="border border-zinc-300 px-3 py-2 text-left">
                    LEVEL
                  </th>

                  <th className="border border-zinc-300 px-3 py-2 text-left">
                    DURATION
                  </th>

                  <th className="border border-zinc-300 px-3 py-2 text-left">
                    TIME
                  </th>

                  <th className="border border-zinc-300 px-3 py-2 text-left">
                    EDCOINS
                  </th>

                  <th className="border border-zinc-300 px-3 py-2 text-left">
                    ACTION
                  </th>
                </tr>

                <tr className="bg-[#F5F5F5]">
                  <th className="border border-zinc-300"></th>

                  <th className="border border-zinc-300 px-3 py-2">
                    <input
                      value={query}
                      onChange={(e) =>
                        setQuery(
                          e.target.value
                        )
                      }
                      placeholder="Filtered by top search"
                      className="w-full border border-zinc-300 px-3 py-2 bg-white text-[14px]"
                    />
                  </th>

                  <th className="border border-zinc-300 px-3 py-2">
                    <select
                      value={category}
                      onChange={(e) =>
                        setCategory(
                          e.target.value
                        )
                      }
                      className="w-full border border-zinc-300 px-3 py-2 bg-white text-[14px]"
                    >
                      {categories.map(
                        (item) => (
                          <option
                            key={item}
                          >
                            {item}
                          </option>
                        )
                      )}
                    </select>
                  </th>

                  <th className="border border-zinc-300 px-3 py-2">
                    <select
                      value={level}
                      onChange={(e) =>
                        setLevel(
                          e.target.value
                        )
                      }
                      className="w-full border border-zinc-300 px-3 py-2 bg-white text-[14px]"
                    >
                      {levels.map(
                        (item) => (
                          <option
                            key={item}
                          >
                            {item}
                          </option>
                        )
                      )}
                    </select>
                  </th>

                  <th className="border border-zinc-300 px-3 py-2">
                    <select
                      value={duration}
                      onChange={(e) =>
                        setDuration(
                          e.target.value
                        )
                      }
                      className="w-full border border-zinc-300 px-3 py-2 bg-white text-[14px]"
                    >
                      {durations.map(
                        (item) => (
                          <option
                            key={item}
                          >
                            {item}
                          </option>
                        )
                      )}
                    </select>
                  </th>

                  <th className="border border-zinc-300"></th>

                  <th className="border border-zinc-300"></th>

                  <th className="border border-zinc-300"></th>
                </tr>
              </thead>

              <tbody>
                {filteredRoadmaps.map(
                  (
                    item,
                    index
                  ) => (
                    <tr
                      key={index}
                      className="hover:bg-[#FFF8E6]"
                    >
                      <td className="border border-zinc-300 px-3 py-2">
                        {index + 1}
                      </td>

                      <td className="border border-zinc-300 px-3 py-2">
                        <button
                          onClick={() => {
                            if (
                              item.action ===
                              "Open"
                            ) {
                              openRoadmap(
                                item
                              );
                            } else {
                              earnCoins();
                            }
                          }}
                          className="font-semibold text-[14px] text-blue-700 hover:underline text-left"
                        >
                          {item.title}
                        </button>
                      </td>

                      <td className="border border-zinc-300 px-3 py-2">
                        <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[12px] font-bold">
                          {
                            item.category
                          }
                        </span>
                      </td>

                      <td className="border border-zinc-300 px-3 py-2">
                        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[12px] font-bold">
                          {item.level}
                        </span>
                      </td>

                      <td className="border border-zinc-300 px-3 py-2">
                        {item.duration}
                      </td>

                      <td className="border border-zinc-300 px-3 py-2">
                        ⏱️ {item.time}
                      </td>

                      <td className="border border-zinc-300 px-3 py-2 font-semibold">
                        🪙 {item.edcoins}
                      </td>

                      <td className="border border-zinc-300 px-3 py-2">
                        <button
                          onClick={() => {
                            if (
                              item.action ===
                              "Open"
                            ) {
                              openRoadmap(
                                item
                              );
                            } else {
                              earnCoins();
                            }
                          }}
                          className={`rounded-full px-5 py-2 text-[13px] font-bold transition-all ${
                            item.action ===
                            "Open"
                              ? "bg-[#FFC857] hover:bg-[#ffbf33]"
                              : "bg-black text-white hover:opacity-90"
                          }`}
                        >
                          {item.action}
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FloatingEddy />
    </main>
  );
}