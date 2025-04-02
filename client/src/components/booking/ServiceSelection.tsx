import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Service } from "@shared/schema";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BookingData } from "@/pages/booking";

interface ServiceSelectionProps {
  onServiceSelect: (service: Service) => void;
  initialData?: BookingData;
}

export default function ServiceSelection({ onServiceSelect, initialData }: ServiceSelectionProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [customService, setCustomService] = useState<string>(initialData?.customService || "");
  const [useCustomService, setUseCustomService] = useState<boolean>(false);
  
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['/api/services']
  });

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setUseCustomService(false);
  };

  const handleCustomServiceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomService(e.target.value);
    setUseCustomService(true);
    setSelectedService(null);
  };

  const handleNextClick = () => {
    if (selectedService) {
      // Standard service selected - handle customService separately in the parent component
      onServiceSelect(selectedService);
      
      // We'll still pass the customService via the parent's state updates
      if (initialData) {
        initialData.customService = customService;
      }
    } else if (useCustomService && customService.trim()) {
      // Custom service only - create a placeholder service
      const customServiceObj: Service = {
        id: 999, // Using a placeholder ID for custom service
        name: "Custom Service",
        description: customService,
        icon: "custom" // Using placeholder icon
      };
      onServiceSelect(customServiceObj);
      
      // Store the custom service text
      if (initialData) {
        initialData.customService = customService;
      }
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
      
      <div className="mt-8">
        <Label htmlFor="customService" className="text-base font-medium">
          Don't see what you're looking for? Please describe your needs below:
        </Label>
        <Textarea
          id="customService"
          value={customService}
          onChange={handleCustomServiceChange}
          placeholder="Describe your dental needs or symptoms here..."
          className="mt-2 min-h-[100px]"
        />
      </div>
      
      <div className="flex justify-end mt-8">
        <Button 
          disabled={(!selectedService && (!useCustomService || !customService.trim()))} 
          onClick={handleNextClick}
          className="min-w-[100px]"
        >
          Next
        </Button>
      </div>
    </CardContent>
  );
}
