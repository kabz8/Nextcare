import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Services from "@/pages/services";
import Booking from "@/pages/booking";
import Contact from "@/pages/contact";
import Team from "@/pages/team";
import Insurance from "@/pages/insurance";
import FAQ from "@/pages/faq";
import Marketplace from "@/pages/marketplace";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CalendarProvider } from "@/lib/CalendarContext";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/booking" component={Booking} />
          <Route path="/contact" component={Contact} />
          <Route path="/team" component={Team} />
          <Route path="/marketplace" component={Marketplace} />
          <Route path="/insurance" component={Insurance} />
          <Route path="/faq" component={FAQ} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CalendarProvider>
        <Router />
        <Toaster />
      </CalendarProvider>
    </QueryClientProvider>
  );
}

export default App;
