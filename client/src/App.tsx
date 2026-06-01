import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import LoginPage from "@/components/LoginPage";
import DashboardPage from "@/components/DashboardPage";
import LiveMatchesPage from "@/components/LiveMatchesPage";
import WalletPage from "@/components/WalletPage";
import ReportsPage from "@/components/ReportsPage";
import BettingSlip from "@/components/BettingSlip";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import type { User } from "@shared/schema";

function AuthenticatedLayout({ user }: { user: User }) {
  const [, setLocation] = useLocation();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      queryClient.clear();
      setLocation("/");
    },
  });

  const style = {
    "--sidebar-width": "16rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b border-border">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-muted-foreground">Live</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Balance: </span>
                <span className="font-mono font-bold" data-testid="text-balance-header">₹{user.balance.toLocaleString("en-IN")}</span>
              </div>
              <span className="text-sm text-muted-foreground" data-testid="text-username">
                {user.username}
              </span>
              <Button
                variant="outline"
                size="sm"
                data-testid="button-logout"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
              >
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <div className="p-6">
              <Switch>
                <Route path="/dashboard" component={DashboardPage} />
                <Route path="/matches" component={LiveMatchesPage} />
                <Route path="/wallet" component={WalletPage} />
                <Route path="/reports" component={ReportsPage} />
              </Switch>
            </div>
          </main>
        </div>
        <div className="hidden lg:block w-96 border-l border-border p-4 overflow-auto">
          <BettingSlip />
        </div>
      </div>
    </SidebarProvider>
  );
}

function AppContent() {
  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["/api/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return <AuthenticatedLayout user={user} />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
