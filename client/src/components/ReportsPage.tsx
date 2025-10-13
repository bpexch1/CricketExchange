import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, Bar } from "react-chartjs-2";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function ReportsPage() {
  const [period, setPeriod] = useState("week");

  const plData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Profit/Loss",
        data: [2000, -1500, 3500, 2800, -800, 5100, 4800],
        borderColor: "hsl(145 85% 45%)",
        backgroundColor: (context: any) => {
          const value = context.parsed?.y;
          return value >= 0 ? "hsl(145 75% 40% / 0.2)" : "hsl(0 75% 55% / 0.2)";
        },
        tension: 0.4,
      },
    ],
  };

  const betsByTypeData = {
    labels: ["Back Bets", "Lay Bets"],
    datasets: [
      {
        label: "Count",
        data: [156, 98],
        backgroundColor: [
          "hsl(210 100% 60% / 0.8)",
          "hsl(350 85% 55% / 0.8)",
        ],
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Detailed insights into your betting performance</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-40" data-testid="select-period">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total P&L</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-profit" data-testid="text-total-pl">+₹15,200</p>
            <p className="text-xs text-muted-foreground mt-1">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold" data-testid="text-win-rate">64.5%</p>
            <p className="text-xs text-muted-foreground mt-1">156 wins / 242 bets</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Stake</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold font-mono" data-testid="text-avg-stake">₹2,450</p>
            <p className="text-xs text-muted-foreground mt-1">Per bet</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily P&L Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={plData} options={chartOptions} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bets by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={betsByTypeData} options={chartOptions} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Matches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { match: "India vs Australia", profit: 5500, bets: 8 },
              { match: "England vs Pakistan", profit: 3200, bets: 5 },
              { match: "South Africa vs New Zealand", profit: 2800, bets: 6 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-md bg-card border border-card-border">
                <div>
                  <p className="font-medium">{item.match}</p>
                  <p className="text-sm text-muted-foreground">{item.bets} bets placed</p>
                </div>
                <p className="text-lg font-bold font-mono text-profit">+₹{item.profit.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
