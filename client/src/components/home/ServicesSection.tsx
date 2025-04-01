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
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary font-medium rounded-full text-sm mb-4">Our Specialties</div>
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">Comprehensive Dental Services</h2>
          <p className="text-lg max-w-2xl mx-auto text-neutral-600">We offer a complete range of dental services using the latest technology to provide you with exceptional oral healthcare.</p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="card-gradient rounded-2xl overflow-hidden group">
                <div className="h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="mb-4 flex">
                      <Skeleton className="h-16 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-7 w-40 mb-2" />
                  </CardHeader>
                  <CardContent className="flex-grow pt-2">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                  <CardFooter className="justify-end pb-5">
                    <Skeleton className="h-5 w-24" />
                  </CardFooter>
                </div>
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
              <Card key={service.id} className="card-gradient rounded-2xl overflow-hidden group">
                <div className="h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="mb-4 flex">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border-2 border-primary/20 shadow-md group-hover:shadow-lg group-hover:border-primary/40 transition-all duration-300">
                        {(() => {
                          switch (service.icon) {
                            case 'tooth':
                              return <Stethoscope className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />;
                            case 'teeth':
                              return <Sparkles className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />;
                            case 'teeth-open':
                              return <Stethoscope className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />;
                            case 'clipboard-check':
                              return <FileCheck className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />;
                            case 'align-left':
                              return <AlignLeft className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />;
                            case 'first-aid':
                              return <AlertTriangle className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />;
                            case 'magic-wand-sparkles':
                              return <Syringe className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />;
                            default:
                              return <Stethoscope className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />;
                          }
                        })()}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-semibold text-primary">{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow pt-2">
                    <p className="text-neutral-600">{service.description}</p>
                  </CardContent>
                  <CardFooter className="justify-end pb-5">
                    <Link href="/booking" className="text-primary font-medium hover:text-primary/80 flex items-center group-hover:underline">
                      Book Now <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </Link>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        )}
        
        <div className="mt-16 text-center">
          <Link href="/services">
            <button className="px-8 py-3.5 bg-primary text-white rounded-full hover:bg-primary/90 transition-all flex items-center mx-auto font-medium shadow-md hover:shadow-lg hover:translate-y-[-2px]">
              View All Services <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
