import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PageHeader from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '@/components/marketplace/ProductCard';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  stock: number;
  featured: boolean;
}

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const { data: products = [], isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const filteredProducts = React.useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter((product) => product.category === activeCategory);
  }, [products, activeCategory]);

  const categories = React.useMemo(() => {
    const allCategories = products.map((product) => product.category);
    return ['all', ...Array.from(new Set(allCategories))];
  }, [products]);

  const categoryLabels: Record<string, string> = {
    'all': 'All Products',
    'dental-care': 'Dental Care',
    'whitening': 'Whitening',
    'orthodontics': 'Orthodontics'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background">
      <PageHeader
        title="Dental Products Marketplace"
        subtitle="Shop quality dental care products recommended by our professionals"
      />
      
      <div className="container py-10 max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="w-full sm:w-auto border border-primary/10 p-1 rounded-lg">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="text-sm px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  {categoryLabels[category] || category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {isLoadingProducts ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No products found</h3>
                <p className="text-muted-foreground mt-2">Try selecting a different category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    categoryLabels={categoryLabels}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}