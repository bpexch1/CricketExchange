import MatchCard from '../MatchCard';

export default function MatchCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <MatchCard
        team1="India"
        team2="Australia"
        league="ICC World Cup 2024"
        isLive={true}
        markets={[
          { name: "India to Win", backOdds: 1.85, layOdds: 1.90, backStake: 50000, layStake: 35000 },
          { name: "Australia to Win", backOdds: 2.10, layOdds: 2.15, backStake: 40000, layStake: 45000 },
        ]}
      />
      <MatchCard
        team1="England"
        team2="Pakistan"
        league="T20 Series"
        startTime="Today 7:30 PM"
        markets={[
          { name: "England to Win", backOdds: 1.65, layOdds: 1.70, backStake: 60000, layStake: 55000 },
          { name: "Pakistan to Win", backOdds: 2.40, layOdds: 2.45, backStake: 35000, layStake: 30000 },
        ]}
      />
    </div>
  );
}
