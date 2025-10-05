import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users2, Clock } from "lucide-react";

const EventsPage = () => {
  const upcomingEvents = [
    {
      title: "Introduction to Genomic Analysis",
      date: "March 15, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "Biology Lab, PSTU",
      type: "Workshop",
      attendees: 45,
      description: "Learn the fundamentals of genomic data analysis using Python and Biopython. This hands-on workshop will cover sequence alignment, gene annotation, and basic phylogenetic analysis.",
      instructor: "Dr. Rahman",
      prerequisites: "Basic Python knowledge"
    },
    {
      title: "Machine Learning in Drug Discovery",
      date: "March 22, 2025",
      time: "3:00 PM - 5:00 PM",
      location: "Computer Lab 2",
      type: "Seminar",
      attendees: 60,
      description: "Guest lecture on AI applications in pharmaceutical research. Explore how machine learning algorithms are revolutionizing drug discovery and molecular design.",
      instructor: "Guest Speaker from Square Pharmaceuticals",
      prerequisites: "None"
    },
    {
      title: "Bioinformatics Hackathon 2025",
      date: "April 5-6, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Main Auditorium",
      type: "Competition",
      attendees: 100,
      description: "24-hour hackathon to solve real biological problems using computational methods. Teams will work on challenges related to genome assembly, protein structure prediction, and disease biomarker identification.",
      instructor: "Faculty Panel",
      prerequisites: "Programming experience required"
    }
  ];

  const pastEvents = [
    {
      title: "Protein Structure Prediction Workshop",
      date: "February 20, 2025",
      participants: 38,
      description: "Explored AlphaFold and PyMOL for protein modeling",
      highlights: "Hands-on with AlphaFold2, molecular visualization, structure validation"
    },
    {
      title: "RNA-Seq Data Analysis Bootcamp",
      date: "February 10, 2025",
      participants: 42,
      description: "Comprehensive training on transcriptome analysis",
      highlights: "Quality control, differential expression, pathway analysis"
    },
    {
      title: "Career Panel: Bioinformatics Industry",
      date: "January 28, 2025",
      participants: 75,
      description: "Industry professionals shared career insights",
      highlights: "Career paths, skill requirements, job market trends"
    },
    {
      title: "Introduction to Molecular Docking",
      date: "January 15, 2025",
      participants: 35,
      description: "Drug-target interaction modeling workshop",
      highlights: "AutoDock Vina, virtual screening, binding affinity analysis"
    },
    {
      title: "Genome Assembly & Annotation",
      date: "December 18, 2024",
      participants: 40,
      description: "Next-generation sequencing data processing",
      highlights: "De novo assembly, gene prediction, functional annotation"
    },
    {
      title: "Python for Biologists Bootcamp",
      date: "December 5, 2024",
      participants: 55,
      description: "Intensive programming course for life scientists",
      highlights: "BioPython basics, sequence manipulation, data parsing"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-primary">Events</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join us for workshops, seminars, hackathons, and hands-on sessions designed to 
              enhance your bioinformatics skills and connect you with the community.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Upcoming <span className="text-primary">Events</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Register now to secure your spot in our upcoming events
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card
                key={index}
                className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-t-primary animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <Badge className="bg-accent text-accent-foreground text-sm">{event.type}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users2 className="w-4 h-4 mr-1" />
                      {event.attendees} seats
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-2">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{event.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-start text-sm">
                      <Calendar className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-primary" />
                      <div>
                        <div className="font-medium">{event.date}</div>
                      </div>
                    </div>
                    <div className="flex items-start text-sm">
                      <Clock className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-primary" />
                      <div>{event.time}</div>
                    </div>
                    <div className="flex items-start text-sm">
                      <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-primary" />
                      <div>{event.location}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Instructor:</span> {event.instructor}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Prerequisites:</span> {event.prerequisites}
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-primary">
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Past <span className="text-primary">Events</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Take a look at our successful events and workshops
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline">{event.date}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users2 className="w-4 h-4 mr-1 text-primary" />
                      {event.participants}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-muted-foreground mb-3 text-sm">{event.description}</p>
                  <div className="text-sm">
                    <span className="font-medium text-primary">Highlights:</span>
                    <p className="text-muted-foreground mt-1">{event.highlights}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Don't miss out on our upcoming events. Follow us on social media and join our mailing list 
            for the latest updates.
          </p>
          <Button size="lg" className="bg-gradient-primary">
            Join Our Community
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventsPage;
