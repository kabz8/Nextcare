// Import insurance logo images
import heritageLogoPath from "../../assets/insurance-logos/heritage.png";
import minetLogoPath from "../../assets/insurance-logos/minet.png";
import kenbrightLogoPath from "../../assets/insurance-logos/kenbright.png";
import firstAssuranceLogoPath from "../../assets/insurance-logos/first-assurance.png";
import liaisonGroupLogoPath from "../../assets/insurance-logos/liaison-group.png";
import sahamLogoPath from "../../assets/insurance-logos/saham.png";
import sanlamLogoPath from "../../assets/insurance-logos/sanlam.png";
import cicInsuranceLogoPath from "../../assets/insurance-logos/cic-insurance.png";
import uapOldMutualLogoPath from "../../assets/insurance-logos/uap-old-mutual.png";
import cignaLogoPath from "../../assets/insurance-logos/cigna.png";
import aarInsuranceLogoPath from "../../assets/insurance-logos/aar-insurance.png";
import mtibaLogoPath from "../../assets/insurance-logos/mtiba.png";
import jubileeInsuranceLogoPath from "../../assets/insurance-logos/jubilee-insurance.png";

// Define insurance partner type
interface InsurancePartner {
  name: string;
  logo: string;
}

export default function InsurancePartnersSection() {
  // Insurance partners data with actual logos
  const insurancePartners: InsurancePartner[] = [
    { name: "Heritage Insurance", logo: heritageLogoPath },
    { name: "Minet", logo: minetLogoPath },
    { name: "Kenbright", logo: kenbrightLogoPath },
    { name: "First Assurance", logo: firstAssuranceLogoPath },
    { name: "Liaison Group", logo: liaisonGroupLogoPath },
    { name: "Saham", logo: sahamLogoPath },
    { name: "Sanlam", logo: sanlamLogoPath },
    { name: "CIC Insurance", logo: cicInsuranceLogoPath },
    { name: "UAP Old Mutual", logo: uapOldMutualLogoPath },
    { name: "Cigna", logo: cignaLogoPath },
    { name: "AAR Insurance", logo: aarInsuranceLogoPath },
    { name: "M-TIBA", logo: mtibaLogoPath },
    { name: "Jubilee Insurance", logo: jubileeInsuranceLogoPath }
  ];

  return (
    <section className="py-16 bg-white border-t border-neutral-100">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-primary mb-4">Our Insurance Partners</h2>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
            We work with most major insurance providers to ensure you get the dental care you need.
            <a href="/insurance" className="text-primary hover:underline ml-1">Learn more about our insurance options</a>.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {/* Display insurance partner logos */}
          {insurancePartners.map((partner) => (
            <a href="/insurance" key={partner.name} className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer">
              <div className="w-24 h-16 flex items-center justify-center mb-2 bg-white overflow-hidden">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`} 
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="mt-2 text-sm font-medium text-neutral-800">{partner.name}</span>
            </a>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-neutral-500">
            Don't see your insurance provider? <a href="/insurance" className="text-primary font-medium hover:underline">View all supported providers</a> or <a href="/contact" className="text-primary font-medium hover:underline">contact us</a> to verify coverage.
          </p>
        </div>
      </div>
    </section>
  );
}