import { Card, CardContent } from "@/components/ui/card";
import { Building2, GraduationCap, Globe, Microscope } from "lucide-react";
import cfTechLogo from "@/assets/partner/cftech.png";

const Partners = () => {
  const partners = [
    {
      name: "CF TechLab",
      type: "Tech Partner",
      description: "Technology partner supporting design and development",
      logo: cfTechLogo,
      url: "https://cftechlab.hcsarker.me",
    },
    {
      name: "PSTU Research Center",
      type: "Academic Partner",
      icon: GraduationCap,
      description: "Collaborative research initiatives and lab facilities"
    },
    {
      name: "National Bioinformatics Institute",
      type: "Knowledge Partner",
      icon: Microscope,
      description: "Training programs and certification courses"
    },
    {
      name: "Tech4Bio Solutions",
      type: "Industry Partner",
      icon: Building2,
      description: "Internship opportunities and career guidance"
    },
    {
      name: "Global Genomics Network",
      type: "International Partner",
      icon: Globe,
      description: "International collaborations and exchange programs"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-primary">Partners</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Collaborating with leading institutions to provide the best opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <Card
                key={index}
                className="hover:shadow-elegant transition-all duration-500 hover:-translate-y-3 animate-fade-in group border-t-4 border-t-primary/50 hover:border-t-primary cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-110 overflow-hidden">
                    {partner.logo ? (
                      <img src={partner.logo} alt={partner.name} className="w-full h-full object-cover" />
                    ) : (
                      Icon ? <Icon className="w-8 h-8 text-primary-foreground group-hover:animate-float" /> : null
                    )}
                  </div>
                  {partner.url ? (
                    <a href={partner.url} target="_blank" rel="noopener noreferrer" className="text-xl font-bold mb-2 group-hover:text-primary transition-colors inline-block">
                      {partner.name}
                    </a>
                  ) : (
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{partner.name}</h3>
                  )}
                  <p className="text-sm text-primary font-medium mb-3 group-hover:scale-105 transition-transform">{partner.type}</p>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{partner.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Partners;
