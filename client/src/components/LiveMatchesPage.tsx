import { useState } from "react";
import MatchCard from "./MatchCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export default function LiveMatchesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const matches = [
    {
      team1: "India",
      team2: "Australia",
      league: "ICC World Cup 2024",
      isLive: true,
      markets: [
        { name: "India to Win", backOdds: 1.85, layOdds: 1.90, backStake: 50000, layStake: 35000 },
        { name: "Australia to Win", backOdds: 2.10, layOdds: 2.15, backStake: 40000, layStake: 45000 },
      ]
    },
    {
      team1: "England",
      team2: "Pakistan",
      league: "T20 Series",
      startTime: "Today 7:30 PM",
      markets: [
        { name: "England to Win", backOdds: 1.65, layOdds: 1.70, backStake: 60000, layStake: 55000 },
        { name: "Pakistan to Win", backOdds: 2.40, layOdds: 2.45, backStake: 35000, layStake: 30000 },
      ]
    },
    {
      team1: "South Africa",
      team2: "New Zealand",
      league: "Test Series",
      isLive: true,
      markets: [
        { name: "South Africa to Win", backOdds: 1.95, layOdds: 2.00, backStake: 45000, layStake: 40000 },
        { name: "New Zealand to Win", backOdds: 2.05, layOdds: 2.10, backStake: 38000, layStake: 42000 },
      ]
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Live Matches</h1>
        <p className="text-muted-foreground">Browse and bet on live cricket matches</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search matches..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
            data-testid="input-search-matches"
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-48" data-testid="select-filter">
            <SelectValue placeholder="Filter matches" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Matches</SelectItem>
            <SelectItem value="live">Live Only</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((match, idx) => (
          <MatchCard key={idx} {...match} />
        ))}
      </div>
    </div>
  );
}
