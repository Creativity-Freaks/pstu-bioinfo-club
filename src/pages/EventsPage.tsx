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
      
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 border-2 border-primary rounded-full animate-float" />
          <div className="absolute bottom-32 right-32 w-60 h-60 border-2 border-accent rounded-full animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 border-2 border-primary rounded-full animate-float" style={{ animationDelay: "2s" }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 border border-primary/20">
              <Calendar className="w-4 h-4 animate-float" />
              <span className="text-sm font-medium">Upcoming & Past Events</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Shape Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-glow">
                Future Today
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Join workshops, seminars, and hackathons designed to enhance your bioinformatics 
              skills and connect you with innovators.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 border border-primary/10 hover:border-primary/30 transition-all hover:scale-105">
                <div className="text-3xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Events Held</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 border border-primary/10 hover:border-primary/30 transition-all hover:scale-105">
                <div className="text-3xl font-bold text-primary mb-1">1000+</div>
                <div className="text-sm text-muted-foreground">Participants</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 border border-primary/10 hover:border-primary/30 transition-all hover:scale-105">
                <div className="text-3xl font-bold text-primary mb-1">30+</div>
                <div className="text-sm text-muted-foreground">Workshops</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 border border-primary/10 hover:border-primary/30 transition-all hover:scale-105">
                <div className="text-3xl font-bold text-primary mb-1">15+</div>
                <div className="text-sm text-muted-foreground">Speakers</div>
              </div>
            </div>
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
                className="hover:shadow-elegant transition-all duration-500 hover:-translate-y-3 border-t-4 border-t-primary/50 hover:border-t-primary animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <Badge className="bg-accent text-accent-foreground text-sm group-hover:scale-110 transition-transform">{event.type}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground group-hover:text-primary transition-colors">
                      <Users2 className="w-4 h-4 mr-1 group-hover:animate-float" />
                      {event.attendees} seats
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">{event.title}</CardTitle>
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

                  <Button className="w-full bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-elegant hover:shadow-glow group">
                    Register Now
                    <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
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
                className="hover:shadow-elegant transition-all duration-500 animate-fade-in group border-l-4 border-l-primary/50 hover:border-l-primary cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="group-hover:border-primary group-hover:text-primary transition-colors">{event.date}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground group-hover:text-primary transition-colors">
                      <Users2 className="w-4 h-4 mr-1 text-primary group-hover:animate-float" />
                      {event.participants}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                  <p className="text-muted-foreground mb-3 text-sm group-hover:text-foreground transition-colors">{event.description}</p>
                  <div className="text-sm">
                    <span className="font-medium text-primary">Highlights:</span>
                    <p className="text-muted-foreground mt-1 group-hover:text-foreground transition-colors">{event.highlights}</p>
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
          <Button size="lg" className="bg-gradient-primary hover:scale-110 transition-all duration-300 shadow-elegant hover:shadow-glow group">
            <span className="group-hover:animate-float inline-block">Join Our Community</span>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventsPage;
