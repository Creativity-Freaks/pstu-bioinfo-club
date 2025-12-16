import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Auto-import all PNG images from the Executive Committee 2025 folder
const modules = import.meta.glob(
  "/src/assets/EXECUTIVE COMMITTEE 2 0 2 5 Bioinformatics Club , PSTU/*.png",
  { eager: true }
) as Record<string, { default: string }>;

const Executive2025 = () => {
  const items = useMemo(() => {
    return Object.entries(modules)
      .map(([path, mod]) => {
        const name = path.split("/").pop() || "";
        const base = name.replace(/\.png$/i, "");
        const order = parseInt(base, 10);
        return { src: mod.default, name, order: isNaN(order) ? 9999 : order };
      })
      .sort((a, b) => a.order - b.order);
  }, []);

  const [open, setOpen] = useState(false);
  const [activeSrc, setActiveSrc] = useState<string | null>(null);
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const startIdx = (page - 1) * PAGE_SIZE;
  const paged = items.slice(startIdx, startIdx + PAGE_SIZE);

  useEffect(() => {
    // Clamp current page when totalPages change using functional update
    setPage((prev) => {
      if (prev > totalPages) return totalPages;
      if (prev < 1) return 1;
      return prev;
    });
  }, [totalPages]);

  const onOpen = (src: string) => {
    setActiveSrc(src);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paged.map((it) => (
          <Card
            key={it.src}
            className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-fade-in group cursor-pointer"
            onClick={() => onOpen(it.src)}
          >
            <CardContent className="p-4">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-card shadow-sm">
                <img
                  src={it.src}
                  alt={`Executive Committee 2025 - ${it.name}`}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
                />
              </div>
              <p className="mt-3 text-xs text-muted-foreground text-center">Tap to view details</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{items.length ? startIdx + 1 : 0}</span>
          –<span className="font-medium">{Math.min(startIdx + PAGE_SIZE, items.length)}</span>
          
          of <span className="font-medium">{items.length}</span>
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            Prev
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                variant={p === page ? "default" : "outline"}
                size="sm"
                onClick={() => setPage(p)}
              >
                {p}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
            Next
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          {activeSrc && (
            <img src={activeSrc} alt="Executive Detail" className="w-full h-auto" />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Executive2025;
