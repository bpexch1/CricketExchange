import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const removeBet = (id: string) => {
    setBets(bets.filter(b => b.id !== id));
    const newStakes = { ...stakes };
    delete newStakes[id];
    setStakes(newStakes);
  };

  const totalStake = bets.reduce((sum, bet) => {
    return sum + (parseInt(stakes[bet.id] || "0", 10) || 0);
  }, 0);

  const placeBetMutation = useMutation({
    mutationFn: async (stake: number) => {
      const res = await fetch("/api/bets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ amount: stake }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Could not place bet");
      }
      return data;
    },
    onSuccess: (_data, stake) => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      queryClient.invalidateQueries({ queryKey: ["/api/wallet/transactions"] });
      setBets([]);
      setStakes({});
      toast({
        title: "Bet placed",
        description: `₹${stake.toLocaleString("en-IN")} deducted from your balance.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Bet failed",
        description: error.message || "Could not place bet.",
        variant: "destructive",
      });
    },
  });

  const handlePlaceBets = () => {
    if (totalStake <= 0) {
      toast({
        title: "Invalid stake",
        description: "Please enter a valid stake amount.",
        variant: "destructive",
      });
      return;
    }
    placeBetMutation.mutate(totalStake);
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
          <div className="space-y-2">
            {placeBetMutation.isError && (
              <p className="text-sm text-destructive text-center" data-testid="text-bet-error">
                {placeBetMutation.error?.message || "Could not place bet"}
              </p>
            )}
            <Button
              className="w-full"
              data-testid="button-place-bet"
              onClick={handlePlaceBets}
              disabled={placeBetMutation.isPending || totalStake <= 0}
            >
              {placeBetMutation.isPending
                ? "Placing..."
                : `Place Bet${bets.length > 1 ? "s" : ""} · ₹${totalStake.toLocaleString("en-IN")}`}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
