import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ListOptions = {
  orderBy?: string;
  ascending?: boolean;
  limit?: number;
  eq?: Array<{ column: string; value: string | number | boolean | null }>;
};

export function useSupabaseList<T extends Record<string, unknown>>(table: string, options: ListOptions = {}) {
  const { orderBy = "id", ascending = false, limit, eq } = options;

  return useQuery({
    queryKey: ["sb-list", table, orderBy, ascending, limit, eq],
    queryFn: async () => {
      if (!supabase) return [] as T[];
      let q = supabase.from(table).select("*");
      if (orderBy) q = q.order(orderBy, { ascending });
      if (typeof limit === "number") q = q.limit(limit);
      if (eq && Array.isArray(eq)) {
        for (const f of eq) {
          q = q.eq(f.column, f.value);
        }
      }
      const { data, error } = await q;
      if (error) throw error;
      return (data as T[]) ?? [];
    },
    staleTime: 30_000,
  });
}
