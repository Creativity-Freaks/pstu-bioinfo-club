import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const getSupabase = (): SupabaseClient | null => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return null;
  }
  return createClient(url, key);
};

type Entity = "courses" | "events" | "team_members" | "gallery_items" | "blog_posts";

type Row = { id?: number } & Record<string, unknown>;

const AdminPage = () => {
  const [active, setActive] = useState<Entity>("courses");
  const [rows, setRows] = useState<Row[]>([]);
  const [form, setForm] = useState<Row>({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const columnsByEntity: Record<Entity, string[]> = {
    courses: ["title", "description", "duration", "level", "modules"],
    events: ["title", "description", "date", "location"],
    team_members: ["name", "role", "bio", "avatar_url"],
    gallery_items: ["title", "image_url", "caption"],
    blog_posts: ["title", "slug", "excerpt", "content"],
  };

  const loadRows = useCallback(async () => {
    const client = getSupabase();
    if (!client) {
      setErrorMsg("Supabase environment variables are missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      return;
    }
    setErrorMsg(null);
    setLoading(true);
    const { data, error } = await client.from(active).select("*").order("id", { ascending: false });
    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    setRows((data as Row[]) || []);
  }, [active]);

  useEffect(() => {
    loadRows();
    setForm({});
  }, [loadRows]);

  const upsertRow = async () => {
    const client = getSupabase();
    if (!client) {
      setErrorMsg("Supabase environment variables are missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      return;
    }
    setErrorMsg(null);
    setLoading(true);
    const payload = { ...form };
    const { error } = await client.from(active).upsert(payload).select();
    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    setForm({});
    loadRows();
  };

  const editRow = (row: Row) => setForm(row);
  const deleteRow = async (id?: number) => {
    if (!id) return;
    const client = getSupabase();
    if (!client) {
      setErrorMsg("Supabase environment variables are missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      return;
    }
    setErrorMsg(null);
    setLoading(true);
    const { error } = await client.from(active).delete().eq("id", id);
    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    loadRows();
  };

  const columns = columnsByEntity[active];

  return (
    <div className="min-h-screen">
      <Navigation />
      <FloatingActions />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Admin Panel</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => window.location.reload()}>Refresh</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs
                value={active}
                onValueChange={(v) => {
                  setActive(v as Entity);
                  // Scroll to top instantly when tab changes
                  window.scrollTo(0, 0);
                }}
              >
                <TabsList className="flex flex-wrap">
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="team_members">Team</TabsTrigger>
                  <TabsTrigger value="gallery_items">Gallery</TabsTrigger>
                  <TabsTrigger value="blog_posts">Blog</TabsTrigger>
                </TabsList>
                {(["courses", "events", "team_members", "gallery_items", "blog_posts"] as Entity[]).map((e) => (
                  <TabsContent key={e} value={e}>
                    <div className="grid md:grid-cols-3 gap-6 mt-6">
                      <Card className="md:col-span-1">
                        <CardHeader>
                          <CardTitle>{form.id ? "Edit" : "Create"} {active.replace("_", " ")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {columns.map((c) => (
                            <div key={c} className="space-y-1">
                              <label className="text-sm text-muted-foreground capitalize">{c.replace("_", " ")}</label>
                              <Input
                                value={String(form[c] ?? "")}
                                onChange={(e) => setForm({ ...form, [c]: e.target.value })}
                              />
                            </div>
                          ))}
                          <div className="flex gap-2">
                            <Button onClick={upsertRow} disabled={loading} className="bg-gradient-primary">
                              {form.id ? "Update" : "Create"}
                            </Button>
                            {form.id && (
                              <Button variant="secondary" onClick={() => setForm({})} disabled={loading}>Cancel</Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="md:col-span-2">
                        <CardHeader>
                          <CardTitle>Manage {active.replace("_", " ")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {errorMsg ? (
                            <p className="text-red-500">{errorMsg}</p>
                          ) : loading ? (
                            <p className="text-muted-foreground">Loading...</p>
                          ) : rows.length === 0 ? (
                            <p className="text-muted-foreground">No records yet.</p>
                          ) : (
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr>
                                    {columns.map((c) => (
                                      <th key={c} className="text-left p-2 capitalize">{c.replace("_", " ")}</th>
                                    ))}
                                    <th className="text-left p-2">Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {rows.map((r) => (
                                    <tr key={r.id} className="border-t border-border">
                                      {columns.map((c) => (
                                        <td key={c} className="p-2 break-words">{String(r[c] ?? "")}</td>
                                      ))}
                                      <td className="p-2 flex gap-2">
                                        <Button size="sm" variant="secondary" onClick={() => editRow(r)}>Edit</Button>
                                        <Button size="sm" variant="destructive" onClick={() => deleteRow(r.id)}>Delete</Button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdminPage;
