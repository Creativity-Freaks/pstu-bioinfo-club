import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users2, ArrowRight } from "lucide-react";

const EventsPreview = () => {
  const upcomingEvents = [
    {
      title: "Introduction to Genomic Analysis",
      date: "March 15, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "Biology Lab, PSTU",
      type: "Workshop",
      attendees: 45
    },
    {
      title: "Machine Learning in Drug Discovery",
      date: "March 22, 2025",
      time: "3:00 PM - 5:00 PM",
      location: "Computer Lab 2",
      type: "Seminar",
      attendees: 60
    },
    {
      title: "Bioinformatics Hackathon 2025",
      date: "April 5-6, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Main Auditorium",
      type: "Competition",
      attendees: 100
    }
  ];

  return (
    <section id="events" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Upcoming <span className="text-primary">Events</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join us for workshops, seminars, and hands-on sessions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {upcomingEvents.map((event, index) => (
            <Card
              key={index}
              className="hover:shadow-elegant transition-all duration-500 hover:-translate-y-3 border-t-4 border-t-primary/50 hover:border-t-primary animate-fade-in group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge className="bg-accent text-accent-foreground group-hover:scale-110 transition-transform">{event.type}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    <Users2 className="w-4 h-4 mr-1 group-hover:animate-float" />
                    {event.attendees}
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{event.date}</div>
                    <div>{event.time}</div>
                  </div>
                </div>
                <div className="flex items-start text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <div>{event.location}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/events">
            <Button size="lg" className="bg-gradient-primary hover:scale-110 transition-all duration-300 shadow-elegant hover:shadow-glow group">
              View All Events
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsPreview;
