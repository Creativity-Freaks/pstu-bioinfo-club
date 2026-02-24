import { supabase } from "@/integrations/supabase/client";

export type MembershipPhotoUploadResult = {
  bucket: string;
  path: string;
  storedValue: string; // public URL if available, otherwise Storage path
  previewUrl: string; // public URL if available, otherwise signed view URL (best-effort)
};

export function validateImageFile(file: File, opts?: { maxBytes?: number }) {
  const maxBytes = opts?.maxBytes ?? 5 * 1024 * 1024;
  if (!file) throw new Error("No file selected");
  if (!file.type || !file.type.startsWith("image/")) throw new Error("Please select an image file");
  if (file.size > maxBytes) throw new Error(`Image is too large (max ${Math.round(maxBytes / 1024 / 1024)}MB)`);
}

async function uploadMembershipPhotoDirect(file: File, opts?: { expiresIn?: number }): Promise<MembershipPhotoUploadResult> {
  const bucket = "memberships";
  const ext = (file.name.split(".").pop() || "bin").toLowerCase();
  const safeExt = ext.replace(/[^a-z0-9]/g, "").slice(0, 10) || "bin";
  const path = `memberships/${Date.now()}-${Math.random().toString(36).slice(2)}.${safeExt}`;

  const { error: upErr } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: true,
    contentType: file.type || "application/octet-stream",
  });
  if (upErr) throw upErr;

  const { data: pub } = await supabase.storage.from(bucket).getPublicUrl(path);
  const publicUrl = pub?.publicUrl || "";

  // getPublicUrl() always returns a URL string, even for private buckets.
  // For direct uploads (dev fallback), prefer local preview.
  let previewUrl = "";
  if (typeof window !== "undefined" && typeof URL !== "undefined") {
    previewUrl = URL.createObjectURL(file);
  } else {
    previewUrl = publicUrl;
  }

  return {
    bucket,
    path,
    storedValue: publicUrl || path,
    previewUrl,
  };
}

export async function uploadMembershipPhoto(file: File, opts?: { expiresIn?: number }): Promise<MembershipPhotoUploadResult> {
  validateImageFile(file);

  const isLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

  try {
    const res = await fetch("/api/membership-photo-upload-url", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ filename: file.name, contentType: file.type || "application/octet-stream" }),
    });

    if (!res.ok) {
      if (isLocalhost && res.status === 404) {
        // Dev fallback: API route not available in plain Vite dev
        return await uploadMembershipPhotoDirect(file, opts);
      }
      const t = await res.text().catch(() => "");
      throw new Error(t || `Failed to create upload URL (${res.status})`);
    }

    const { bucket, path, token } = (await res.json()) as { bucket?: string; path?: string; token?: string };
    if (!bucket || !path || !token) throw new Error("Invalid signed upload response");

    const { error: upErr } = await supabase.storage.from(bucket).uploadToSignedUrl(path, token, file);
    if (upErr) throw upErr;

    const { data: pub } = await supabase.storage.from(bucket).getPublicUrl(path);
    const publicUrl = pub?.publicUrl || "";

    // getPublicUrl() may be non-empty even when bucket is private.
    // Prefer signed preview; fallback to public URL; then local object URL.
    let previewUrl = "";
    try {
      const expiresIn = typeof opts?.expiresIn === "number" ? opts.expiresIn : 3600;
      const viewRes = await fetch("/api/gallery-signed-view", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ path, bucket, expiresIn }),
      });
      if (viewRes.ok) {
        const body = (await viewRes.json()) as { signedUrl?: string };
        if (body?.signedUrl) previewUrl = String(body.signedUrl);
      }
    } catch {
      // ignore
    }
    if (!previewUrl) previewUrl = publicUrl;
    if (!previewUrl && typeof window !== "undefined" && typeof URL !== "undefined") {
      previewUrl = URL.createObjectURL(file);
    }

    return {
      bucket,
      path,
      storedValue: publicUrl || path,
      previewUrl,
    };
  } catch (err) {
    if (isLocalhost) {
      // Network or other error in dev: try direct upload as a fallback
      return await uploadMembershipPhotoDirect(file, opts);
    }
    throw err;
  }
}
