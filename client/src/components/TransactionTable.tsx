import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
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
          {transactions.map((txn) => (
            <TableRow key={txn.id} data-testid={`row-transaction-${txn.id}`}>
              <TableCell className="font-mono text-sm">{txn.date}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getTypeColor(txn.type)}>
                  {getTypeLabel(txn.type)}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">{txn.description}</TableCell>
              <TableCell className={`text-right font-mono font-semibold ${txn.amount >= 0 ? 'text-profit' : 'text-loss'}`}>
                {txn.amount >= 0 ? '+' : ''}₹{txn.amount.toLocaleString()}
              </TableCell>
              <TableCell className="text-right font-mono">₹{txn.balance.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
