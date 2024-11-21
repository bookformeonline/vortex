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
  Save
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const Planner = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [transportation, setTransportation] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [activities, setActivities] = useState("");
  const [packingList, setPackingList] = useState("");

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

          <div>
            <label className="block text-sm font-medium mb-2">Bütçe</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="number"
                placeholder="Toplam bütçe giriniz..."
                className="pl-10"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
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

          <Button 
            className="w-full"
            onClick={handleSaveToGoogleDrive}
          >
            <Save className="mr-2 h-4 w-4" />
            Google Drive'a Kaydet
          </Button>
        </div>
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