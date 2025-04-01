import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Service } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Stethoscope,
  Sparkles, 
  FileCheck, 
  AlignLeft, 
  Syringe, 
  AlertTriangle 
} from "lucide-react";

export default function Services() {
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['/api/services']
  });

  const getServiceIcon = (iconName: string) => {
    const IconWrapper = (icon: React.ReactNode) => (
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
        {icon}
      </div>
    );
    
    switch (iconName) {
      case 'tooth':
        return IconWrapper(<Stethoscope className="h-8 w-8 text-primary" />);
      case 'teeth':
        return IconWrapper(<Sparkles className="h-8 w-8 text-primary" />);
      case 'teeth-open':
        return IconWrapper(<Stethoscope className="h-8 w-8 text-primary" />);
      case 'clipboard-check':
        return IconWrapper(<FileCheck className="h-8 w-8 text-primary" />);
      case 'align-left':
        return IconWrapper(<AlignLeft className="h-8 w-8 text-primary" />);
      case 'first-aid':
        return IconWrapper(<AlertTriangle className="h-8 w-8 text-primary" />);
      case 'magic-wand-sparkles':
        return IconWrapper(<Syringe className="h-8 w-8 text-primary" />);
      default:
        return IconWrapper(<Stethoscope className="h-8 w-8 text-primary" />);
    }
  };

  return (
    <>
      <Helmet>
        <title>Our Services - Nextcare Dental Studio Kenya</title>
        <meta name="description" content="Learn about the comprehensive dental services we offer at Nextcare Dental Studio in Nairobi, Kenya including preventive, cosmetic, and restorative dental care." />
      </Helmet>
      
      <div className="bg-gradient-to-r from-primary/10 to-green-100 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 text-center">Our Dental Services</h1>
          <p className="text-lg text-center max-w-2xl mx-auto">We offer a comprehensive range of dental services to meet all your oral health needs.</p>
        </div>
      </div>
      
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="border-neutral-200 overflow-hidden animate-pulse">
                  <div className="bg-gradient-to-br from-primary/5 to-primary/15 h-full flex flex-col">
                    <CardHeader>
                      <div className="mb-4 flex">
                        <div className="h-16 w-16 rounded-full bg-neutral-200"></div>
                      </div>
                      <div className="h-6 w-32 bg-neutral-200 rounded"></div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="h-4 w-full bg-neutral-200 rounded mb-2"></div>
                      <div className="h-4 w-full bg-neutral-200 rounded mb-2"></div>
                      <div className="h-4 w-2/3 bg-neutral-200 rounded"></div>
                    </CardContent>
                    <CardFooter className="justify-end pb-4">
                      <div className="h-4 w-24 bg-neutral-200 rounded"></div>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-red-500 mb-2">Error Loading Services</h3>
              <p>Unable to load our services at this time. Please try again later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services?.map((service) => (
                <Card key={service.id} className="border-neutral-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="bg-gradient-to-br from-primary/5 to-primary/15 h-full flex flex-col">
                    <CardHeader>
                      <div className="mb-4 flex">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border-2 border-primary/20 shadow-sm">
                          {getServiceIcon(service.icon)}
                        </div>
                      </div>
                      <CardTitle className="text-xl font-semibold">{service.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="text-neutral-700">{service.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="justify-end pb-4">
                      <Link href="/booking" className="text-primary font-medium hover:underline flex items-center">
                        Book Now <span className="ml-2">→</span>
                      </Link>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
