import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface BetItem {
  id: string;
  match: string;
  selection: string;
  type: "back" | "lay";
  odds: number;
}

export default function BettingSlip() {
  const [bets, setBets] = useState<BetItem[]>([
    { id: "1", match: "India vs Australia", selection: "India to Win", type: "back", odds: 1.85 }
  ]);
  const [stakes, setStakes] = useState<Record<string, string>>({ "1": "1000" });

  const removeBet = (id: string) => {
    setBets(bets.filter(b => b.id !== id));
    const newStakes = { ...stakes };
    delete newStakes[id];
    setStakes(newStakes);
    console.log(`Removed bet ${id}`);
  };

  const quickStakes = [100, 500, 1000, 5000, 10000];

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Betting Slip</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {bets.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No bets added</p>
        ) : (
          bets.map((bet) => (
            <div key={bet.id} className="space-y-3 p-3 rounded-md bg-card border border-card-border">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm font-medium">{bet.match}</p>
                  <p className="text-xs text-muted-foreground">{bet.selection}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => removeBet(bet.id)}
                  data-testid={`button-remove-bet-${bet.id}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={bet.type === "back" ? "bg-back" : "bg-lay"}>
                  {bet.type === "back" ? "Back" : "Lay"}
                </Badge>
                <span className="text-sm font-mono font-bold">@ {bet.odds.toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Stake Amount</label>
                <Input
                  type="number"
                  placeholder="Enter stake"
                  value={stakes[bet.id] || ""}
                  onChange={(e) => setStakes({ ...stakes, [bet.id]: e.target.value })}
                  className="font-mono"
                  data-testid={`input-stake-${bet.id}`}
                />
                <div className="flex gap-1 flex-wrap">
                  {quickStakes.map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => setStakes({ ...stakes, [bet.id]: amount.toString() })}
                      data-testid={`button-quick-stake-${amount}`}
                    >
                      ₹{amount.toLocaleString()}
                    </Button>
                  ))}
                </div>
                <div className="pt-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Potential Return:</span>
                  <span className="font-bold font-mono">
                    ₹{((parseFloat(stakes[bet.id] || "0") * bet.odds) || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
        {bets.length > 0 && (
          <Button className="w-full" data-testid="button-place-bet">
            Place Bet{bets.length > 1 ? 's' : ''}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
