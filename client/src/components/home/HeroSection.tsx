import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star, Shield, Clock, Heart } from "lucide-react";
import heroDentistImage from "../../assets/hero-dentist.png";

export default function HeroSection() {
  return (
    <section className="min-h-[90vh] bg-gradient-to-br from-white via-[#e8f5ff] to-[#e6f7fc] flex items-center py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <div className="inline-block bg-primary/10 text-primary font-medium px-4 py-2 rounded-full mb-4">
              Leading Dental Service in Kenya
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Your <span className="text-[#00ADDD]">Smile</span> Is Our <span className="text-[#36B5A6]">Priority</span>
            </h1>
            <p className="text-lg text-neutral-700 mb-8 max-w-xl">
              Experience exceptional dental care in a comfortable environment. Our team is dedicated to helping you achieve your best smile with modern technologies and personalized treatment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/booking">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30">
                  Book an Appointment
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-[#00ADDD] text-[#00ADDD] hover:bg-[#00ADDD]/10">
                  Explore Our Services
                </Button>
              </Link>
            </div>
            
            {/* Feature highlights with nice icons */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <span className="text-neutral-700">Top-rated dental care</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#00ADDD]/10 flex items-center justify-center mr-3">
                  <Shield className="h-5 w-5 text-[#00ADDD]" />
                </div>
                <span className="text-neutral-700">Insurance coverage</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#36B5A6]/10 flex items-center justify-center mr-3">
                  <Clock className="h-5 w-5 text-[#36B5A6]" />
                </div>
                <span className="text-neutral-700">Convenient hours</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <span className="text-neutral-700">Patient-centered care</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-[#36B5A6]/20 z-0 hidden md:block"></div>
            <div className="absolute -bottom-5 -right-5 w-16 h-16 rounded-full bg-[#00ADDD]/20 z-0 hidden md:block"></div>
            
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl shadow-primary/20 border-4 border-white">
              <img 
                src={heroDentistImage} 
                alt="Smiling dental professional at Nextcare Dental Studio" 
                className="max-w-full h-auto" 
                width="600" 
                height="800"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
