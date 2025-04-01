import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star, Shield, Clock, Heart } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="min-h-[90vh] bg-gradient-to-br from-white via-[#e6f7fc] to-[#e6f5f3] flex items-center py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <div className="inline-block bg-brand-blue/10 text-brand-blue font-medium px-4 py-2 rounded-full mb-4">
              Leading Dental Service in Kenya
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-blue mb-6 leading-tight">
              Your <span className="text-brand-light-blue">Smile</span> Is Our <span className="text-brand-teal">Priority</span>
            </h1>
            <p className="text-lg text-neutral-700 mb-8 max-w-xl">
              Experience exceptional dental care in a comfortable environment. Our team is dedicated to helping you achieve your best smile with modern technologies and personalized treatment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/booking">
                <Button size="lg" className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue/90 text-white shadow-md shadow-brand-blue/20 transition-all hover:shadow-lg hover:shadow-brand-blue/30">
                  Book an Appointment
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-brand-light-blue text-brand-light-blue hover:bg-brand-light-blue/10">
                  Explore Our Services
                </Button>
              </Link>
            </div>
            
            {/* Feature highlights with nice icons */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center mr-3">
                  <Star className="h-5 w-5 text-brand-blue" />
                </div>
                <span className="text-neutral-700">Top-rated dental care</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-brand-light-blue/10 flex items-center justify-center mr-3">
                  <Shield className="h-5 w-5 text-brand-light-blue" />
                </div>
                <span className="text-neutral-700">Insurance coverage</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center mr-3">
                  <Clock className="h-5 w-5 text-brand-teal" />
                </div>
                <span className="text-neutral-700">Convenient hours</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center mr-3">
                  <Heart className="h-5 w-5 text-brand-blue" />
                </div>
                <span className="text-neutral-700">Patient-centered care</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-brand-teal/20 z-0 hidden md:block"></div>
            <div className="absolute -bottom-5 -right-5 w-16 h-16 rounded-full bg-brand-light-blue/20 z-0 hidden md:block"></div>
            
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl shadow-brand-blue/20 border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&h=600&fit=crop" 
                alt="Dentist examining patient" 
                className="max-w-full h-auto" 
                width="600" 
                height="400"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-transparent mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
