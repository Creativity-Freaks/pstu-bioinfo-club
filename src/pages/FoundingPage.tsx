import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Target, Calendar } from "lucide-react";
import saimonImg from "@/assets/founding member/saimon.jpeg";
import parthoImg from "@/assets/founding member/partho.jpeg";
import niloyImg from "@/assets/founding member/niloy.jpeg";
import hasibImg from "@/assets/founding member/hasib.jpeg";

const FoundingPage = () => {
  const milestones = [
    { year: "2024", title: "Club Founded", description: "Bioinformatics Club PSTU was established with a vision to promote computational biology." },
    { year: "2024", title: "First Workshop", description: "Organized our first workshop on Introduction to Bioinformatics with 50+ participants." },
    { year: "2024", title: "Partnerships", description: "Established collaborations with leading research institutions and universities." },
    { year: "2025", title: "Growing Community", description: "Expanded to 100+ active members and multiple research projects." },
  ];

  const founders = [
    { name: "Saimon Islam", role: "Founder", faculty: "Faculty of Agriculture", session: "2019-20", photo: saimonImg },
    { name: "Partho Sarker Dhrubo", role: "Co-founder", faculty: "Faculty of Agriculture", session: "2019-2020", photo: parthoImg },
  ];

  const foundingMembers = [
    { name: "A.S.M. Nur-A-Safi Niloy", role: "Founding Member", department: "Nutrition and Food Science", session: "2022-23", photo: niloyImg },
    { name: "Md.Hasibur Rahman", role: "Founding Member", department: "Nutrition and Food Science", session: "2022-23", photo: hasibImg },
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
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {founders.map((f, index) => (
                <Card key={index} className="text-center hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-card mx-auto mb-4 shadow-md">
                      <img src={f.photo} alt={f.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-bold mb-1">{f.name}</h3>
                    <p className="text-primary font-medium mb-1">{f.role}</p>
                    <p className="text-sm text-muted-foreground">{f.faculty}</p>
                    <p className="text-xs text-muted-foreground">Session: {f.session}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h3 className="text-2xl font-bold mb-6 text-center">Founding Members</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {foundingMembers.map((m, index) => (
                <Card key={index} className="text-center hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-card mx-auto mb-4 shadow-md">
                      <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="text-lg font-bold mb-1">{m.name}</h4>
                    <p className="text-primary font-medium mb-1">{m.role}</p>
                    <p className="text-sm text-muted-foreground">{m.department}</p>
                    <p className="text-xs text-muted-foreground">Session: {m.session}</p>
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
