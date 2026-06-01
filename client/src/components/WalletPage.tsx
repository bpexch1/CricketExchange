import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TransactionTable from "./TransactionTable";
import { Wallet, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { getQueryFn } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@shared/schema";

export default function WalletPage() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const { toast } = useToast();

  const { data: user } = useQuery<User | null>({
    queryKey: ["/api/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const depositMutation = useMutation({
    mutationFn: async (amount: number) => {
      const res = await apiRequest("POST", "/api/wallet/deposit", { amount });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      setDepositAmount("");
      setDepositOpen(false);
      toast({ title: "Deposit successful", description: "Funds have been added to your wallet." });
    },
    onError: (err: any) => {
      toast({ title: "Deposit failed", description: err.message || "Something went wrong.", variant: "destructive" });
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: async (amount: number) => {
      const res = await apiRequest("POST", "/api/wallet/withdraw", { amount });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      setWithdrawAmount("");
      setWithdrawOpen(false);
      toast({ title: "Withdrawal successful", description: "Funds have been withdrawn from your wallet." });
    },
    onError: (err: any) => {
      toast({ title: "Withdrawal failed", description: err.message || "Something went wrong.", variant: "destructive" });
    },
  });

  const handleDeposit = () => {
    const amount = parseInt(depositAmount, 10);
    if (!amount || amount <= 0) {
      toast({ title: "Invalid amount", description: "Please enter a positive amount.", variant: "destructive" });
      return;
    }
    depositMutation.mutate(amount);
  };

  const handleWithdraw = () => {
    const amount = parseInt(withdrawAmount, 10);
    if (!amount || amount <= 0) {
      toast({ title: "Invalid amount", description: "Please enter a positive amount.", variant: "destructive" });
      return;
    }
    withdrawMutation.mutate(amount);
  };

  const mockTransactions = [
    { id: "1", date: "2024-10-13 14:30", type: "deposit" as const, description: "Account Deposit", amount: 10000, balance: 110000 },
    { id: "2", date: "2024-10-13 15:45", type: "bet_win" as const, description: "India vs Australia - Win", amount: 5500, balance: 115500 },
    { id: "3", date: "2024-10-13 16:20", type: "bet_loss" as const, description: "England vs Pakistan - Loss", amount: -2000, balance: 113500 },
    { id: "4", date: "2024-10-13 17:10", type: "withdrawal" as const, description: "Bank Transfer", amount: -5000, balance: 108500 },
    { id: "5", date: "2024-10-12 19:30", type: "bet_win" as const, description: "South Africa vs NZ - Win", amount: 3200, balance: 111700 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Wallet</h1>
        <p className="text-muted-foreground">Manage your funds and view transaction history</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              Available Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold font-mono" data-testid="text-balance">
              ₹{(user?.balance ?? 0).toLocaleString("en-IN")}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Virtual demo balance</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Dialog open={depositOpen} onOpenChange={setDepositOpen}>
              <DialogTrigger asChild>
                <Button className="flex-1 gap-2" data-testid="button-deposit">
                  <ArrowDownToLine className="h-4 w-4" />
                  Deposit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Deposit Funds</DialogTitle>
                  <DialogDescription>Add funds to your BetPro Exchange wallet</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="deposit-amount">Amount (₹)</Label>
                    <Input
                      id="deposit-amount"
                      type="number"
                      placeholder="Enter amount"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      data-testid="input-deposit-amount"
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={handleDeposit}
                    disabled={depositMutation.isPending}
                    data-testid="button-confirm-deposit"
                  >
                    {depositMutation.isPending ? "Processing..." : "Confirm Deposit"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1 gap-2" data-testid="button-withdraw">
                  <ArrowUpFromLine className="h-4 w-4" />
                  Withdraw
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Withdraw Funds</DialogTitle>
                  <DialogDescription>Withdraw funds from your wallet to your bank</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="withdraw-amount">Amount (₹)</Label>
                    <Input
                      id="withdraw-amount"
                      type="number"
                      placeholder="Enter amount"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      data-testid="input-withdraw-amount"
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={handleWithdraw}
                    disabled={withdrawMutation.isPending}
                    data-testid="button-confirm-withdraw"
                  >
                    {withdrawMutation.isPending ? "Processing..." : "Confirm Withdrawal"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionTable transactions={mockTransactions} />
        </CardContent>
      </Card>
    </div>
  );
}
