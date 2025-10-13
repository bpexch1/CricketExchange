import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import OddsButton from "./OddsButton";

interface MatchCardProps {
  team1: string;
  team2: string;
  league: string;
  isLive?: boolean;
  startTime?: string;
  markets: {
    name: string;
    backOdds: number;
    layOdds: number;
    backStake?: number;
    layStake?: number;
  }[];
}

export default function MatchCard({ team1, team2, league, isLive, startTime, markets }: MatchCardProps) {
  return (
    <Card className="hover-elevate" data-testid="card-match">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg mb-1">{team1} vs {team2}</CardTitle>
            <p className="text-sm text-muted-foreground">{league}</p>
          </div>
          {isLive ? (
            <Badge variant="default" className="gap-1">
              <span className="h-2 w-2 rounded-full bg-primary-foreground animate-pulse" />
              Live
            </Badge>
          ) : (
            <p className="text-xs text-muted-foreground">{startTime}</p>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {markets.map((market, idx) => (
          <div key={idx} className="space-y-2">
            <p className="text-sm font-medium">{market.name}</p>
            <div className="grid grid-cols-3 gap-2 items-center">
              <OddsButton 
                type="back" 
                odds={market.backOdds} 
                stake={market.backStake}
                onClick={() => console.log(`Back ${market.name} at ${market.backOdds}`)}
              />
              <p className="text-center text-xs text-muted-foreground">vs</p>
              <OddsButton 
                type="lay" 
                odds={market.layOdds} 
                stake={market.layStake}
                onClick={() => console.log(`Lay ${market.name} at ${market.layOdds}`)}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
