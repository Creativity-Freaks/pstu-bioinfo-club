import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Dna, Microscope, Binary, Users, Calendar, GraduationCap } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const HeroPreview = () => {
  const stats = [
    { icon: Users, value: "150+", label: "Members" },
    { icon: Calendar, value: "50+", label: "Events" },
    { icon: GraduationCap, value: "100+", label: "Workshops" }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/80" />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Dna className="absolute top-20 left-10 w-16 h-16 text-primary/20 animate-float opacity-70 hover:opacity-100 transition-opacity" />
        <Microscope className="absolute top-40 right-20 w-12 h-12 text-accent/20 animate-float opacity-70 hover:opacity-100 transition-opacity" style={{ animationDelay: "1s" }} />
        <Binary className="absolute bottom-32 left-20 w-14 h-14 text-primary/20 animate-float opacity-70 hover:opacity-100 transition-opacity" style={{ animationDelay: "2s" }} />
        <Dna className="absolute bottom-40 right-40 w-10 h-10 text-secondary/20 animate-float opacity-50" style={{ animationDelay: "3s" }} />
        <Microscope className="absolute top-1/2 left-1/4 w-8 h-8 text-primary/15 animate-float opacity-50" style={{ animationDelay: "2.5s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-glow">
              Bioinformatics Club PSTU
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Bridging Biology and Computer Science through Data-Driven Research
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Link to="/about">
              <Button size="lg" className="bg-gradient-primary text-lg px-8 hover:scale-110 transition-all duration-300 shadow-elegant hover:shadow-glow group">
                Explore More
                <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
              </Button>
            </Link>
            <Link to="/events">
              <Button size="lg" variant="outline" className="text-lg px-8 border-2 hover:scale-110 hover:bg-primary/10 hover:border-primary transition-all duration-300">
                View Events
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:scale-110 hover:shadow-glow animate-fade-in group cursor-pointer"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <stat.icon className="w-10 h-10 mx-auto mb-3 text-primary group-hover:animate-float" />
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-primary mb-2 group-hover:scale-110 transition-transform">{stat.value}</div>
                <div className="text-muted-foreground group-hover:text-foreground transition-colors">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPreview;
