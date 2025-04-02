import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Trash2, ShoppingCart, MinusCircle, PlusCircle } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/hooks/use-toast';
import Checkout from './Checkout';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const formatPrice = (price: number | string) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `KSh ${new Intl.NumberFormat('en-KE').format(numPrice)}`;
  };
  
  if (isCheckingOut) {
    return <Checkout />;
  }

  if (cart.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Your Cart</CardTitle>
          <CardDescription>Your shopping cart is empty</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-6">Add some products to your cart</p>
          <Button asChild className="mt-2">
            <a href="#product-list">Browse Products</a>
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Your Cart</CardTitle>
        <CardDescription>You have {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Cart Items */}
          {cart.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-border rounded-lg">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <Badge variant="outline" className="w-fit">{item.category}</Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 gap-2">
                  <p className="font-medium text-primary">
                    {formatPrice(item.price)} each
                  </p>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                      className="w-16 h-8 text-center"
                    />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-row sm:flex-col items-center justify-between gap-2 w-full sm:w-auto">
                <div className="text-base font-bold">
                  {formatPrice(parseFloat(item.price) * item.quantity)}
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 text-destructive"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t">
        <Button variant="outline" onClick={clearCart} className="sm:w-auto">
          Clear Cart
        </Button>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="text-lg font-bold">
            Total: {formatPrice(totalPrice)}
          </div>
          <Button className="sm:w-auto" onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}