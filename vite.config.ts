import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const usable = (value: string | undefined) => {
    const trimmed = value?.trim() || "";
    return trimmed && !trimmed.startsWith("process.env.") ? trimmed : "";
  };
  const supabaseUrl =
    usable(process.env.VITE_SUPABASE_URL) ||
    usable(process.env.SUPABASE_URL) ||
    usable(process.env.SUPABASE_URL_2) ||
    usable(process.env.SUPABASE_URL_3) ||
    usable(env.VITE_SUPABASE_URL) ||
    usable(env.SUPABASE_URL) ||
    usable(env.SUPABASE_URL_2) ||
    usable(env.SUPABASE_URL_3) ||
    "";
  const supabaseKey =
    usable(process.env.VITE_SUPABASE_ANON_KEY) ||
    usable(process.env.VITE_SUPABASE_PUBLISHABLE_KEY) ||
    usable(process.env.SUPABASE_PUBLISHABLE_KEY) ||
    usable(process.env.SUPABASE_PUBLISHABLE_KEY_2) ||
    usable(process.env.SUPABASE_PUBLISHABLE_KEY_3) ||
    usable(env.VITE_SUPABASE_ANON_KEY) ||
    usable(env.VITE_SUPABASE_PUBLISHABLE_KEY) ||
    usable(env.SUPABASE_PUBLISHABLE_KEY) ||
    usable(env.SUPABASE_PUBLISHABLE_KEY_2) ||
    usable(env.SUPABASE_PUBLISHABLE_KEY_3) ||
    "";

  return {
  define: {
    "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(supabaseUrl),
    "import.meta.env.VITE_SUPABASE_ANON_KEY": JSON.stringify(supabaseKey),
    "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(supabaseKey),
  },
  server: {
    host: "::",
    port: 8080,
    allowedHosts: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
  },
  };
});
