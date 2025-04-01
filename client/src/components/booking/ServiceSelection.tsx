import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Service } from "@shared/schema";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface ServiceSelectionProps {
  onServiceSelect: (service: Service) => void;
}

export default function ServiceSelection({ onServiceSelect }: ServiceSelectionProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['/api/services']
  });

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
  };

  const handleNextClick = () => {
    if (selectedService) {
      onServiceSelect(selectedService);
    }
  };

  return (
    <CardContent className="px-6 py-8">
      <h3 className="text-2xl font-bold mb-6">We are excited to meet you.</h3>
      <p className="mb-6">What would you like to come in for?</p>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">Failed to load services. Please try again later.</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services?.map((service) => (
            <Button
              key={service.id}
              variant={selectedService?.id === service.id ? "default" : "outline"}
              className="h-auto py-4 px-6 justify-center text-center font-medium transition-colors"
              onClick={() => handleServiceClick(service)}
            >
              {service.name}
            </Button>
          ))}
        </div>
      )}
      
      <div className="flex justify-end mt-8">
        <Button 
          disabled={!selectedService} 
          onClick={handleNextClick}
          className="min-w-[100px]"
        >
          Next
        </Button>
      </div>
    </CardContent>
  );
}
