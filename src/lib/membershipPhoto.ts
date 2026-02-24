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

export async function uploadMembershipPhoto(file: File, opts?: { expiresIn?: number }):
  Promise<MembershipPhotoUploadResult> {
  validateImageFile(file);

  const res = await fetch("/api/membership-photo-upload-url", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ filename: file.name, contentType: file.type || "application/octet-stream" }),
  });

  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(t || `Failed to create upload URL (${res.status})`);
  }

  const { bucket, path, token } = (await res.json()) as { bucket?: string; path?: string; token?: string };
  if (!bucket || !path || !token) throw new Error("Invalid signed upload response");

  const { error: upErr } = await supabase.storage.from(bucket).uploadToSignedUrl(path, token, file);
  if (upErr) throw upErr;

  const { data: pub } = await supabase.storage.from(bucket).getPublicUrl(path);
  const publicUrl = pub?.publicUrl || "";

  let previewUrl = publicUrl;
  if (!previewUrl) {
    const expiresIn = typeof opts?.expiresIn === "number" ? opts.expiresIn : 3600;
    const viewRes = await fetch("/api/gallery-signed-view", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ path, bucket, expiresIn }),
    });
    if (viewRes.ok) {
      const body = (await viewRes.json()) as { signedUrl?: string };
      if (body?.signedUrl) previewUrl = body.signedUrl;
    }
  }

  return {
    bucket,
    path,
    storedValue: publicUrl || path,
    previewUrl,
  };
}
