import { Button } from "@/components/ui/button";
import { Dna, Microscope, Binary } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Bioinformatics visualization"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden">
        <Dna className="absolute top-20 left-10 w-16 h-16 text-accent opacity-20 animate-float" />
        <Microscope className="absolute bottom-32 right-20 w-20 h-20 text-secondary opacity-20 animate-float" style={{ animationDelay: '1s' }} />
        <Binary className="absolute top-40 right-32 w-12 h-12 text-accent opacity-20 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Welcome to the
            <span className="block bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Bioinformatics Club
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Exploring the intersection of biology, computer science, and data analytics at PSTU
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button
              onClick={() => scrollToSection("#about")}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg"
            >
              Learn More
            </Button>
            <Button
              onClick={() => scrollToSection("#contact")}
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
            >
              Join Our Community
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            {[
              { number: "100+", label: "Active Members" },
              { number: "20+", label: "Projects Completed" },
              { number: "15+", label: "Events Organized" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="text-4xl font-bold text-accent">{stat.number}</div>
                <div className="text-white/80 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
