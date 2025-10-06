import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, Award, BookOpen } from "lucide-react";

const MentorshipPage = () => {
  const benefits = [
    {
      icon: Users,
      title: "One-on-One Guidance",
      description: "Get personalized mentorship from experienced professionals in bioinformatics.",
    },
    {
      icon: Target,
      title: "Career Development",
      description: "Learn about career paths, opportunities, and how to achieve your goals.",
    },
    {
      icon: Award,
      title: "Skill Enhancement",
      description: "Develop technical and soft skills essential for success in the field.",
    },
    {
      icon: BookOpen,
      title: "Research Support",
      description: "Receive guidance on research projects and academic pursuits.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-primary">
              Mentorship Program
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with experienced mentors to guide your journey in bioinformatics
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>{benefit.title}</CardTitle>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Apply for Mentorship</h3>
                    <p className="text-muted-foreground">Fill out the application form with your interests and goals.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Get Matched</h3>
                    <p className="text-muted-foreground">We'll pair you with a mentor based on your profile and aspirations.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Start Learning</h3>
                    <p className="text-muted-foreground">Begin regular sessions with your mentor and track your progress.</p>
                  </div>
                </div>
              </div>
              <Button className="w-full" size="lg">Apply for Mentorship</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MentorshipPage;
