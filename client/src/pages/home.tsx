import { Helmet } from "react-helmet";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Village Dental - Professional Dental Care</title>
        <meta name="description" content="Village Dental provides professional dental care services including teeth whitening, cosmetic dentistry, dental implants, and more." />
      </Helmet>
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
    </>
  );
}
