import { Card, CardContent } from "@/components/ui/card";
import { Brain, Code, Database, Users } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Brain,
      title: "Computational Biology",
      description: "Learn advanced techniques in genomic analysis, protein structure prediction, and biological data interpretation."
    },
    {
      icon: Code,
      title: "Programming & Tools",
      description: "Master Python, R, and specialized bioinformatics tools for data analysis and visualization."
    },
    {
      icon: Database,
      title: "Data Science",
      description: "Develop skills in big data handling, machine learning applications, and statistical analysis."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Work on interdisciplinary projects, attend workshops, and connect with industry professionals."
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About Our <span className="text-primary">Club</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The Bioinformatics Club at PSTU is a student-led organization dedicated to promoting 
            interdisciplinary learning and research at the intersection of biology and computing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-gradient-card border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground mb-4">
                To create a vibrant community where students can explore the exciting field of 
                bioinformatics, develop practical skills, and contribute to cutting-edge research 
                that addresses real-world biological challenges.
              </p>
              <p className="text-muted-foreground">
                We organize workshops, seminars, hackathons, and collaborative projects to foster 
                learning, innovation, and professional growth in this rapidly evolving field.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-primary p-6 rounded-xl text-white">
                <h4 className="text-xl font-bold mb-2">Weekly Workshops</h4>
                <p className="text-white/90">Hands-on sessions on bioinformatics tools and techniques</p>
              </div>
              <div className="bg-gradient-to-br from-secondary to-accent p-6 rounded-xl text-white">
                <h4 className="text-xl font-bold mb-2">Research Projects</h4>
                <p className="text-white/90">Collaborative research opportunities with faculty guidance</p>
              </div>
              <div className="bg-gradient-to-br from-accent to-primary p-6 rounded-xl text-white">
                <h4 className="text-xl font-bold mb-2">Industry Connections</h4>
                <p className="text-white/90">Guest lectures and networking with professionals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
