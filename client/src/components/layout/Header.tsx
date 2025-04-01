import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Stethoscope } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Our Team", href: "/team" },
    { name: "Patient Info", href: "/patient-info" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Stethoscope className="h-8 w-8 text-primary mr-2" />
            <span className="text-neutral-900 font-bold text-xl md:text-2xl">Village Dental</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`font-medium hover:text-primary transition-colors ${
                location === link.href ? 'text-primary' : 'text-neutral-700'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center">
          <Link href="/booking">
            <Button>
              Book Appointment
            </Button>
          </Link>
          
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="ml-4 md:hidden p-2">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-8 py-4">
                  <div className="flex items-center">
                    <Stethoscope className="h-6 w-6 text-primary mr-2" />
                    <span className="text-neutral-900 font-bold text-xl">Village Dental</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.name} 
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-2 font-medium hover:bg-primary-100 rounded-md ${
                        location === link.href ? 'text-primary' : 'text-neutral-700'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  
                  <div className="pt-4 mt-4 border-t border-neutral-200">
                    <Link href="/booking" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full">
                        Book Appointment
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
