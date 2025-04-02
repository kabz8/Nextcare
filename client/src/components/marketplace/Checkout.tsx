import React, { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, ShoppingCart, Check, CreditCard, Wallet } from 'lucide-react';

type CheckoutStep = 'contact' | 'shipping' | 'payment' | 'confirmation';

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface ShippingInfo {
  address: string;
  city: string;
  zipCode: string;
  country: string;
  notes: string;
}

interface PaymentInfo {
  method: 'card' | 'cash' | 'mpesa';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  mpesaNumber?: string;
}

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('contact');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string>('');

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    address: '',
    city: '',
    zipCode: '',
    country: 'Kenya',
    notes: '',
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: 'mpesa',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    mpesaNumber: '',
  });

  const formatPrice = (price: number) => {
    return `KSh ${new Intl.NumberFormat('en-KE').format(price)}`;
  };

  const handleCustomerInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('shipping');
  };

  const handleShippingInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handlePaymentInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a random order ID
    const newOrderId = `NCD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newOrderId);
    
    // In a real app, you would process the payment here
    setTimeout(() => {
      setOrderComplete(true);
      setCurrentStep('confirmation');
      clearCart();
      toast({
        title: "Order Placed Successfully",
        description: `Your order #${newOrderId} has been placed and will be processed soon.`,
        duration: 5000,
      });
    }, 1500);
  };

  const goBack = () => {
    if (currentStep === 'shipping') setCurrentStep('contact');
    else if (currentStep === 'payment') setCurrentStep('shipping');
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'contact': return 'Contact Information';
      case 'shipping': return 'Shipping Details';
      case 'payment': return 'Payment Information';
      case 'confirmation': return 'Order Confirmation';
      default: return 'Checkout';
    }
  };

  if (cart.length === 0 && !orderComplete) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Your Cart is Empty</CardTitle>
          <CardDescription>Add some products to your cart before checkout</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-6">Your shopping cart is empty</p>
          <Button asChild className="mt-2">
            <a href="/marketplace">Browse Products</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">{getStepTitle()}</CardTitle>
        <CardDescription>
          {currentStep === 'confirmation' 
            ? `Order #${orderId} has been placed successfully` 
            : 'Complete your purchase by providing the required information'}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Step indicators */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center w-full">
            <div className={`rounded-full w-8 h-8 flex items-center justify-center border-2 ${currentStep === 'contact' || currentStep === 'shipping' || currentStep === 'payment' || currentStep === 'confirmation' ? 'bg-primary text-white border-primary' : 'border-muted-foreground text-muted-foreground'}`}>
              1
            </div>
            <div className={`h-1 flex-1 mx-2 ${currentStep === 'shipping' || currentStep === 'payment' || currentStep === 'confirmation' ? 'bg-primary' : 'bg-muted'}`}></div>
            <div className={`rounded-full w-8 h-8 flex items-center justify-center border-2 ${currentStep === 'shipping' || currentStep === 'payment' || currentStep === 'confirmation' ? 'bg-primary text-white border-primary' : 'border-muted-foreground text-muted-foreground'}`}>
              2
            </div>
            <div className={`h-1 flex-1 mx-2 ${currentStep === 'payment' || currentStep === 'confirmation' ? 'bg-primary' : 'bg-muted'}`}></div>
            <div className={`rounded-full w-8 h-8 flex items-center justify-center border-2 ${currentStep === 'payment' || currentStep === 'confirmation' ? 'bg-primary text-white border-primary' : 'border-muted-foreground text-muted-foreground'}`}>
              3
            </div>
            <div className={`h-1 flex-1 mx-2 ${currentStep === 'confirmation' ? 'bg-primary' : 'bg-muted'}`}></div>
            <div className={`rounded-full w-8 h-8 flex items-center justify-center border-2 ${currentStep === 'confirmation' ? 'bg-primary text-white border-primary' : 'border-muted-foreground text-muted-foreground'}`}>
              4
            </div>
          </div>
        </div>

        {/* Contact Information Step */}
        {currentStep === 'contact' && (
          <form onSubmit={handleCustomerInfoSubmit}>
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={customerInfo.firstName}
                    onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={customerInfo.lastName}
                    onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  required
                />
              </div>
              <div className="mt-4 text-right">
                <Button type="submit">
                  Continue to Shipping
                </Button>
              </div>
            </div>
          </form>
        )}

        {/* Shipping Information Step */}
        {currentStep === 'shipping' && (
          <form onSubmit={handleShippingInfoSubmit}>
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input 
                  id="address" 
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-1">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-1">
                  <Label htmlFor="zipCode">Postal Code</Label>
                  <Input 
                    id="zipCode" 
                    value={shippingInfo.zipCode}
                    onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-1">
                  <Label htmlFor="country">Country</Label>
                  <Select 
                    value={shippingInfo.country} 
                    onValueChange={(value) => setShippingInfo({...shippingInfo, country: value})}
                  >
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kenya">Kenya</SelectItem>
                      <SelectItem value="Uganda">Uganda</SelectItem>
                      <SelectItem value="Tanzania">Tanzania</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Special instructions for delivery"
                  value={shippingInfo.notes}
                  onChange={(e) => setShippingInfo({...shippingInfo, notes: e.target.value})}
                />
              </div>
              <div className="mt-4 flex justify-between">
                <Button type="button" variant="outline" onClick={goBack}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button type="submit">
                  Continue to Payment
                </Button>
              </div>
            </div>
          </form>
        )}

        {/* Payment Information Step */}
        {currentStep === 'payment' && (
          <form onSubmit={handlePaymentInfoSubmit}>
            <div className="grid gap-6">
              <div className="space-y-3">
                <Label>Payment Method</Label>
                <RadioGroup 
                  value={paymentInfo.method} 
                  onValueChange={(value) => setPaymentInfo({...paymentInfo, method: value as 'card' | 'cash' | 'mpesa'})}
                >
                  <div className="flex items-center space-x-2 border rounded-md p-3 mb-2">
                    <RadioGroupItem value="mpesa" id="mpesa" />
                    <Label htmlFor="mpesa" className="flex items-center">
                      <div className="ml-2">
                        <div className="font-medium">M-PESA</div>
                        <div className="text-sm text-muted-foreground">Pay with M-PESA mobile money</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3 mb-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div className="ml-2">
                        <div className="font-medium">Credit/Debit Card</div>
                        <div className="text-sm text-muted-foreground">Pay with Visa, Mastercard, or other cards</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex items-center">
                      <Wallet className="h-5 w-5 text-muted-foreground" />
                      <div className="ml-2">
                        <div className="font-medium">Cash on Delivery</div>
                        <div className="text-sm text-muted-foreground">Pay when you receive your products</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {paymentInfo.method === 'mpesa' && (
                <div className="space-y-2">
                  <Label htmlFor="mpesaNumber">M-PESA Phone Number</Label>
                  <Input 
                    id="mpesaNumber" 
                    placeholder="e.g. 0712345678"
                    value={paymentInfo.mpesaNumber}
                    onChange={(e) => setPaymentInfo({...paymentInfo, mpesaNumber: e.target.value})}
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    You will receive an M-PESA payment prompt on this number
                  </p>
                </div>
              )}

              {paymentInfo.method === 'card' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input 
                      id="cardNumber" 
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardExpiry">Expiration Date</Label>
                      <Input 
                        id="cardExpiry" 
                        placeholder="MM/YY"
                        value={paymentInfo.cardExpiry}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cardExpiry: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardCvc">CVC</Label>
                      <Input 
                        id="cardCvc" 
                        placeholder="123"
                        value={paymentInfo.cardCvc}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cardCvc: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="mt-4 flex justify-between">
                <Button type="button" variant="outline" onClick={goBack}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button type="submit">
                  Place Order
                </Button>
              </div>
            </div>
          </form>
        )}

        {/* Confirmation Step */}
        {currentStep === 'confirmation' && (
          <div className="space-y-6">
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium">Thank You for Your Order!</h3>
              <p className="text-muted-foreground">
                Your order has been placed and will be processed soon. 
                You will receive an email confirmation shortly.
              </p>
              <div className="py-2 px-4 bg-muted rounded-md inline-block">
                <span className="font-medium">Order ID:</span> {orderId}
              </div>
            </div>

            <div className="border rounded-md p-4 space-y-4">
              <div>
                <h4 className="font-medium">Order Details</h4>
                <Separator className="my-2" />
                <div className="space-y-2">
                  {cart.length > 0 ? cart.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.quantity} × {item.name}</span>
                      <span>{formatPrice(parseFloat(item.price) * item.quantity)}</span>
                    </div>
                  )) : (
                    <div className="text-muted-foreground">Order processed successfully</div>
                  )}
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium">Customer Information</h4>
                <Separator className="my-2" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Name</div>
                    <div>{customerInfo.firstName} {customerInfo.lastName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div>{customerInfo.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div>{customerInfo.phone}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium">Shipping Address</h4>
                <Separator className="my-2" />
                <div>
                  <div>{shippingInfo.address}</div>
                  <div>{shippingInfo.city}, {shippingInfo.zipCode}</div>
                  <div>{shippingInfo.country}</div>
                  {shippingInfo.notes && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      <span className="font-medium">Notes:</span> {shippingInfo.notes}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium">Payment Method</h4>
                <Separator className="my-2" />
                <div>
                  {paymentInfo.method === 'mpesa' && 'M-PESA Mobile Money'}
                  {paymentInfo.method === 'card' && 'Credit/Debit Card'}
                  {paymentInfo.method === 'cash' && 'Cash on Delivery'}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        {currentStep === 'confirmation' && (
          <Button asChild className="w-full">
            <a href="/marketplace">Continue Shopping</a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}