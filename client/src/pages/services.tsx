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
    switch (iconName) {
      case 'tooth':
        return <Stethoscope className="h-8 w-8 text-primary" />;
      case 'teeth':
        return <Sparkles className="h-8 w-8 text-primary" />;
      case 'teeth-open':
        return <Stethoscope className="h-8 w-8 text-primary" />;
      case 'clipboard-check':
        return <FileCheck className="h-8 w-8 text-primary" />;
      case 'align-left':
        return <AlignLeft className="h-8 w-8 text-primary" />;
      case 'first-aid':
        return <AlertTriangle className="h-8 w-8 text-primary" />;
      case 'magic-wand-sparkles':
        return <Syringe className="h-8 w-8 text-primary" />;
      default:
        return <Stethoscope className="h-8 w-8 text-primary" />;
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
                <Card key={i} className="h-72 animate-pulse">
                  <CardContent className="flex flex-col justify-center h-full bg-neutral-100"></CardContent>
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
                <Card key={service.id} className="bg-neutral-50 border-neutral-200 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="text-primary mb-4">
                      {getServiceIcon(service.icon)}
                    </div>
                    <CardTitle className="text-xl font-semibold">{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-neutral-700">{service.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Link href="/booking">
                      <Button variant="link" className="px-0 text-primary font-medium hover:underline flex items-center">
                        Book Now <span className="ml-2">→</span>
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
