import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Computer Science, 3rd Year",
    avatar: "/placeholder.svg",
    content: "Joining this club was the best decision of my university life. The workshops and mentorship programs have significantly improved my technical skills and confidence.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Software Engineering, 2nd Year",
    avatar: "/placeholder.svg",
    content: "The community here is amazing! I've learned so much from the senior members and the hands-on projects. It's helped me secure multiple internship opportunities.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Information Systems, 4th Year",
    avatar: "/placeholder.svg",
    content: "The networking events and industry connections through this club opened doors I never knew existed. Highly recommend to anyone serious about tech.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Data Science, 3rd Year",
    avatar: "/placeholder.svg",
    content: "From hackathons to study groups, this club offers everything you need to excel. The supportive environment makes learning enjoyable and effective.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">What Our Members Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from students who have transformed their tech journey with us
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <Quote className="w-10 h-10 text-primary mb-4 opacity-50" />
                    <p className="text-muted-foreground mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
