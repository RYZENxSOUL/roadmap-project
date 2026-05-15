"use client";

import { useState } from "react";

import Landing from "./components/Landing";
import Explore from "./components/Explore";
import RoadmapDetails from "./components/RoadmapDetails";
import EarnCoins from "./components/EarnCoins";

import { Roadmap } from "./types/roadmap";

type Page =
  | "landing"
  | "explore"
  | "details"
  | "earn";

export default function Home() {
  const [page, setPage] =
    useState<Page>("landing");

  const [
    selectedRoadmap,
    setSelectedRoadmap,
  ] = useState<Roadmap | null>(
    null
  );

  const goExplore = () => {
    setPage("explore");
  };

  const goHome = () => {
    setPage("landing");
  };

  const openRoadmap = (
    roadmap: Roadmap
  ) => {
    setSelectedRoadmap(roadmap);

    setPage("details");
  };

  const earnCoins = () => {
    setPage("earn");
  };

  return (
    <div className="min-h-screen bg-[#DDE2EA] text-[#20212A]">
      {page === "landing" && (
        <Landing
          goExplore={goExplore}
          goHome={goHome}
          openRoadmap={openRoadmap}
          earnCoins={earnCoins}
        />
      )}

      {page === "explore" && (
        <Explore
          goExplore={goExplore}
          goHome={goHome}
          openRoadmap={openRoadmap}
          earnCoins={earnCoins}
        />
      )}

      {page === "details" &&
        selectedRoadmap && (
          <RoadmapDetails
            roadmap={selectedRoadmap}
            goExplore={goExplore}
            goHome={goHome}
          />
        )}

      {page === "earn" && (
        <EarnCoins
          goExplore={goExplore}
          goHome={goHome}
        />
      )}
    </div>
  );
}