import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
// AdminNavbar is rendered at the app root in admin/main.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import type { ElementType } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, CalendarDays, Users, Images, FileText, IdCard, LayoutDashboard, Mail } from "lucide-react";

type Entity = "dashboard" | "courses" | "events" | "team_members" | "gallery_items" | "blog_posts" | "memberships" | "contact_messages";

type Row = { id?: number } & Record<string, unknown>;

const AdminPage = () => {
  const isAdminPath = typeof window !== "undefined" && window.location.pathname.startsWith("/admin");
  const [active, setActive] = useState<Entity>(isAdminPath ? "dashboard" : "courses");
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
  const [counts, setCounts] = useState<Record<Entity, number | null>>({
    dashboard: null,
    courses: null,
    events: null,
    team_members: null,
    gallery_items: null,
    blog_posts: null,
    memberships: null,
    contact_messages: null,
  });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [uploadingImage, setUploadingImage] = useState(false);

  const columnsByEntity: Record<Entity, string[]> = {
    dashboard: [],
    courses: ["title", "description", "duration", "level", "modules"],
    events: ["title", "description", "date", "location"],
    team_members: ["name", "role", "bio", "avatar_url"],
    gallery_items: ["title", "image_url", "caption"],
    blog_posts: ["title", "slug", "excerpt", "content"],
    memberships: ["name", "email", "student_id", "department", "year", "phone", "bio", "skills"],
    contact_messages: ["name", "email", "student_id", "message"],
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

  const handleGalleryImageUpload = async (file: File) => {
    if (!file) return;
    if (!isAuthorized) {
      setErrorMsg("Admin access is restricted. Please sign in.");
      return;
    }
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      setErrorMsg("Supabase environment variables are missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      return;
    }
    try {
      setErrorMsg(null);
      setUploadingImage(true);
      const bucket = "gallery";
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const filePath = `gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage.from(bucket).upload(filePath, file, {
        upsert: true,
        cacheControl: "3600",
      });
      if (upErr) {
        throw upErr;
      }
      const { data: pub } = await supabase.storage.from(bucket).getPublicUrl(filePath);
      const url = pub?.publicUrl || "";
      if (!url) throw new Error("Could not retrieve public URL for uploaded image.");
      setForm({ ...form, image_url: url });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setErrorMsg(msg);
    } finally {
      setUploadingImage(false);
    }
  };

  const loadCounts = useCallback(async () => {
    if (!isAuthorized) return;
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) return;
    const entities: Entity[] = ["courses", "events", "team_members", "gallery_items", "blog_posts", "memberships", "contact_messages"];
    const results = await Promise.all(
      entities.map(async (e) => {
        const { count } = await supabase.from(e).select("*", { count: "exact", head: true });
        return { e, count: typeof count === "number" ? count : null };
      })
    );
    const next: Record<Entity, number | null> = { ...counts };
    results.forEach(({ e, count }) => {
      next[e] = count;
    });
    setCounts(next);
  }, [isAuthorized, counts]);

  useEffect(() => {
    loadRows();
    setForm({});
    setPage(1);
  }, [loadRows]);

  useEffect(() => {
    loadCounts();
  }, [loadCounts, active]);

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
    loadCounts();
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
    loadCounts();
  };

  const columns = columnsByEntity[active];

  const isAdminApp = typeof window !== "undefined" && window.location.pathname.startsWith("/admin");

  // Listen for reload requests from the top-level AdminNavbar
  useEffect(() => {
    const handler = () => {
      loadRows();
      // Also keep counts in sync
      loadCounts();
    };
    window.addEventListener("admin:reload-data", handler as EventListener);
    return () => window.removeEventListener("admin:reload-data", handler as EventListener);
  }, [loadRows, loadCounts]);

  return (
      <div className="min-h-screen">
      {!isAdminApp && <Navigation />}
      {!isAdminApp && <FloatingActions />}

     

      <section className={isAdminApp ? "py-8" : "py-16"}>
        <div className={isAdminApp ? "px-4" : "container mx-auto px-4"}>
          {isAdminApp ? (
            <>
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Bioinformatics Club PSTU</h2>
              </div>
              {!isAuthorized ? (
                <div className="p-4 text-sm text-muted-foreground">
                  <p>Admin access is locked. Please sign in with the club admin email and password.</p>
                </div>
              ) : (
                <Tabs value={active} onValueChange={(v) => setActive(v as Entity)}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    {/* Sidebar */}
                    <aside className="md:col-span-3 lg:col-span-2 sticky top-20">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Sections</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-1">
                          {[
                            { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                            { key: "courses", label: "Courses", icon: BookOpen },
                            { key: "events", label: "Events", icon: CalendarDays },
                            { key: "team_members", label: "Team", icon: Users },
                            { key: "gallery_items", label: "Gallery", icon: Images },
                            { key: "blog_posts", label: "Blog", icon: FileText },
                            { key: "memberships", label: "Memberships", icon: IdCard },
                            { key: "contact_messages", label: "Contact Messages", icon: Mail },
                          ].map((item) => {
                            const Icon = item.icon as ElementType;
                            const activeItem = active === item.key;
                            return (
                              <button
                                key={item.key}
                                className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between gap-2 transition-colors ${activeItem ? "bg-muted text-foreground" : "hover:bg-muted text-muted-foreground"}`}
                                onClick={() => setActive(item.key as Entity)}
                              >
                                <span className="flex items-center gap-2">
                                    <Icon className="w-4 h-4" />
                                  <span>{item.label}</span>
                                </span>
                                {item.key !== "dashboard" && (
                                  <span className="text-xs px-2 py-0.5 rounded bg-muted text-foreground">
                                    {counts[item.key as Entity] ?? "–"}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </CardContent>
                      </Card>
                    </aside>

                    {/* Main */}
                    <div className="md:col-span-9 lg:col-span-10 w-full">
                      <Card>
                        <CardHeader>
                          <CardTitle>Content Management</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {/* Dashboard Overview */}
                          <TabsContent value="dashboard">
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                              {[
                                { label: "Courses", key: "courses" as Entity },
                                { label: "Events", key: "events" as Entity },
                                { label: "Team Members", key: "team_members" as Entity },
                                { label: "Gallery Items", key: "gallery_items" as Entity },
                                { label: "Blog Posts", key: "blog_posts" as Entity },
                                { label: "Memberships", key: "memberships" as Entity },
                                { label: "Contact Messages", key: "contact_messages" as Entity },
                              ].map((card) => (
                                <Card key={card.key}>
                                  <CardHeader>
                                    <CardTitle className="text-base">{card.label}</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-3xl font-semibold">{counts[card.key] ?? "–"}</p>
                                    <div className="mt-3">
                                      <Button size="sm" variant="outline" onClick={() => setActive(card.key)}>Manage</Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </TabsContent>
                          {(["courses", "events", "team_members", "gallery_items", "blog_posts", "contact_messages"] as Entity[]).map((e) => (
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
                                        {active === "gallery_items" && c === "image_url" ? (
                                          <div className="space-y-2">
                                            <Input
                                              placeholder="https://..."
                                              value={String(form[c] ?? "")}
                                              onChange={(e) => setForm({ ...form, [c]: e.target.value })}
                                            />
                                            <div className="flex items-center gap-2">
                                              <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                  const f = e.target.files?.[0];
                                                  if (f) handleGalleryImageUpload(f);
                                                }}
                                              />
                                              <Button type="button" disabled={uploadingImage} onClick={() => {}}>
                                                {uploadingImage ? "Uploading..." : "Upload to Supabase"}
                                              </Button>
                                            </div>
                                            {form.image_url && (
                                              <div className="mt-2">
                                                <img src={String(form.image_url)} alt="Preview" className="h-24 rounded object-cover border" />
                                              </div>
                                            )}
                                          </div>
                                        ) : (
                                          <Input
                                            value={String(form[c] ?? "")}
                                            onChange={(e) => setForm({ ...form, [c]: e.target.value })}
                                          />
                                        )}
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
                                    <div className="flex items-center justify-between">
                                      <CardTitle>Manage {active.replace("_", " ")}</CardTitle>
                                      <div className="flex items-center gap-2">
                                        <Input
                                          placeholder="Search..."
                                          value={search}
                                          onChange={(e) => {
                                            setSearch(e.target.value);
                                            setPage(1);
                                          }}
                                          className="w-40"
                                        />
                                        <Button size="sm" variant="secondary" onClick={() => setForm({})}>New</Button>
                                        <Button size="sm" onClick={() => {
                                          const cols = columns;
                                          const rowsToExport = rows;
                                          const header = cols.join(",");
                                          const body = rowsToExport.map((r) => cols.map((c) => String(r[c] ?? "").replace(/"/g, '"')).join(",")).join("\n");
                                          const csv = header + "\n" + body;
                                          const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
                                          const url = URL.createObjectURL(blob);
                                          const a = document.createElement("a");
                                          a.href = url;
                                          a.download = `${active}.csv`;
                                          a.click();
                                          URL.revokeObjectURL(url);
                                        }}>Export CSV</Button>
                                      </div>
                                    </div>
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
                                        {(() => {
                                          const q = search.trim().toLowerCase();
                                          const filtered = q
                                            ? rows.filter((r) => columns.some((c) => String(r[c] ?? "").toLowerCase().includes(q)))
                                            : rows;
                                          const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
                                          const clampedPage = Math.min(page, totalPages);
                                          if (clampedPage !== page) setPage(clampedPage);
                                          const start = (clampedPage - 1) * pageSize;
                                          const visible = filtered.slice(start, start + pageSize);
                                          return (
                                            <>
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
                                                  {visible.map((r) => (
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
                                              <div className="flex items-center justify-end gap-2 mt-3">
                                                <span className="text-xs text-muted-foreground">Page {clampedPage} / {totalPages}</span>
                                                <Button size="sm" variant="outline" onClick={() => setPage(Math.max(1, clampedPage - 1))} disabled={clampedPage <= 1}>Prev</Button>
                                                <Button size="sm" variant="outline" onClick={() => setPage(Math.min(totalPages, clampedPage + 1))} disabled={clampedPage >= totalPages}>Next</Button>
                                              </div>
                                            </>
                                          );
                                        })()}
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              </div>
                            </TabsContent>
                          ))}
                          <TabsContent value="memberships">
                            <div className="grid md:grid-cols-1 gap-6 mt-0">
                              <Card>
                                <CardHeader>
                                  <CardTitle>Membership Applications</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  {errorMsg ? (
                                    <p className="text-red-500">{errorMsg}</p>
                                  ) : loading ? (
                                    <p className="text-muted-foreground">Loading...</p>
                                  ) : rows.length === 0 ? (
                                    <p className="text-muted-foreground">No applications yet.</p>
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
                                                <Button size="sm" variant="secondary" onClick={() => editRow(r)}>View</Button>
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
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </Tabs>
              )}
            </>
          ) : (
            <Card className="mb-6">
              <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <CardTitle>Admin Panel</CardTitle>
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
                  <Button variant="secondary" size="sm" onClick={() => { loadRows(); loadCounts(); }}>Reload Data</Button>
                </div>
                {authMsg && <p className="text-sm text-muted-foreground">{authMsg}</p>}
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
                  <Tabs value={active} onValueChange={(v) => setActive(v as Entity)}>
                    <TabsList className="flex flex-wrap">
                      <TabsTrigger value="courses">Courses</TabsTrigger>
                      <TabsTrigger value="events">Events</TabsTrigger>
                      <TabsTrigger value="team_members">Team</TabsTrigger>
                      <TabsTrigger value="gallery_items">Gallery</TabsTrigger>
                      <TabsTrigger value="blog_posts">Blog</TabsTrigger>
                      <TabsTrigger value="memberships">Memberships</TabsTrigger>
                      <TabsTrigger value="contact_messages">Contact Messages</TabsTrigger>
                    </TabsList>
                    {(["courses", "events", "team_members", "gallery_items", "blog_posts", "contact_messages"] as Entity[]).map((e) => (
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
                              <div className="flex items-center justify-between">
                                <CardTitle>Manage {active.replace("_", " ")}</CardTitle>
                                <div className="flex items-center gap-2">
                                  <Input
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => {
                                      setSearch(e.target.value);
                                      setPage(1);
                                    }}
                                    className="w-40"
                                  />
                                  <Button size="sm" variant="secondary" onClick={() => setForm({})}>New</Button>
                                  <Button size="sm" onClick={() => {
                                    const cols = columns;
                                    const rowsToExport = rows;
                                    const header = cols.join(",");
                                    const body = rowsToExport.map((r) => cols.map((c) => String(r[c] ?? "").replace(/"/g, '"')).join(",")).join("\n");
                                    const csv = header + "\n" + body;
                                    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement("a");
                                    a.href = url;
                                    a.download = `${active}.csv`;
                                    a.click();
                                    URL.revokeObjectURL(url);
                                  }}>Export CSV</Button>
                                </div>
                              </div>
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
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdminPage;
