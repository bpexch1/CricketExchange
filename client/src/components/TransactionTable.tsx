import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Transaction {
  id: string;
  date: string;
  type: "deposit" | "withdrawal" | "bet_win" | "bet_loss";
  description: string;
  amount: number;
  balance: number;
}

interface TransactionTableProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

export default function TransactionTable({ transactions, isLoading }: TransactionTableProps) {
  const getTypeColor = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit":
      case "bet_win":
        return "bg-profit/20 text-profit border-profit/30";
      case "withdrawal":
      case "bet_loss":
        return "bg-loss/20 text-loss border-loss/30";
      default:
        return "";
    }
  };

  const getTypeLabel = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit": return "Deposit";
      case "withdrawal": return "Withdrawal";
      case "bet_win": return "Win";
      case "bet_loss": return "Loss";
    }
  };

  return (
    <div className="rounded-md border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                <TableCell><Skeleton className="h-4 w-36" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-4 w-20 ml-auto" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-4 w-20 ml-auto" /></TableCell>
              </TableRow>
            ))
          ) : transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-8" data-testid="text-no-transactions">
                No transactions yet
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((txn) => (
              <TableRow key={txn.id} data-testid={`row-transaction-${txn.id}`}>
                <TableCell className="font-mono text-sm">{txn.date}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getTypeColor(txn.type)}>
                    {getTypeLabel(txn.type)}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{txn.description}</TableCell>
                <TableCell className={`text-right font-mono font-semibold ${txn.amount >= 0 ? 'text-profit' : 'text-loss'}`}>
                  {txn.amount >= 0 ? '+' : ''}₹{Math.abs(txn.amount).toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-mono">₹{txn.balance.toLocaleString()}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
