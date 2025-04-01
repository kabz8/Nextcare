import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Stethoscope, MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Stethoscope className="h-8 w-8 text-primary mr-2" />
              <span className="text-white font-bold text-xl">Village Dental</span>
            </div>
            <p className="mb-4 text-neutral-300">Providing exceptional dental care in a comfortable environment since 2005.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <div className="mb-2 flex items-start">
              <MapPin className="h-5 w-5 mt-1 mr-3 text-primary flex-shrink-0" />
              <span className="text-neutral-300">123 Dental Drive<br />Denver, CO 80202</span>
            </div>
            <div className="mb-2 flex items-center">
              <Phone className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
              <span className="text-neutral-300">(555) 123-4567</span>
            </div>
            <div className="mb-2 flex items-center">
              <Mail className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
              <span className="text-neutral-300">info@villagedentalco.com</span>
            </div>
            <div className="mb-2 flex items-center">
              <Clock className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
              <span className="text-neutral-300">Mon-Fri: 8am-6pm, Sat: 9am-2pm</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-neutral-300 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-neutral-300 hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-neutral-300 hover:text-primary transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/patient-info" className="text-neutral-300 hover:text-primary transition-colors">
                  Patient Forms
                </Link>
              </li>
              <li>
                <Link href="/insurance" className="text-neutral-300 hover:text-primary transition-colors">
                  Insurance
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-300 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Newsletter</h4>
            <p className="mb-4 text-neutral-300">Subscribe to our newsletter for dental tips and special offers.</p>
            <form className="mb-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="rounded-r-none text-neutral-900 focus-visible:ring-primary"
                />
                <Button type="submit" className="rounded-l-none px-4">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </form>
            <p className="text-sm text-neutral-400">We respect your privacy and will never share your information.</p>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-sm text-neutral-400">
          <p>
            &copy; {new Date().getFullYear()} Village Dental. All rights reserved. | 
            <a href="#" className="hover:text-primary transition-colors ml-1">Privacy Policy</a> | 
            <a href="#" className="hover:text-primary transition-colors ml-1">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
