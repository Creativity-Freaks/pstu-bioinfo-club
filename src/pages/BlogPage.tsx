import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import FloatingActions from "@/components/FloatingActions";

const BlogPage = () => {
  const blogPosts = [
    {
      title: "Understanding CRISPR-Cas9: A Bioinformatics Perspective",
      excerpt: "Explore how computational tools are revolutionizing gene editing research and how bioinformatics plays a crucial role in CRISPR applications.",
      author: "Dr. Rahman",
      date: "March 1, 2025",
      category: "Genomics",
      readTime: "8 min read",
      image: "🧬"
    },
    {
      title: "Machine Learning in Drug Discovery: Current Trends",
      excerpt: "Dive into how AI and machine learning algorithms are accelerating pharmaceutical research and reducing drug development costs.",
      author: "Student President",
      date: "February 25, 2025",
      category: "AI in Biology",
      readTime: "10 min read",
      image: "🤖"
    },
    {
      title: "Introduction to RNA-Seq Analysis",
      excerpt: "A comprehensive guide for beginners on transcriptome analysis, from raw data processing to differential expression analysis.",
      author: "Workshop Coordinator",
      date: "February 20, 2025",
      category: "Tutorial",
      readTime: "12 min read",
      image: "📊"
    },
    {
      title: "Career Paths in Bioinformatics: Bangladesh Context",
      excerpt: "Exploring opportunities in bioinformatics within Bangladesh and how local students can prepare for careers in this field.",
      author: "Vice President",
      date: "February 15, 2025",
      category: "Career",
      readTime: "7 min read",
      image: "🎓"
    },
    {
      title: "AlphaFold 2: Revolution in Protein Structure Prediction",
      excerpt: "Understanding how DeepMind's AlphaFold is changing structural biology and what it means for bioinformatics research.",
      author: "General Secretary",
      date: "February 10, 2025",
      category: "Structural Biology",
      readTime: "9 min read",
      image: "🔬"
    },
    {
      title: "Best Python Libraries for Bioinformatics",
      excerpt: "A curated list of essential Python libraries every bioinformatics student should know, from BioPython to scikit-learn.",
      author: "Technical Lead",
      date: "February 5, 2025",
      category: "Programming",
      readTime: "6 min read",
      image: "🐍"
    },
    {
      title: "Metagenomics: Studying Microbial Communities",
      excerpt: "Learn about the computational approaches used to study complex microbial ecosystems and microbiome analysis.",
      author: "Treasurer",
      date: "January 30, 2025",
      category: "Metagenomics",
      readTime: "11 min read",
      image: "🦠"
    },
    {
      title: "Getting Started with Galaxy Platform",
      excerpt: "Step-by-step guide to using Galaxy for bioinformatics workflows without extensive programming knowledge.",
      author: "Workshop Coordinator",
      date: "January 25, 2025",
      category: "Tutorial",
      readTime: "8 min read",
      image: "🌌"
    },
    {
      title: "Bioinformatics Tools for COVID-19 Research",
      excerpt: "How computational biology tools helped researchers understand and combat the COVID-19 pandemic.",
      author: "Dr. Technical Advisor",
      date: "January 20, 2025",
      category: "Research",
      readTime: "10 min read",
      image: "🦠"
    }
  ];

  const categories = [
    "All Posts",
    "Genomics",
    "AI in Biology",
    "Tutorial",
    "Career",
    "Structural Biology",
    "Programming",
    "Metagenomics",
    "Research"
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <FloatingActions />
      
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-b from-muted/50 to-background">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-32 left-10 text-8xl animate-float">📚</div>
          <div className="absolute top-48 right-20 text-6xl animate-float" style={{ animationDelay: "1s" }}>🧬</div>
          <div className="absolute bottom-20 left-1/4 text-7xl animate-float" style={{ animationDelay: "2s" }}>💡</div>
          <div className="absolute top-1/3 right-1/4 text-5xl animate-float" style={{ animationDelay: "3s" }}>🔬</div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 px-5 py-2 rounded-full mb-6 border border-primary/20">
              <BookOpen className="w-4 h-4 text-primary animate-float" />
              <span className="text-sm font-medium text-primary">Insights & Knowledge</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Learn, Grow,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-glow">
                Innovate
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Explore insights, tutorials, and cutting-edge updates from the world of bioinformatics, 
              written by experts and innovators.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Articles Published</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-1">10K+</div>
                <div className="text-sm text-muted-foreground">Monthly Readers</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-1">15+</div>
                <div className="text-sm text-muted-foreground">Contributors</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-muted border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={category === "All Posts" ? "default" : "outline"}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Featured Post</h2>
            <p className="text-muted-foreground">Our latest and most popular article</p>
          </div>

          <Card className="overflow-hidden hover:shadow-elegant border-t-4 border-t-primary animate-fade-in transition-all duration-500 group">
            <div className="grid md:grid-cols-2">
              <div className="bg-gradient-primary flex items-center justify-center p-12 group-hover:scale-105 transition-transform duration-500">
                <span className="text-9xl animate-float">{blogPosts[0].image}</span>
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <Badge>{blogPosts[0].category}</Badge>
                  <span className="text-sm text-muted-foreground">{blogPosts[0].readTime}</span>
                </div>
                <h3 className="text-3xl font-bold mb-4">{blogPosts[0].title}</h3>
                <p className="text-muted-foreground mb-6">{blogPosts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {blogPosts[0].author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {blogPosts[0].date}
                  </div>
                </div>
                <Button className="w-fit bg-gradient-primary hover:scale-110 transition-all duration-300 shadow-elegant hover:shadow-glow group">
                  Read Article
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">All Posts</h2>
            <p className="text-muted-foreground">Browse through our collection of articles</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <Card
                key={index}
                className="hover:shadow-elegant transition-all duration-500 hover:-translate-y-3 animate-fade-in group border-t-4 border-t-primary/50 hover:border-t-primary cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="text-6xl mb-4 text-center">{post.image}</div>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="outline">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span className="line-clamp-1">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full group">
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Load More Posts
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter to get the latest blog posts, event updates, 
            and bioinformatics news delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border bg-background"
            />
            <Button className="bg-gradient-primary">Subscribe</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
