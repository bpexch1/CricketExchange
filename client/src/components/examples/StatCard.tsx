import StatCard from '../StatCard';
import { TrendingUp, Wallet, Activity, DollarSign } from 'lucide-react';

export default function StatCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <StatCard
        title="Total Bets"
        value="1,234"
        icon={Activity}
        trend={{ value: "12%", positive: true }}
      />
      <StatCard
        title="Active Bets"
        value="45"
        icon={TrendingUp}
      />
      <StatCard
        title="P&L Today"
        value="₹12,500"
        icon={DollarSign}
        trend={{ value: "8.5%", positive: true }}
      />
      <StatCard
        title="Balance"
        value="₹98,750"
        icon={Wallet}
      />
    </div>
  );
}
