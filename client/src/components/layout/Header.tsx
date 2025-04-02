import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logoPath from "../../assets/logo.png";
import iconPath from "../../assets/icon.png";
import CartIcon from "./CartIcon";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Our Team", href: "/team" },
    { name: "Products", href: "/marketplace" },
    { name: "Insurance", href: "/insurance" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-6xl">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <img src={logoPath} alt="Nextcare Dental Studio" className="h-12" />
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`font-medium relative px-2 py-1 transition-all duration-200 ${
                location === link.href 
                ? 'text-primary after:absolute after:bottom-[-3px] after:left-0 after:h-[3px] after:w-full after:bg-primary after:rounded-full' 
                : 'text-neutral-700 hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center">
          <CartIcon />
          <Link href="/booking">
            <Button className="ml-2 bg-primary hover:bg-primary/90 font-medium text-sm py-2 px-5 shadow-sm hover:shadow transition-all hover:translate-y-[-2px]">
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
                    <img src={iconPath} alt="Nextcare Dental Icon" className="h-8 mr-2" />
                    <span className="text-neutral-900 font-bold text-xl">Nextcare Dental</span>
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
                      className={`px-4 py-3 font-medium rounded-md transition-all ${
                        location === link.href 
                        ? 'text-primary bg-primary/5 border-l-2 border-primary' 
                        : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  
                  <div className="pt-4 mt-4 border-t border-neutral-200">
                    <div className="flex gap-2 mb-3">
                      <Link href="/marketplace" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                        <Button variant="outline" className="w-full">
                          View Cart
                        </Button>
                      </Link>
                      <Link href="/booking" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                        <Button className="w-full bg-primary hover:bg-primary/90 font-medium py-2.5 shadow-sm">
                          Book Appointment
                        </Button>
                      </Link>
                    </div>
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
