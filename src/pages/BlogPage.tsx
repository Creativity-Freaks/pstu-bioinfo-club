import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, BookOpen, Dna, FlaskConical, Lightbulb } from "lucide-react";
import FloatingActions from "@/components/FloatingActions";
import { useSupabaseList } from "@/hooks/useSupabaseList";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

type BlogPost = {
  id: number;
  title: string;
  slug?: string | null;
  excerpt?: string | null;
  content?: string | null;
  image_url?: string | null;
  author?: string | null;
  category?: string | null;
  created_at?: string | null;
};

function formatDate(value?: string | null) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function getPostSlug(p: Pick<BlogPost, "slug" | "id">) {
  const raw = String(p.slug || "").trim();
  return raw || `post-${p.id}`;
}

function autoExcerpt(content?: string | null, maxLen = 180) {
  const text = String(content || "")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return "";
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).replace(/\s+\S*$/, "").trim() + "…";
}

function resolveImageUrl(raw: string | null | undefined, signedMap: Record<string, string>) {
  const value = String(raw || "").trim();
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return signedMap[value] || "";
}

function FeaturedImage({ imageUrl, title, signedMap }: { imageUrl?: string | null; title: string; signedMap: Record<string, string> }) {
  const resolved = resolveImageUrl(imageUrl, signedMap);
  if (!resolved) return <BookOpen className="w-24 h-24 text-primary/30 animate-float" />;
  return (
    <img src={resolved} alt={title} className="w-full h-full max-h-[320px] object-cover rounded-md border border-white/10" />
  );
}

