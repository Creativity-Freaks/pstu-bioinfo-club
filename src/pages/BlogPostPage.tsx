import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import { useSupabaseList } from "@/hooks/useSupabaseList";

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
  return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const postSlug = String(slug || "");

  const { data: posts, isLoading, error } = useSupabaseList<BlogPost>("blog_posts", {
    orderBy: "created_at",
    ascending: false,
    limit: 1,
    eq: [{ column: "slug", value: postSlug }],
  });

  const post = useMemo(() => (posts && posts.length ? posts[0] : null), [posts]);

  const [resolvedImageUrl, setResolvedImageUrl] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setResolvedImageUrl("");
      const raw = String(post?.image_url || "").trim();
      if (!raw) return;
      if (/^https?:\/\//i.test(raw)) {
        setResolvedImageUrl(raw);
        return;
      }
      // private bucket path → resolve signed view URL
      try {
        const viewRes = await fetch("/api/gallery-signed-view", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ path: raw, bucket: "blog", expiresIn: 3600 }),
        });
        if (!viewRes.ok) return;
        const { signedUrl } = await viewRes.json();
        if (!cancelled && signedUrl) setResolvedImageUrl(String(signedUrl));
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [post?.image_url]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <FloatingActions />

      <section className="pt-28 pb-10 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Blog</h1>
              <p className="text-muted-foreground">Read the full article</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          {error && (
            <p className="text-red-500 mb-6">{error instanceof Error ? error.message : String(error)}</p>
          )}
          {isLoading ? (
            <p className="text-muted-foreground">Loading post...</p>
          ) : !post ? (
            <Card>
              <CardHeader>
                <CardTitle>Post not found</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">This post may have been deleted or the link is invalid.</p>
                <div className="mt-4">
                  <Button asChild>
                    <Link to="/blog">Go to blog</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <article className="space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  {post.category && <Badge>{post.category}</Badge>}
                  {post.created_at && <span className="text-sm text-muted-foreground">{formatDate(post.created_at)}</span>}
                </div>
                <h2 className="text-4xl font-bold leading-tight">{post.title}</h2>
                {post.excerpt && <p className="text-lg text-muted-foreground">{post.excerpt}</p>}

                <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                  {post.author && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                  )}
                  {post.created_at && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                  )}
                </div>
              </div>

              {resolvedImageUrl && (
                <div className="rounded-lg overflow-hidden border">
                  <img src={resolvedImageUrl} alt={post.title} className="w-full max-h-[520px] object-cover" />
                </div>
              )}

              {post.content ? (
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap leading-relaxed text-base">{post.content}</div>
                </div>
              ) : (
                <p className="text-muted-foreground">No content provided for this post.</p>
              )}
            </article>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
