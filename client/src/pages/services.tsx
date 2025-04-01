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
      
      <div className="bg-gradient-to-b from-primary/5 via-[#e8f5ff] to-white py-24 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-[#36B5A6]/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-[10%] w-80 h-80 rounded-full bg-[#00ADDD]/10 blur-3xl"></div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center">
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary font-medium rounded-full text-sm mb-4">
              Expert Dental Care
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">Our Dental Services</h1>
            <p className="text-lg text-center max-w-2xl mx-auto text-neutral-600">We offer a comprehensive range of dental services using the latest technology to provide you with exceptional oral healthcare.</p>
          </div>
        </div>
      </div>
      
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="border-0 rounded-2xl overflow-hidden animate-pulse">
                  <div className="bg-gradient-to-br from-[#E8F5FF] to-[#C5E8FF] h-full flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="mb-4 flex">
                        <div className="h-16 w-16 rounded-full bg-white/60 shadow-md"></div>
                      </div>
                      <div className="h-7 w-40 bg-white/60 rounded-md"></div>
                    </CardHeader>
                    <CardContent className="flex-grow pt-2">
                      <div className="h-4 w-full bg-white/60 rounded-md mb-3"></div>
                      <div className="h-4 w-full bg-white/60 rounded-md mb-3"></div>
                      <div className="h-4 w-full bg-white/60 rounded-md mb-3"></div>
                      <div className="h-4 w-2/3 bg-white/60 rounded-md"></div>
                    </CardContent>
                    <CardFooter className="justify-end pb-5">
                      <div className="h-5 w-24 bg-white/60 rounded-md"></div>
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
                <Card key={service.id} className="border-0 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] group">
                  <div className="bg-gradient-to-br from-[#E8F5FF] to-[#C5E8FF] h-full flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="mb-4 flex">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border-2 border-primary/20 shadow-md group-hover:shadow-lg group-hover:border-primary/40 transition-all duration-300">
                          {(() => {
                            switch (service.icon) {
                              case 'tooth':
                                return <Stethoscope className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />;
                              case 'teeth':
                                return <Sparkles className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />;
                              case 'teeth-open':
                                return <Stethoscope className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />;
                              case 'clipboard-check':
                                return <FileCheck className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />;
                              case 'align-left':
                                return <AlignLeft className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />;
                              case 'first-aid':
                                return <AlertTriangle className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />;
                              case 'magic-wand-sparkles':
                                return <Syringe className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />;
                              default:
                                return <Stethoscope className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />;
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
        </div>
      </div>
    </>
  );
}
