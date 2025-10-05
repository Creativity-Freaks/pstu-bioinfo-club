import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Facebook, Linkedin, Mail, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      name: "Dr. Faculty Advisor",
      title: "Associate Professor",
      department: "Department of Biotechnology",
      education: "PhD in Bioinformatics, University of Cambridge",
      research: "Genomics, Computational Biology, Systems Biology",
      publications: "40+ peer-reviewed publications"
    },
    {
      name: "Dr. Technical Advisor",
      title: "Assistant Professor",
      department: "Department of Computer Science",
      education: "PhD in Computer Science, MIT",
      research: "Machine Learning, Artificial Intelligence in Biology",
      publications: "25+ peer-reviewed publications"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-primary">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the passionate individuals driving our club forward. Our team consists of 
              dedicated students and experienced faculty committed to advancing bioinformatics education.
            </p>
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
                className="bg-gradient-card border-0 shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary-foreground">
                        {advisor.name.split(' ')[1][0]}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{advisor.name}</h3>
                    <p className="text-primary font-medium text-lg mb-1">{advisor.title}</p>
                    <p className="text-muted-foreground">{advisor.department}</p>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-semibold">Education:</span>
                      <p className="text-muted-foreground">{advisor.education}</p>
                    </div>
                    <div>
                      <span className="font-semibold">Research Interests:</span>
                      <p className="text-muted-foreground">{advisor.research}</p>
                    </div>
                    <div>
                      <span className="font-semibold">Publications:</span>
                      <p className="text-muted-foreground">{advisor.publications}</p>
                    </div>
                  </div>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executiveCommittee.map((member, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">
                        {member.name.split(' ')[0][0]}{member.name.split(' ')[1]?.[0] || ''}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-1">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.department} • {member.year}</p>
                  </div>

                  <div className="space-y-3 text-sm">
                    <p className="text-muted-foreground">{member.bio}</p>
                    
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-start gap-2 mb-2">
                        <Award className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold block">Achievements:</span>
                          <span className="text-muted-foreground">{member.achievements}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="font-semibold">Expertise:</span>
                      <p className="text-muted-foreground">{member.expertise}</p>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-3 mt-4 pt-4 border-t">
                    <button className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                      <Facebook className="w-4 h-4 text-primary" />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                      <Linkedin className="w-4 h-4 text-primary" />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                      <Mail className="w-4 h-4 text-primary" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4 text-center">
          <Users className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h2 className="text-4xl font-bold mb-4">Join Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            We're always looking for passionate students to join our executive committee. 
            If you're dedicated, creative, and eager to make a difference, we'd love to hear from you!
          </p>
          <Button size="lg" className="bg-gradient-primary">
            Apply Now
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TeamPage;
