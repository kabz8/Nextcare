import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    category: string;
    stock: number;
    featured: boolean;
  };
  categoryLabels?: Record<string, string>;
}

const defaultCategoryLabels: Record<string, string> = {
  'dental-care': 'Dental Care',
  'whitening': 'Whitening',
  'orthodontics': 'Orthodontics'
};

export default function ProductCard({ product, categoryLabels = defaultCategoryLabels }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const formatPrice = (price: string) => {
    return `KSh ${new Intl.NumberFormat('en-KE').format(parseFloat(price))}`;
  };
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category
    });
    
    toast({
      title: "Product added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000
    });
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-lg border border-primary/10">
      <div className="aspect-video bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/5"></div>
        {product.featured && (
          <Badge className="absolute top-3 right-3 bg-primary text-white">Featured</Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{product.name}</CardTitle>
        <CardDescription className="line-clamp-2">{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="mt-1 text-sm">
          <Badge variant="outline" className="mr-2 mb-2">
            {categoryLabels[product.category] || product.category}
          </Badge>
          {product.stock < 20 && (
            <Badge variant="secondary" className="mr-2 mb-2">
              {product.stock < 5 ? 'Low Stock' : 'Limited Stock'}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2 border-t border-primary/10">
        <div className="font-medium text-lg text-primary">
          {formatPrice(product.price)}
        </div>
        <Button size="sm" onClick={handleAddToCart}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}