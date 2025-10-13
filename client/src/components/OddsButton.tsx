import { Button } from "@/components/ui/button";

interface OddsButtonProps {
  type: "back" | "lay";
  odds: number;
  stake?: number;
  onClick?: () => void;
}

export default function OddsButton({ type, odds, stake, onClick }: OddsButtonProps) {
  const bgColor = type === "back" ? "bg-back hover:bg-back/90" : "bg-lay hover:bg-lay/90";
  
  return (
    <Button
      variant="ghost"
      className={`${bgColor} text-white p-3 h-auto flex flex-col items-center gap-1 rounded-md no-default-hover-elevate no-default-active-elevate hover:brightness-110 active:brightness-90`}
      onClick={onClick}
      data-testid={`button-odds-${type}`}
    >
      <span className="text-lg font-bold font-mono">{odds.toFixed(2)}</span>
      {stake && <span className="text-xs opacity-90">₹{stake.toLocaleString()}</span>}
    </Button>
  );
}
