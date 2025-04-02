import { Helmet } from "react-helmet";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import InsurancePartnersSection from "@/components/home/InsurancePartnersSection";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Nextcare Dental Studio - Professional Dental Care in Nairobi</title>
        <meta name="description" content="Nextcare Dental Studio provides professional dental care services in Nairobi, Kenya including teeth whitening, cosmetic dentistry, dental implants, and more." />
      </Helmet>
      <HeroSection />
      
      {/* Gradient transition div */}
      <div className="h-32 bg-gradient-to-b from-[#e6f7fc] to-white"></div>
      
      <ServicesSection />
      <TestimonialsSection />
      <FeaturedProductsSection />
      <InsurancePartnersSection />
    </>
  );
}
