import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Tickets() {
  const { toast } = useToast();
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");

  const handleSearch = () => {
    toast({
      title: "Searching flights",
      description: `Looking for flights from ${departure} to ${arrival}`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">BookForMe Flight Tickets</h1>
      
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex gap-2">
          <Input
            placeholder="From"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
          />
          <Input
            placeholder="To"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
          />
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}