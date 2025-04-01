import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { BookingData } from "@/pages/booking";

interface PatientInfoProps {
  initialData: BookingData;
  onSubmit: (data: Partial<BookingData>) => void;
  onBack: () => void;
}

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  bookingForSomeoneElse: z.boolean().default(false),
  patientType: z.enum(["new", "returning"]),
});

export default function PatientInfo({ initialData, onSubmit, onBack }: PatientInfoProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: initialData.firstName || "",
      lastName: initialData.lastName || "",
      bookingForSomeoneElse: initialData.bookingForSomeoneElse || false,
      patientType: initialData.patientType || "new",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data);
  };

  const selectPatientType = (type: "new" | "returning") => {
    form.setValue("patientType", type);
    form.handleSubmit(handleSubmit)();
  };

  return (
    <CardContent className="px-6 py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <h3 className="text-2xl font-bold mb-6">Hi, Welcome to Nextcare Dental Studio - Kenya</h3>
          <p className="mb-6">Who is this appointment for?</p>
          
          <div className="mb-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="text-red-500">*</span> Patient Name (Required)
                  </FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormControl>
                      <Input 
                        placeholder="Last Name" 
                        {...form.register("lastName")} 
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="mb-6">
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
          
          <div className="mb-8">
            <p className="mb-4 font-medium">Have you visited us before?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className={form.watch("patientType") === "new" ? "border-primary" : ""}
                onClick={() => selectPatientType("new")}
              >
                New Patient
              </Button>
              <Button
                type="button"
                variant="outline"
                className={form.watch("patientType") === "returning" ? "border-primary" : ""}
                onClick={() => selectPatientType("returning")}
              >
                Returning Patient
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </CardContent>
  );
}
