import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart, Package, Truck, Shield, Info, Tag, Percent, Award, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useWishlist } from '@/hooks/useWishlist';

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  categories: string[];
  price?: string;
  isNew?: boolean;
}

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [wishlistLoading, setWishlistLoading] = React.useState(false);
  const [isInWishlistState, setIsInWishlistState] = React.useState(false);
  const [wishlistId, setWishlistId] = React.useState<string | null>(null);

  // Check if the product is in wishlist when component mounts
  React.useEffect(() => {
    if (user && id) {
      checkWishlistStatus(id);
    }
  }, [user, id]);

  async function checkWishlistStatus(productId: string) {
    if (!user) return;
    
    try {
      const { isInWishlist: inWishlist, wishlistId } = await isInWishlist(productId);
      setIsInWishlistState(inWishlist);
      setWishlistId(wishlistId);
    } catch (error) {
      console.error("Error checking wishlist status:", error);
    }
  }  

  const industrialFasteners = [
    {
      id: "socket-screws",
      name: "Socket Screws",
      image: "https://m.media-amazon.com/images/I/61VIHcLUrlL.jpg",
      description: "Designed for high-torque applications, available in various head styles and materials.",
      categories: ["Hex", "Allen", "Industrial"],
      price: "$12.99",
      isNew: true
    },
    {
      id: "durlok",
      name: "Durlok",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBPhNDhgro-YrCPzmUlvrS-xsLHkKzyl5Q5w&s",
      description: "A patented fastener system that provides a secure, vibration-resistant connection.",
      categories: ["Self-locking", "Anti-vibration", "Heavy-duty"]
    },
    {
      id: "hex-bolt",
      name: "Hex Bolt",
      image: "https://www.fastdep.in/images/product/ss-hex-bolt-inch_hu1f6ff40bf773d9b8df443a823106ec08_400315_750x750_resize_q85_box.jpg",
      description: "Hex bolts are used in a variety of applications, including construction, automotive, and machinery.",
      categories: ["Steel", "Stainless", "Galvanized"]
    },
    {
      id: "hex-nut",
      name: "Hex Nut",
      image: "https://images-cdn.ubuy.co.in/667e6bc2bd456f54a4352a6b-5-16-18-50pcs-stainless-steel-hex-nuts.jpg",
      description: "Hex nuts are used with bolts to create a secure fastening system, available in various sizes and materials.",
      categories: ["Steel", "Stainless", "Brass"]
    },
    {
      id: "flat-washer",
      name: "Flat Washer",
      image: "https://m.media-amazon.com/images/I/61d4W0NjzUL.jpg",
      description: "Used to distribute load and prevent damage to surfaces, available in flat, lock, and fender styles.",
      categories: ["Flat", "Lock", "Fender"],
      price: "$8.99",
      isNew: true
    },
    {
      id: "carriage-bolt",
      name: "Carriage Bolt",
      image: "https://www.fas10.in/wp-content/uploads/2022/10/stainless-steel-carriage-bolt.webp",
      description: "Designed for wood and metal connections, features a square neck to prevent rotation.",
      categories: ["Carriage", "Heavy-duty", "Industrial"],
      price: "$5.99"
    },
    {
      id: "wood-screw",
      name: "Wood Screw",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/1/MT/LZ/EW/24439648/ss-wood-screws.jpg",
      description: "Ideal for woodworking, these screws provide strong holding power in wood-based applications.",
      categories: ["Wood", "Screws", "Industrial"],
      price: "$10.49"
    },
    {
      id: "lock-nut",
      name: "Lock Nut",
      image: "https://buysupplies.in/cdn/shop/products/LockNut304_ac33f36b-284f-45df-bf25-4257533af177.jpg?v=1633667576",
      description: "A type of nut designed to resist loosening due to vibration or torque.",
      categories: ["Locking", "Industrial", "Self-locking"],
      price: "$7.99"
    },
    {
      id: "self-drilling-screw",
      name: "Self-Drilling Screw",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk7BEPeYS9fsm342tqHNxTtnn7gcXnJu881g&s",
      description: "Designed for quick installation into metal without the need for pre-drilling.",
      categories: ["Self-drilling", "Steel", "Construction"],
      price: "$9.99"
    },
    {
      id: "expansion-bolt",
      name: "Expansion Bolt",
      image: "https://m.media-amazon.com/images/I/61zSRGzp+BL._AC_UF1000,1000_QL80_.jpg",
      description: "Used for heavy-duty anchoring in concrete and masonry, expands upon installation.",
      categories: ["Heavy-duty", "Concrete", "Industrial"],
      price: "$15.99"
    },
    {
      id: "wing-nut",
      name: "Wing Nut",
      image: "https://m.media-amazon.com/images/I/61HIGWRwMEL.jpg",
      description: "Allows for easy hand-tightening, perfect for applications requiring frequent adjustments.",
      categories: ["Wing", "Industrial", "Fastening"],
      price: "$3.99"
    }
  ];

  const specialtyFasteners = [
    {
      id: "washers",
      name: "Washers",
      image: "https://m.media-amazon.com/images/I/61d4W0NjzUL.jpg",
      description: "Used to distribute load and prevent damage to surfaces, available in flat, lock, and fender styles.",
      categories: ["Flat", "Lock", "Fender"],
      price: "$8.99",
      isNew: true
    },
    {
      id: "structural-assemblies",
      name: "Structural Assemblies",
      image: "https://www.allfasteners.com.au/pub/media/catalog/product/cache/edb9286c9d01d6f06c69c30d5c8dd932/6/d/6d.001_3_4.jpg",
      description: "Designed for heavy-duty applications, these assemblies include bolts, nuts, and washers for secure connections.",
      categories: ["Heavy-duty", "Industrial", "Construction"]
    },
    {
      id: "flange-nut",
      name: "Flange Nut",
      image: "https://m.media-amazon.com/images/I/61CUtIG3O8L.jpg",
      description: "Has a wide flange that distributes the load, often used in automotive and industrial applications.",
      categories: ["Flange", "Nut", "Heavy-duty"],
      price: "$4.99"
    },
    {
      id: "hex-nut",
      name: "Hex Nut",
      image: "https://m.media-amazon.com/images/I/71SvUQ9jKWL.jpg",
      description: "A standard hexagonal nut used in various industrial applications.",
      categories: ["Hex", "Industrial", "Nut"],
      price: "$1.99"
    },
    {
      id: "lifting-eye-bolt",
      name: "Lifting Eye Bolt",
      image: "https://m.media-amazon.com/images/I/61IPB3DLuUL.jpg",
      description: "Used for lifting heavy objects, these bolts provide a secure attachment point.",
      categories: ["Lifting", "Eye", "Heavy-duty"],
      price: "$13.99"
    },
    {
      id: "retaining-ring",
      name: "Retaining Ring",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0g4GBbszwoIVn3kUAJNSP1L7EjQ_USqbEeA&s",
      description: "Used in mechanical applications to retain components within a housing or on a shaft.",
      categories: ["Retaining", "Industrial", "Mechanical"],
      price: "$6.49"
    },
    {
      id: "hollow-bolt",
      name: "Hollow Bolt",
      image: "https://image.made-in-china.com/2f0j00lWwfsVJywecp/Stainless-Steel-Aluminium-Brass-Nylon-Hollow-Screws.jpg",
      description: "A bolt with a hollow center, used in applications where a shaft or rod needs to pass through.",
      categories: ["Hollow", "Industrial", "Bolts"],
      price: "$9.49"
    },
    {
      id: "e-clip",
      name: "E-Clip",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThfSCmRa2qEJWRwlA25-6AAItRNzl-3zWcwZLmqpknPPlvkwrlvRCGe3ZM5HJ_ofGJmTQ&usqp=CAU",
      description: "A type of retaining ring used to hold parts on shafts or in housings.",
      categories: ["E-Clip", "Retaining", "Mechanical"],
      price: "$2.79"
    }
  ];

  const marineFasteners = [
    {
      id: "stainless-steel",
      name: "Stainless Steel",
      image: "https://m.media-amazon.com/images/I/61nlYFCSOkL.jpg",
      description: "Corrosion-resistant fasteners suitable for marine and outdoor applications, available in various grades.",
      categories: ["Marine", "Corrosion-resistant", "Outdoor"],
      price: "$24.99"
    },
    {
      id: "petrochemical-studbolts",
      name: "Petrochemical Studbolts",
      image: "https://5.imimg.com/data5/SELLER/Default/2025/3/494482212/QK/GN/TQ/8047850/b7-stud-bolts-500x500.webp",
      description: "Specialized fasteners designed for high-temperature and high-pressure.",
      categories: ["High-temperature", "High-pressure", "Petrochemical"],
      isNew: true
    },
    {
      id: "marine-anchor-bolts",
      name: "Marine Anchor Bolts",
      image: "https://cdn.shopify.com/s/files/1/0269/0246/2519/collections/61v6FXGa3YL._SX342.jpg?v=1638613290",
      description: "Heavy-duty bolts used for securing anchors on ships, boats, and offshore platforms.",
      categories: ["Marine", "Heavy-duty", "Bolts"],
      price: "$35.99"
    },
    {
      id: "nylon-screws",
      name: "Nylon Screws",
      image: "https://m.media-amazon.com/images/I/5135VK3idvL.jpg",
      description: "Corrosion-resistant screws used for marine applications where metal corrosion is a concern.",
      categories: ["Nylon", "Marine", "Corrosion-resistant"],
      price: "$7.99"
    },
    {
      id: "marine-grade-fasteners",
      name: "Marine-Grade Fasteners",
      image: "https://princefastener.com/wp-content/uploads/2022/04/High-strength-bolt-fastener.jpg",
      description: "Designed specifically to resist corrosion from saltwater, these fasteners are ideal for marine environments.",
      categories: ["Marine", "Corrosion-resistant", "Outdoor"],
      price: "$19.99"
    },
    {
      id: "stainless-steel-hex-nut",
      name: "Stainless Steel Hex Nut",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW2C-Pk8h89ESP-wCIgeXD12UX6tWiuG2FJg&s",
      description: "A hex nut made from stainless steel, resistant to rust and corrosion, commonly used in marine environments.",
      categories: ["Marine", "Stainless Steel", "Nut"],
      price: "$5.49"
    },
    {
      id: "deck-screws",
      name: "Deck Screws",
      image: "https://cdn11.bigcommerce.com/s-hlsk6yq0/images/stencil/1280x1280/products/340676/1345561/item-square-flat-deck-type17-ss__65923.1595960908.jpg?c=2",
      description: "Screws designed for marine decking, resistant to rust and corrosion from saltwater exposure.",
      categories: ["Deck", "Screws", "Marine"],
      price: "$8.99"
    },
    {
      id: "marine-washers",
      name: "Marine Washers",
      image: "https://image.made-in-china.com/2f0j00OvbcYFuEnBqz/3-8-EPDM-Neoprene-316-Marine-Grade-Rubber-Bonded-Sealing-Washers.webp",
      description: "Marine-grade washers designed to prevent corrosion in high-moisture environments.",
      categories: ["Marine", "Washers", "Corrosion-resistant"],
      price: "$2.49"
    }
  ];

  const switchboards: Product[] = [
    {
      id: "distribution-board-12-way",
      name: "Distribution Board 12-Way",
      image: "https://cdn.moglix.com/p/LJQ1jN6NcFNt7-xxlarge.jpg",
      description: "12-way DB with MCB protection.",
      categories: ["Distribution", "Protection", "Commercial"],
      price: "$149.99",
      isNew: true
    },
    {
      id: "industrial-switchboard",
      name: "Industrial Switchboard",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ru5uHeu7wf0TTn73g5tl9zkpFd2tccqFmA&s",
      description: "Heavy-duty industrial switchboard.",
      categories: ["Industrial", "Heavy-duty", "Power"],
      price: "$399.99",
      isNew: false
    },
    {
      id: "smart-distribution-board",
      name: "Smart Distribution Board",
      image: "https://powereasy.in/assets/images/products/main/smart-db/single-phase/smart-db-single-phase.png",
      description: "IoT-enabled DB.",
      categories: ["Smart", "IoT", "Automation"],
      price: "$249.99",
      isNew: true
    },
    {
      id: "outdoor-waterproof-cabinet",
      name: "Outdoor Waterproof Cabinet",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTexWTeW6IeUBRN3QT6CWf5fypeoKS_FbI5kn2uv0BQLGIAX-EOUZ-pvJrQYHaNvfjFEfU&usqp=CAU",
      description: "Weather-resistant cabinet.",
      categories: ["Outdoor", "Waterproof", "Protection"],
      price: "$189.99",
      isNew: false
    },
    {
      id: "load-center-8-way",
      name: "Load Center 8-Way",
      image: "https://s.alicdn.com/@sc04/kf/HTB1rha7KkSWBuNjSszdq6zeSpXaT.jpg_720x720q50.jpg",
      description: "8-way load center for residential and commercial use.",
      categories: ["Residential", "Commercial", "Power"],
      price: "$129.99",
      isNew: true
    },
    {
      id: "heavy-duty-power-switchboard",
      name: "Heavy Duty Power Switchboard",
      image: "https://tiimg.tistatic.com/fp/1/007/875/rectangular-shape-plastic-electrical-switch-board-for-home-and-office--449.jpg",
      description: "For heavy industrial applications.",
      categories: ["Industrial", "Heavy-duty", "Power"],
      price: "$499.99",
      isNew: false
    },
    {
      id: "panelboard-24-way",
      name: "Panelboard 24-Way",
      image: "https://5.imimg.com/data5/SX/TN/FJ/SELLER-4015706/electric-distribution-board-500x500.jpg",
      description: "24-way panelboard for large-scale systems.",
      categories: ["Industrial", "Power", "Commercial"],
      price: "$559.99",
      isNew: true
    },
    {
      id: "compact-distribution-board",
      name: "Compact Distribution Board",
      image: "https://3.imimg.com/data3/EW/OH/MY-2693575/compact-distribution-board-500x500.jpg",
      description: "Compact distribution board for smaller installations.",
      categories: ["Residential", "Compact", "Energy"],
      price: "$99.99",
      isNew: false
    }
  ];

  const wires: Product[] = [
    {
      id: "copper-building-wire-100m",
      name: "Copper Building Wire (100m)",
      image: "https://image.made-in-china.com/202f0j00CicbyIUzgEkD/Weight-Copper-Cable-Cable-Electrical-Italy-100m-Power-Cable.jpg",
      description: "High-quality copper building wire.",
      categories: ["Copper", "Building", "Industrial"],
      price: "$79.99",
      isNew: true
    },
    {
      id: "armored-cable-50m",
      name: "Armored Cable (50m)",
      image: "https://m.media-amazon.com/images/I/51rofQXGpKL.jpg",
      description: "Steel wire armored cable.",
      categories: ["Armored", "Steel", "Industrial"],
      price: "$129.99",
      isNew: false
    },
    {
      id: "fire-resistant-cable-25m",
      name: "Fire Resistant Cable (25m)",
      image: "https://media.screwfix.com/is/image/ae235/339PF_P?$fxSharpen$=&wid=257&hei=257&dpr=on",
      description: "Fire-safe cabling.",
      categories: ["Fire Resistant", "Safety", "Building"],
      price: "$149.99",
      isNew: true
    },
    {
      id: "electrical-pvc-insulated-cable",
      name: "Electrical PVC Insulated Cable",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTftG1mNNmxE825d7ZuOfJfzKwHAxIyhs9eTQ&s",
      description: "PVC insulated cable for general wiring.",
      categories: ["PVC", "Insulated", "Building"],
      price: "$49.99",
      isNew: false
    },
    {
      id: "flexible-extension-cable-10m",
      name: "Flexible Extension Cable (10m)",
      image: "https://m.media-amazon.com/images/I/61+neQ3vAzL._AC_UF1000,1000_QL80_.jpg",
      description: "Flexible and durable extension cable.",
      categories: ["Flexible", "Extension", "Power"],
      price: "$19.99",
      isNew: false
    },
    {
      id: "multi-core-cable-100m",
      name: "Multi-Core Cable (100m)",
      image: "https://5.imimg.com/data5/CU/IK/JC/SELLER-3059229/electrical-wires-1-mm-4-core-500x500.jpg",
      description: "Multi-core cable for various applications.",
      categories: ["Multi-Core", "Industrial", "Power"],
      price: "$189.99",
      isNew: true
    },
    {
      id: "low-voltage-power-cable",
      name: "Low Voltage Power Cable",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTZTxgCL5Sq9nLsAaRxMK7vL356yLKswISNg&s",
      description: "Low voltage cable for power distribution.",
      categories: ["Low Voltage", "Power", "Building"],
      price: "$99.99",
      isNew: false
    }
  ];

  const accessories: Product[] = [
    {
      id: "modular-wall-switches",
      name: "Modular Wall Switches",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/10/352782418/GA/AJ/KV/90013704/black-modular-electrical-switch-boards.jpg",
      description: "Modern design modular switches.",
      categories: ["Modular", "Switches", "Residential"],
      price: "$12.99",
      isNew: false
    },
    {
      id: "industrial-sockets-set",
      name: "Industrial Sockets Set",
      image: "https://images-cdn.ubuy.co.in/661730a73ce78476ff438d8b-industrial-plug-socket-3-phase-plug-4.jpg",
      description: "Heavy-duty sockets.",
      categories: ["Industrial", "Sockets", "Power"],
      price: "$29.99",
      isNew: false
    },
    {
      id: "smart-wi-fi-power-outlets",
      name: "Smart Wi-Fi Power Outlets",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU35Bo-yaB3gHwjCyhRedXTNtdMEQpqT20UsQaC2vW9IOo2SALjufLk0Hvv4jgVkwyDKk&usqp=CAU",
      description: "Remote-controlled outlets.",
      categories: ["Smart", "Wi-Fi", "Automation"],
      price: "$34.99",
      isNew: true
    },
    {
      id: "ceiling-fan-regulator",
      name: "Ceiling Fan Regulator",
      image: "https://havells.com/media/catalog/product/cache/844a913d283fe95e56e39582c5f2767b/import/REO-Switches/AHERFXW001.jpg",
      description: "Regulate ceiling fan speed.",
      categories: ["Fan", "Regulator", "Residential"],
      price: "$18.99",
      isNew: false
    },
    {
      id: "power-strip-with-usb",
      name: "Power Strip with USB",
      image: "https://m.media-amazon.com/images/I/71FtSiqsK3L.jpg",
      description: "Power strip with multiple outlets and USB ports.",
      categories: ["Power", "USB", "Accessories"],
      price: "$25.99",
      isNew: true
    },
    {
      id: "smart-led-light-switch",
      name: "Smart LED Light Switch",
      image: "https://img.joomcdn.net/ddb08b986aa428e819f3e5f70791d46e5c0e9794_original.jpeg",
      description: "Smart LED light switch for modern homes.",
      categories: ["Smart", "LED", "Switches"],
      price: "$29.99",
      isNew: false
    },
    {
      id: "surge-protector-power-strip",
      name: "Surge Protector Power Strip",
      image: "https://honeywellconnection.com/in/wp-content/uploads/2024/08/1-2.jpg",
      description: "Surge protector power strip with 6 outlets.",
      categories: ["Surge Protector", "Power", "Safety"],
      price: "$19.99",
      isNew: false
    }
  ];

  const getProductDetails = () => {
    const pathCategory = location.pathname.includes('/fasteners/') ? 'fasteners' : 
                         location.pathname.includes('/electrical/') ? 'electrical' : '';
    console.log("Current path:", location.pathname);
    console.log("Determined category:", pathCategory);
    console.log("Looking for product ID:", id);
    
    if (pathCategory === 'fasteners') {
      const allProducts = [
        ...industrialFasteners,
        ...specialtyFasteners,
        ...marineFasteners
      ];
      return allProducts.find(product => product.id === id);
    } else if (pathCategory === 'electrical') {
      const allProducts = [
        ...switchboards,
        ...wires,
        ...accessories
      ];
      const found = allProducts.find(product => product.id === id);
      console.log("Found electrical product:", found);
      return found;
    }
    return null;
  };

  const product = getProductDetails();
  console.log("Final product:", product);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const allProducts = [
    ...industrialFasteners,
    ...specialtyFasteners,
    ...marineFasteners,
    ...switchboards,
    ...wires,
    ...accessories,
  ];
  const productMap = allProducts.reduce((map, prod) => {
    map[prod.id] = prod;
    return map;
  }, {} as Record<string, Product>);

  async function handleWishlistToggle() {
    if (!user || !product) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "You need to log in to manage your wishlist.",
      });
      return;
    }
    
    setWishlistLoading(true);
    try {
      if (isInWishlistState && wishlistId) {
        // Remove from wishlist
        const success = await removeFromWishlist(wishlistId);
        if (!success) throw new Error("Failed to remove from wishlist");
        
        setIsInWishlistState(false);
        setWishlistId(null);
        toast({ 
          title: "Wishlist", 
          description: "Removed from wishlist." 
        });
      } else {
        // Add to wishlist
        const newWishlistId = await addToWishlist(product.id);
        
        if (!newWishlistId) throw new Error("Failed to add to wishlist");
        
        setIsInWishlistState(true);
        setWishlistId(newWishlistId);
        toast({ 
          title: "Wishlist", 
          description: "Added to wishlist!" 
        });
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      toast({
        variant: "destructive",
        title: "Wishlist",
        description: "There was a problem updating your wishlist.",
      });
    }
    setWishlistLoading(false);
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative">
            {product.isNew && (
              <div className="absolute top-4 right-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                New
              </div>
            )}
            <Card>
              <CardContent className="p-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[400px] object-cover rounded-t-lg"
                />
              </CardContent>
            </Card>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-industry-900 mb-2">
              {product.name}
            </h1>
            <div className="flex flex-wrap gap-2 mb-2">
              {product.categories.map((category, index) => (
                <span
                  key={index}
                  className="bg-industry-100 text-industry-700 px-3 py-1 rounded-full text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
            <p className="text-2xl font-bold text-industry-900 mb-3">
              {product.price ?? "-"}
            </p>
            <p className="mb-4 text-muted-foreground">
              {product.description}
            </p>
            <div className="mb-5">
              <Button
                variant={isInWishlistState ? "secondary" : "outline"}
                onClick={handleWishlistToggle}
                className="w-full md:w-auto"
                disabled={wishlistLoading}
              >
                <Heart className={`mr-2 h-4 w-4 ${isInWishlistState ? "fill-current" : ""}`} />
                {wishlistLoading ? "Please wait..." : isInWishlistState ? "In Wishlist" : "Add to Wishlist"}
              </Button>
            </div>

            <Separator className="my-6" />

            <Tabs defaultValue="specifications" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="offers">Offers</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="additional">Additional Info</TabsTrigger>
              </TabsList>
              <TabsContent value="specifications">
                <Card>
                  <CardContent className="pt-6">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="specs">
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            Product Specifications
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {product.categories.map((cat, index) => (
                              <div
                                key={index}
                                className="flex justify-between py-2 border-b"
                              >
                                <span className="text-muted-foreground">
                                  {cat}
                                </span>
                                <span className="font-medium">✓</span>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="offers">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Percent className="h-5 w-5 text-secondary mt-1" />
                        <div>
                          <h4 className="font-medium">Bundle Discount</h4>
                          <p>
                            Bulk order discounts are available.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="about">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-secondary mt-1" />
                        <div>
                          <h4 className="font-medium">About</h4>
                          <p>
                            Product supplied by Shayam Venchers.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="additional">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Award className="h-5 w-5 text-secondary mt-1" />
                        <div>
                          <h4 className="font-medium">Additional Info</h4>
                          <p>
                            Quality tested & certified.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
