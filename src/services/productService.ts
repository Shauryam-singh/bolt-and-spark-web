
import { collection, getDocs, query, where, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/integrations/firebase';

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  categories: string[];
  categoryType: string;
  isNew?: boolean;
}

// Get all products from Firebase
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    return snapshot.docs.map(doc => ({ 
      id: doc.id,
      ...doc.data()
    } as Product));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get products by category type (fasteners or electrical)
export const getProductsByType = async (type: string): Promise<Product[]> => {
  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('categoryType', '==', type));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ 
      id: doc.id,
      ...doc.data()
    } as Product));
  } catch (error) {
    console.error(`Error fetching ${type} products:`, error);
    throw error;
  }
};

// Migrate fasteners and electrical data to Firebase
export const migrateProductsToFirebase = async (
  fastenersData: any[], 
  electricalData: any[]
) => {
  try {
    const productsRef = collection(db, 'products');
    
    // Upload fasteners data
    for (const fastener of fastenersData) {
      await addDoc(productsRef, {
        ...fastener,
        categoryType: 'fasteners',
        createdAt: serverTimestamp()
      });
    }
    
    // Upload electrical data
    for (const electrical of electricalData) {
      await addDoc(productsRef, {
        ...electrical,
        categoryType: 'electrical',
        createdAt: serverTimestamp()
      });
    }
    
    return true;
  } catch (error) {
    console.error('Error migrating products to Firebase:', error);
    throw error;
  }
};

// Helper for initial migration (to be called once)
export const initializeFirebaseData = async () => {
  try {
    // Check if products collection already has data
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    
    if (snapshot.docs.length > 0) {
      console.log('Firebase already has product data. Skipping migration.');
      return;
    }
    
    console.log('Starting data migration to Firebase...');
    
    // Get the data from the hardcoded arrays
    const fastenersProducts = [];
    const electricalProducts = [];
    
    // Create categories collection
    const categoriesRef = collection(db, 'categories');
    
    const fastenerCategories = new Set();
    const electricalCategories = new Set();
    
    // Extract unique categories
    fastenersProducts.forEach(product => {
      product.categories.forEach(category => {
        fastenerCategories.add(category);
      });
    });
    
    electricalProducts.forEach(product => {
      product.categories.forEach(category => {
        electricalCategories.add(category);
      });
    });
    
    // Add fastener categories
    for (const category of Array.from(fastenerCategories)) {
      await addDoc(categoriesRef, {
        name: category,
        type: 'fasteners',
        createdAt: serverTimestamp()
      });
    }
    
    // Add electrical categories
    for (const category of Array.from(electricalCategories)) {
      await addDoc(categoriesRef, {
        name: category,
        type: 'electrical',
        createdAt: serverTimestamp()
      });
    }
    
    // Migrate product data
    await migrateProductsToFirebase(fastenersProducts, electricalProducts);
    
    console.log('Data migration to Firebase completed successfully.');
  } catch (error) {
    console.error('Error initializing Firebase data:', error);
  }
};
