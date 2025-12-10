import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Target, Calendar } from "lucide-react";

const FoundingPage = () => {
  const milestones = [
    { year: "2024", title: "Club Founded", description: "Bioinformatics Club PSTU was established with a vision to promote computational biology." },
    { year: "2024", title: "First Workshop", description: "Organized our first workshop on Introduction to Bioinformatics with 50+ participants." },
    { year: "2024", title: "Partnerships", description: "Established collaborations with leading research institutions and universities." },
    { year: "2025", title: "Growing Community", description: "Expanded to 100+ active members and multiple research projects." },
  ];

  const founders = [
    { name: "Dr. Rahman Ahmed", role: "Faculty Advisor", department: "Dept. of Biotechnology" },
    { name: "Fatima Sultana", role: "Founding President", department: "BSc in Biotechnology, 3rd Year" },
    { name: "Karim Hassan", role: "Founding Vice President", department: "BSc in Computer Science, 4th Year" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <FloatingActions />
      
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-primary">
              Our Story
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn about the founding and journey of Bioinformatics Club PSTU
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="text-center hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-2">100+</h3>
                <p className="text-muted-foreground">Active Members</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-2">25+</h3>
                <p className="text-muted-foreground">Events Organized</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-2">10+</h3>
                <p className="text-muted-foreground">Research Projects</p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {milestones.map((milestone, index) => (
                <Card key={index} className="hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-primary font-bold text-lg">{milestone.year}</span>
                          <h3 className="text-xl font-bold">{milestone.title}</h3>
                        </div>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">Founding Team</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {founders.map((founder, index) => (
                <Card key={index} className="text-center hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                      {founder.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="text-xl font-bold mb-1">{founder.name}</h3>
                    <p className="text-primary font-medium mb-2">{founder.role}</p>
                    <p className="text-sm text-muted-foreground">{founder.department}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FoundingPage;
