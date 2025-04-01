import { useState } from "react";
import { Helmet } from "react-helmet";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import ServiceSelection from "@/components/booking/ServiceSelection";
import PatientInfo from "@/components/booking/PatientInfo";
import ScheduleSelection from "@/components/booking/ScheduleSelection";
import PatientDetails from "@/components/booking/PatientDetails";
import Confirmation from "@/components/booking/Confirmation";
import { Service } from "@shared/schema";

export type BookingSteps = 
  | "service" 
  | "patient-info" 
  | "schedule" 
  | "details" 
  | "confirmation";

export interface BookingData {
  serviceId: number | null;
  serviceName: string;
  serviceDescription: string;
  firstName: string;
  lastName: string;
  patientType: "new" | "returning";
  email: string;
  phone: string;
  dateOfBirth: string;
  appointmentDate: string;
  appointmentTime: string;
  paymentMethod: "cash" | "insurance" | "";
  insuranceProvider: string;
  message: string;
  bookingForSomeoneElse: boolean;
}

export default function Booking() {
  const [activeStep, setActiveStep] = useState<BookingSteps>("service");
  const [bookingData, setBookingData] = useState<BookingData>({
    serviceId: null,
    serviceName: "",
    serviceDescription: "",
    firstName: "",
    lastName: "",
    patientType: "new", 
    email: "",
    phone: "",
    dateOfBirth: "",
    appointmentDate: "",
    appointmentTime: "",
    paymentMethod: "",
    insuranceProvider: "",
    message: "",
    bookingForSomeoneElse: false
  });
  const [appointmentId, setAppointmentId] = useState<number | null>(null);

  const handleServiceSelect = (service: Service) => {
    setBookingData({
      ...bookingData,
      serviceId: service.id,
      serviceName: service.name,
      serviceDescription: service.description
    });
    setActiveStep("patient-info");
  };

  const handlePatientInfoSubmit = (data: Partial<BookingData>) => {
    setBookingData(prevData => ({
      ...prevData,
      ...data
    }));
    setActiveStep("schedule");
  };

  const handleScheduleSelect = (date: string, time: string) => {
    setBookingData(prevData => ({
      ...prevData,
      appointmentDate: date,
      appointmentTime: time
    }));
    setActiveStep("details");
  };

  const handleDetailsSubmit = (data: Partial<BookingData>, appointmentId: number) => {
    setBookingData(prevData => ({
      ...prevData,
      ...data
    }));
    setAppointmentId(appointmentId);
    setActiveStep("confirmation");
  };

  const getStepNumber = (step: BookingSteps): number => {
    const steps: BookingSteps[] = ["service", "patient-info", "schedule", "details", "confirmation"];
    return steps.indexOf(step) + 1;
  };

  return (
    <>
      <Helmet>
        <title>Book an Appointment - Village Dental</title>
        <meta name="description" content="Schedule your dental appointment at Village Dental. We offer a wide range of dental services to meet your needs." />
      </Helmet>
      
      <div className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">Book Your Appointment</h1>
            <p className="text-lg max-w-2xl mx-auto">Schedule your dental visit in just a few simple steps.</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-8 px-4">
              <div className="flex items-center justify-between">
                {["service", "patient-info", "schedule", "details", "confirmation"].map((step, index) => (
                  <>
                    <div 
                      key={step} 
                      className={`flex flex-col items-center ${
                        getStepNumber(activeStep as BookingSteps) >= index + 1 
                          ? 'text-primary' 
                          : 'text-neutral-400'
                      }`}
                    >
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                          getStepNumber(activeStep as BookingSteps) >= index + 1 
                            ? 'bg-primary text-white' 
                            : 'bg-neutral-200 text-neutral-400'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span className="text-sm hidden sm:block capitalize">{step.replace('-', ' ')}</span>
                    </div>
                    
                    {index < 4 && (
                      <div 
                        className={`flex-1 h-1 mx-2 ${
                          getStepNumber(activeStep as BookingSteps) > index + 1 
                            ? 'bg-primary' 
                            : 'bg-neutral-200'
                        }`}
                      ></div>
                    )}
                  </>
                ))}
              </div>
            </div>
            
            <Card className="shadow-lg overflow-hidden">
              <Tabs value={activeStep} className="w-full">
                <TabsContent value="service">
                  <ServiceSelection onServiceSelect={handleServiceSelect} />
                </TabsContent>
                
                <TabsContent value="patient-info">
                  <PatientInfo 
                    onSubmit={handlePatientInfoSubmit} 
                    onBack={() => setActiveStep("service")}
                    initialData={bookingData}
                  />
                </TabsContent>
                
                <TabsContent value="schedule">
                  <ScheduleSelection 
                    onScheduleSelect={handleScheduleSelect} 
                    onBack={() => setActiveStep("patient-info")}
                    bookingData={bookingData}
                  />
                </TabsContent>
                
                <TabsContent value="details">
                  <PatientDetails 
                    onSubmit={handleDetailsSubmit} 
                    onBack={() => setActiveStep("schedule")}
                    initialData={bookingData}
                  />
                </TabsContent>
                
                <TabsContent value="confirmation">
                  <Confirmation 
                    bookingData={bookingData} 
                    appointmentId={appointmentId}
                  />
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
