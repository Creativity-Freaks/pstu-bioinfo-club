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
      count: "50+",
      description: "Dedicated student leaders"
    },
    {
      name: "Active Members",
      count: "100+",
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
              className="bg-gradient-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-3 animate-fade-in group cursor-pointer border-t-4 border-t-primary/50 hover:border-t-primary"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-primary mb-3 group-hover:scale-110 transition-transform">{highlight.count}</div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{highlight.name}</h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/team">
            <Button size="lg" className="bg-gradient-primary hover:scale-110 transition-all duration-300 shadow-elegant hover:shadow-glow group">
              Meet Our Team
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeamPreview;
