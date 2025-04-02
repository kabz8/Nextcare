import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../marketplace/ProductCard';
import { Button } from '@/components/ui/button';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  stock: number;
  featured: boolean;
}

export default function FeaturedProductsSection() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/featured'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-background/50 to-background/80">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground/90">Loading Products...</h2>
              <p className="text-lg text-muted-foreground mt-2">Please wait while we fetch the featured products.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-72 bg-muted/50 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // If there are no featured products, don't render the section
  if (!products.length) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-background/50 to-background/80">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-foreground/90">Shop Our Products</h2>
            <p className="text-lg text-muted-foreground mt-2">Quality dental products recommended by our professionals</p>
          </div>
          <Link href="/marketplace">
            <Button variant="ghost" className="mt-4 sm:mt-0 group">
              View all products
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}