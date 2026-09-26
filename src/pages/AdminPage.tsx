import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
// AdminNavbar is rendered at the app root in admin/main.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ElementType } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, BookOpen, CalendarDays, CheckCircle2, Images, FileText, IdCard, LayoutDashboard, LockKeyhole, Mail, ShieldCheck, Users } from "lucide-react";

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
  const configuredAdminEmail = (import.meta.env.VITE_ADMIN_EMAIL || "bioinformaticsclubpstu@gmail.com").trim().toLowerCase();
  const [authEmail, setAuthEmail] = useState(configuredAdminEmail);
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
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  const REQUEST_TIMEOUT_MS = 15_000;

  const GALLERY_FILE_INPUT_ID = "admin-gallery-image-file";
  const BLOG_FILE_INPUT_ID = "admin-blog-image-file";

  const [pendingImageFile, setPendingImageFile] = useState<File | null>(null);
  const pendingImageObjectUrlRef = useRef<string>("");

  const clearPendingImage = useCallback(() => {
    setPendingImageFile(null);
    if (pendingImageObjectUrlRef.current) {
      try {
        URL.revokeObjectURL(pendingImageObjectUrlRef.current);
      } catch {
        // ignore
      }
      pendingImageObjectUrlRef.current = "";
    }
  }, []);

  const selectPendingImage = useCallback(
    (file: File | undefined) => {
      if (!file) return;
      setErrorMsg(null);
      clearPendingImage();
      setPendingImageFile(file);
      if (typeof URL !== "undefined") {
        const objectUrl = URL.createObjectURL(file);
        pendingImageObjectUrlRef.current = objectUrl;
        setImagePreviewUrl(objectUrl);
      }
    },
    [clearPendingImage]
  );

  const uploadImageForEntity = useCallback(
    async (entity: Entity, file: File) => {
      if (!file) throw new Error("No file selected");
      if (!isAuthorized) throw new Error("Admin access is restricted. Please sign in.");
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        throw new Error("Supabase environment variables are missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      }

      const isGallery = entity === "gallery_items";
      const api = isGallery ? "/api/gallery-upload-url" : "/api/blog-upload-url";
      const defaultBucket = isGallery ? "gallery" : "blog";

      const uploadUrlController = new AbortController();
      const uploadUrlTimeout = window.setTimeout(() => uploadUrlController.abort(), REQUEST_TIMEOUT_MS);
      const res = await fetch(api, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentType: file.type || "application/octet-stream" }),
        signal: uploadUrlController.signal,
      });
      window.clearTimeout(uploadUrlTimeout);
      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(t || "Failed to create signed upload URL");
      }

      const body = (await res.json().catch(() => ({}))) as { path?: string; token?: string; bucket?: string };
      const path = typeof body.path === "string" ? body.path : "";
      const token = typeof body.token === "string" ? body.token : "";
      const bucketName = typeof body.bucket === "string" && body.bucket ? body.bucket : defaultBucket;
      if (!path || !token) throw new Error("Invalid signed upload response");

      const uploadPromise = supabase.storage.from(bucketName).uploadToSignedUrl(path, token, file);
      const uploadTimeoutPromise = new Promise<never>((_, reject) =>
        window.setTimeout(() => reject(new Error("Upload timed out. Please try again.")), REQUEST_TIMEOUT_MS)
      );
      const { error: upErr } = await Promise.race([uploadPromise, uploadTimeoutPromise]);
      if (upErr) throw upErr;

      const { data: pub } = await supabase.storage.from(bucketName).getPublicUrl(path);
      const publicUrl = pub?.publicUrl ? String(pub.publicUrl) : "";

      return {
        bucket: bucketName,
        path,
        storedValue: publicUrl || path,
        publicUrl,
      };
    },
    [isAuthorized]
  );

  const slugify = (value: string) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 80);
  };

  const preparePayload = (entity: Entity, input: Row): Row => {
    const payload: Row = { ...input };

    // Avoid writing server-managed columns
    delete payload.created_at;

    // Normalize empty strings for optional fields
    const nullIfBlank = (v: unknown) => {
      if (typeof v !== "string") return v;
      const t = v.trim();
      return t === "" ? null : t;
    };

    if (entity === "blog_posts") {
      payload["slug"] = nullIfBlank(payload["slug"]);
      payload["excerpt"] = nullIfBlank(payload["excerpt"]);
      payload["content"] = nullIfBlank(payload["content"]);
      payload["image_url"] = nullIfBlank(payload["image_url"]);
      payload["author"] = nullIfBlank(payload["author"]);
      payload["category"] = nullIfBlank(payload["category"]);
      if (typeof payload.title === "string") payload.title = payload.title.trim();
    }

    if (entity === "courses") {
      if (typeof payload.title === "string") payload.title = payload.title.trim();
      const raw = payload.modules;
      if (raw === "" || raw === null || typeof raw === "undefined") {
        payload.modules = null;
      } else if (typeof raw === "string") {
        const n = Number(raw);
        payload.modules = Number.isFinite(n) ? n : raw;
      }
    }

    if (entity === "events") {
      if (typeof payload.title === "string") payload.title = payload.title.trim();
    }
    if (entity === "team_members") {
      if (typeof payload.name === "string") payload.name = payload.name.trim();
    }

    return payload;
  };

  const parseApiError = async (res: Response) => {
    const text = await res.text();
    try {
      const j = JSON.parse(text);
      if (j && typeof j === "object") {
        const msg = (j.error && String(j.error)) || (j.message && String(j.message));
        if (msg) return msg;
      }
    } catch {
      // ignore
    }
    // Likely HTML (Vite dev server or SPA fallback)
    if (text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html")) {
      return "API route returned HTML (likely a rewrite). In production, ensure /api/* routes are not rewritten to index.html and SUPABASE_SERVICE_ROLE_KEY is set.";
    }
    return text || `Request failed (${res.status})`;
  };

  const columnsByEntity: Record<Entity, string[]> = {
    dashboard: [],
    courses: ["title", "description", "duration", "level", "modules"],
    events: ["title", "description", "date", "location"],
    team_members: ["name", "role", "bio", "avatar_url"],
    gallery_items: ["title", "image_url", "caption"],
    blog_posts: ["title", "slug", "author", "category", "image_url", "excerpt", "content"],
    memberships: ["name", "email", "student_id", "department", "year", "phone", "bio", "skills", "photo_url"],
    contact_messages: ["name", "email", "student_id", "message"],
  };

  const loadRows = useCallback(async () => {
    // Gate all admin data behind authorized session
    if (!isAuthorized) {
      setErrorMsg("Admin access is restricted. Please sign in with the club email.");
      setRows([]);
      return;
    }

    // 'dashboard' is a UI-only section, not a database table
    if (active === "dashboard") {
      setErrorMsg(null);
      setRows([]);
      return;
    }

    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      setErrorMsg("Supabase environment variables are missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      return;
    }
    setErrorMsg(null);
    setLoading(true);

    let finished = false;
    const timeout = window.setTimeout(() => {
      if (finished) return;
      setLoading(false);
      setErrorMsg(
        "Request timed out. If this keeps happening in production, check Supabase project status (not paused) and verify Vercel env vars for VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY."
      );
    }, REQUEST_TIMEOUT_MS);

    try {
      const { data, error } = await supabase.from(active).select("*").order("id", { ascending: false });
      finished = true;
      window.clearTimeout(timeout);
      setLoading(false);
      if (error) {
        const status = (error as unknown as { status?: number }).status;
        if (status === 503) {
          setErrorMsg("Supabase is temporarily unavailable (503). Please wait a moment and try again.");
        } else {
          setErrorMsg(error.message);
        }
        return;
      }
      setRows((data as Row[]) || []);
    } catch (e) {
      finished = true;
      window.clearTimeout(timeout);
      setLoading(false);
      const msg = e instanceof Error ? e.message : String(e);
      setErrorMsg(msg);
    }
  }, [active, isAuthorized]);

  // Image upload is deferred until Create/Update.

  // Image upload is deferred until Create/Update.

  const loadCounts = useCallback(
    async (mode: "all" | "active" = "active") => {
      if (!isAuthorized) return;
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) return;

      const all: Entity[] = ["courses", "events", "team_members", "gallery_items", "blog_posts", "memberships", "contact_messages"];
      const entities: Entity[] =
        mode === "all" ? all : active === "dashboard" ? [] : [active];

      if (!entities.length) return;

      const results = await Promise.all(
        entities.map(async (e) => {
          const { count, error } = await supabase.from(e).select("*", { count: "exact", head: true });
          if (error) return { e, count: null };
          return { e, count: typeof count === "number" ? count : null };
        })
      );

      setCounts((prev) => {
        const next: Record<Entity, number | null> = { ...prev };
        results.forEach(({ e, count }) => {
          next[e] = count;
        });
        return next;
      });
    },
    [isAuthorized, active]
  );

  useEffect(() => {
    loadRows();
    setForm({});
    setPage(1);
  }, [loadRows]);

  useEffect(() => {
    // Fetch all counts once after authorization; then only keep active count in sync.
    loadCounts("all");
  }, [loadCounts, isAuthorized]);

  useEffect(() => {
    loadCounts("active");
  }, [loadCounts, active]);

  // Auth session & authorization
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      setIsAuthed(!!session);
      setSessionEmail(session?.user?.email ?? null);
      const allowedEmail = configuredAdminEmail;
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
      const allowedEmail = configuredAdminEmail;
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
      const message = error.message.toLowerCase();
      if (message.includes("email not confirmed")) {
        setAuthMsg("Please confirm your email before signing in.");
      } else if (message.includes("rate limit")) {
        setAuthMsg("Too many attempts. Please wait and try again.");
      } else {
        setAuthMsg("Invalid email or password.");
      }
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
    setErrorMsg(null);
    setLoading(true);
    const payload = preparePayload(active, form);

    const tryClientUpsert = async (reason: string) => {
      const { error } = await supabase.from(active).upsert(payload).select();
      if (error) {
        const msg = error.message || "Client write failed";
        if (/row-level security|permission denied|not allowed|jwt/i.test(msg)) {
          throw new Error(
            "Client-side create/update is blocked by Supabase RLS/permissions. In production you should use the /api/admin-upsert serverless route with SUPABASE_SERVICE_ROLE_KEY set in Vercel env vars (or disable RLS for these tables)."
          );
        }
        throw new Error(msg);
      }
      return { ok: true, reason };
    };

    try {
      // Prefer serverless (service role) in production
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      const res = await fetch("/api/admin-upsert", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ table: active, payload }),
        signal: controller.signal,
      });
      window.clearTimeout(timeout);
      if (!res.ok) {
        const msg = await parseApiError(res);

        // If API isn't available (common on local `vite dev`) or server is missing env, fallback to client
        const shouldFallback = res.status === 404 || res.status === 405 || /Missing SUPABASE_SERVICE_ROLE_KEY/i.test(msg);
        if (shouldFallback) {
          await tryClientUpsert(msg);
        } else {
          throw new Error(msg);
        }
      }
    } catch (e) {
      // Network error → fallback to client upsert (works when RLS is disabled)
      try {
        if (e instanceof DOMException && e.name === "AbortError") {
          await tryClientUpsert("Timed out calling /api/admin-upsert");
        } else {
          await tryClientUpsert("Network error calling API");
        }
      } catch (inner) {
        const msg = inner instanceof Error ? inner.message : String(inner);
        setLoading(false);
        setErrorMsg(msg);
        return;
      }
    }

    setLoading(false);
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
    setErrorMsg(null);
    setLoading(true);
    const tryClientDelete = async () => {
      const { error } = await supabase.from(active).delete().eq("id", id);
      if (error) {
        const msg = error.message || "Client delete failed";
        if (/row-level security|permission denied|not allowed|jwt/i.test(msg)) {
          throw new Error(
            "Client-side delete is blocked by Supabase RLS/permissions. In production you should use the /api/admin-delete serverless route with SUPABASE_SERVICE_ROLE_KEY set in Vercel env vars (or disable RLS for these tables)."
          );
        }
        throw new Error(msg);
      }
    };

    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      const res = await fetch("/api/admin-delete", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ table: active, id }),
        signal: controller.signal,
      });
      window.clearTimeout(timeout);
      if (!res.ok) {
        const msg = await parseApiError(res);
        const shouldFallback = res.status === 404 || res.status === 405 || /Missing SUPABASE_SERVICE_ROLE_KEY/i.test(msg);
        if (shouldFallback) {
          await tryClientDelete();
        } else {
          throw new Error(msg);
        }
      }
    } catch (e) {
      // Network error → fallback
      try {
        if (e instanceof DOMException && e.name === "AbortError") {
          // fall through to client delete
        }
        await tryClientDelete();
      } catch (inner) {
        const msg = inner instanceof Error ? inner.message : String(inner);
        setLoading(false);
        setErrorMsg(msg);
        return;
      }
    }

    setLoading(false);
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
      <div className={isAdminApp ? "min-h-screen bg-[#07111f] text-slate-100" : "min-h-screen"}>
      {!isAdminApp && <Navigation />}
      {!isAdminApp && <FloatingActions />}

     

      <section className={isAdminApp ? "min-h-[calc(100vh-4rem)] px-4 py-6 lg:px-8" : "py-16"}>
        <div className={isAdminApp ? "mx-auto max-w-[1600px]" : "container mx-auto px-4"}>
          {isAdminApp ? (
            <>
              <div className="mb-7 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Operations center</p>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">Bioinformatics Club PSTU</h2>
                  <p className="mt-1 text-sm text-slate-400">Manage every public-facing section from one secure workspace.</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400"><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" /> Supabase live data</div>
              </div>
              {!isAuthorized ? (
                <div className="relative isolate flex min-h-[calc(100vh-7rem)] items-center justify-center overflow-hidden rounded-3xl bg-slate-950 px-4 py-10 text-white shadow-2xl">
                  <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.24),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.22),transparent_34%)]" />
                  <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur-xl md:grid-cols-[1.05fr_0.95fr]">
                    <div className="hidden flex-col justify-between p-10 md:flex lg:p-14">
                      <div>
                        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-400/15 text-teal-300 ring-1 ring-teal-300/30">
                          <ShieldCheck className="h-7 w-7" aria-hidden="true" />
                        </div>
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-teal-300">PSTU Bioinformatics Club</p>
                        <h2 className="max-w-md text-4xl font-bold leading-tight tracking-tight lg:text-5xl">Manage your club, all in one place.</h2>
                        <p className="mt-5 max-w-md text-base leading-7 text-slate-300">Publish updates, organize events, review members, and keep every part of the public site up to date.</p>
                      </div>
                      <div className="space-y-4 text-sm text-slate-300">
                        {["Secure Supabase authentication", "Live content management", "One dashboard for every section"].map((item) => (
                          <div key={item} className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-teal-300" aria-hidden="true" /><span>{item}</span></div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white p-7 text-slate-900 sm:p-10 lg:p-14">
                      <div className="mb-8 flex items-center gap-3 md:hidden">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700"><ShieldCheck className="h-6 w-6" aria-hidden="true" /></div>
                        <div><p className="text-xs font-bold uppercase tracking-widest text-teal-700">PSTU Bioinformatics</p><p className="text-sm text-slate-500">Club administration</p></div>
                      </div>
                      <div className="mb-8">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-teal-300"><LockKeyhole className="h-5 w-5" aria-hidden="true" /></div>
                        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                        <p className="mt-2 text-sm leading-6 text-slate-500">Sign in to access the admin dashboard.</p>
                      </div>
                      <form className="space-y-5" onSubmit={(event) => { event.preventDefault(); void handleSignIn(); }}>
                        <div className="space-y-2"><label htmlFor="admin-email" className="text-sm font-medium text-slate-700">Admin email</label><Input id="admin-email" type="email" autoComplete="email" placeholder="admin@pstu.ac.bd" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} className="h-12 border-slate-200 bg-slate-50 px-4" /></div>
                        <div className="space-y-2"><div className="flex items-center justify-between"><label htmlFor="admin-password" className="text-sm font-medium text-slate-700">Password</label><span className="text-xs text-slate-400">Protected access</span></div><Input id="admin-password" type="password" autoComplete="current-password" placeholder="Enter your password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} className="h-12 border-slate-200 bg-slate-50 px-4" /></div>
                        {authMsg && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{authMsg}</div>}
                        <Button type="submit" className="h-12 w-full bg-slate-900 text-white hover:bg-slate-800">Sign in to dashboard <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Button>
                      </form>
                      <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-slate-400"><LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" /> Your session is secured by Supabase Auth</p>
                    </div>
                  </div>
                </div>
              ) : (
                <Tabs value={active} onValueChange={(v) => setActive(v as Entity)}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    {/* Sidebar */}
                    <aside className="md:col-span-3 lg:col-span-2 sticky top-24">
                      <Card className="border-white/10 bg-[#0c1a2b] shadow-xl shadow-black/20">
                        <CardHeader>
                          <div><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Workspace</p><CardTitle className="mt-2 text-base text-white">Content sections</CardTitle></div>
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
                                className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between gap-2 transition-colors ${activeItem ? "bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-300/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
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
                      <Card className="border-white/10 bg-[#0c1a2b] shadow-xl shadow-black/20">
                        <CardHeader className="border-b border-white/10">
                          <CardTitle className="text-white">Content management</CardTitle>
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
                                                id={GALLERY_FILE_INPUT_ID}
                                                onChange={(e) => {
                                                  const f = e.target.files?.[0];
                                                  selectPendingImage(f);
                                                }}
                                              />
                                              <Button
                                                type="button"
                                                disabled={uploadingImage}
                                                onClick={() => document.getElementById(GALLERY_FILE_INPUT_ID)?.click()}
                                              >
                                                {pendingImageFile ? "Image Selected" : "Choose Image"}
                                              </Button>
                                            </div>
                                            {(form.image_url || imagePreviewUrl) && (
                                              <div className="mt-2">
                                                <img src={String(imagePreviewUrl || form.image_url)} alt="Preview" className="h-24 rounded object-cover border" />
                                              </div>
                                            )}
                                          </div>
                                        ) : active === "blog_posts" && c === "image_url" ? (
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
                                                id={BLOG_FILE_INPUT_ID}
                                                onChange={(e) => {
                                                  const f = e.target.files?.[0];
                                                  selectPendingImage(f);
                                                }}
                                              />
                                              <Button
                                                type="button"
                                                disabled={uploadingImage}
                                                onClick={() => document.getElementById(BLOG_FILE_INPUT_ID)?.click()}
                                              >
                                                {pendingImageFile ? "Image Selected" : "Choose Image"}
                                              </Button>
                                            </div>
                                            {(form.image_url || imagePreviewUrl) && (
                                              <div className="mt-2">
                                                <img src={String(imagePreviewUrl || form.image_url)} alt="Preview" className="h-24 rounded object-cover border" />
                                              </div>
                                            )}
                                          </div>
                                        ) : active === "blog_posts" && (c === "content" || c === "excerpt") ? (
                                          <Textarea
                                            value={String(form[c] ?? "")}
                                            onChange={(e) => setForm({ ...form, [c]: e.target.value })}
                                            className={c === "content" ? "min-h-[220px]" : "min-h-[120px]"}
                                            placeholder={c === "content" ? "Write the full post content..." : "Short summary for previews..."}
                                          />
                                        ) : active === "blog_posts" && c === "title" ? (
                                          <Input
                                            value={String(form[c] ?? "")}
                                            onChange={(e) => {
                                              const nextTitle = e.target.value;
                                              const next: Row = { ...form, [c]: nextTitle };
                                              const currentSlug = String(form.slug ?? "");
                                              if (!currentSlug) {
                                                next.slug = slugify(nextTitle);
                                              }
                                              setForm(next);
                                            }}
                                          />
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
              <footer className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <span>Bioinformatics Club PSTU Admin</span><span>Secure content operations · Supabase connected</span>
              </footer>
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
