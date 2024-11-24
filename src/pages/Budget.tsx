import BudgetManager from "@/components/planner/BudgetManager";
import { useState } from "react";

export default function Budget() {
  const [totalBudget, setTotalBudget] = useState<number>(0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">BookForMe Budget</h1>
      <BudgetManager totalBudget={totalBudget} onBudgetChange={setTotalBudget} />
    </div>
  );
}