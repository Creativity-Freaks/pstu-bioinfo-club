import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Code, Database, Users, Target, Lightbulb, Award, Rocket, BookOpen, FlaskConical } from "lucide-react";

const AboutPage = () => {
  const features = [
    {
      icon: Brain,
      title: "Research Focus",
      description: "Cutting-edge bioinformatics research and analysis"
    },
    {
      icon: Code,
      title: "Coding Skills",
      description: "Python, R, and specialized bioinformatics tools"
    },
    {
      icon: Database,
      title: "Data Science",
      description: "Big data handling and computational biology"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Connect with peers and researchers"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="text-primary">Us</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Empowering students to explore the intersection of biology, computer science, 
              and data analysis through hands-on learning and cutting-edge research.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-t-primary animate-fade-in"
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
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-xl">
            <Tabs defaultValue="mission" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 h-auto">
                <TabsTrigger value="mission" className="flex items-center gap-2 py-3">
                  <Target className="w-4 h-4" />
                  <span>Mission</span>
                </TabsTrigger>
                <TabsTrigger value="vision" className="flex items-center gap-2 py-3">
                  <Lightbulb className="w-4 h-4" />
                  <span>Vision</span>
                </TabsTrigger>
                <TabsTrigger value="activities" className="flex items-center gap-2 py-3">
                  <Rocket className="w-4 h-4" />
                  <span>Activities</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center gap-2 py-3">
                  <Award className="w-4 h-4" />
                  <span>Skills</span>
                </TabsTrigger>
                <TabsTrigger value="join" className="flex items-center gap-2 py-3">
                  <Users className="w-4 h-4" />
                  <span>Why Join</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="mission" className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        The Bioinformatics Club PSTU is dedicated to fostering a community of students passionate about 
                        computational biology and data-driven biological research. We aim to bridge the gap between 
                        traditional biological sciences and modern computational approaches.
                      </p>
                      <p>
                        Our mission is to provide students with the knowledge, skills, and resources necessary to excel 
                        in the rapidly evolving field of bioinformatics. We believe in hands-on learning, collaborative 
                        research, and staying at the forefront of technological advancement in biological sciences.
                      </p>
                      <p>
                        Through workshops, seminars, and practical projects, we prepare our members for careers in 
                        research institutions, pharmaceutical companies, biotechnology firms, and academic positions 
                        worldwide.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="vision" className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Lightbulb className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        We envision a future where PSTU becomes a hub for bioinformatics research and education in 
                        Bangladesh. Our club aspires to produce skilled professionals who can contribute to solving 
                        real-world biological and medical challenges using computational methods.
                      </p>
                      <p>
                        We aim to establish strong collaborations with national and international research institutions, 
                        creating opportunities for our members to participate in cutting-edge research projects. We see 
                        our graduates becoming leaders in genomics, drug discovery, personalized medicine, and 
                        agricultural biotechnology.
                      </p>
                      <p>
                        By 2030, we strive to be recognized as the premier student organization for bioinformatics in 
                        Bangladesh, with alumni making significant contributions to science and society globally.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activities" className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Rocket className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Our Activities</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="border-l-4 border-l-primary">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <BookOpen className="w-6 h-6 text-primary" />
                            <h4 className="text-xl font-semibold">Workshops & Training</h4>
                          </div>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>• Python for Bioinformatics</li>
                            <li>• Genomic Data Analysis</li>
                            <li>• Protein Structure Prediction</li>
                            <li>• RNA-Seq Analysis</li>
                            <li>• Machine Learning in Biology</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="border-l-4 border-l-accent">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <FlaskConical className="w-6 h-6 text-accent" />
                            <h4 className="text-xl font-semibold">Research Projects</h4>
                          </div>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>• Drug Discovery Programs</li>
                            <li>• Genome Assembly Projects</li>
                            <li>• Disease Biomarker Identification</li>
                            <li>• Molecular Docking Studies</li>
                            <li>• Phylogenetic Analysis</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="border-l-4 border-l-primary">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <Users className="w-6 h-6 text-primary" />
                            <h4 className="text-xl font-semibold">Community Events</h4>
                          </div>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>• Guest Speaker Seminars</li>
                            <li>• Career Guidance Sessions</li>
                            <li>• Journal Club Meetings</li>
                            <li>• Networking Events</li>
                            <li>• Annual Symposium</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="border-l-4 border-l-accent">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <Award className="w-6 h-6 text-accent" />
                            <h4 className="text-xl font-semibold">Competitions</h4>
                          </div>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>• Bioinformatics Hackathons</li>
                            <li>• Data Analysis Challenges</li>
                            <li>• Research Paper Presentations</li>
                            <li>• Coding Competitions</li>
                            <li>• Project Showcases</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Skills You'll Develop</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-primary">Programming</h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Python Programming</li>
                          <li>• R for Statistics</li>
                          <li>• Bash Scripting</li>
                          <li>• SQL Databases</li>
                          <li>• Git Version Control</li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-primary">Bioinformatics Tools</h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• BLAST & Sequence Alignment</li>
                          <li>• PyMOL & Molecular Visualization</li>
                          <li>• BioPython & Bioconductor</li>
                          <li>• Galaxy Platform</li>
                          <li>• NCBI Tools & Databases</li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-primary">Analysis Skills</h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Statistical Analysis</li>
                          <li>• Machine Learning</li>
                          <li>• Data Visualization</li>
                          <li>• Next-Gen Sequencing</li>
                          <li>• Structural Bioinformatics</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="join" className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Why Join Us?</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gradient-card p-6 rounded-lg">
                        <h4 className="text-xl font-semibold mb-3">Career Opportunities</h4>
                        <p className="text-muted-foreground">
                          Gain skills highly valued in pharmaceuticals, biotech companies, research institutions, 
                          and healthcare. Our alumni work at leading organizations worldwide.
                        </p>
                      </div>
                      <div className="bg-gradient-card p-6 rounded-lg">
                        <h4 className="text-xl font-semibold mb-3">Research Experience</h4>
                        <p className="text-muted-foreground">
                          Participate in real research projects, publish papers, and contribute to solving actual 
                          biological problems. Build a strong portfolio for graduate studies.
                        </p>
                      </div>
                      <div className="bg-gradient-card p-6 rounded-lg">
                        <h4 className="text-xl font-semibold mb-3">Networking</h4>
                        <p className="text-muted-foreground">
                          Connect with like-minded peers, experienced researchers, industry professionals, and 
                          international collaborators. Build relationships that last a lifetime.
                        </p>
                      </div>
                      <div className="bg-gradient-card p-6 rounded-lg">
                        <h4 className="text-xl font-semibold mb-3">Cutting-Edge Knowledge</h4>
                        <p className="text-muted-foreground">
                          Stay updated with the latest developments in genomics, AI in biology, drug discovery, 
                          and personalized medicine. Learn from experts in the field.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
