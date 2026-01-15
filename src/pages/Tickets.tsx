import TravelSearch from "@/components/planner/TravelSearch";
import ExpenseInput from "@/components/planner/ExpenseInput";
import { useToast } from "@/components/ui/use-toast";

export default function Tickets() {
  const { toast } = useToast();

  const handleAddExpense = (description: string, amount: number, category: string, date: string) => {
    toast({
      title: "Bütçeye eklendi",
      description: `${description} (${amount}₺) bütçeye eklendi.`
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Find Tickets</h1>
      <TravelSearch onAddToBudget={handleAddExpense} />
      <ExpenseInput onAddExpense={handleAddExpense} />
    </div>
  );
}