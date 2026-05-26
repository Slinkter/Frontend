import React from "react";
import { GitHubSearchDashboard } from "../features/github-search";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between">
      {/* Search feature container dashboard */}
      <GitHubSearchDashboard />
    </div>
  );
}

