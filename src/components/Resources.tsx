import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileCode, Video, Download, ExternalLink } from "lucide-react";

const Resources = () => {
  const resourceCategories = [
    {
      icon: BookOpen,
      title: "Learning Materials",
      color: "from-primary to-primary-glow",
      resources: [
        { name: "Bioinformatics Fundamentals Guide", type: "PDF" },
        { name: "Python for Biology - Handbook", type: "PDF" },
        { name: "RNA-Seq Analysis Tutorial", type: "PDF" }
      ]
    },
    {
      icon: FileCode,
      title: "Code Repositories",
      color: "from-secondary to-accent",
      resources: [
        { name: "Genomic Analysis Scripts", type: "GitHub" },
        { name: "Protein Visualization Tools", type: "GitHub" },
        { name: "Data Processing Pipeline", type: "GitHub" }
      ]
    },
    {
      icon: Video,
      title: "Video Tutorials",
      color: "from-accent to-secondary",
      resources: [
        { name: "Intro to Bioinformatics Series", type: "Video" },
        { name: "Machine Learning for Biology", type: "Video" },
        { name: "Database Management Workshop", type: "Video" }
      ]
    }
  ];

  const tools = [
    { name: "BLAST", description: "Sequence similarity search tool" },
    { name: "Clustal Omega", description: "Multiple sequence alignment" },
    { name: "PyMOL", description: "Molecular visualization software" },
    { name: "Galaxy", description: "Web-based bioinformatics platform" },
    { name: "BioPython", description: "Python library for computational biology" },
    { name: "R Bioconductor", description: "Statistical analysis for genomic data" }
  ];

  return (
    <section id="resources" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Learning <span className="text-primary">Resources</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access our curated collection of materials to enhance your bioinformatics skills
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {resourceCategories.map((category, index) => (
            <Card
              key={index}
              className="hover:shadow-elegant transition-all duration-500 hover:-translate-y-3 animate-fade-in group border-t-4 border-t-primary/50 hover:border-t-primary"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-110`}>
                  <category.icon className="w-8 h-8 text-white group-hover:animate-float" />
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {category.resources.map((resource, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-all duration-300 cursor-pointer group hover:scale-105"
                  >
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">{resource.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">{resource.type}</span>
                      <ExternalLink className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-card rounded-2xl p-8 md:p-12">
          <h3 className="text-3xl font-bold mb-8 text-center">Essential Bioinformatics Tools</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-all duration-300 hover:shadow-elegant hover:-translate-y-2 group cursor-pointer"
              >
                <h4 className="text-lg font-bold mb-2 text-primary group-hover:scale-105 transition-transform">{tool.name}</h4>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="bg-gradient-primary hover:opacity-90 hover:scale-110 transition-all duration-300 shadow-elegant hover:shadow-glow group">
            <Download className="w-5 h-5 mr-2 group-hover:animate-float" />
            Download All Resources
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Resources;
