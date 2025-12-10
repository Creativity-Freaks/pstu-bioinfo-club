import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

const WorkshopsPage = () => {
  const workshops = [
    {
      id: 1,
      title: "Introduction to Genomics Data Analysis",
      date: "April 15, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Computer Lab, PSTU",
      instructor: "Dr. Rahman Ahmed",
      seats: 30,
      level: "Beginner",
      description: "Learn the fundamentals of genomics data analysis using modern bioinformatics tools and techniques.",
    },
    {
      id: 2,
      title: "Python for Bioinformatics",
      date: "April 22, 2025",
      time: "10:00 AM - 2:00 PM",
      location: "Seminar Hall, PSTU",
      instructor: "Prof. Sultana Begum",
      seats: 40,
      level: "Intermediate",
      description: "Master Python programming for biological data analysis, including Biopython and data visualization.",
    },
    {
      id: 3,
      title: "Machine Learning in Drug Discovery",
      date: "May 5, 2025",
      time: "9:00 AM - 4:00 PM",
      location: "Research Center, PSTU",
      instructor: "Dr. Karim Hassan",
      seats: 25,
      level: "Advanced",
      description: "Explore how machine learning is revolutionizing drug discovery and molecular design.",
    },
  ];

  const seminars = [
    {
      id: 1,
      title: "Career Opportunities in Bioinformatics",
      date: "April 18, 2025",
      time: "3:00 PM - 5:00 PM",
      speaker: "Dr. Fatima Khan",
      organization: "International Bioinformatics Institute",
    },
    {
      id: 2,
      title: "Recent Advances in Computational Biology",
      date: "April 28, 2025",
      time: "2:00 PM - 4:00 PM",
      speaker: "Prof. Mahmud Ali",
      organization: "PSTU Research Department",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <FloatingActions />
      
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-primary">
              Workshops & Seminars
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enhance your skills through hands-on workshops and learn from experts in our seminars
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Upcoming Workshops</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workshops.map((workshop) => (
                <Card key={workshop.id} className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">{workshop.level}</Badge>
                      <Badge variant="outline" className="gap-1">
                        <Users className="w-3 h-3" />
                        {workshop.seats} seats
                      </Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {workshop.title}
                    </CardTitle>
                    <CardDescription>{workshop.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{workshop.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{workshop.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{workshop.location}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium">Instructor: {workshop.instructor}</p>
                    </div>
                    <Button className="w-full mt-4">Register Now</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8">Upcoming Seminars</h2>
            <div className="space-y-6">
              {seminars.map((seminar) => (
                <Card key={seminar.id} className="hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{seminar.title}</h3>
                        <p className="text-muted-foreground mb-4">by {seminar.speaker}</p>
                        <Badge>{seminar.organization}</Badge>
                      </div>
                      <div className="flex flex-col justify-center space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>{seminar.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{seminar.time}</span>
                        </div>
                        <Button className="mt-2">Attend Seminar</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WorkshopsPage;
