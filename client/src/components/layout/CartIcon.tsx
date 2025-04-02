import { Link, useLocation } from 'wouter';
import { ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/CartContext';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

export default function CartIcon() {
  const { cart, totalItems, totalPrice, removeFromCart } = useCart();
  const [, setLocation] = useLocation();
  
  const formatPrice = (price: number) => {
    return `KSh ${new Intl.NumberFormat('en-KE').format(price)}`;
  };
  
  const goToCart = () => {
    setLocation('/marketplace?tab=cart');
  };
  
  return (
    <HoverCard openDelay={100} closeDelay={200}>
      <HoverCardTrigger asChild>
        <div className="relative">
          <Button 
            variant="ghost" 
            className="relative p-2"
            onClick={goToCart}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white text-xs rounded-full"
              >
                {totalItems > 99 ? '99+' : totalItems}
              </Badge>
            )}
          </Button>
        </div>
      </HoverCardTrigger>
      
      <HoverCardContent align="end" className="w-80 p-2">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Shopping Cart</h4>
            <Button 
              variant="link" 
              size="sm" 
              className="h-auto py-0 px-1 text-primary text-xs"
              onClick={goToCart}
            >
              View Cart
            </Button>
          </div>
          
          {cart.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              Your cart is empty
            </div>
          ) : (
            <>
              <div className="max-h-56 overflow-auto space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 p-2 border-b border-border">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{item.name}</div>
                      <div className="text-sm text-muted-foreground flex justify-between">
                        <span>{item.quantity} × KSh {new Intl.NumberFormat('en-KE').format(parseFloat(item.price))}</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromCart(item.id);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="pt-2 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold">{formatPrice(totalPrice)}</span>
                </div>
                <Button className="w-full mt-2" onClick={goToCart}>
                  Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}