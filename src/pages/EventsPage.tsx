import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users2, Clock } from "lucide-react";
import FloatingActions from "@/components/FloatingActions";
import { useSupabaseList } from "@/hooks/useSupabaseList";

const EventsPage = () => {
  const upcomingWorkshops = [
    {
      title: "Introduction to Python Programming",
      date: "March 15, 2024",
      time: "10:00 AM - 1:00 PM",
      location: "Computer Lab 1, PSTU",
      instructor: "Dr. Ahmed Khan",
      seats: 30,
      level: "Beginner",
      description: "Learn the basics of Python for biological data analysis. Perfect for beginners with no prior programming experience.",
    },
    {
      title: "NGS Data Analysis Workshop",
      date: "March 22, 2024",
      time: "2:00 PM - 6:00 PM",
      location: "Bioinformatics Lab",
      instructor: "Dr. Fatima Rahman",
      seats: 25,
      level: "Intermediate",
      description: "Hands-on workshop on analyzing next-generation sequencing data using industry-standard tools and pipelines.",
    },
    {
      title: "Machine Learning in Biology",
      date: "March 29, 2024",
      time: "9:00 AM - 2:00 PM",
      location: "Computer Lab 2",
      instructor: "Dr. Mohammad Hasan",
      seats: 20,
      level: "Advanced",
      description: "Apply machine learning algorithms to biological datasets. Requires programming experience in Python.",
    },
  ];

  const upcomingSeminars = [
    {
      title: "Future of Personalized Medicine",
      speaker: "Dr. Sarah Johnson",
      organization: "Harvard Medical School",
      date: "April 5, 2024",
      time: "3:00 PM - 5:00 PM",
      location: "Main Auditorium",
      description: "Explore how genomics and AI are revolutionizing personalized healthcare and treatment strategies.",
    },
    {
      title: "CRISPR Technology and Gene Editing",
      speaker: "Prof. James Chen",
      organization: "MIT",
      date: "April 12, 2024",
      time: "4:00 PM - 6:00 PM",
      location: "Seminar Hall",
      description: "Deep dive into CRISPR-Cas9 technology, its applications, and ethical considerations in modern genetics.",
    },
    {
      title: "Computational Drug Discovery",
      speaker: "Dr. Emily Williams",
      organization: "Pfizer Research",
      date: "April 19, 2024",
      time: "2:00 PM - 4:00 PM",
      location: "Conference Room A",
      description: "Learn how computational methods are accelerating drug discovery and reducing development costs.",
    },
  ];

  const upcomingEvents = [
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
    },
    {
      title: "Career Fair: Biotech Industry",
      date: "April 15, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Campus Ground",
      type: "Career Event",
      attendees: 200,
      description: "Meet recruiters from leading biotech and pharmaceutical companies. Explore career opportunities in bioinformatics, genomics, and computational biology.",
      instructor: "Industry Representatives",
      prerequisites: "None"
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

  const { data: dbEvents, isLoading: eventsLoading, error: eventsError } = useSupabaseList<{
    id: number;
    title: string;
    description?: string;
    date?: string;
    location?: string;
  }>("events", { orderBy: "id", ascending: false, limit: 9 });

  return (
    <div className="min-h-screen">
      <Navigation />
      <FloatingActions />
      
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
                <div className="text-3xl font-bold text-primary mb-1">10+</div>
                <div className="text-sm text-muted-foreground">Events Held</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 border border-primary/10 hover:border-primary/30 transition-all hover:scale-105">
                <div className="text-3xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Participants</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 border border-primary/10 hover:border-primary/30 transition-all hover:scale-105">
                <div className="text-3xl font-bold text-primary mb-1">2+</div>
                <div className="text-sm text-muted-foreground">Workshops</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 border border-primary/10 hover:border-primary/30 transition-all hover:scale-105">
                <div className="text-3xl font-bold text-primary mb-1">5+</div>
                <div className="text-sm text-muted-foreground">Speakers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Events (Dynamic) */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Latest Events</h2>
            <p className="text-muted-foreground">From the Admin dashboard</p>
          </div>
          {eventsError && <p className="text-red-500 mb-6">{String(eventsError.message || eventsError)}</p>}
          {eventsLoading ? (
            <p className="text-muted-foreground">Loading events...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(dbEvents ?? []).map((ev, index) => (
                <Card key={ev.id} className="hover:shadow-elegant transition-all duration-500 border-t-4 border-t-primary/50 hover:-translate-y-2">
                  <CardHeader>
                    <CardTitle className="text-2xl">{ev.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">{ev.description || ""}</p>
                    <div className="space-y-2 text-sm">
                      {ev.date && (
                        <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {ev.date}</div>
                      )}
                      {ev.location && (
                        <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {ev.location}</div>
                      )}
                    </div>
                    <Button variant="outline" className="w-full">Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Workshops */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Upcoming <span className="text-primary">Workshops</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Hands-on workshops to develop practical bioinformatics skills
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingWorkshops.map((workshop, index) => (
              <Card
                key={index}
                className="hover:shadow-elegant transition-all duration-500 hover:-translate-y-3 border-t-4 border-t-primary/50 hover:border-t-primary animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <Badge className="bg-accent text-accent-foreground text-sm group-hover:scale-110 transition-transform">{workshop.level}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground group-hover:text-primary transition-colors">
                      <Users2 className="w-4 h-4 mr-1 group-hover:animate-float" />
                      {workshop.seats} seats
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">{workshop.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{workshop.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-start text-sm">
                      <Calendar className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-primary" />
                      <div>
                        <div className="font-medium">{workshop.date}</div>
                      </div>
                    </div>
                    <div className="flex items-start text-sm">
                      <Clock className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-primary" />
                      <div>{workshop.time}</div>
                    </div>
                    <div className="flex items-start text-sm">
                      <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-primary" />
                      <div>{workshop.location}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Instructor:</span> {workshop.instructor}
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

      {/* Upcoming Seminars */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Upcoming <span className="text-primary">Seminars</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Expert talks from industry leaders and researchers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingSeminars.map((seminar, index) => (
              <Card
                key={index}
                className="hover:shadow-elegant transition-all duration-500 hover:-translate-y-3 border-t-4 border-t-accent/50 hover:border-t-accent animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="mb-3">
                    <Badge variant="secondary" className="group-hover:scale-110 transition-transform">Seminar</Badge>
                  </div>
                  <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">{seminar.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{seminar.description}</p>
                  
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Speaker:</span> {seminar.speaker}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Organization:</span> {seminar.organization}
                    </div>
                    <div className="flex items-start text-sm">
                      <Calendar className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-primary" />
                      <div>
                        <div className="font-medium">{seminar.date}</div>
                      </div>
                    </div>
                    <div className="flex items-start text-sm">
                      <Clock className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-primary" />
                      <div>{seminar.time}</div>
                    </div>
                    <div className="flex items-start text-sm">
                      <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-primary" />
                      <div>{seminar.location}</div>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-elegant hover:shadow-glow group">
                    Attend Seminar
                    <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Other Events */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Other <span className="text-primary">Events</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Hackathons, career fairs, and special events
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
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
                      <span className="font-medium">Organizer:</span> {event.instructor}
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
      <section className="py-20 bg-gradient-card">
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
          <Button size="lg" className="bg-gradient-primary hover:scale-110 transition-all duration-300 shadow-elegant hover:shadow-glow group" onClick={() => (window.location.href = "/join") }>
            <span className="group-hover:animate-float inline-block">Join Our Community</span>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventsPage;
