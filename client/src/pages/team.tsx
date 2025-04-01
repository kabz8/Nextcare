import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { FaLinkedin, FaFacebookSquare, FaTwitterSquare } from "react-icons/fa";

const teamMembers = [
  {
    id: 1,
    name: "Dr. Jane Kamau",
    role: "Lead Dentist / Founder",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&q=80",
    description: "Dr. Kamau has over 15 years of experience in cosmetic and restorative dentistry. She earned her degree from the University of Nairobi and has been serving the community with exceptional dental care.",
    specialties: ["Cosmetic Dentistry", "Dental Implants", "Orthodontics"]
  },
  {
    id: 2,
    name: "Dr. Michael Omondi",
    role: "Senior Dentist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&q=80",
    description: "Dr. Omondi specializes in pediatric dentistry and orthodontics. With a gentle approach and a warm smile, he makes dental visits enjoyable for children and adults alike.",
    specialties: ["Pediatric Dentistry", "Orthodontics", "Preventive Care"]
  },
  {
    id: 3,
    name: "Dr. Sarah Kimani",
    role: "Cosmetic Specialist",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&h=400&fit=crop&q=80",
    description: "Dr. Kimani is passionate about transforming smiles through cosmetic dentistry. She has advanced training in teeth whitening, veneers, and smile makeovers.",
    specialties: ["Teeth Whitening", "Veneers", "Smile Design"]
  },
  {
    id: 4,
    name: "Nancy Ochieng",
    role: "Dental Hygienist",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&q=80",
    description: "Nancy is a certified dental hygienist with 8 years of experience. She is dedicated to helping patients maintain excellent oral health through proper cleaning and education.",
    specialties: ["Professional Cleaning", "Oral Health Education", "Preventive Care"]
  },
  {
    id: 5,
    name: "David Mwangi",
    role: "Dental Assistant",
    image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=400&fit=crop&q=80",
    description: "David assists our dentists in providing efficient and comfortable treatment. His attention to detail and caring nature helps create a positive experience for every patient.",
    specialties: ["Patient Care", "Treatment Assistance", "Sterilization"]
  },
  {
    id: 6,
    name: "Grace Akinyi",
    role: "Office Manager",
    image: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=400&h=400&fit=crop&q=80",
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden hover:shadow-md transition-shadow max-w-sm mx-auto">
                <div className="flex flex-row">
                  <div className="w-1/3 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="object-cover w-full h-full transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="w-2/3">
                    <CardHeader className="p-3 pb-0">
                      <div className="space-y-0">
                        <CardTitle className="text-lg font-bold">{member.name}</CardTitle>
                        <p className="text-primary text-sm font-medium">{member.role}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 pt-2">
                      <div className="mb-2">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {member.specialties.map((specialty, index) => (
                            <span 
                              key={index} 
                              className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-1 justify-start">
                        <Button size="sm" variant="ghost" className="rounded-full w-7 h-7 p-0 text-neutral-600 hover:text-primary hover:bg-primary/10">
                          <FaLinkedin size={14} />
                        </Button>
                        <Button size="sm" variant="ghost" className="rounded-full w-7 h-7 p-0 text-neutral-600 hover:text-primary hover:bg-primary/10">
                          <Mail size={14} />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
              Meet Our Entire Team
            </Button>
          </div>
        </div>
      </div>
      
      <div className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Join Our Team</h2>
          <p className="max-w-2xl mx-auto mb-8">
            We're always looking for talented dental professionals to join our growing team. 
            If you're passionate about providing excellent patient care and want to work in a 
            modern, supportive environment, we'd love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-primary text-white rounded-full hover:bg-primary/90 px-6 py-2">View Open Positions</Button>
            <Link href="/contact">
              <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary/10 px-6 py-2">Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}