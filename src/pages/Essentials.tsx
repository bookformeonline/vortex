import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ExpenseInput from "@/components/planner/ExpenseInput";

export default function Essentials() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    toast({
      title: "Searching essentials",
      description: `Looking for travel essentials: ${searchQuery}`,
    });
  };

  const handleAddExpense = (description: string, amount: number, category: string, date: string) => {
    toast({
      title: "Bütçeye eklendi",
      description: `${description} (${amount}₺) bütçeye eklendi.`
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">BookForMe Travel Essentials</h1>
      
      <div className="space-y-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2">
            <Input
              placeholder="Search for travel essentials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ExpenseInput onAddExpense={handleAddExpense} />
      </div>
    </div>
  );
}