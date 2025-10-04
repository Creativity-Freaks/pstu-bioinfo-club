import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users2 } from "lucide-react";

const Events = () => {
  const upcomingEvents = [
    {
      title: "Introduction to Genomic Analysis",
      date: "March 15, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "Biology Lab, PSTU",
      type: "Workshop",
      attendees: 45,
      description: "Learn the fundamentals of genomic data analysis using Python and Biopython."
    },
    {
      title: "Machine Learning in Drug Discovery",
      date: "March 22, 2025",
      time: "3:00 PM - 5:00 PM",
      location: "Computer Lab 2",
      type: "Seminar",
      attendees: 60,
      description: "Guest lecture on AI applications in pharmaceutical research."
    },
    {
      title: "Bioinformatics Hackathon 2025",
      date: "April 5-6, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Main Auditorium",
      type: "Competition",
      attendees: 100,
      description: "24-hour hackathon to solve real biological problems using computational methods."
    }
  ];

  const pastEvents = [
    {
      title: "Protein Structure Prediction Workshop",
      date: "February 20, 2025",
      participants: 38
    },
    {
      title: "RNA-Seq Data Analysis Bootcamp",
      date: "February 10, 2025",
      participants: 42
    },
    {
      title: "Career Panel: Bioinformatics Industry",
      date: "January 28, 2025",
      participants: 75
    }
  ];

  return (
    <section id="events" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Upcoming <span className="text-primary">Events</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join us for workshops, seminars, and hands-on sessions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {upcomingEvents.map((event, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-t-primary animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge className="bg-accent text-accent-foreground">{event.type}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users2 className="w-4 h-4 mr-1" />
                    {event.attendees}
                  </div>
                </div>
                <CardTitle className="text-xl">{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">{event.description}</p>
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

        <div className="bg-muted rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6">Recent Events</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-all"
              >
                <h4 className="font-bold mb-2">{event.title}</h4>
                <div className="text-sm text-muted-foreground mb-2">{event.date}</div>
                <div className="text-sm text-primary font-medium">
                  {event.participants} participants
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
