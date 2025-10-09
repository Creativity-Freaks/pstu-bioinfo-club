import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const WorkshopsPreview = () => {
  const featuredWorkshops = [
    {
      id: 1,
      title: "Introduction to Python Programming",
      description: "Learn the basics of Python for biological data analysis",
      date: "March 15, 2024",
      duration: "3 hours",
      participants: 30,
      level: "Beginner",
    },
    {
      id: 2,
      title: "NGS Data Analysis",
      description: "Hands-on workshop on analyzing next-generation sequencing data",
      date: "March 22, 2024",
      duration: "4 hours",
      participants: 25,
      level: "Intermediate",
    },
    {
      id: 3,
      title: "Machine Learning in Biology",
      description: "Apply ML algorithms to biological datasets",
      date: "March 29, 2024",
      duration: "5 hours",
      participants: 20,
      level: "Advanced",
    },
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-primary">
            Upcoming Workshops
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our hands-on workshops to develop practical bioinformatics skills
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredWorkshops.map((workshop) => (
            <Card key={workshop.id} className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{workshop.level}</Badge>
                  <Badge variant="outline" className="gap-1">
                    <Users className="w-3 h-3" />
                    {workshop.participants}
                  </Badge>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {workshop.title}
                </CardTitle>
                <CardDescription>{workshop.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{workshop.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{workshop.duration}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/workshops">
            <Button size="lg" className="group">
              Explore More Workshops
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WorkshopsPreview;
