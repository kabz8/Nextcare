import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Service } from "@shared/schema";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Stethoscope, 
  Sparkles, 
  FileCheck, 
  AlignLeft, 
  Syringe, 
  AlertTriangle 
} from "lucide-react";

export default function ServicesSection() {
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['/api/services']
  });

  // Filter to show only 6 main services
  const mainServices = services?.slice(0, 6);

  const getServiceIcon = (iconName: string) => {
    const IconWrapper = (icon: React.ReactNode) => (
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
        {icon}
      </div>
    );
    
    switch (iconName) {
      case 'tooth':
        return IconWrapper(<Stethoscope className="h-10 w-10 text-primary" />);
      case 'teeth':
        return IconWrapper(<Sparkles className="h-10 w-10 text-primary" />);
      case 'teeth-open':
        return IconWrapper(<Stethoscope className="h-10 w-10 text-primary" />);
      case 'clipboard-check':
        return IconWrapper(<FileCheck className="h-10 w-10 text-primary" />);
      case 'align-left':
        return IconWrapper(<AlignLeft className="h-10 w-10 text-primary" />);
      case 'first-aid':
        return IconWrapper(<AlertTriangle className="h-10 w-10 text-primary" />);
      case 'magic-wand-sparkles':
        return IconWrapper(<Syringe className="h-10 w-10 text-primary" />);
      default:
        return IconWrapper(<Stethoscope className="h-10 w-10 text-primary" />);
    }
  };

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">Our Dental Services</h2>
          <p className="text-lg max-w-2xl mx-auto">We offer a comprehensive range of dental services to meet all your oral health needs.</p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-neutral-50 border-neutral-200">
                <CardHeader>
                  <Skeleton className="h-20 w-20 rounded-full mb-4" />
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-4 w-24" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load services. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices?.map((service) => (
              <Card key={service.id} className="bg-neutral-50 border-neutral-200 hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
                <CardHeader>
                  <div className="text-primary mb-4">
                    {getServiceIcon(service.icon)}
                  </div>
                  <CardTitle className="text-xl font-semibold">{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-700">{service.description}</p>
                </CardContent>
                <CardFooter>
                  <Link href="/booking" className="text-primary font-medium hover:underline inline-flex items-center">
                    Book Now <span className="ml-2">→</span>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link href="/services">
            <button className="px-6 py-3 bg-neutral-100 text-neutral-900 border border-neutral-300 rounded-md font-medium hover:bg-neutral-200 transition-colors">
              View All Services
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
