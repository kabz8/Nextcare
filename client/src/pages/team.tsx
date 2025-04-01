import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import { FaLinkedin, FaFacebookSquare, FaTwitterSquare } from "react-icons/fa";

const teamMembers = [
  {
    id: 1,
    name: "Dr. Jane Smith",
    role: "Lead Dentist / Founder",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=500&fit=crop&q=80",
    description: "Dr. Smith has over 15 years of experience in cosmetic and restorative dentistry. She earned her degree from the University of Nairobi and has been serving the community with exceptional dental care.",
    specialties: ["Cosmetic Dentistry", "Dental Implants", "Orthodontics"]
  },
  {
    id: 2,
    name: "Dr. Michael Johnson",
    role: "Senior Dentist",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&h=500&fit=crop&q=80",
    description: "Dr. Johnson specializes in pediatric dentistry and orthodontics. With a gentle approach and a warm smile, he makes dental visits enjoyable for children and adults alike.",
    specialties: ["Pediatric Dentistry", "Orthodontics", "Preventive Care"]
  },
  {
    id: 3,
    name: "Dr. Sarah Kimani",
    role: "Cosmetic Specialist",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d28?w=500&h=500&fit=crop&q=80",
    description: "Dr. Kimani is passionate about transforming smiles through cosmetic dentistry. She has advanced training in teeth whitening, veneers, and smile makeovers.",
    specialties: ["Teeth Whitening", "Veneers", "Smile Design"]
  },
  {
    id: 4,
    name: "Nancy Ochieng",
    role: "Dental Hygienist",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&h=500&fit=crop&q=80",
    description: "Nancy is a certified dental hygienist with 8 years of experience. She is dedicated to helping patients maintain excellent oral health through proper cleaning and education.",
    specialties: ["Professional Cleaning", "Oral Health Education", "Preventive Care"]
  },
  {
    id: 5,
    name: "David Mwangi",
    role: "Dental Assistant",
    image: "https://images.unsplash.com/photo-1615813967515-e1838c1c5116?w=500&h=500&fit=crop&q=80",
    description: "David assists our dentists in providing efficient and comfortable treatment. His attention to detail and caring nature helps create a positive experience for every patient.",
    specialties: ["Patient Care", "Treatment Assistance", "Sterilization"]
  },
  {
    id: 6,
    name: "Grace Akinyi",
    role: "Office Manager",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=500&fit=crop&q=80",
    description: "Grace manages our front office operations and ensures everything runs smoothly. She coordinates appointments, handles insurance matters, and welcomes patients with a friendly smile.",
    specialties: ["Scheduling", "Insurance Coordination", "Patient Relations"]
  }
];

export default function Team() {
  return (
    <>
      <Helmet>
        <title>Our Team - Nextcare Dental Studio</title>
        <meta name="description" content="Meet our team of experienced dental professionals at Nextcare Dental Studio in Nairobi, Kenya. We're dedicated to providing you with excellent dental care." />
      </Helmet>
      
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 text-center">Our Dental Team</h1>
          <p className="text-lg text-center max-w-2xl mx-auto">Meet our team of experienced professionals dedicated to providing you with the best dental care.</p>
        </div>
      </div>
      
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-bold">{member.name}</CardTitle>
                    <p className="text-primary font-medium">{member.role}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 text-sm mb-4">{member.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, index) => (
                        <span 
                          key={index} 
                          className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4 justify-center">
                    <Button size="sm" variant="ghost" className="rounded-full w-8 h-8 p-0 text-neutral-600 hover:text-primary hover:bg-primary/10">
                      <FaLinkedin size={16} />
                    </Button>
                    <Button size="sm" variant="ghost" className="rounded-full w-8 h-8 p-0 text-neutral-600 hover:text-primary hover:bg-primary/10">
                      <FaFacebookSquare size={16} />
                    </Button>
                    <Button size="sm" variant="ghost" className="rounded-full w-8 h-8 p-0 text-neutral-600 hover:text-primary hover:bg-primary/10">
                      <FaTwitterSquare size={16} />
                    </Button>
                    <Button size="sm" variant="ghost" className="rounded-full w-8 h-8 p-0 text-neutral-600 hover:text-primary hover:bg-primary/10">
                      <Mail size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <div className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Join Our Team</h2>
          <p className="max-w-2xl mx-auto mb-8">
            We're always looking for talented dental professionals to join our growing team. 
            If you're passionate about providing excellent patient care and want to work in a 
            modern, supportive environment, we'd love to hear from you.
          </p>
          <div className="flex justify-center">
            <Button className="mr-4">View Open Positions</Button>
            <Button variant="outline">Contact Us</Button>
          </div>
        </div>
      </div>
    </>
  );
}