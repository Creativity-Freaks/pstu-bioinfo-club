import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

const CoursesPreview = () => {
  const featuredCourses = [
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
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-primary">
            Featured Courses
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive courses to master bioinformatics from basics to advanced topics
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredCourses.map((course) => (
            <Card key={course.id} className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{course.level}</Badge>
                  <Badge variant="outline" className="gap-1">
                    <BookOpen className="w-3 h-3" />
                    {course.modules} modules
                  </Badge>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {course.title}
                </CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{course.students} students</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/courses">
            <Button size="lg" className="group">
              Explore More Courses
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesPreview;
