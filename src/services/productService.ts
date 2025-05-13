
import { collection, getDocs, query, where, doc, addDoc, serverTimestamp, updateDoc, deleteDoc, getDoc, orderBy, limit, startAfter, Timestamp, DocumentData } from 'firebase/firestore';
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
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Get all products from Firebase with pagination
export const getAllProducts = async (limitCount: number = 100): Promise<Product[]> => {
  try {
    console.log('Fetching all products...');
    const productsRef = collection(db, 'products');
    const q = query(
      productsRef,
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ 
      id: doc.id,
      ...doc.data()
    } as Product));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get products with pagination
export const getPaginatedProducts = async (
  lastDoc: DocumentData | null = null,
  pageSize: number = 20,
  categoryType: string | null = null
): Promise<{ products: Product[], lastDoc: DocumentData | null }> => {
  try {
    console.log(`Fetching paginated products...`);
    let q;
    
    if (categoryType) {
      // Type-specific query
      if (lastDoc) {
        q = query(
          collection(db, 'products'),
          where('categoryType', '==', categoryType),
          orderBy('createdAt', 'desc'),
          startAfter(lastDoc),
          limit(pageSize)
        );
      } else {
        q = query(
          collection(db, 'products'),
          where('categoryType', '==', categoryType),
          orderBy('createdAt', 'desc'),
          limit(pageSize)
        );
      }
    } else {
      // Query for all products
      if (lastDoc) {
        q = query(
          collection(db, 'products'),
          orderBy('createdAt', 'desc'),
          startAfter(lastDoc),
          limit(pageSize)
        );
      } else {
        q = query(
          collection(db, 'products'),
          orderBy('createdAt', 'desc'),
          limit(pageSize)
        );
      }
    }
    
    const snapshot = await getDocs(q);
    const products = snapshot.docs.map(doc => {
  const data = doc.data() as Omit<Product, 'id'>; // all Product fields except 'id'
  return {
    id: doc.id,
    ...data
  };
});
    
    const newLastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;
    
    return {
      products,
      lastDoc: newLastDoc
    };
  } catch (error) {
    console.error('Error fetching paginated products:', error);
    throw error;
  }
};

// Get products by category type (fasteners or electrical)
export const getProductsByType = async (type: string): Promise<Product[]> => {
  try {
    console.log(`Fetching ${type} products from Firebase...`);
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('categoryType', '==', type));
    const snapshot = await getDocs(q);
    const products = snapshot.docs.map(doc => ({ 
      id: doc.id,
      ...doc.data()
    } as Product));
    console.log(`Found ${products.length} ${type} products`);
    return products;
  } catch (error) {
    console.error(`Error fetching ${type} products:`, error);
    throw error;
  }
};

// Get category map to resolve category IDs to names
export const getCategoryMap = async (): Promise<Record<string, string>> => {
  try {
    const categoriesRef = collection(db, 'categories');
    const snapshot = await getDocs(categoriesRef);
    const categoryMap: Record<string, string> = {};
    
    snapshot.docs.forEach(doc => {
      categoryMap[doc.id] = doc.data().name;
    });
    
    return categoryMap;
  } catch (error) {
    console.error('Error fetching category map:', error);
    throw error;
  }
};

// Map product categories to names using the category map
export const mapProductCategories = (
  product: Product, 
  categoryMap: Record<string, string>
): Product => {
  const mappedCategories = product.categories.map(catId => 
    categoryMap[catId] || catId
  );
  
  return {
    ...product,
    categories: mappedCategories
  };
};

// Get filtered products with optional category and search constraints
export const getFilteredProducts = async (filters: {
  searchTerm?: string;
  categoryType?: string;
  categoryIds?: string[];
  sortBy?: string;
  limit?: number;
}): Promise<Product[]> => {
  try {
    console.log('Fetching filtered products with:', filters);
    let q = collection(db, 'products');
    let queryConstraints = [];
    
    // Apply type filter
    if (filters.categoryType && filters.categoryType !== 'all') {
      queryConstraints.push(where('categoryType', '==', filters.categoryType));
    }
    
    // Apply sorting
    switch (filters.sortBy) {
      case 'newest':
        queryConstraints.push(orderBy('createdAt', 'desc'));
        break;
      case 'name_asc':
        queryConstraints.push(orderBy('name', 'asc'));
        break;
      case 'name_desc':
        queryConstraints.push(orderBy('name', 'desc'));
        break;
      default:
        queryConstraints.push(orderBy('createdAt', 'desc'));
    }
    
    // Apply limit
    if (filters.limit) {
      queryConstraints.push(limit(filters.limit));
    }
    
    const productsQuery = query(q, ...queryConstraints);
    const snapshot = await getDocs(productsQuery);
    
    let products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product));
    
    // Since Firebase doesn't support OR queries easily, we'll do these filters in memory
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by category IDs
    if (filters.categoryIds && filters.categoryIds.length > 0) {
      products = products.filter(product =>
        filters.categoryIds?.some(catId => product.categories.includes(catId))
      );
    }
    
    return products;
  } catch (error) {
    console.error('Error fetching filtered products:', error);
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
      const productData = {
        id: snapshot.id,
        ...snapshot.data()
      } as Product;
      console.log("Product data:", productData);
      return productData;
    }
    
    // If not found by document ID, try to find by custom ID field
    console.log("Product not found by document ID. Trying to find by custom id field");
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      console.log("Found product by custom ID field");
      const docData = querySnapshot.docs[0];
      const productData = {
        id: docData.id, // Use Firestore document ID
        ...docData.data(),
      } as Product;
      console.log("Product data:", productData);
      return productData;
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

// Get new products (products marked with isNew flag)
export const getNewProducts = async (limitCount: number = 8): Promise<Product[]> => {
  try {
    const productsRef = collection(db, 'products');
    const q = query(
      productsRef, 
      where('isNew', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount) // now using limitCount, not conflicting
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data() as Omit<Product, 'id'>;
      return {
        id: doc.id,
        ...data
      };
    });
  } catch (error) {
    console.error('Error fetching new products:', error);
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
