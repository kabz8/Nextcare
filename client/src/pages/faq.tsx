import { Helmet } from "react-helmet";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageHeader from "@/components/layout/PageHeader";

export default function FAQ() {
  const faqItems = [
    {
      question: "What dental services do you offer?",
      answer: "We offer a wide range of dental services including general dentistry, cosmetic procedures, teeth whitening, dental implants, orthodontics, pediatric dentistry, and emergency dental care."
    },
    {
      question: "How often should I visit the dentist?",
      answer: "We recommend visiting the dentist every six months for routine check-ups and professional cleaning. However, individuals with specific dental issues may need more frequent visits."
    },
    {
      question: "Do you accept insurance?",
      answer: "Yes, we work with most major insurance providers. Please contact our office to verify your specific coverage, or visit our Insurance page for a list of accepted providers."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash, credit/debit cards, mobile payments (M-Pesa), and insurance. We also offer flexible payment plans for extensive treatments."
    },
    {
      question: "How can I book an appointment?",
      answer: "You can book an appointment through our website using our online booking system, call our office directly, or email us. We aim to accommodate your schedule as best as possible."
    },
    {
      question: "What should I do in case of a dental emergency?",
      answer: "In case of a dental emergency, please contact our office immediately. We reserve time slots for emergency cases and will do our best to see you as soon as possible."
    },
    {
      question: "How can I manage dental anxiety?",
      answer: "We understand dental anxiety is common. Our team is trained to provide a comfortable environment, explain procedures thoroughly, and offer sedation options for patients with severe anxiety."
    },
    {
      question: "Are your facilities accessible for disabled patients?",
      answer: "Yes, our clinic is fully accessible for patients with disabilities. We have wheelchair access, wider doorways, and accessible restrooms."
    },
    {
      question: "What COVID-19 safety measures do you have in place?",
      answer: "We follow all recommended safety protocols including enhanced cleaning procedures, staff PPE, patient screening, and social distancing measures in waiting areas."
    },
    {
      question: "How do I care for my teeth at home?",
      answer: "For optimal oral health, brush twice daily with fluoride toothpaste, floss daily, maintain a balanced diet low in sugary foods and drinks, and attend regular dental check-ups."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions - Nextcare Dental Studio</title>
        <meta name="description" content="Find answers to common questions about dental care, procedures, insurance, and appointments at Nextcare Dental Studio in Nairobi, Kenya." />
      </Helmet>
      
      <PageHeader 
        title="Frequently Asked Questions" 
        subtitle="Find answers to common questions about our dental services, procedures, and policies."
        badge="Help & Information"
      />
      
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border rounded-lg px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-medium text-lg py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-neutral-700 pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="mb-6 text-neutral-700">
              If you couldn't find the answer to your question, please feel free to contact us.
              Our friendly team is always ready to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </a>
              <a 
                href="tel:+254746290170" 
                className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-full hover:bg-primary/10 transition-colors"
              >
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}