function CardImage({ imageUrl, title, signedMap }: { imageUrl?: string | null; title: string; signedMap: Record<string, string> }) {
  const resolved = resolveImageUrl(imageUrl, signedMap);
  if (!resolved) {
    return (
      <div className="h-40 w-full rounded-md border bg-background flex items-center justify-center">
        <BookOpen className="w-12 h-12 text-muted-foreground/30" />
      </div>
    );
  }
  return <img src={resolved} alt={title} className="h-40 w-full object-cover rounded-md border" />;
}

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Posts");
  const [signedBlogUrls, setSignedBlogUrls] = useState<Record<string, string>>({});

  const { data: dbPosts, isLoading: postsLoading, error: postsError } = useSupabaseList<BlogPost>("blog_posts", {
    orderBy: "created_at",
    ascending: false,
    limit: 50,
  });

  const categories = useMemo(() => {
    const set = new Set<string>();
    (dbPosts ?? []).forEach((p) => {
      const c = String(p.category || "").trim();
      if (c) set.add(c);
    });
    return ["All Posts", ...Array.from(set)];
  }, [dbPosts]);

  const filteredPosts = useMemo(() => {
    const list = dbPosts ?? [];
    if (selectedCategory === "All Posts") return list;
    return list.filter((p) => String(p.category || "").trim() === selectedCategory);
  }, [dbPosts, selectedCategory]);

  const featured = filteredPosts.length ? filteredPosts[0] : null;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const list = dbPosts ?? [];
      const paths = Array.from(
        new Set(
          list
            .map((p) => String(p.image_url || "").trim())
            .filter((v) => v && !/^https?:\/\//i.test(v))
        )
      );

      if (!paths.length) {
        setSignedBlogUrls({});
        return;
      }

      try {
        const res = await fetch("/api/storage-signed-views", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ bucket: "blog", paths, expiresIn: 3600 }),
        });
        if (!res.ok) return;
        const j = await res.json();
        const map = (j && typeof j === "object" && j.signedUrls && typeof j.signedUrls === "object") ? (j.signedUrls as Record<string, string>) : {};
        if (!cancelled) setSignedBlogUrls(map);
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [dbPosts]);

  const stats = useMemo(() => {
    const list = dbPosts ?? [];
    const postCount = list.length;
    const authorSet = new Set<string>();
    const categorySet = new Set<string>();
    let latest: string | null = null;

    list.forEach((p) => {
      const a = String(p.author || "").trim();
      if (a) authorSet.add(a);
      const c = String(p.category || "").trim();
      if (c) categorySet.add(c);
      if (p.created_at) {
        const t = new Date(p.created_at).getTime();
        if (!Number.isNaN(t)) {
          if (!latest) latest = p.created_at;
          else {
            const lt = new Date(latest).getTime();
            if (!Number.isNaN(lt) && t > lt) latest = p.created_at;
          }
        }
      }
    });

    return {
      postCount,
      authorCount: authorSet.size,
      categoryCount: categorySet.size,
      latest,
    };
  }, [dbPosts]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <FloatingActions />
      
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-b from-muted/50 to-background">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <BookOpen className="absolute top-32 left-10 w-16 h-16 text-primary animate-float" />
          <Dna className="absolute top-48 right-20 w-12 h-12 text-accent animate-float" style={{ animationDelay: "1s" }} />
          <Lightbulb className="absolute bottom-20 left-1/4 w-14 h-14 text-primary animate-float" style={{ animationDelay: "2s" }} />
          <FlaskConical className="absolute top-1/3 right-1/4 w-10 h-10 text-accent animate-float" style={{ animationDelay: "3s" }} />
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
                <div className="text-4xl font-bold text-primary mb-1">{postsLoading ? "–" : stats.postCount}</div>
                <div className="text-sm text-muted-foreground">Articles Published</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-1">{postsLoading ? "–" : stats.authorCount}</div>
                <div className="text-sm text-muted-foreground">Contributors</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-1">{postsLoading ? "–" : stats.categoryCount}</div>
                <div className="text-sm text-muted-foreground">Categories</div>
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
                variant={category === selectedCategory ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setSelectedCategory(category)}
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

          {postsError && (
            <p className="text-red-500 mb-6">{postsError instanceof Error ? postsError.message : String(postsError)}</p>
          )}
          {postsLoading ? (
            <p className="text-muted-foreground">Loading posts...</p>
          ) : !featured ? (
            <Card>
              <CardHeader>
                <CardTitle>No posts yet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Create blog posts from the Admin Panel and they’ll show up here.</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="overflow-hidden hover:shadow-elegant border-t-4 border-t-primary animate-fade-in transition-all duration-500 group">
              <div className="grid md:grid-cols-2">
                <div className="bg-gradient-primary flex items-center justify-center p-12 group-hover:scale-105 transition-transform duration-500">
                  <FeaturedImage imageUrl={featured.image_url} title={featured.title} signedMap={signedBlogUrls} />
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    {featured.category ? <Badge>{featured.category}</Badge> : <Badge variant="outline">Blog</Badge>}
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{featured.title}</h3>
                  <p className="text-muted-foreground mb-6">{featured.excerpt || autoExcerpt(featured.content)}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    {featured.author && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {featured.author}
                      </div>
                    )}
                    {featured.created_at && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(featured.created_at)}
                      </div>
                    )}
                  </div>
                  <Button asChild className="w-fit bg-gradient-primary hover:scale-110 transition-all duration-300 shadow-elegant hover:shadow-glow group">
                    <Link to={`/blog/${getPostSlug(featured)}`}>
                      Read Article
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* All Posts */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">All Posts</h2>
            <p className="text-muted-foreground">Browse through our collection of articles</p>
          </div>

          {postsLoading ? (
            <p className="text-muted-foreground">Loading posts...</p>
          ) : filteredPosts.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No posts found</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Try a different category, or create a post from Admin.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <Card
                  key={post.id}
                  className="hover:shadow-elegant transition-all duration-500 hover:-translate-y-3 animate-fade-in group border-t-4 border-t-primary/50 hover:border-t-primary"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardHeader>
                    <div className="mb-4">
                      <CardImage imageUrl={post.image_url} title={post.title} signedMap={signedBlogUrls} />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      {post.category ? <Badge variant="outline">{post.category}</Badge> : <Badge variant="outline">Blog</Badge>}
                    </div>
                    <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt || ""}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      {post.author && (
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span className="line-clamp-1">{post.author}</span>
                        </div>
                      )}
                      {post.created_at && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.created_at)}
                        </div>
                      )}
                    </div>
                    <Button asChild variant="outline" className="w-full group">
                      <Link to={`/blog/${getPostSlug(post)}`}>
                        Read More
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
