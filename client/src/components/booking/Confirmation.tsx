import { format, parse } from "date-fns";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookingData } from "@/pages/booking";
import { CheckCircle, Calendar, Printer } from "lucide-react";

interface ConfirmationProps {
  bookingData: BookingData;
  appointmentId: number | null;
}

export default function Confirmation({ bookingData, appointmentId }: ConfirmationProps) {
  const formattedDate = bookingData.appointmentDate ? 
    format(parse(bookingData.appointmentDate, "yyyy-MM-dd", new Date()), "EEEE, MMMM d, yyyy") : "";
  
  const handleAddToCalendar = () => {
    // This would typically generate a calendar event file or URL
    alert("Calendar feature would be implemented here with a real calendar integration");
  };
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <CardContent className="px-6 py-8">
      <div className="text-center">
        <div className="text-5xl text-green-500 mb-4 flex justify-center">
          <CheckCircle className="h-16 w-16" />
        </div>
        <h3 className="text-2xl font-bold mb-4">Appointment Confirmed!</h3>
        <p className="mb-6">Your appointment has been successfully scheduled. A confirmation SMS has been sent to your phone.</p>
        
        <div className="bg-neutral-50 rounded-lg p-6 mb-6 text-left">
          <h4 className="font-medium mb-3">Appointment Details:</h4>
          <p className="mb-2"><strong>Service:</strong> {bookingData.serviceName}</p>
          <p className="mb-2"><strong>Date:</strong> {formattedDate}</p>
          <p className="mb-2"><strong>Time:</strong> {bookingData.appointmentTime}</p>
          <p className="mb-2"><strong>Location:</strong> Nextcare Dental Studio - Nairobi, Kenya</p>
          <p className="mb-6"><strong>Patient:</strong> {bookingData.firstName} {bookingData.lastName}</p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleAddToCalendar} className="flex items-center justify-center">
              <Calendar className="mr-2 h-4 w-4" /> Add to Calendar
            </Button>
            <Button variant="outline" onClick={handlePrint} className="flex items-center justify-center">
              <Printer className="mr-2 h-4 w-4" /> Print Details
            </Button>
          </div>
        </div>
        
        <p className="text-sm text-neutral-500">Need to make changes? Please call our office at +254 722 123456</p>
      </div>
    </CardContent>
  );
}
