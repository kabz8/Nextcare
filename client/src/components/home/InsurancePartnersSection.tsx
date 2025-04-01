import { FaBuilding, FaHospital, FaShieldAlt, FaHeart, FaHandHoldingMedical } from "react-icons/fa";
import { BiHealth, BiShield } from "react-icons/bi";
import { MdHealthAndSafety, MdMedicalServices } from "react-icons/md";

// Create a component for each insurance logo with standardized styling
function InsuranceLogo({ icon: Icon, name }: { icon: React.ElementType; name: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Icon className="w-16 h-16 text-neutral-600" />
      <span className="mt-2 text-sm font-medium text-neutral-600">{name}</span>
    </div>
  );
}

export default function InsurancePartnersSection() {
  // Insurance partners data
  const insurancePartners = [
    // Major Kenyan and African insurance companies
    { name: "Jubilee Insurance", logo: "jubilee-insurance.svg" },
    { name: "AAR Insurance", logo: "aar-insurance.svg" },
    { name: "UAP Old Mutual", logo: "uap-old-mutual.svg" },
    { name: "NHIF", logo: "nhif.svg" },
    { name: "Britam", logo: "britam.svg" },
    { name: "CIC Insurance", logo: "cic-insurance.svg" }
  ];

  // Use generic health/insurance icons from react-icons
  const iconPartners = [
    { name: "Aetna", icon: FaShieldAlt },
    { name: "Cigna", icon: MdHealthAndSafety },
    { name: "Blue Cross", icon: BiHealth },
    { name: "Allianz", icon: FaHandHoldingMedical },
    { name: "AXA", icon: MdMedicalServices },
    { name: "MetLife", icon: BiShield }
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
          {/* Display international insurance icons */}
          {iconPartners.map((partner) => (
            <a href="/insurance" key={partner.name} className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <partner.icon className="w-9 h-9 text-primary" />
              </div>
              <span className="mt-2 text-sm font-medium text-neutral-800">{partner.name}</span>
            </a>
          ))}
          
          {/* Display Kenyan/African insurance logos */}
          {insurancePartners.map((partner) => (
            <a href="/insurance" key={partner.name} className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl mb-2">
                {partner.name.charAt(0)}
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