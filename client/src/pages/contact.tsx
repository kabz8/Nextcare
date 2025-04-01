import { Helmet } from "react-helmet";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/layout/PageHeader";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us - Nextcare Dental Studio</title>
        <meta name="description" content="Get in touch with Nextcare Dental Studio in Nairobi, Kenya. We're here to answer your questions and provide the dental care you need." />
      </Helmet>
      
      <div className="page-gradient">
        <PageHeader 
          title="Contact Us" 
          subtitle="We're here to answer your questions and help you schedule your next appointment."
          badge="Get In Touch"
        />
        
        <div className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                  <CardDescription>Contact information and office hours</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-brand-blue mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Our Location</h3>
                      <p className="text-neutral-600">
                        Nextcare Dental Studio<br />
                        Feruzi Towers, 3rd Floor, Wing A<br />
                        Kiambu Road, Nairobi, Kenya
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-3 text-brand-blue mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-neutral-600">0746290170</p>
                      <p className="text-neutral-600">0728838994</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-3 text-brand-blue mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-neutral-600">info@nextcaredentalstudio.co.ke</p>
                      <p className="text-neutral-600">appointments@nextcaredentalstudio.co.ke</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 text-brand-blue mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Office Hours</h3>
                      <div className="grid grid-cols-2 gap-x-4 text-neutral-600">
                        <p>Monday - Friday</p>
                        <p>9:00 AM - 6:00 PM</p>
                        <p>Saturday</p>
                        <p>9:00 AM - 1:00 PM</p>
                        <p>Sunday</p>
                        <p>Closed</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Enter your first name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Enter your last name" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter your email" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="Enter your phone number" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="Enter the subject of your message" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us how we can help you" 
                        rows={6}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full md:w-auto">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Find Us</h2>
            <div className="rounded-lg overflow-hidden shadow-lg h-[250px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7897053854617!2d36.8334177!3d-1.2202863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3d3eadd106f5%3A0x7cfa7e86fb520ead!2sFeruzi%20Towers%2C%20Kiambu%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1680512347792!5m2!1sen!2ske" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          
          {/* Patient Information Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Patient Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>New Patients</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Welcome to Nextcare Dental Studio! We're excited to have you as a new patient. 
                    Here's what to expect on your first visit:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Comprehensive dental examination</li>
                    <li>Professional teeth cleaning</li>
                    <li>Digital X-rays if necessary</li>
                    <li>Personalized treatment plan</li>
                    <li>Discussion of your dental goals</li>
                  </ul>
                  <p className="font-medium mt-4">
                    Please arrive 15 minutes early to complete your new patient paperwork or
                    download the forms from our website and bring them completed.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Payment & Insurance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    At Nextcare Dental Studio, we strive to make dental care accessible and affordable.
                    We accept various payment methods and work with most major insurance providers.
                  </p>
                  <h3 className="font-medium">Payment Options:</h3>
                  <ul className="list-disc list-inside">
                    <li>Cash</li>
                    <li>Credit/Debit Cards</li>
                    <li>Mobile Money (M-Pesa)</li>
                    <li>Insurance</li>
                  </ul>
                  <p className="mt-4">
                    Our team will help you understand your insurance coverage and benefits.
                    We're committed to providing transparent pricing and will discuss
                    all costs before beginning any treatment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}