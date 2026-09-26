import siteLogo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AdminNavbar = () => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      setIsAuthed(!!session);
      setSessionEmail(session?.user?.email ?? null);
    })();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(!!session);
      setSessionEmail(session?.user?.email ?? null);
    });
    return () => listener.subscription.unsubscribe();
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
          <div className="w-9 h-9 rounded-full bg-card flex items-center justify-center shadow">
            <img src={siteLogo} alt="Bioinformatics Club" className="w-7 h-7 object-contain" />
          </div>
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          
        </div>
        <div className="flex items-center gap-2">
          {sessionEmail && (
            <span className="text-sm text-muted-foreground hidden md:inline">Signed in as {sessionEmail}</span>
          )}
          {isAuthed && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-8 h-8 cursor-pointer">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <div className="px-2 py-1 text-xs text-muted-foreground truncate">{sessionEmail}</div>
                
                <DropdownMenuItem disabled>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Button variant="outline" size="sm" onClick={handleRefresh}>Refresh</Button>
          <Button variant="secondary" size="sm" onClick={handleReloadData}>Reload Data</Button>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
