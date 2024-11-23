import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import BudgetChart from "./BudgetChart";

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface BudgetManagerProps {
  totalBudget: number;
  onBudgetChange: (budget: number) => void;
}

const CATEGORY_NAMES: { [key: string]: string } = {
  transportation: "Ulaşım",
  accommodation: "Konaklama",
  activities: "Aktiviteler",
  food: "Yemek",
  other: "Diğer"
};

const BudgetManager = ({ totalBudget, onBudgetChange }: BudgetManagerProps) => {
  const { toast } = useToast();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState({ description: "", amount: "", category: "transportation" });

  const remainingBudget = totalBudget - expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const budgetProgress = totalBudget > 0 ? ((totalBudget - remainingBudget) / totalBudget) * 100 : 0;

  const handleAddExpense = () => {
    if (!newExpense.description || !newExpense.amount) {
      toast({
        title: "Hata",
        description: "Lütfen harcama açıklaması ve tutarını giriniz.",
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

    if (amount > remainingBudget) {
      toast({
        title: "Uyarı",
        description: "Bu harcama bütçenizi aşıyor!",
        variant: "destructive"
      });
      return;
    }

    const expense: Expense = {
      id: Date.now(),
      description: newExpense.description,
      amount: amount,
      category: newExpense.category
    };

    setExpenses([...expenses, expense]);
    setNewExpense({ description: "", amount: "", category: "transportation" });
    
    toast({
      title: "Harcama eklendi",
      description: `${expense.amount}₺ tutarında harcama eklendi.`
    });
  };

  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
    toast({
      title: "Harcama silindi",
      description: "Harcama başarıyla silindi."
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold mb-4">Bütçe Takibi</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Toplam Bütçe</label>
          <Input
            type="number"
            placeholder="Toplam bütçe giriniz..."
            value={totalBudget || ""}
            onChange={(e) => onBudgetChange(Number(e.target.value))}
            className="mb-4"
          />
          <div className="flex justify-between text-sm mb-2">
            <span>Kalan Bütçe: {remainingBudget.toLocaleString('tr-TR')}₺</span>
            <span>Toplam Bütçe: {totalBudget.toLocaleString('tr-TR')}₺</span>
          </div>
          <Progress value={budgetProgress} className="h-2" />
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-4">
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

        <Button onClick={handleAddExpense} className="w-full mb-4">
          <Plus className="mr-2 h-4 w-4" /> Harcama Ekle
        </Button>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Açıklama</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Tutar</TableHead>
                  <TableHead className="w-[100px]">İşlem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>{CATEGORY_NAMES[expense.category]}</TableCell>
                    <TableCell>{expense.amount.toLocaleString('tr-TR')}₺</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteExpense(expense.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {expenses.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500">
                      Henüz harcama eklenmemiş
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Harcama Dağılımı</h3>
            <BudgetChart expenses={expenses} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetManager;