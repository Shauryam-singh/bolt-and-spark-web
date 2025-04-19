
import { supabase } from "@/integrations/supabase/client";

export type ProductInfo = {
  id: string;
  name: string;
  image: string;
  price: string;
};

export async function fetchProductsByIds(ids: string[]): Promise<Record<string, ProductInfo>> {
  if (!ids.length) return {};
  // Try to fetch from fasteners and electrical tables (assumed product structure)
  const { data: fasteners } = await supabase
    .from("fasteners")
    .select("id, name, image, price")
    .in("id", ids);
  const { data: electrical } = await supabase
    .from("electrical")
    .select("id, name, image, price")
    .in("id", ids);

  const data = [
    ...(fasteners || []),
    ...(electrical || []),
  ];

  const map: Record<string, ProductInfo> = {};
  for (const item of data) {
    map[item.id] = {
      id: item.id,
      name: item.name,
      image: item.image || "/placeholder.svg",
      price: typeof item.price === "number" ? "$" + item.price : (item.price || "$0.00"),
    };
  }
  return map;
}
