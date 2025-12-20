import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Award, Users } from "lucide-react";
import { useSupabaseList } from "@/hooks/useSupabaseList";

const CoursesPage = () => {
  const fallback = [
    {
      id: 1,
      title: "Fundamentals of Bioinformatics",
      description: "A comprehensive introduction to bioinformatics, covering basic concepts, tools, and techniques.",
      duration: "8 weeks",
      level: "Beginner",
      students: 45,
      modules: 12,
    },
    {
      id: 2,
      title: "Python for Biological Data Analysis",
      description: "Learn Python programming specifically for analyzing biological datasets and sequences.",
      duration: "10 weeks",
      level: "Intermediate",
      students: 35,
      modules: 15,
    },
    {
      id: 3,
      title: "Genomics and Next-Gen Sequencing",
      description: "Master genomics data analysis and NGS technologies for modern research applications.",
      duration: "12 weeks",
      level: "Advanced",
      students: 25,
      modules: 18,
    },
    {
      id: 4,
      title: "Machine Learning for Drug Discovery",
      description: "Apply machine learning algorithms to drug discovery and molecular design problems.",
      duration: "10 weeks",
      level: "Advanced",
      students: 20,
      modules: 14,
    },
    {
      id: 5,
      title: "Structural Bioinformatics",
      description: "Explore protein structures, modeling, and computational approaches in structural biology.",
      duration: "8 weeks",
      level: "Intermediate",
      students: 30,
      modules: 12,
    },
    {
      id: 6,
      title: "Computational Systems Biology",
      description: "Study biological systems using computational and mathematical modeling approaches.",
      duration: "12 weeks",
      level: "Advanced",
      students: 18,
      modules: 16,
    },
  ];

  const { data, isLoading, error } = useSupabaseList<{
    id: number;
    title: string;
    description?: string;
    duration?: string;
    level?: string;
    modules?: number;
  }>("courses", { orderBy: "id", ascending: false });

  const items = (data && data.length ? data : fallback);

  return (
    <div className="min-h-screen">
      <Navigation />
      <FloatingActions />
      
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-primary">
              Courses
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive courses to master bioinformatics from basics to advanced topics
            </p>
          </div>

          {error && (
            <p className="text-red-500 mb-6">{String(error.message || error)}</p>
          )}
          {isLoading && (
            <p className="text-muted-foreground mb-6">Loading courses...</p>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((course) => (
              <Card key={course.id} className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{course.level || "General"}</Badge>
                    <Badge variant="outline" className="gap-1">
                      <BookOpen className="w-3 h-3" />
                      {(course.modules ?? 0)} modules
                    </Badge>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription>{course.description || ""}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration || ""}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>Enrol open</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Award className="w-4 h-4" />
                    <span>Certificate upon completion</span>
                  </div>
                  <Button className="w-full mt-4">Enroll Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CoursesPage;
