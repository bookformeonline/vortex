import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Plane, Map, Calendar, Package } from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 animate-fade-up">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
          Seyahat Planlamanın En Kolay Yolu
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Tüm seyahat planlarınızı tek bir yerde organize edin. Uçuşlar, oteller, aktiviteler ve daha fazlası.
        </p>
        <Link to={user ? "/planner" : "/register"}>
          <Button size="lg" className="animate-fade-in">
            {user ? "Seyahat Planla" : "Hemen Başla"}
            <Map className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow animate-fade-up [animation-delay:200ms]">
          <div className="bg-primary-soft p-3 rounded-full w-fit mb-4">
            <Plane className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Kolay Planlama</h3>
          <p className="text-gray-600">
            Uçuş, otel ve aktivite rezervasyonlarınızı kolayca planlayın ve organize edin.
          </p>
        </div>

        <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow animate-fade-up [animation-delay:400ms]">
          <div className="bg-secondary p-3 rounded-full w-fit mb-4">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Akıllı Takvim</h3>
          <p className="text-gray-600">
            Tüm seyahat planlarınızı takvimde görüntüleyin ve senkronize edin.
          </p>
        </div>

        <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow animate-fade-up [animation-delay:600ms]">
          <div className="bg-secondary-soft p-3 rounded-full w-fit mb-4">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Bavul Listesi</h3>
          <p className="text-gray-600">
            Yanınıza almanız gereken eşyaları akıllı liste ile unutmayın.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-primary-soft to-secondary p-8 rounded-2xl animate-fade-up [animation-delay:800ms]">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Hayalinizdeki Seyahati Planlamaya Hazır mısınız?
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Ücretsiz hesap oluşturun ve hemen planlamaya başlayın.
        </p>
        <Link to={user ? "/planner" : "/register"}>
          <Button variant="default" size="lg">
            {user ? "Seyahati Planla" : "Ücretsiz Başla"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;