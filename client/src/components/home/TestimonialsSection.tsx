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
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">What Our Patients Say</h2>
          <p className="text-lg max-w-2xl mx-auto">Read about the experiences of our satisfied patients.</p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="bg-white border-neutral-200">
                <CardContent className="p-6">
                  <div className="mb-3 flex">
                    {[...Array(5)].map((_, j) => (
                      <Skeleton key={j} className="h-5 w-5 rounded-full mr-1" />
                    ))}
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex items-center">
                    <Skeleton className="h-10 w-10 rounded-full mr-3" />
                    <div>
                      <Skeleton className="h-4 w-20 mb-1" />
                      <Skeleton className="h-3 w-32" />
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
              <Card key={testimonial.id} className="bg-white border-neutral-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="text-yellow-400 mb-3 flex">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="mb-4 italic text-neutral-700">&quot;{testimonial.content}&quot;</p>
                  <div className="flex items-center">
                    <div className="mr-3 bg-primary/20 rounded-full w-10 h-10 flex items-center justify-center text-primary font-bold">
                      {testimonial.name.split(' ').map(part => part[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
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
