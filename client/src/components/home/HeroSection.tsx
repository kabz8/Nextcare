import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star, Shield, Clock, Heart } from "lucide-react";
import heroDentistImage from "../../assets/hero-dentist.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] bg-gradient-to-br from-white via-[#e8f5ff] to-[#e6f7fc] flex items-center py-16 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-[5%] w-64 h-64 rounded-full bg-[#36B5A6]/10 blur-3xl"></div>
      <div className="absolute bottom-20 left-[5%] w-80 h-80 rounded-full bg-[#00ADDD]/10 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <div className="inline-block bg-primary/10 text-primary font-medium px-4 py-2 rounded-full mb-6 animate-pulse">
              Leading Dental Service in Kenya
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-primary">Your</span> <span className="text-[#00ADDD]">Smile</span> <span className="text-primary">Is Our</span> <span className="relative inline-block">
                <span className="text-[#36B5A6]">Priority</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-[#36B5A6]/20 -z-10 rounded-full"></span>
              </span>
            </h1>
            <p className="text-lg text-neutral-700 mb-10 max-w-xl leading-relaxed">
              Experience exceptional dental care in a comfortable environment. Our team is dedicated to helping you achieve your best smile with modern technologies and personalized treatment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 mb-12">
              <Link href="/booking">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 px-8 py-6 h-auto font-medium text-base">
                  Book an Appointment
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-[#00ADDD] text-[#00ADDD] hover:bg-[#00ADDD]/10 px-8 py-6 h-auto font-medium text-base">
                  Explore Our Services
                </Button>
              </Link>
            </div>
            
            {/* Feature highlights with improved design */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 shadow-inner">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <span className="text-neutral-700 font-medium">Top-rated dental care</span>
              </div>
              <div className="flex items-center bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#00ADDD]/10 flex items-center justify-center mr-4 shadow-inner">
                  <Shield className="h-6 w-6 text-[#00ADDD]" />
                </div>
                <span className="text-neutral-700 font-medium">Insurance coverage</span>
              </div>
              <div className="flex items-center bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#36B5A6]/10 flex items-center justify-center mr-4 shadow-inner">
                  <Clock className="h-6 w-6 text-[#36B5A6]" />
                </div>
                <span className="text-neutral-700 font-medium">Convenient hours</span>
              </div>
              <div className="flex items-center bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 shadow-inner">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <span className="text-neutral-700 font-medium">Patient-centered care</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center relative">
            {/* Floating decorative elements */}
            <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-[#36B5A6]/20 z-0 hidden md:block"></div>
            <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-[#00ADDD]/20 z-0 hidden md:block animate-pulse"></div>
            <div className="absolute top-1/2 right-1/4 w-12 h-12 rounded-full bg-primary/30 z-0 hidden md:block"></div>
            
            {/* Main image container with enhanced styling */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-primary/30 border-[8px] border-white transform hover:scale-[1.02] transition-transform duration-500 rotate-1">
              <img 
                src={heroDentistImage} 
                alt="Smiling dental professional at Nextcare Dental Studio" 
                className="max-w-full h-auto object-cover" 
                width="540" 
                height="540"
              />
              
              {/* Improved overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-[#00ADDD]/5 to-transparent mix-blend-overlay"></div>
              
              {/* Bottom info banner */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4 border-t-4 border-primary">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-primary">Nextcare Dental Studio</p>
                    <p className="text-sm text-neutral-600">Kiambu Road, Nairobi</p>
                  </div>
                  <div className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                    Open Today
                  </div>
                </div>
              </div>
            </div>
            
            {/* Second smaller image positioned at the edge */}
            <div className="absolute -bottom-8 -right-8 z-20 md:block">
              <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-primary/20 border-[6px] border-white transform -rotate-6 hover:scale-105 transition-all duration-300" style={{ width: "180px", height: "180px" }}>
                <img 
                  src={heroDentistImage} 
                  alt="Dental treatment chair" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-bl from-[#00ADDD]/15 to-transparent"></div>
                <div className="absolute top-0 left-0 bg-[#36B5A6] text-white text-xs px-2 py-1 rounded-br-lg font-medium">
                  Our Facility
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
