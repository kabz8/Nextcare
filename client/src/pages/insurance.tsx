import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaShieldAlt, FaCheckCircle, FaInfoCircle, FaUserMd } from "react-icons/fa";
import { Shield, Check, Info, ShieldCheck, Heart, Users } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";

// Updated insurance partners based on the logos image
const insurancePartners = [
  {
    id: 1,
    name: "Jubilee Insurance",
    description: "Comprehensive dental coverage with a wide network of providers.",
    plans: ["Basic Dental", "Standard Dental", "Premium Dental"]
  },
  {
    id: 2,
    name: "Minet",
    description: "Flexible dental plans for individuals and families with good preventive care coverage.",
    plans: ["Individual Plan", "Family Plan", "Corporate Plan"]
  },
  {
    id: 3,
    name: "Sanlam",
    description: "Affordable dental plans with excellent customer service and quick claims processing.",
    plans: ["Basic Coverage", "Enhanced Coverage", "Premium Coverage"]
  },
  {
    id: 4,
    name: "CIC Insurance",
    description: "Specialized dental plans with focus on preventive and orthodontic care.",
    plans: ["Preventive Care", "Comprehensive Care", "Orthodontic Care"]
  },
  {
    id: 5,
    name: "UAP",
    description: "National health insurance coverage for basic dental procedures and emergencies.",
    plans: ["Basic Coverage", "Premium Coverage", "Family Coverage"]
  },
  {
    id: 6,
    name: "Heritage Insurance",
    description: "Customizable dental plans to meet your specific needs and budget.",
    plans: ["Essential Plan", "Comprehensive Plan", "Elite Plan"]
  },
  {
    id: 7,
    name: "Cigna",
    description: "International coverage with comprehensive dental benefits.",
    plans: ["Global Health", "International Plan", "Expatriate Plan"]
  },
  {
    id: 8,
    name: "First Assurance",
    description: "Reliable dental coverage with straightforward claims processing.",
    plans: ["Basic Plan", "Standard Plan", "Premium Plan"]
  },
  {
    id: 9,
    name: "Liaison Group",
    description: "Flexible insurance solutions for individuals and businesses.",
    plans: ["Individual Plan", "Family Plan", "Corporate Plan"]
  }
];

export default function Insurance() {
  return (
    <>
      <Helmet>
        <title>Insurance Partners - Nextcare Dental Studio</title>
        <meta name="description" content="Learn about the insurance providers we work with at Nextcare Dental Studio. We make dental care accessible and affordable." />
      </Helmet>
      
      <div className="page-gradient">
        <PageHeader 
          title="Insurance Partners" 
          subtitle="We work with major insurance providers to make quality dental care accessible and affordable."
          badge="Coverage & Benefits"
        />
        
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-2xl font-bold mb-4">We Accept Most Major Insurance Plans</h2>
              <p className="text-neutral-700 mb-6">
                At Nextcare Dental Studio, we believe that financial considerations should never be a barrier to receiving 
                quality dental care. That's why we work with a wide range of insurance providers to ensure our services 
                are accessible and affordable.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="bg-neutral-100 rounded-lg px-4 py-2 flex items-center">
                  <FaCheckCircle className="text-green-600 mr-2" />
                  <span>Quick verification</span>
                </div>
                <div className="bg-neutral-100 rounded-lg px-4 py-2 flex items-center">
                  <FaInfoCircle className="text-blue-600 mr-2" />
                  <span>Benefits explanation</span>
                </div>
                <div className="bg-neutral-100 rounded-lg px-4 py-2 flex items-center">
                  <FaUserMd className="text-indigo-600 mr-2" />
                  <span>Direct billing</span>
                </div>
                <div className="bg-neutral-100 rounded-lg px-4 py-2 flex items-center">
                  <FaShieldAlt className="text-orange-600 mr-2" />
                  <span>Coverage maximization</span>
                </div>
              </div>
              <Button size="lg">Verify Your Insurance</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {insurancePartners.map((partner) => (
                <Card key={partner.id} className="border border-neutral-200 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2 flex flex-col items-center text-center">
                    <div className="mb-4 p-4 bg-primary/10 rounded-full">
                      <div className="h-12 w-12 flex items-center justify-center">
                        <ShieldCheck className="h-12 w-12 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold">{partner.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-neutral-600 mb-4">{partner.description}</p>
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold mb-2">Available Plans:</h4>
                      <ul className="space-y-1">
                        {partner.plans.map((plan, index) => (
                          <li key={index} className="text-neutral-700 flex items-center justify-center">
                            <Check className="h-4 w-4 mr-2 text-green-600" />
                            <span>{plan}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        <div className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">How do I know if my insurance covers my treatment?</h3>
                <p className="text-neutral-700">
                  Our front desk team will verify your insurance coverage before your appointment. We'll explain what procedures are covered,
                  any applicable co-pays, and your estimated out-of-pocket expenses.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">What if my insurance doesn't cover a needed procedure?</h3>
                <p className="text-neutral-700">
                  We offer various payment options and financing plans to make treatment affordable. Our team will work with you
                  to find a solution that fits your budget.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Do you offer direct billing to insurance companies?</h3>
                <p className="text-neutral-700">
                  Yes, we offer direct billing to most insurance providers. This means you only need to pay your portion
                  at the time of service, and we'll handle the insurance claim for you.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">What if I don't have dental insurance?</h3>
                <p className="text-neutral-700">
                  We offer affordable self-pay rates and payment plans for patients without insurance. We believe everyone
                  deserves quality dental care, regardless of insurance status.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-lg mb-4">Have more questions about insurance or payment options?</p>
              <Button>Contact Our Team</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}