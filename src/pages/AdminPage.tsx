import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import siteLogo from "@/assets/logo.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, CalendarDays, Users, Images, FileText, IdCard } from "lucide-react";

type Entity = "courses" | "events" | "team_members" | "gallery_items" | "blog_posts" | "memberships";

type Row = { id?: number } & Record<string, unknown>;

const AdminPage = () => {
  const [active, setActive] = useState<Entity>("courses");
  const [rows, setRows] = useState<Row[]>([]);
  const [form, setForm] = useState<Row>({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isAuthed, setIsAuthed] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authMsg, setAuthMsg] = useState<string | null>(null);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);

  const columnsByEntity: Record<Entity, string[]> = {
    courses: ["title", "description", "duration", "level", "modules"],
    events: ["title", "description", "date", "location"],
    team_members: ["name", "role", "bio", "avatar_url"],
    gallery_items: ["title", "image_url", "caption"],
    blog_posts: ["title", "slug", "excerpt", "content"],
    memberships: ["name", "email", "student_id", "department", "year", "phone", "bio", "skills"],
  };

  const loadRows = useCallback(async () => {
    // Gate all admin data behind authorized session
    if (!isAuthorized) {
      setErrorMsg("Admin access is restricted. Please sign in with the club email.");
      setRows([]);
      return;
    }
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      setErrorMsg("Supabase environment variables are missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      return;
    }
    setErrorMsg(null);
    setLoading(true);
    const { data, error } = await supabase.from(active).select("*").order("id", { ascending: false });
    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    setRows((data as Row[]) || []);
  }, [active, isAuthorized]);

  useEffect(() => {
    loadRows();
    setForm({});
  }, [loadRows]);

  // Auth session & authorization
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      setIsAuthed(!!session);
      setSessionEmail(session?.user?.email ?? null);
      const allowedEmail = (import.meta.env.VITE_ADMIN_EMAIL || "").toLowerCase();
      const allowedDomainRaw = (import.meta.env.VITE_ADMIN_EMAIL_DOMAIN || "").toLowerCase();
      const allowedDomain = allowedDomainRaw.replace(/^.*@/, "");
      const currentEmail = (session?.user?.email || "").toLowerCase();
      const domainMatch = allowedDomain ? currentEmail.endsWith("@" + allowedDomain) || currentEmail.endsWith("." + allowedDomain) || currentEmail.includes("@" + allowedDomain) : false;
      const emailMatch = allowedEmail ? currentEmail === allowedEmail : false;
      setIsAuthorized(!!session && (emailMatch || domainMatch || (!allowedEmail && !allowedDomain))); // if no env constraints, any authed user
    })();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(!!session);
      setSessionEmail(session?.user?.email ?? null);
      const allowedEmail = (import.meta.env.VITE_ADMIN_EMAIL || "").toLowerCase();
      const allowedDomainRaw = (import.meta.env.VITE_ADMIN_EMAIL_DOMAIN || "").toLowerCase();
      const allowedDomain = allowedDomainRaw.replace(/^.*@/, "");
      const currentEmail = (session?.user?.email || "").toLowerCase();
      const domainMatch = allowedDomain ? currentEmail.endsWith("@" + allowedDomain) || currentEmail.endsWith("." + allowedDomain) || currentEmail.includes("@" + allowedDomain) : false;
      const emailMatch = allowedEmail ? currentEmail === allowedEmail : false;
      const authorized = !!session && (emailMatch || domainMatch || (!allowedEmail && !allowedDomain));
      setIsAuthorized(authorized);
      if (!!session && !authorized) {
        // Immediately sign out unauthorized users
        supabase.auth.signOut();
        setAuthMsg("Unauthorized email. Please use the club admin email.");
      }
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = async () => {
    setAuthMsg(null);
    if (!authEmail || !authPassword) {
      setAuthMsg("Enter email and password.");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email: authEmail,
      password: authPassword,
    });
    if (error) {
      setAuthMsg(error.message);
    } else {
      setAuthMsg("Signed in.");
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setAuthMsg("Signed out.");
  };

  const upsertRow = async () => {
    if (!isAuthorized) {
      setErrorMsg("Admin access is restricted.");
      return;
    }
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      setErrorMsg("Supabase environment variables are missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      return;
    }
    setErrorMsg(null);
    setLoading(true);
    const payload = { ...form };
    const { error } = await supabase.from(active).upsert(payload).select();
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
    if (!isAuthorized) {
      setErrorMsg("Admin access is restricted.");
      return;
    }
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      setErrorMsg("Supabase environment variables are missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      return;
    }
    setErrorMsg(null);
    setLoading(true);
    const { error } = await supabase.from(active).delete().eq("id", id);
    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    loadRows();
  };

  const columns = columnsByEntity[active];

  const isAdminApp = typeof window !== "undefined" && window.location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen">
      {!isAdminApp && <Navigation />}
      {!isAdminApp && <FloatingActions />}

      {isAdminApp && (
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-card flex items-center justify-center shadow">
                <img src={siteLogo} alt="Bioinformatics Club" className="w-7 h-7 object-contain" />
              </div>
              <div>
                
                <h1 className="text-lg font-semibold">Admin Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {sessionEmail && <span className="text-sm text-muted-foreground hidden md:inline">Signed in as {sessionEmail}</span>}
              {!isAuthed ? (
                <>
                  <Input placeholder="admin@club.com" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} className="w-56" />
                  <Input type="password" placeholder="password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} className="w-40" />
                  <Button variant="outline" size="sm" onClick={handleSignIn}>Sign In</Button>
                </>
              ) : (
                <Button variant="outline" size="sm" onClick={handleSignOut}>Sign Out</Button>
              )}
              <Button variant="outline" size="sm" onClick={() => window.location.reload()}>Refresh</Button>
              <Button variant="secondary" size="sm" onClick={() => loadRows()}>Reload Data</Button>
            </div>
          </div>
          {authMsg && <div className="container mx-auto px-4 pb-2 text-sm text-muted-foreground">{authMsg}</div>}
        </header>
      )}

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="mb-6">
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <CardTitle>{isAdminApp ? "Content Management" : "Admin Panel"}</CardTitle>
              {!isAdminApp && (
                <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto">
                  {!isAuthed ? (
                    <div className="flex items-center gap-2">
                      <Input placeholder="admin@club.com" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} className="w-56" />
                      <Input type="password" placeholder="password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} className="w-40" />
                      <Button variant="outline" size="sm" onClick={handleSignIn}>Sign In</Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={handleSignOut}>Sign Out</Button>
                    </div>
                  )}
                  <Button variant="outline" size="sm" onClick={() => window.location.reload()}>Refresh</Button>
                  <Button variant="secondary" size="sm" onClick={() => loadRows()}>Reload Data</Button>
                </div>
              )}
              {!isAdminApp && authMsg && <p className="text-sm text-muted-foreground">{authMsg}</p>}
            </CardHeader>
            <CardContent>
              {!isAuthorized ? (
                <div className="p-4 text-sm text-muted-foreground">
                  <p>Admin access is locked. Please sign in with the club admin email and password.</p>
                  {(!import.meta.env.VITE_ADMIN_EMAIL && !import.meta.env.VITE_ADMIN_EMAIL_DOMAIN) && (
                    <p className="mt-2">Tip: set VITE_ADMIN_EMAIL or VITE_ADMIN_EMAIL_DOMAIN to restrict which account can access the admin.</p>
                  )}
                </div>
              ) : (
              <Tabs
                value={active}
                onValueChange={(v) => {
                  setActive(v as Entity);
                  // Scroll to top instantly when tab changes
                  window.scrollTo(0, 0);
                }}
              >
                {!isAdminApp ? (
                  <TabsList className="flex flex-wrap">
                    <TabsTrigger value="courses">Courses</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                    <TabsTrigger value="team_members">Team</TabsTrigger>
                    <TabsTrigger value="gallery_items">Gallery</TabsTrigger>
                    <TabsTrigger value="blog_posts">Blog</TabsTrigger>
                    <TabsTrigger value="memberships">Memberships</TabsTrigger>
                  </TabsList>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Sidebar */}
                    <aside className="md:col-span-3 lg:col-span-2">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Sections</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-1">
                          {[
                            { key: "courses", label: "Courses", icon: BookOpen },
                            { key: "events", label: "Events", icon: CalendarDays },
                            { key: "team_members", label: "Team", icon: Users },
                            { key: "gallery_items", label: "Gallery", icon: Images },
                            { key: "blog_posts", label: "Blog", icon: FileText },
                            { key: "memberships", label: "Memberships", icon: IdCard },
                          ].map((item) => {
                            const Icon = item.icon as any;
                            const activeItem = active === item.key;
                            return (
                              <button
                                key={item.key}
                                className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors ${activeItem ? "bg-muted text-foreground" : "hover:bg-muted text-muted-foreground"}`}
                                onClick={() => setActive(item.key as Entity)}
                              >
                                <Icon className="w-4 h-4" />
                                <span>{item.label}</span>
                              </button>
                            );
                          })}
                        </CardContent>
                      </Card>
                    </aside>

                    {/* Main */}
                    <div className="md:col-span-9 lg:col-span-10">
                      {(["courses", "events", "team_members", "gallery_items", "blog_posts"] as Entity[]).map((e) => (
                        <TabsContent key={e} value={e}>
                          <div className="grid md:grid-cols-3 gap-6 mt-0">
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
                                      <thead className="sticky top-0 bg-background">
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
                    </div>
                  </div>
                )}
                {!isAdminApp && (["courses", "events", "team_members", "gallery_items", "blog_posts"] as Entity[]).map((e) => (
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
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdminPage;
