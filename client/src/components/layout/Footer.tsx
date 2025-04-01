import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import logoPath from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-brand-blue text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <img src={logoPath} alt="Nextcare Dental Studio" className="h-14 brightness-0 invert" />
            </div>
            <p className="mb-4 text-neutral-300">Providing exceptional dental care in a comfortable environment since 2005.</p>
            <div className="flex space-x-3">
              <a href="#" className="w-9 h-9 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-brand-blue transition-all">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-brand-blue transition-all">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-brand-blue transition-all">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-brand-blue transition-all">
                <FaYoutube size={16} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <div className="mb-2 flex items-start">
              <MapPin className="h-5 w-5 mt-1 mr-3 text-white flex-shrink-0" />
              <span className="text-neutral-300">Feruzi Towers, 3rd Floor, Wing A<br />Kiambu Road, Nairobi, Kenya</span>
            </div>
            <div className="mb-2 flex items-center">
              <Phone className="h-5 w-5 mr-3 text-white flex-shrink-0" />
              <span className="text-neutral-300">0746290170 / 0728838994</span>
            </div>
            <div className="mb-2 flex items-center">
              <Mail className="h-5 w-5 mr-3 text-white flex-shrink-0" />
              <span className="text-neutral-300">info@nextcaredentalstudio.co.ke</span>
            </div>
            <div className="mb-2 flex items-center">
              <Clock className="h-5 w-5 mr-3 text-white flex-shrink-0" />
              <span className="text-neutral-300">Mon-Fri: 8am-6pm, Sat: 9am-2pm</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-neutral-300 hover:text-brand-teal transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-neutral-300 hover:text-brand-teal transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-neutral-300 hover:text-brand-teal transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/patient-info" className="text-neutral-300 hover:text-brand-teal transition-colors">
                  Patient Forms
                </Link>
              </li>
              <li>
                <Link href="/insurance" className="text-neutral-300 hover:text-brand-teal transition-colors">
                  Insurance
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-300 hover:text-brand-teal transition-colors">
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
                <Button type="submit" className="rounded-l-none px-4 bg-brand-teal hover:bg-brand-teal/90">
                  <Mail className="h-4 w-4 text-white" />
                </Button>
              </div>
            </form>
            <p className="text-sm text-neutral-400">We respect your privacy and will never share your information.</p>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-sm text-neutral-400">
          <p>
            &copy; {new Date().getFullYear()} Nextcare Dental Studio. All rights reserved. | 
            <a href="#" className="hover:text-brand-teal transition-colors ml-1">Privacy Policy</a> | 
            <a href="#" className="hover:text-brand-teal transition-colors ml-1">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
