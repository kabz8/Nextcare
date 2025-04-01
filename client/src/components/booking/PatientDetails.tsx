import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import { BookingData } from "@/pages/booking";
import { useToast } from "@/hooks/use-toast";

interface PatientDetailsProps {
  initialData: BookingData;
  onSubmit: (data: Partial<BookingData>, appointmentId: number) => void;
  onBack: () => void;
}

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  bookingForSomeoneElse: z.boolean().default(false),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  paymentMethod: z.enum(["cash", "insurance", ""]),
  insuranceProvider: z.string().optional(),
  message: z.string().optional(),
});

export default function PatientDetails({ initialData, onSubmit, onBack }: PatientDetailsProps) {
  const { toast } = useToast();
  const [showInsurance, setShowInsurance] = useState(initialData.paymentMethod === "insurance");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: initialData.firstName || "",
      lastName: initialData.lastName || "",
      dateOfBirth: initialData.dateOfBirth || "",
      bookingForSomeoneElse: initialData.bookingForSomeoneElse || false,
      email: initialData.email || "",
      phone: initialData.phone || "",
      paymentMethod: initialData.paymentMethod || "",
      insuranceProvider: initialData.insuranceProvider || "",
      message: initialData.message || "",
    },
  });
  
  const createAppointment = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/appointments", data);
      return response.json();
    },
    onSuccess: (data) => {
      // Handle successful appointment creation
      onSubmit(form.getValues(), data.id);
    },
    onError: (error) => {
      toast({
        title: "Error Creating Appointment",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    // Prepare appointment data for API submission
    const appointmentData = {
      serviceId: initialData.serviceId!,
      patientName: data.firstName,
      patientLastName: data.lastName,
      patientDob: data.dateOfBirth,
      email: data.email,
      phone: data.phone,
      appointmentDate: initialData.appointmentDate,
      appointmentTime: initialData.appointmentTime,
      patientType: initialData.patientType,
      paymentMethod: data.paymentMethod,
      insuranceProvider: data.paymentMethod === "insurance" ? data.insuranceProvider : undefined,
      message: data.message,
      bookingForSomeoneElse: data.bookingForSomeoneElse,
    };
    
    // Submit to API
    createAppointment.mutate(appointmentData);
  };
  
  const handlePaymentMethodChange = (value: string) => {
    if (value === "insurance") {
      setShowInsurance(true);
    } else {
      setShowInsurance(false);
      form.setValue("insuranceProvider", "");
    }
  };

  return (
    <CardContent className="px-6 py-8">
      <h3 className="text-2xl font-bold mb-6">Let's grab some of your info</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="mb-8">
            <h4 className="font-medium mb-4">Patient Info</h4>
            
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="text-red-500">*</span> First Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="text-red-500">*</span> Last Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="mb-4">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="text-red-500">*</span> Patient Date of Birth (Required)
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        placeholder="Date of Birth" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="mb-4">
              <FormField
                control={form.control}
                name="bookingForSomeoneElse"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I'm booking for someone else
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="border-t border-neutral-200 pt-6 mb-8">
            <h4 className="font-medium mb-4">Contact Info</h4>
            
            <div className="mb-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="text-red-500">*</span> Email (Required)
                    </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="mb-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="text-red-500">*</span> Cell Phone Number (Required)
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="tel" 
                        placeholder="(###) ###-####" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="mb-4">
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="text-red-500">*</span> Payment Method (Required)
                    </FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        handlePaymentMethodChange(value);
                      }} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select One" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="insurance">Insurance</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {showInsurance && (
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="insuranceProvider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span className="text-red-500">*</span> Insurance Provider
                      </FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Insurance Provider" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Delta Dental">Delta Dental</SelectItem>
                          <SelectItem value="Cigna">Cigna</SelectItem>
                          <SelectItem value="Aetna">Aetna</SelectItem>
                          <SelectItem value="MetLife">MetLife</SelectItem>
                          <SelectItem value="Guardian">Guardian</SelectItem>
                          <SelectItem value="Blue Cross Blue Shield">Blue Cross Blue Shield</SelectItem>
                          <SelectItem value="United Healthcare">United Healthcare</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            <div className="mb-4">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Message for the Office
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Message" 
                        rows={4} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button 
              type="submit"
              disabled={createAppointment.isPending}
            >
              {createAppointment.isPending ? "Processing..." : "Confirm Booking"}
            </Button>
          </div>
        </form>
      </Form>
    </CardContent>
  );
}
