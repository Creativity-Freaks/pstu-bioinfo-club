import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const TeamPreview = () => {
  const teamHighlights = [
    {
      name: "Faculty Advisors",
      count: "2",
      description: "Distinguished professors guiding our journey"
    },
    {
      name: "Executive Committee",
      count: "6",
      description: "Dedicated student leaders"
    },
    {
      name: "Active Members",
      count: "150+",
      description: "Passionate bioinformatics enthusiasts"
    }
  ];

  return (
    <section id="team" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-primary">Team</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet the passionate individuals driving our club forward
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {teamHighlights.map((highlight, index) => (
            <Card
              key={index}
              className="bg-gradient-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className="text-5xl font-bold text-primary mb-3">{highlight.count}</div>
                <h3 className="text-2xl font-bold mb-2">{highlight.name}</h3>
                <p className="text-muted-foreground">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/team">
            <Button size="lg" className="bg-gradient-primary group">
              Meet Our Team
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeamPreview;
