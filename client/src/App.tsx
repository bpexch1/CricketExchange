import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
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

function AuthenticatedLayout() {
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
                <span className="font-mono font-bold">₹98,750</span>
              </div>
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

function App() {
  const [location] = useLocation();
  const isLoginPage = location === "/";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {isLoginPage ? (
          <LoginPage />
        ) : (
          <AuthenticatedLayout />
        )}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
