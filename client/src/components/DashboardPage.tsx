import StatCard from "./StatCard";
import MatchCard from "./MatchCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Wallet, Activity, DollarSign } from "lucide-react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  const lineChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "P&L",
        data: [2000, 3500, 2800, 4200, 3800, 5100, 4800],
        borderColor: "hsl(145 85% 45%)",
        backgroundColor: "hsl(145 85% 45% / 0.1)",
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Bets Placed",
        data: [12, 19, 15, 25, 22, 30, 28],
        backgroundColor: "hsl(145 85% 45% / 0.8)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "hsl(220 20% 25% / 0.3)",
        },
        ticks: {
          color: "hsl(220 15% 70%)",
        },
      },
      y: {
        grid: {
          color: "hsl(220 20% 25% / 0.3)",
        },
        ticks: {
          color: "hsl(220 15% 70%)",
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your trading overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly P&L Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={lineChartData} options={chartOptions} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Betting Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={barChartData} options={chartOptions} />
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Live Matches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MatchCard
            team1="India"
            team2="Australia"
            league="ICC World Cup 2024"
            isLive={true}
            markets={[
              { name: "India to Win", backOdds: 1.85, layOdds: 1.90, backStake: 50000, layStake: 35000 },
            ]}
          />
          <MatchCard
            team1="England"
            team2="Pakistan"
            league="T20 Series"
            startTime="Today 7:30 PM"
            markets={[
              { name: "England to Win", backOdds: 1.65, layOdds: 1.70, backStake: 60000, layStake: 55000 },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
