
import React, { useState } from 'react';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '@/integrations/firebase';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Loader2, AlertTriangle, Check } from 'lucide-react';

const DataMigration = () => {
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationDone, setMigrationDone] = useState(false);
  const { toast } = useToast();
  
  // Get fasteners data from Fasteners.tsx
  const getFastenersData = () => {
    // Industrial fasteners
    const industrialFasteners = [
      {
        id: "socket-screws",
        name: "Socket Screws",
        image: "https://m.media-amazon.com/images/I/61VIHcLUrlL.jpg",
        description: "Designed for high-torque applications, available in various head styles and materials.",
        categories: ["Hex", "Allen", "Industrial"],
        isNew: true
      },
      {
        id: "durlok",
        name: "Durlok",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBPhNDhgro-YrCPzmUlvrS-xsLHkKzyl5Q5w&s",
        description: "A patented fastener system that provides a secure, vibration-resistant connection.",
        categories: ["Self-locking", "Anti-vibration", "Heavy-duty"]
      },
      // Additional fasteners from Fasteners.tsx
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
        isNew: true
      },
      {
        id: "carriage-bolt",
        name: "Carriage Bolt",
        image: "https://www.fas10.in/wp-content/uploads/2022/10/stainless-steel-carriage-bolt.webp",
        description: "Designed for wood and metal connections, features a square neck to prevent rotation.",
        categories: ["Carriage", "Heavy-duty", "Industrial"],
      },
      {
        id: "wood-screw",
        name: "Wood Screw",
        image: "https://5.imimg.com/data5/SELLER/Default/2023/1/MT/LZ/EW/24439648/ss-wood-screws.jpg",
        description: "Ideal for woodworking, these screws provide strong holding power in wood-based applications.",
        categories: ["Wood", "Screws", "Industrial"],
      }
    ];
    
    // Specialty fasteners
    const specialtyFasteners = [
      {
        id: "washers",
        name: "Washers",
        image: "https://m.media-amazon.com/images/I/61d4W0NjzUL.jpg",
        description: "Used to distribute load and prevent damage to surfaces, available in flat, lock, and fender styles.",
        categories: ["Flat", "Lock", "Fender"],
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
      }
    ];
    
    // Marine fasteners
    const marineFasteners = [
      {
        id: "stainless-steel",
        name: "Stainless Steel",
        image: "https://m.media-amazon.com/images/I/61nlYFCSOkL.jpg",
        description: "Corrosion-resistant fasteners suitable for marine and outdoor applications, available in various grades.",
        categories: ["Marine", "Corrosion-resistant", "Outdoor"],
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
      }
    ];
    
    return [...industrialFasteners, ...specialtyFasteners, ...marineFasteners];
  };
  
  // Get electrical data from Electrical.tsx
  const getElectricalData = () => {
    const switchboards = [
      {
        id: "distribution-board-12-way",
        name: "Distribution Board 12-Way",
        image: "https://cdn.moglix.com/p/LJQ1jN6NcFNt7-xxlarge.jpg",
        description: "12-way DB with MCB protection.",
        categories: ["Distribution", "Protection", "Commercial"],
        isNew: true
      },
      {
        id: "industrial-switchboard",
        name: "Industrial Switchboard",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ru5uHeu7wf0TTn73g5tl9zkpFd2tccqFmA&s",
        description: "Heavy-duty industrial switchboard.",
        categories: ["Industrial", "Heavy-duty", "Power"],
        isNew: false
      },
      {
        id: "smart-distribution-board",
        name: "Smart Distribution Board",
        image: "https://powereasy.in/assets/images/products/main/smart-db/single-phase/smart-db-single-phase.png",
        description: "IoT-enabled DB.",
        categories: ["Smart", "IoT", "Automation"],
        isNew: true
      },
      {
        id: "outdoor-waterproof-cabinet",
        name: "Outdoor Waterproof Cabinet",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTexWTeW6IeUBRN3QT6CWf5fypeoKS_FbI5kn2uv0BQLGIAX-EOUZ-pvJrQYHaNvfjFEfU&usqp=CAU",
        description: "Weather-resistant cabinet.",
        categories: ["Outdoor", "Waterproof", "Protection"],
        isNew: false
      }
    ];
  
    const wires = [
      {
        id: "copper-building-wire-100m",
        name: "Copper Building Wire (100m)",
        image: "https://image.made-in-china.com/202f0j00CicbyIUzgEkD/Weight-Copper-Cable-Cable-Electrical-Italy-100m-Power-Cable.jpg",
        description: "High-quality copper building wire.",
        categories: ["Copper", "Building", "Industrial"],
        isNew: true
      },
      {
        id: "armored-cable-50m",
        name: "Armored Cable (50m)",
        image: "https://m.media-amazon.com/images/I/51rofQXGpKL.jpg",
        description: "Steel wire armored cable.",
        categories: ["Armored", "Steel", "Industrial"],
        isNew: false
      },
      {
        id: "fire-resistant-cable-25m",
        name: "Fire Resistant Cable (25m)",
        image: "https://media.screwfix.com/is/image/ae235/339PF_P?$fxSharpen$=&wid=257&hei=257&dpr=on",
        description: "Fire-safe cabling.",
        categories: ["Fire Resistant", "Safety", "Building"],
        isNew: true
      },
      {
        id: "electrical-pvc-insulated-cable",
        name: "Electrical PVC Insulated Cable",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTftG1mNNmxE825d7ZuOfJfzKwHAxIyhs9eTQ&s",
        description: "PVC insulated cable for general wiring.",
        categories: ["PVC", "Insulated", "Building"],
        isNew: false
      }
    ];
  
    const accessories = [
      {
        id: "modular-wall-switches",
        name: "Modular Wall Switches",
        image: "https://5.imimg.com/data5/SELLER/Default/2023/10/352782418/GA/AJ/KV/90013704/black-modular-electrical-switch-boards.jpg",
        description: "Modern design modular switches.",
        categories: ["Modular", "Switches", "Residential"],
        isNew: false
      },
      {
        id: "industrial-sockets-set",
        name: "Industrial Sockets Set",
        image: "https://images-cdn.ubuy.co.in/661730a73ce78476ff438d8b-industrial-plug-socket-3-phase-plug-4.jpg",
        description: "Heavy-duty sockets.",
        categories: ["Industrial", "Sockets", "Power"],
        isNew: false
      },
      {
        id: "smart-wi-fi-power-outlets",
        name: "Smart Wi-Fi Power Outlets",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU35Bo-yaB3gHwjCyhRedXTNtdMEQpqT20UsQaC2vW9IOo2SALjufLk0Hvv4jgVkwyDKk&usqp=CAU",
        description: "Remote-controlled outlets.",
        categories: ["Smart", "Wi-Fi", "Automation"],
        isNew: true
      },
      {
        id: "ceiling-fan-regulator",
        name: "Ceiling Fan Regulator",
        image: "https://havells.com/media/catalog/product/cache/844a913d283fe95e56e39582c5f2767b/import/REO-Switches/AHERFXW001.jpg",
        description: "Regulate ceiling fan speed.",
        categories: ["Fan", "Regulator", "Residential"],
        isNew: false
      }
    ];
  
    return [...switchboards, ...wires, ...accessories];
  };
  
  const migrateData = async () => {
    try {
      setIsMigrating(true);
      
      // First check if data already exists
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      
      if (!productsSnapshot.empty) {
        toast({
          variant: "destructive",
          title: "Migration Error",
          description: "Data already exists in Firebase. Migration skipped to prevent duplication.",
        });
        setIsMigrating(false);
        return;
      }
      
      // Prepare the data
      const fastenersData = getFastenersData();
      const electricalData = getElectricalData();
      
      // Extract all unique categories
      const uniqueCategories = new Set<string>();
      const categoryTypes = new Map<string, string>();
      
      fastenersData.forEach(item => {
        item.categories.forEach(category => {
          uniqueCategories.add(category);
          categoryTypes.set(category, 'fasteners');
        });
      });
      
      electricalData.forEach(item => {
        item.categories.forEach(category => {
          uniqueCategories.add(category);
          categoryTypes.set(category, 'electrical');
        });
      });
      
      // Create categories first
      const categoriesCollection = collection(db, 'categories');
      for (const category of uniqueCategories) {
        await addDoc(categoriesCollection, {
          name: category,
          type: categoryTypes.get(category) || 'fasteners',
          createdAt: serverTimestamp()
        });
      }
      
      // Add fasteners data
      for (const product of fastenersData) {
        await addDoc(productsCollection, {
          ...product,
          categoryType: 'fasteners',
          createdAt: serverTimestamp()
        });
      }
      
      // Add electrical data
      for (const product of electricalData) {
        await addDoc(productsCollection, {
          ...product,
          categoryType: 'electrical',
          createdAt: serverTimestamp()
        });
      }
      
      toast({
        title: "Migration Complete",
        description: `Successfully migrated ${fastenersData.length + electricalData.length} products and ${uniqueCategories.size} categories to Firebase.`,
      });
      
      setMigrationDone(true);
    } catch (error) {
      console.error('Error migrating data to Firebase:', error);
      toast({
        variant: "destructive",
        title: "Migration Error",
        description: "Failed to migrate data to Firebase. See console for details.",
      });
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-industry-900">Data Migration</h2>
        <p className="text-gray-600 mt-2">Migrate product data from hardcoded arrays to Firebase database</p>
      </div>

      {!migrationDone ? (
        <>
          <Alert variant="warning" className="bg-amber-50 border-amber-200">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <AlertTitle className="text-amber-800">Warning</AlertTitle>
            <AlertDescription className="text-amber-700">
              This will migrate all product data to Firebase. This operation should only be performed once.
              If you have already migrated data, running this again may create duplicates.
            </AlertDescription>
          </Alert>

          <div className="flex justify-end">
            <Button onClick={migrateData} disabled={isMigrating}>
              {isMigrating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Migrating Data...
                </>
              ) : (
                "Start Migration"
              )}
            </Button>
          </div>
        </>
      ) : (
        <Alert variant="default" className="bg-green-50 border-green-200">
          <Check className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-800">Success</AlertTitle>
          <AlertDescription className="text-green-700">
            Data has been successfully migrated to Firebase. You can now manage your products and categories from the admin panel.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default DataMigration;
