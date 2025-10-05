import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain, Code, Database, Users, ArrowRight } from "lucide-react";

const AboutPreview = () => {
  const features = [
    {
      icon: Brain,
      title: "Research Focus",
      description: "Cutting-edge bioinformatics research"
    },
    {
      icon: Code,
      title: "Coding Skills",
      description: "Python, R, and specialized tools"
    },
    {
      icon: Database,
      title: "Data Science",
      description: "Big data and computational biology"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Connect with peers and researchers"
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About Our <span className="text-primary">Club</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering students to explore the intersection of biology and technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-t-primary animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary animate-float" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/about">
            <Button size="lg" className="bg-gradient-primary group">
              Learn More About Us
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
