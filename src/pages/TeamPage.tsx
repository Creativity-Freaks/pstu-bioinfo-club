import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Facebook, Linkedin, Mail, Award, Users, Phone } from "lucide-react";
import advisor1 from "@/assets/advisor/advisor1.jpeg";
import advisor2 from "@/assets/advisor/advisor2.jpeg";
import { Button } from "@/components/ui/button";
import Executive2025 from "@/components/Executive2025";

const TeamPage = () => {
  const executiveCommittee = [
    {
      name: "Student President",
      role: "President",
      department: "Biotechnology",
      year: "4th Year",
      bio: "Leading the club's vision and coordinating all activities. Passionate about genomics and computational biology.",
      achievements: "Published 2 research papers, organized 5+ major events",
      expertise: "Python, R, Genomic Analysis"
    },
    {
      name: "Vice President",
      role: "Vice President",
      department: "Computer Science",
      year: "3rd Year",
      bio: "Managing technical workshops and project development. Specializes in machine learning applications in biology.",
      achievements: "Winner of National Bioinformatics Hackathon 2024",
      expertise: "Machine Learning, Deep Learning, Data Science"
    },
    {
      name: "General Secretary",
      role: "General Secretary",
      department: "Biochemistry",
      year: "3rd Year",
      bio: "Organizing events and maintaining club records. Focused on structural bioinformatics and drug design.",
      achievements: "Coordinated 10+ workshops, maintaining 95% attendance",
      expertise: "Molecular Docking, Protein Modeling"
    },
    {
      name: "Treasurer",
      role: "Treasurer",
      department: "Microbiology",
      year: "4th Year",
      bio: "Managing club finances and sponsorships. Interested in metagenomics and microbiome analysis.",
      achievements: "Secured funding for 3 major projects",
      expertise: "Metagenomics, Statistical Analysis"
    },
    {
      name: "Technical Lead",
      role: "Technical Lead",
      department: "Computer Science",
      year: "3rd Year",
      bio: "Managing the technical infrastructure and online platforms. Expert in web development and databases.",
      achievements: "Developed club website and management system",
      expertise: "Web Development, Database Management, Bioinformatics Tools"
    },
    {
      name: "Workshop Coordinator",
      role: "Workshop Coordinator",
      department: "Biotechnology",
      year: "2nd Year",
      bio: "Planning and executing educational workshops. Passionate about teaching and knowledge sharing.",
      achievements: "Organized 8 successful workshops with 300+ participants",
      expertise: "Training, Python, Data Visualization"
    }
  ];

  const advisors = [
    {
      name: "Dr. Md. Mahmudul Hassan",
      title: "Chief Advisor",
      department: "Department of Genetics and Plant Breeding, Faculty of Agriculture",
      office:
        "Patuakhali Science and Technology University, Dumki, Patuakhali-8602",
      phone: "+8801707006769",
      email: "mhassan@pstu.ac.bd",
      photo: advisor2,
      education: "PhD, The University Of Melbourne (2018), Australia; MSc, BAU (2010); BSc, PSTU (2008)",
      research: "Genome Engineering, Synthetic Biology, Metabolic Engineering, Plant-Microbe Interaction",
      publications: "40+ research articles in reputed journals",
    },
    {
      name: "Dr. Md. Rajib Sharker",
      title: "Professor",
      department: "Department of Fisheries Biology and Genetics, Faculty of Fisheries",
      office:
        "Patuakhali Science and Technology University, Dumki, Patuakhali-8602",
      phone: "01726227578",
      email: "mrsharker@pstu.ac.bd",
      photo: advisor1,
      education: "PhD, Chonnam National University (2020), South Korea; MSc, BAU (2012); BSc, BAU (2010)",
      research: "Molecular genetics, gene expression, Population genetics, Nutrigenomics",
      publications: "37+ research articles in reputed journals",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <FloatingActions />
      
      <section className="relative pt-32 pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20 animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: "3s" }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center border-2 border-background shadow-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center border-2 border-background shadow-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Meet Our Team
              </Badge>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Driven by
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-glow">
                Passion & Purpose
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Meet the passionate individuals driving our club forward. Dedicated students and 
              experienced faculty committed to advancing bioinformatics education at PSTU.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary animate-float" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg">150+</div>
                  <div className="text-muted-foreground text-xs">Team Members</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-accent animate-float" style={{ animationDelay: "1s" }} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg">25+</div>
                  <div className="text-muted-foreground text-xs">Award Winners</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Advisors */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Faculty Advisors</h2>
            <p className="text-lg text-muted-foreground">
              Expert guidance from distinguished faculty members
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {advisors.map((advisor, index) => (
              <Card
                key={index}
                className="bg-gradient-card border-0 shadow-elegant hover:shadow-glow transition-all duration-500 animate-fade-in group hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-card shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                      <img src={advisor.photo} alt={advisor.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{advisor.name}</h3>
                    <p className="text-primary font-medium text-lg mb-1">{advisor.title}</p>
                    <p className="text-muted-foreground">{advisor.department}</p>
                    {advisor.office && (
                      <p className="text-sm text-muted-foreground mt-2">{advisor.office}</p>
                    )}
                    <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
                      {advisor.phone && (
                        <span className="inline-flex items-center gap-1"><Phone className="w-4 h-4" /> {advisor.phone}</span>
                      )}
                      {advisor.email && (
                        <span className="inline-flex items-center gap-1"><Mail className="w-4 h-4" /> {advisor.email}</span>
                      )}
                    </div>
                  </div>
                  
                  {advisor.education || advisor.research || advisor.publications ? (
                    <div className="space-y-3 text-sm">
                      {advisor.education && (
                        <div>
                          <span className="font-semibold">Education:</span>
                          <p className="text-muted-foreground">{advisor.education}</p>
                        </div>
                      )}
                      {advisor.research && (
                        <div>
                          <span className="font-semibold">Research Interests:</span>
                          <p className="text-muted-foreground">{advisor.research}</p>
                        </div>
                      )}
                      {advisor.publications && (
                        <div>
                          <span className="font-semibold">Publications:</span>
                          <p className="text-muted-foreground">{advisor.publications}</p>
                        </div>
                      )}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Committee */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Executive Committee</h2>
            <p className="text-lg text-muted-foreground">
              Student leaders shaping the future of bioinformatics at PSTU
            </p>
          </div>

          <Executive2025 />
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4 text-center">
          <Users className="w-16 h-16 mx-auto mb-6 text-primary animate-float" />
          <h2 className="text-4xl font-bold mb-4">Join Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            We're always looking for passionate students to join our executive committee. 
            If you're dedicated, creative, and eager to make a difference, we'd love to hear from you!
          </p>
          <Button size="lg" className="bg-gradient-primary hover:scale-110 transition-all duration-300 shadow-elegant hover:shadow-glow">
            Apply Now
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TeamPage;
