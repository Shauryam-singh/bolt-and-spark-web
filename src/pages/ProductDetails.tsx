
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Define the product arrays
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

  const switchboards = [
    {
      id: "switchboard1",
      name: "Switchboard 1",
      image: "https://example.com/switchboard1.jpg",
      description: "Description of switchboard 1",
      categories: ["Switchboard", "Electrical"],
      price: "$100.00"
    },
    {
      id: "switchboard2",
      name: "Switchboard 2",
      image: "https://example.com/switchboard2.jpg",
      description: "Description of switchboard 2",
      categories: ["Switchboard", "Electrical"],
      price: "$150.00"
    }
  ];

  const wires = [
    {
      id: "wire1",
      name: "Wire 1",
      image: "https://example.com/wire1.jpg",
      description: "Description of wire 1",
      categories: ["Wire", "Electrical"],
      price: "$5.00"
    },
    {
      id: "wire2",
      name: "Wire 2",
      image: "https://example.com/wire2.jpg",
      description: "Description of wire 2",
      categories: ["Wire", "Electrical"],
      price: "$10.00"
    }
  ];

  const accessories = [
    {
      id: "accessory1",
      name: "Accessory 1",
      image: "https://example.com/accessory1.jpg",
      description: "Description of accessory 1",
      categories: ["Accessory", "Electrical"],
      price: "$20.00"
    },
    {
      id: "accessory2",
      name: "Accessory 2",
      image: "https://example.com/accessory2.jpg",
      description: "Description of accessory 2",
      categories: ["Accessory", "Electrical"],
      price: "$30.00"
    }
  ];

  const getProductDetails = () => {
    const { category } = useParams();
    
    if (category === 'fasteners') {
      const allProducts = [
        ...industrialFasteners,
        ...specialtyFasteners,
        ...marineFasteners
      ];
      return allProducts.find(product => product.id === id);
    } else if (category === 'electrical') {
      const allProducts = [
        ...switchboards.map(p => ({ ...p, id: p.name.toLowerCase().replace(/\s+/g, '-'), isNew: p.isNew || false })),
        ...wires.map(p => ({ ...p, id: p.name.toLowerCase().replace(/\s+/g, '-'), isNew: p.isNew || false })),
        ...accessories.map(p => ({ ...p, id: p.name.toLowerCase().replace(/\s+/g, '-'), isNew: p.isNew || false }))
      ];
      return allProducts.find(product => product.id === id);
    }
    return null;
  };

  const product = getProductDetails();

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            <h1 className="text-3xl font-bold text-industry-900 mb-4">{product.name}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {product.categories.map((category, index) => (
                <span 
                  key={index} 
                  className="bg-industry-100 text-industry-700 px-3 py-1 rounded-full text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
            <p className="text-xl font-bold text-industry-900 mb-4">{product.price}</p>
            <p className="text-industry-600 mb-8">{product.description}</p>
            
            <Button className="w-full md:w-auto">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
