import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SearchResult {
  id: string;
  type: string;
  title: string;
  price: number;
  url: string;
}

interface TravelSearchProps {
  onAddToBudget: (description: string, amount: number, category: string) => void;
}

const TravelSearch = ({ onAddToBudget }: TravelSearchProps) => {
  const { toast } = useToast();
  const [searchType, setSearchType] = useState("flight");
  const [departurePoint, setDeparturePoint] = useState("");
  const [arrivalPoint, setArrivalPoint] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!departurePoint || !arrivalPoint) {
      toast({
        title: "Hata",
        description: "Lütfen başlangıç ve varış noktalarını giriniz.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Not: Gerçek API entegrasyonu için TravelPayouts API anahtarı gerekli
      // Şu an için örnek veri döndürüyoruz
      const mockResults: SearchResult[] = [
        {
          id: "1",
          type: searchType,
          title: `${departurePoint} - ${arrivalPoint} örnek sonuç 1`,
          price: Math.floor(Math.random() * 1000) + 500,
          url: "https://example.com/1"
        },
        {
          id: "2",
          type: searchType,
          title: `${departurePoint} - ${arrivalPoint} örnek sonuç 2`,
          price: Math.floor(Math.random() * 1000) + 500,
          url: "https://example.com/2"
        }
      ];
      
      setResults(mockResults);
      toast({
        title: "Arama tamamlandı",
        description: `${mockResults.length} sonuç bulundu.`
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Arama sırasında bir hata oluştu.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addToBudget = (result: SearchResult) => {
    const category = result.type === "flight" ? "transportation" : "activities";
    onAddToBudget(result.title, result.price, category);
    toast({
      title: "Bütçeye eklendi",
      description: `${result.title} bütçeye eklendi.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Select value={searchType} onValueChange={setSearchType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Arama türü seçin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flight">Uçuş</SelectItem>
            <SelectItem value="train">Tren</SelectItem>
            <SelectItem value="bus">Otobüs</SelectItem>
            <SelectItem value="activity">Aktivite/Tur</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex-1 flex gap-2">
          <Input
            placeholder="Başlangıç noktası"
            value={departurePoint}
            onChange={(e) => setDeparturePoint(e.target.value)}
          />
          <Input
            placeholder="Varış noktası"
            value={arrivalPoint}
            onChange={(e) => setArrivalPoint(e.target.value)}
          />
          <Button onClick={handleSearch} disabled={loading}>
            <Search className="mr-2 h-4 w-4" />
            Ara
          </Button>
        </div>
      </div>

      {results.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Başlık</TableHead>
                <TableHead>Fiyat</TableHead>
                <TableHead className="w-[100px]">İşlem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.id}>
                  <TableCell>{result.title}</TableCell>
                  <TableCell>{result.price.toLocaleString('tr-TR')}₺</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => addToBudget(result)}
                    >
                      Bütçeye Ekle
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default TravelSearch;