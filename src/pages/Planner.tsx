import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { MapPin, Calendar as CalendarIcon, Hotel, Activity } from "lucide-react";

const Planner = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [destination, setDestination] = useState("");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 animate-fade-up">Seyahat Planla</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
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

          <Button className="w-full">
            Planlamaya Başla
          </Button>
        </div>

        <div className="space-y-4 animate-fade-up [animation-delay:400ms]">
          <div className="rounded-lg border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <Hotel className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Konaklama Önerileri</h3>
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
        </div>
      </div>
    </div>
  );
};

export default Planner;