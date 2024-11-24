import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface ExpenseInputProps {
  onAddExpense: (description: string, amount: number, category: string, date: string) => void;
}

const ExpenseInput = ({ onAddExpense }: ExpenseInputProps) => {
  const { toast } = useToast();
  const [newExpense, setNewExpense] = useState({ 
    description: "", 
    amount: "", 
    category: "transportation",
    date: new Date().toISOString().split('T')[0]
  });

  const handleAddExpense = () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.date) {
      toast({
        title: "Hata",
        description: "Lütfen harcama açıklaması, tutarı ve tarihini giriniz.",
        variant: "destructive"
      });
      return;
    }

    const amount = parseFloat(newExpense.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Hata",
        description: "Lütfen geçerli bir tutar giriniz.",
        variant: "destructive"
      });
      return;
    }

    onAddExpense(
      newExpense.description,
      amount,
      newExpense.category,
      newExpense.date
    );

    setNewExpense({ 
      description: "", 
      amount: "", 
      category: "transportation",
      date: new Date().toISOString().split('T')[0]
    });
    
    toast({
      title: "Harcama eklendi",
      description: `${amount}₺ tutarında harcama eklendi.`
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-2xl font-semibold mb-4">Harcama Ekle</h2>
      <div className="grid gap-4 md:grid-cols-4 mb-4">
        <Input
          placeholder="Harcama açıklaması"
          value={newExpense.description}
          onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Tutar"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
        />
        <Input
          type="date"
          value={newExpense.date}
          onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
        />
        <Select 
          value={newExpense.category}
          onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Kategori seçin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="transportation">Ulaşım</SelectItem>
            <SelectItem value="accommodation">Konaklama</SelectItem>
            <SelectItem value="activities">Aktiviteler</SelectItem>
            <SelectItem value="food">Yemek</SelectItem>
            <SelectItem value="other">Diğer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleAddExpense} className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Harcama Ekle
      </Button>
    </div>
  );
};

export default ExpenseInput;