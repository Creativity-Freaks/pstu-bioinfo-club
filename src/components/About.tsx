import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Brain, Code, Database, Users, Target, Lightbulb, Award, Rocket, BookOpen, FlaskConical, ChevronDown } from "lucide-react";

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

  const scrollToDetails = () => {
    const detailsSection = document.getElementById('about-details');
    if (detailsSection) {
      detailsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="about" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Brief Overview Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About Our <span className="text-primary">Club</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The Bioinformatics Club at PSTU is a student-led organization dedicated to promoting 
            interdisciplinary learning and research at the intersection of biology and computing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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

        {/* Explore More Button */}
        <div className="text-center mb-20">
          <Button 
            size="lg" 
            onClick={scrollToDetails}
            className="group bg-gradient-primary text-white hover:shadow-xl transition-all duration-300"
          >
            Explore More Details
            <ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </Button>
        </div>

        {/* Detailed Tabs Section */}
        <div id="about-details" className="bg-card rounded-2xl p-8 md:p-12 shadow-xl scroll-mt-20">
          <Tabs defaultValue="mission" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 h-auto">
              <TabsTrigger value="mission" className="flex items-center gap-2 py-3">
                <Target className="w-4 h-4" />
                <span className="hidden sm:inline">Mission</span>
              </TabsTrigger>
              <TabsTrigger value="vision" className="flex items-center gap-2 py-3">
                <Lightbulb className="w-4 h-4" />
                <span className="hidden sm:inline">Vision</span>
              </TabsTrigger>
              <TabsTrigger value="activities" className="flex items-center gap-2 py-3">
                <Rocket className="w-4 h-4" />
                <span className="hidden sm:inline">Activities</span>
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex items-center gap-2 py-3">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Skills</span>
              </TabsTrigger>
              <TabsTrigger value="why-join" className="flex items-center gap-2 py-3">
                <Award className="w-4 h-4" />
                <span className="hidden sm:inline">Why Join</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mission" className="animate-fade-in">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                    <Target className="w-8 h-8 text-primary" />
                    Our Mission
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    To create a vibrant community where students can explore the exciting field of 
                    bioinformatics, develop practical skills, and contribute to cutting-edge research 
                    that addresses real-world biological challenges.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
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
            </TabsContent>

            <TabsContent value="vision" className="animate-fade-in">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Lightbulb className="w-10 h-10 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      To become the leading student organization in Bangladesh for bioinformatics education and research, 
                      bridging the gap between biological sciences and computational technologies.
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <Card className="bg-gradient-card border-0">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <FlaskConical className="w-5 h-5 text-primary" />
                        Innovation Hub
                      </h4>
                      <p className="text-muted-foreground">
                        Establish PSTU as a hub for bioinformatics innovation and interdisciplinary research collaboration.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-card border-0">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        Global Network
                      </h4>
                      <p className="text-muted-foreground">
                        Build connections with international bioinformatics communities and research institutions.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-card border-0">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5 text-primary" />
                        Excellence
                      </h4>
                      <p className="text-muted-foreground">
                        Foster a culture of academic excellence and professional development in computational biology.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activities" className="animate-fade-in">
              <div>
                <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Rocket className="w-8 h-8 text-primary" />
                  Our Activities
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-card border-0">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold mb-3">🧬 Workshops & Training</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Sequence analysis and genome assembly</li>
                        <li>• Python and R programming for bioinformatics</li>
                        <li>• Machine learning in genomics</li>
                        <li>• Database management and data mining</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-card border-0">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold mb-3">🔬 Research Projects</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Genomic data analysis</li>
                        <li>• Protein structure prediction</li>
                        <li>• Drug discovery and molecular docking</li>
                        <li>• Evolutionary bioinformatics</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-card border-0">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold mb-3">💻 Coding Challenges</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Monthly bioinformatics hackathons</li>
                        <li>• Algorithm competitions</li>
                        <li>• Project showcases</li>
                        <li>• Peer code reviews</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-card border-0">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold mb-3">🎓 Guest Lectures</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Industry expert talks</li>
                        <li>• Research paper discussions</li>
                        <li>• Career guidance sessions</li>
                        <li>• Alumni networking events</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="animate-fade-in">
              <div>
                <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-primary" />
                  Skills You'll Learn
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold mb-4 text-primary">Programming</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Code className="w-5 h-5 text-primary" />
                        <span className="text-muted-foreground">Python & Biopython</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Code className="w-5 h-5 text-primary" />
                        <span className="text-muted-foreground">R & Bioconductor</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Code className="w-5 h-5 text-primary" />
                        <span className="text-muted-foreground">Shell scripting</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Code className="w-5 h-5 text-primary" />
                        <span className="text-muted-foreground">Perl for bioinformatics</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold mb-4 text-primary">Analysis Tools</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Database className="w-5 h-5 text-primary" />
                        <span className="text-muted-foreground">BLAST & Alignment</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Database className="w-5 h-5 text-primary" />
                        <span className="text-muted-foreground">NGS data analysis</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Database className="w-5 h-5 text-primary" />
                        <span className="text-muted-foreground">Phylogenetic analysis</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Database className="w-5 h-5 text-primary" />
                        <span className="text-muted-foreground">Structural biology tools</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold mb-4 text-primary">Advanced Topics</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Brain className="w-5 h-5 text-primary" />
                        <span className="text-muted-foreground">Machine learning</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Brain className="w-5 h-5 text-primary" />
                        <span className="text-muted-foreground">Statistical analysis</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Brain className="w-5 h-5 text-primary" />
                        <span className="text-muted-foreground">Data visualization</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Brain className="w-5 h-5 text-primary" />
                        <span className="text-muted-foreground">Cloud computing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="why-join" className="animate-fade-in">
              <div>
                <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Award className="w-8 h-8 text-primary" />
                  Why Join Us?
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-primary border-0 text-white">
                    <CardContent className="p-6">
                      <h4 className="text-2xl font-bold mb-4">🎯 Career Opportunities</h4>
                      <p className="text-white/90 mb-4">
                        Gain skills highly sought after in pharmaceuticals, biotech, healthcare, and research institutions.
                      </p>
                      <ul className="space-y-2 text-white/80">
                        <li>• Bioinformatics Scientist</li>
                        <li>• Computational Biologist</li>
                        <li>• Data Scientist in Healthcare</li>
                        <li>• Research Associate</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-secondary to-accent border-0 text-white">
                    <CardContent className="p-6">
                      <h4 className="text-2xl font-bold mb-4">🌟 Personal Growth</h4>
                      <p className="text-white/90 mb-4">
                        Develop both technical and soft skills through hands-on projects and teamwork.
                      </p>
                      <ul className="space-y-2 text-white/80">
                        <li>• Critical thinking & problem-solving</li>
                        <li>• Team collaboration</li>
                        <li>• Project management</li>
                        <li>• Scientific communication</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-accent to-primary border-0 text-white">
                    <CardContent className="p-6">
                      <h4 className="text-2xl font-bold mb-4">🔗 Networking</h4>
                      <p className="text-white/90 mb-4">
                        Connect with peers, faculty, and industry professionals passionate about bioinformatics.
                      </p>
                      <ul className="space-y-2 text-white/80">
                        <li>• Alumni mentorship program</li>
                        <li>• Industry connections</li>
                        <li>• Research collaborations</li>
                        <li>• Conference participation</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-primary to-secondary border-0 text-white">
                    <CardContent className="p-6">
                      <h4 className="text-2xl font-bold mb-4">🚀 Innovation</h4>
                      <p className="text-white/90 mb-4">
                        Be part of groundbreaking research and contribute to solving real-world problems.
                      </p>
                      <ul className="space-y-2 text-white/80">
                        <li>• Original research projects</li>
                        <li>• Publication opportunities</li>
                        <li>• Competition participation</li>
                        <li>• Open-source contributions</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default About;
