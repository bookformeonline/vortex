import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { MapPin, Save } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import BudgetManager from "@/components/planner/BudgetManager";
import TravelSearch from "@/components/planner/TravelSearch";

const Planner = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [destination, setDestination] = useState("");
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [transportation, setTransportation] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [activities, setActivities] = useState("");
  const [packingList, setPackingList] = useState("");

  const handleSaveToGoogleDrive = async () => {
    if (!destination || !selectedDate) {
      toast({
        title: "Hata",
        description: "Lütfen destinasyon ve tarih seçiniz.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Plan kaydedildi!",
      description: "Seyahat planınız Google Drive'a kaydedildi.",
    });
  };

  const handleAddToBudget = (description: string, amount: number, category: string) => {
    toast({
      title: "Bütçeye eklendi",
      description: `${description} (${amount}₺) bütçeye eklendi.`
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
            <label className="block text-sm font-medium mb-2">Ulaşım Tercihi</label>
            <Select value={transportation} onValueChange={setTransportation}>
              <SelectTrigger>
                <SelectValue placeholder="Ulaşım şekli seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flight">Uçak</SelectItem>
                <SelectItem value="train">Tren</SelectItem>
                <SelectItem value="bus">Otobüs</SelectItem>
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

      <div className="mt-8 space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-semibold mb-4">Seyahat Araması</h2>
          <TravelSearch onAddToBudget={handleAddToBudget} />
        </div>

        <BudgetManager totalBudget={totalBudget} onBudgetChange={setTotalBudget} />
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
    </div>
  );
};

export default Planner;