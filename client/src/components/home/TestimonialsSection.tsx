import { useQuery } from "@tanstack/react-query";
import { Testimonial } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials']
  });

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`h-5 w-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'}`} 
      />
    ));
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-[#36B5A6]/10 text-[#36B5A6] font-medium rounded-full text-sm mb-4">Testimonials</div>
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">What Our Patients Say</h2>
          <p className="text-lg max-w-2xl mx-auto text-neutral-600">Read about the experiences of our satisfied patients and their dental journey with us.</p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="bg-white border-0 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8F5FF] rounded-full transform translate-x-16 -translate-y-16 opacity-30 z-0"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="mb-5 flex">
                    {[...Array(5)].map((_, j) => (
                      <Skeleton key={j} className="h-5 w-5 rounded-full mr-1" />
                    ))}
                  </div>
                  <Skeleton className="h-4 w-full mb-3" />
                  <Skeleton className="h-4 w-full mb-3" />
                  <Skeleton className="h-4 w-full mb-3" />
                  <Skeleton className="h-4 w-3/4 mb-6" />
                  <div className="flex items-center">
                    <Skeleton className="h-12 w-12 rounded-full mr-4" />
                    <div>
                      <Skeleton className="h-5 w-24 mb-2" />
                      <Skeleton className="h-3 w-36" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load testimonials. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials?.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white border-0 rounded-2xl hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8F5FF] rounded-full transform translate-x-16 -translate-y-16 opacity-30 z-0"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="text-yellow-400 mb-5 flex">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="mb-6 italic text-neutral-700 leading-relaxed">&quot;{testimonial.content}&quot;</p>
                  <div className="flex items-center">
                    <div className="mr-4 bg-gradient-to-br from-primary/80 to-[#00ADDD]/80 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold shadow-md">
                      {testimonial.name.split(' ').map(part => part[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-primary">{testimonial.name}</p>
                      <p className="text-sm text-neutral-500">Patient since {testimonial.patientSince}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
