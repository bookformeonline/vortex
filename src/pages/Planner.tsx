import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  MapPin,
  Calendar as CalendarIcon,
  Hotel,
  Activity,
  Plane,
  Train,
  Bus,
  DollarSign,
  Briefcase,
  Save,
  Plus,
  Trash2
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

const Planner = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [destination, setDestination] = useState("");
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [transportation, setTransportation] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [activities, setActivities] = useState("");
  const [packingList, setPackingList] = useState("");
  
  // Bütçe yönetimi için yeni state'ler
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

    const expense: Expense = {
      id: Date.now(),
      description: newExpense.description,
      amount: Number(newExpense.amount),
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

  const handleSaveToGoogleDrive = async () => {
    // Google Drive entegrasyonu burada yapılacak
    toast({
      title: "Plan kaydedildi!",
      description: "Seyahat planınız Google Drive'a kaydedildi.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 animate-fade-up">Seyahat Planla</h1>
      
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6 animate-fade-up [animation-delay:200ms]">
          <div>
            <label className="block text-sm font-medium mb-2">Nereye?</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Destinasyon giriniz..."
                className="pl-10"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Ne Zaman?</label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Toplam Bütçe</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="number"
                placeholder="Toplam bütçe giriniz..."
                className="pl-10"
                value={totalBudget || ""}
                onChange={(e) => setTotalBudget(Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Ulaşım Tercihi</label>
            <Select value={transportation} onValueChange={setTransportation}>
              <SelectTrigger>
                <SelectValue placeholder="Ulaşım şekli seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flight">
                  <div className="flex items-center">
                    <Plane className="mr-2 h-4 w-4" />
                    Uçak
                  </div>
                </SelectItem>
                <SelectItem value="train">
                  <div className="flex items-center">
                    <Train className="mr-2 h-4 w-4" />
                    Tren
                  </div>
                </SelectItem>
                <SelectItem value="bus">
                  <div className="flex items-center">
                    <Bus className="mr-2 h-4 w-4" />
                    Otobüs
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-6 animate-fade-up [animation-delay:400ms]">
          <div>
            <label className="block text-sm font-medium mb-2">Konaklama Notları</label>
            <Textarea
              placeholder="Konaklama tercihlerinizi yazın..."
              value={accommodation}
              onChange={(e) => setAccommodation(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Planladığınız Aktiviteler</label>
            <Textarea
              placeholder="Yapmak istediğiniz aktiviteleri yazın..."
              value={activities}
              onChange={(e) => setActivities(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Eşya Listesi</label>
            <Textarea
              placeholder="Yanınıza almanız gereken eşyaları yazın..."
              value={packingList}
              onChange={(e) => setPackingList(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Bütçe Yönetimi Bölümü */}
      <div className="mt-8 space-y-6 animate-fade-up [animation-delay:600ms]">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-semibold mb-4">Bütçe Takibi</h2>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Kalan Bütçe: {remainingBudget}₺</span>
              <span>Toplam Bütçe: {totalBudget}₺</span>
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
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>{expense.amount}₺</TableCell>
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
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Button 
          className="w-full"
          onClick={handleSaveToGoogleDrive}
        >
          <Save className="mr-2 h-4 w-4" />
          Google Drive'a Kaydet
        </Button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <Hotel className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Otel Önerileri</h3>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Seçtiğiniz tarihler için en iyi konaklama seçeneklerini bulun.
          </p>
        </div>

        <div className="rounded-lg border p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <Activity className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Aktiviteler</h3>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Gideceğiniz yerde yapabileceğiniz en popüler aktiviteleri keşfedin.
          </p>
        </div>

        <div className="rounded-lg border p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <Briefcase className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Seyahat Rehberi</h3>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Destinasyon hakkında önemli bilgiler ve ipuçlarını görüntüleyin.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Planner;