import { Link } from 'wouter';
import insuranceLogosPath from '@assets/image_1743504900340.png';
import mpesaVisaPath from '@assets/image_1743499368269.png';

export default function InsurancePartnersSection() {
  // Insurance partners identified from the image
  const insurancePartners = [
    { name: "Minet", group: "insurance" },
    { name: "Jubilee Insurance", group: "insurance" },
    { name: "Kenbright", group: "insurance" },
    { name: "Henner", group: "insurance" },
    { name: "First Assurance", group: "insurance" },
    { name: "Liaison Group", group: "insurance" },
    { name: "Saham Insurance", group: "insurance" },
    { name: "Sanlam", group: "insurance" },
    { name: "CIC Insurance", group: "insurance" },
    { name: "Eagle Africa", group: "insurance" },
    { name: "Heritage Insurance", group: "insurance" },
    { name: "Sedgwick", group: "insurance" },
    { name: "Kenya Alliance", group: "insurance" },
    { name: "UAP", group: "insurance" },
    { name: "Cigna", group: "insurance" },
    { name: "KCB Insurance", group: "insurance" },
    { name: "AAS Insurance", group: "insurance" },
    { name: "M-Tiba", group: "insurance" }
  ];

  // Payment methods shown at the bottom
  const paymentMethods = [
    { name: "M-Pesa", group: "payment" },
    { name: "Visa", group: "payment" }
  ];

  return (
    <section className="py-16 bg-white border-t border-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-primary mb-4">Our Insurance Partners</h2>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
            We work with most major insurance providers to ensure you get the dental care you need.
            <Link to="/insurance" className="text-primary hover:underline ml-1">Learn more about our insurance options</Link>.
          </p>
        </div>

        {/* Insurance logos */}
        <div className="relative bg-white p-8 rounded-lg shadow-sm border border-neutral-100">
          <img 
            src={insuranceLogosPath} 
            alt="Our insurance partners" 
            className="w-full h-auto object-contain"
          />
        </div>
        
        {/* Payment methods */}
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold mb-4">Now Accepting</h3>
          <div className="flex justify-center items-center">
            <img 
              src={mpesaVisaPath} 
              alt="Payment methods: M-Pesa and Visa" 
              className="h-16 object-contain"
            />
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-neutral-500">
            Don't see your insurance provider? <Link to="/insurance" className="text-primary font-medium hover:underline">View all supported providers</Link> or <Link to="/contact" className="text-primary font-medium hover:underline">contact us</Link> to verify coverage.
          </p>
        </div>
      </div>
    </section>
  );
}