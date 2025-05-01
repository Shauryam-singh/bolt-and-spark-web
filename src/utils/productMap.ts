
import { supabase } from "@/integrations/supabase/client";

// These lists must sync with those in ProductDetails.tsx!
const productData: Array<ProductInfo> = [
  {
    id: "socket-screws",
    name: "Socket Screws",
    image: "https://m.media-amazon.com/images/I/61VIHcLUrlL.jpg",
    price: "$12.99",
  },
  {
    id: "durlok",
    name: "Durlok",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBPhNDhgro-YrCPzmUlvrS-xsLHkKzyl5Q5w&s",
    price: "$0.00",
  },
  {
    id: "flat-washer",
    name: "Flat Washer",
    image: "https://m.media-amazon.com/images/I/61d4W0NjzUL.jpg",
    price: "$8.99",
  },
  {
    id: "hex-bolt",
    name: "Hex Bolt",
    image: "https://www.fastdep.in/images/product/ss-hex-bolt-inch_hu1f6ff40bf773d9b8df443a823106ec08_400315_750x750_resize_q85_box.jpg",
    price: "$7.99",
  },
  {
    id: "hex-nut",
    name: "Hex Nut",
    image: "https://images-cdn.ubuy.co.in/667e6bc2bd456f54a4352a6b-5-16-18-50pcs-stainless-steel-hex-nuts.jpg",
    price: "$3.99",
  },
  {
    id: "carriage-bolt",
    name: "Carriage Bolt",
    image: "https://www.fas10.in/wp-content/uploads/2022/10/stainless-steel-carriage-bolt.webp",
    price: "$5.99",
  },
  {
    id: "wood-screw",
    name: "Wood Screw",
    image: "https://5.imimg.com/data5/SELLER/Default/2023/1/MT/LZ/EW/24439648/ss-wood-screws.jpg",
    price: "$10.49",
  },
  {
    id: "lock-nut",
    name: "Lock Nut",
    image: "https://buysupplies.in/cdn/shop/products/LockNut304_ac33f36b-284f-45df-bf25-4257533af177.jpg?v=1633667576",
    price: "$7.99",
  },
  {
    id: "distribution-board-12-way",
    name: "Distribution Board 12-Way",
    image: "https://cdn.moglix.com/p/LJQ1jN6NcFNt7-xxlarge.jpg",
    price: "$149.99",
  },
  {
    id: "industrial-switchboard",
    name: "Industrial Switchboard",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ru5uHeu7wf0TTn73g5tl9zkpFd2tccqFmA&s",
    price: "$399.99",
  },
  {
    id: "copper-building-wire-100m",
    name: "Copper Building Wire (100m)",
    image: "https://image.made-in-china.com/202f0j00CicbyIUzgEkD/Weight-Copper-Cable-Cable-Electrical-Italy-100m-Power-Cable.jpg",
    price: "$79.99",
  },
  {
    id: "modular-wall-switches",
    name: "Modular Wall Switches",
    image: "https://5.imimg.com/data5/SELLER/Default/2023/10/352782418/GA/AJ/KV/90013704/black-modular-electrical-switch-boards.jpg",
    price: "$12.99",
  },
];

export type ProductInfo = {
  id: string;
  name: string;
  image: string;
  price: string;
};

/**
 * Return a key-value map from product IDs to product info.
 * All product data comes from the in-memory static array above.
 * For missing products, fallback to a default placeholder.
 */
export async function fetchProductsByIds(ids: string[]): Promise<Record<string, ProductInfo>> {
  if (!ids.length) return {};

  const map: Record<string, ProductInfo> = {};
  for (const id of ids) {
    const product = productData.find((p) => p.id === id);
    if (product) {
      map[id] = product;
    } else {
      map[id] = {
        id,
        name: "Unknown Product",
        image: "/placeholder.svg",
        price: "$0.00",
      };
    }
  }
  return map;
}
