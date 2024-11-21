import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, PlaneLanding } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-16 md:grid-cols-2">
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="animate-fade-up text-4xl font-bold leading-tight md:text-6xl">
              Plan Your Next Adventure
              <span className="text-primary"> Effortlessly</span>
            </h1>
            <p className="animate-fade-up text-lg text-gray-600 [animation-delay:200ms]">
              Create beautiful travel itineraries, collaborate with friends, and discover amazing destinations.
            </p>
            <div className="animate-fade-up space-x-4 [animation-delay:400ms]">
              <Link to="/register">
                <Button size="lg" className="bg-primary">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden animate-fade-in md:block">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: MapPin, text: "Find perfect destinations" },
                { icon: Calendar, text: "Plan your itinerary" },
                { icon: PlaneLanding, text: "Book flights & hotels" },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="card-hover col-span-1 rounded-xl bg-white p-6 shadow-sm"
                  style={{ animationDelay: `${i * 200}ms` }}
                >
                  <feature.icon className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 font-semibold">{feature.text}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;