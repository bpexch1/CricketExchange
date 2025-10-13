import TransactionTable from '../TransactionTable';

export default function TransactionTableExample() {
  const mockTransactions = [
    { id: "1", date: "2024-10-13 14:30", type: "deposit" as const, description: "Account Deposit", amount: 10000, balance: 110000 },
    { id: "2", date: "2024-10-13 15:45", type: "bet_win" as const, description: "India vs Australia - Win", amount: 5500, balance: 115500 },
    { id: "3", date: "2024-10-13 16:20", type: "bet_loss" as const, description: "England vs Pakistan - Loss", amount: -2000, balance: 113500 },
    { id: "4", date: "2024-10-13 17:10", type: "withdrawal" as const, description: "Bank Transfer", amount: -5000, balance: 108500 },
  ];

  return (
    <div className="p-4">
      <TransactionTable transactions={mockTransactions} />
    </div>
  );
}
