import siteLogo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AdminNavbar = () => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      setIsAuthed(!!session);
      setSessionEmail(session?.user?.email ?? null);
      setAvatarUrl((session?.user?.user_metadata?.avatar_url as string | undefined) ?? null);
    })();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(!!session);
      setSessionEmail(session?.user?.email ?? null);
      setAvatarUrl((session?.user?.user_metadata?.avatar_url as string | undefined) ?? null);
    });
    const refreshProfile = () => {
      void supabase.auth.getUser().then(({ data }) => setAvatarUrl((data.user?.user_metadata?.avatar_url as string | undefined) ?? null));
    };
    window.addEventListener("admin:profile-updated", refreshProfile);
    return () => {
      listener.subscription.unsubscribe();
      window.removeEventListener("admin:profile-updated", refreshProfile);
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleRefresh = () => window.location.reload();
  const handleReloadData = () => window.dispatchEvent(new CustomEvent("admin:reload-data"));

  const initials = (sessionEmail || "").slice(0, 2).toUpperCase() || "AD";

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-white/10 bg-[#081321]/95 backdrop-blur-xl">
      <div className="px-4 w-full h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
            <img src={siteLogo} alt="Bioinformatics Club" className="h-6 w-6 object-contain" />
          </div>
          <div><h1 className="text-sm font-semibold tracking-wide text-white">Admin workspace</h1><p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">PSTU Bioinformatics</p></div>
          
        </div>
        <div className="flex items-center gap-2">
          {isAuthed && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Avatar className="h-9 w-9 cursor-pointer border border-white/15">
                    <AvatarImage src={avatarUrl ?? undefined} alt="Admin profile" />
                    <AvatarFallback className="bg-cyan-400/15 text-xs text-cyan-200">{initials}</AvatarFallback>
                  </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <div className="px-2 py-1 text-xs text-muted-foreground truncate">{sessionEmail}</div>
                
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => window.dispatchEvent(new CustomEvent("admin:edit-profile"))}>Edit profile</DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
