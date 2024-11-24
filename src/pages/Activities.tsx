import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Activities() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    toast({
      title: "Searching tours & activities",
      description: `Looking for activities in ${searchQuery}`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">BookForMe Tours & Activities</h1>
      
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex gap-2">
          <Input
            placeholder="Search for activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}