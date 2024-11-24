import TravelSearch from "@/components/planner/TravelSearch";
import BudgetManager from "@/components/planner/BudgetManager";
import { useState } from "react";

export default function Tickets() {
  const [totalBudget, setTotalBudget] = useState<number>(0);

  const handleAddToBudget = (description: string, amount: number, category: string) => {
    // This will be handled by the BudgetManager component
    setTotalBudget(prev => prev + amount);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">BookForMe Flight Tickets</h1>
      <TravelSearch onAddToBudget={handleAddToBudget} />
      <BudgetManager totalBudget={totalBudget} onBudgetChange={setTotalBudget} />
    </div>
  );
}
