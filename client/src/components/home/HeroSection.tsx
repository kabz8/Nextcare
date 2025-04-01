import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-primary/10 to-green-100 py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">Professional Dental Care for Your Family</h1>
          <p className="text-lg mb-6">Experience exceptional dental care in a comfortable environment. Our team is dedicated to helping you achieve your best smile.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/booking">
              <Button size="lg" className="w-full sm:w-auto">
                Book an Appointment
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Our Services
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img 
            src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&h=600&fit=crop" 
            alt="Dentist examining patient" 
            className="rounded-lg shadow-lg max-w-full h-auto" 
            width="500" 
            height="333"
          />
        </div>
      </div>
    </section>
  );
}
