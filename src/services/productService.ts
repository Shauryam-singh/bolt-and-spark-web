
import { collection, getDocs, query, where, doc, addDoc, serverTimestamp, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '@/integrations/firebase';

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  categories: string[];
  categoryType: string;
  isNew?: boolean;
  price?: number;
  discountPrice?: number;
  stock?: number;
  specifications?: Record<string, string>;
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

// Get a single product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    console.log(`Attempting to fetch product with ID: ${id}`);
    
    // First, try to get the product by document ID
    const productRef = doc(db, 'products', id);
    const snapshot = await getDoc(productRef);
    
    if (snapshot.exists()) {
      console.log("Found product by document ID");
      return {
        id: snapshot.id,
        ...snapshot.data()
      } as Product;
    }
    
    // If not found by document ID, try to find by custom ID field
    console.log("Trying to find product by custom id field");
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      console.log("Found product by custom ID field");
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id, // Use Firestore document ID
        ...doc.data(),
      } as Product;
    }
    
    console.log("Product not found with ID:", id);
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Add a new product
export const addProduct = async (product: Omit<Product, 'id'>): Promise<string> => {
  try {
    const productsRef = collection(db, 'products');
    const docRef = await addDoc(productsRef, {
      ...product,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Update an existing product
export const updateProduct = async (id: string, product: Partial<Product>): Promise<void> => {
  try {
    const productRef = doc(db, 'products', id);
    await updateDoc(productRef, {
      ...product,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'products', id));
  } catch (error) {
    console.error('Error deleting product:', error);
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
      // Ensure each product has an ID field that matches what's used in the URL
      const productData = {
        ...fastener,
        categoryType: 'fasteners',
        createdAt: serverTimestamp()
      };
      
      await addDoc(productsRef, productData);
    }
    
    // Upload electrical data
    for (const electrical of electricalData) {
      // Ensure each product has an ID field that matches what's used in the URL
      const productData = {
        ...electrical,
        categoryType: 'electrical',
        createdAt: serverTimestamp()
      };
      
      await addDoc(productsRef, productData);
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
