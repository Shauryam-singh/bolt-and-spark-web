
import { db } from '@/integrations/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  addDoc,
  updateDoc,
  serverTimestamp,
  deleteDoc,
  Timestamp,
  QueryConstraint,
  startAfter,
  DocumentSnapshot
} from 'firebase/firestore';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryType: string;
  categories: string[];
  isNew?: boolean;
  createdAt?: any;
  specs?: Record<string, any>;
  featured?: boolean;
  stockQuantity?: number;
  sku?: string;
  minOrderQuantity?: number;
  discountPrice?: number;
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
}

export interface PaginatedProducts {
  products: Product[];
  lastDoc: DocumentSnapshot | null;
  hasMore: boolean;
}

// Helper function to resolve category IDs to names
export const resolveCategoryNames = async (categoryIds: string[]): Promise<string[]> => {
  try {
    if (!categoryIds || categoryIds.length === 0) return [];
    
    const categoryNames: string[] = [];
    
    for (const categoryId of categoryIds) {
      try {
        // Check if it's already a name (string without special characters)
        if (/^[a-zA-Z0-9\s-]+$/.test(categoryId)) {
          categoryNames.push(categoryId);
          continue;
        }
        
        const categoryDoc = await getDoc(doc(db, 'categories', categoryId));
        if (categoryDoc.exists()) {
          const categoryData = categoryDoc.data();
          categoryNames.push(categoryData.name || categoryId);
        } else {
          categoryNames.push(categoryId);
        }
      } catch (err) {
        console.error(`Error resolving category ${categoryId}:`, err);
        categoryNames.push(categoryId);
      }
    }
    
    return categoryNames;
  } catch (error) {
    console.error('Error in resolveCategoryNames:', error);
    return categoryIds;
  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const productsSnapshot = await getDocs(collection(db, 'products'));
    
    const productsPromises = productsSnapshot.docs.map(async (doc) => {
      const data = doc.data();
      
      // Resolve category names
      const categoryNames = await resolveCategoryNames(data.categories || []);
      
      return {
        id: doc.id,
        ...data as Omit<Product, 'id' | 'categories'>,
        categories: categoryNames
      } as Product;
    });
    
    const products = await Promise.all(productsPromises);
    return products;
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
};

export const getProductsByType = async (type: string): Promise<Product[]> => {
  try {
    const productsQuery = query(
      collection(db, 'products'),
      where('categoryType', '==', type)
    );
    
    const productsSnapshot = await getDocs(productsQuery);
    const productsPromises = productsSnapshot.docs.map(async (doc) => {
      const data = doc.data();
      
      // Resolve category names
      const categoryNames = await resolveCategoryNames(data.categories || []);
      
      return {
        id: doc.id,
        ...data as Omit<Product, 'id' | 'categories'>,
        categories: categoryNames
      } as Product;
    });
    
    const products = await Promise.all(productsPromises);
    return products;
  } catch (error) {
    console.error(`Error getting ${type} products:`, error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const productDoc = await getDoc(doc(db, 'products', id));
    
    if (!productDoc.exists()) {
      return null;
    }
    
    const data = productDoc.data();
    
    // Resolve category names
    const categoryNames = await resolveCategoryNames(data.categories || []);
    
    return {
      id: productDoc.id,
      ...data as Omit<Product, 'id' | 'categories'>,
      categories: categoryNames
    } as Product;
  } catch (error) {
    console.error('Error getting product:', error);
    return null;
  }
};

export const getFeaturedProducts = async (limit: number = 6): Promise<Product[]> => {
  try {
    const featuredQuery = query(
      collection(db, 'products'),
      where('featured', '==', true),
      orderBy('createdAt', 'desc'),
      limit
    );
    
    const productsSnapshot = await getDocs(featuredQuery);
    const productsPromises = productsSnapshot.docs.map(async (doc) => {
      const data = doc.data();
      
      // Resolve category names
      const categoryNames = await resolveCategoryNames(data.categories || []);
      
      return {
        id: doc.id,
        ...data as Omit<Product, 'id' | 'categories'>,
        categories: categoryNames
      } as Product;
    });
    
    const products = await Promise.all(productsPromises);
    return products;
  } catch (error) {
    console.error('Error getting featured products:', error);
    return [];
  }
};

export const getNewProducts = async (limitCount: number = 8): Promise<Product[]> => {
  try {
    const newProductsQuery = query(
      collection(db, 'products'),
      where('isNew', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const productsSnapshot = await getDocs(newProductsQuery);
    const productsPromises = productsSnapshot.docs.map(async (doc) => {
      const data = doc.data();
      
      // Resolve category names
      const categoryNames = await resolveCategoryNames(data.categories || []);
      
      return {
        id: doc.id,
        ...data as Omit<Product, 'id' | 'categories'>,
        categories: categoryNames
      } as Product;
    });
    
    const products = await Promise.all(productsPromises);
    return products;
  } catch (error) {
    console.error('Error getting new products:', error);
    return [];
  }
};

export const getFilteredProducts = async (
  type: string | null = null,
  categoryIds: string[] = [],
  searchTerm: string = '',
  sortBy: string = 'createdAt',
  sortOrder: 'asc' | 'desc' = 'desc',
  limitCount: number = 20,
  lastDoc: DocumentSnapshot | null = null
): Promise<PaginatedProducts> => {
  try {
    const constraints: QueryConstraint[] = [];
    
    // Filter by type if provided
    if (type) {
      constraints.push(where('categoryType', '==', type));
    }
    
    // Filter by categories if provided
    if (categoryIds.length > 0) {
      // Firebase doesn't support multiple array-contains clauses
      // We'll use array-contains-any for multiple categories
      constraints.push(where('categories', 'array-contains-any', categoryIds));
    }
    
    // Add sorting
    constraints.push(orderBy(sortBy, sortOrder));
    
    // If we have a lastDoc (for pagination), start after it
    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }
    
    // Add limit
    constraints.push(limit(limitCount + 1)); // +1 to check if there are more results
    
    // Create the query
    const productsQuery = query(collection(db, 'products'), ...constraints);
    
    // Get the results
    const productsSnapshot = await getDocs(productsQuery);
    
    // Check if we have more results than the limit
    const hasMore = productsSnapshot.docs.length > limitCount;
    
    // Get the documents up to the limit
    const docs = hasMore 
      ? productsSnapshot.docs.slice(0, limitCount) 
      : productsSnapshot.docs;
    
    // Get the last document for pagination
    const newLastDoc = docs.length > 0 ? docs[docs.length - 1] : null;
    
    // Process the documents
    let products = await Promise.all(docs.map(async (doc) => {
      const data = doc.data();
      
      // Resolve category names
      const categoryNames = await resolveCategoryNames(data.categories || []);
      
      return {
        id: doc.id,
        ...data as Omit<Product, 'id' | 'categories'>,
        categories: categoryNames
      } as Product;
    }));
    
    // Filter by search term if provided (client-side filtering)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      products = products.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.categories.some(category => 
          category.toLowerCase().includes(searchLower)
        )
      );
    }
    
    return {
      products,
      lastDoc: newLastDoc,
      hasMore
    };
  } catch (error) {
    console.error('Error getting filtered products:', error);
    return {
      products: [],
      lastDoc: null,
      hasMore: false
    };
  }
};

export const createProduct = async (productData: Omit<Product, 'id'>): Promise<string> => {
  try {
    const productWithTimestamp = {
      ...productData,
      createdAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'products'), productWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id: string, productData: Partial<Product>): Promise<void> => {
  try {
    // Remove id if it exists in the update data
    const { id: _, ...updateData } = productData;
    
    await updateDoc(doc(db, 'products', id), updateData);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'products', id));
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Analytics helper functions
export const getProductStats = async () => {
  try {
    const productsSnapshot = await getDocs(collection(db, 'products'));
    
    let totalProducts = 0;
    let fasteners = 0;
    let electrical = 0;
    let newProducts = 0;
    let featuredProducts = 0;
    
    productsSnapshot.forEach(doc => {
      totalProducts++;
      const data = doc.data();
      
      if (data.categoryType === 'fasteners') fasteners++;
      if (data.categoryType === 'electrical') electrical++;
      if (data.isNew) newProducts++;
      if (data.featured) featuredProducts++;
    });
    
    return {
      totalProducts,
      fasteners,
      electrical,
      newProducts,
      featuredProducts
    };
  } catch (error) {
    console.error('Error getting product stats:', error);
    return {
      totalProducts: 0,
      fasteners: 0,
      electrical: 0,
      newProducts: 0,
      featuredProducts: 0
    };
  }
};

export const getInventoryValue = async () => {
  try {
    const productsSnapshot = await getDocs(collection(db, 'products'));
    
    let totalValue = 0;
    let fastenersValue = 0;
    let electricalValue = 0;
    
    productsSnapshot.forEach(doc => {
      const data = doc.data();
      const price = data.price || 0;
      const quantity = data.stockQuantity || 0;
      const itemValue = price * quantity;
      
      totalValue += itemValue;
      
      if (data.categoryType === 'fasteners') fastenersValue += itemValue;
      if (data.categoryType === 'electrical') electricalValue += itemValue;
    });
    
    return {
      totalValue,
      fastenersValue,
      electricalValue
    };
  } catch (error) {
    console.error('Error calculating inventory value:', error);
    return {
      totalValue: 0,
      fastenersValue: 0,
      electricalValue: 0
    };
  }
};

// Get sales analytics data (mocked for now)
export const getSalesAnalytics = async () => {
  // In a real app, this would retrieve data from a sales collection
  // For now, return mock data
  return {
    monthly: [
      { month: 'Jan', sales: 12000 },
      { month: 'Feb', sales: 18000 },
      { month: 'Mar', sales: 15000 },
      { month: 'Apr', sales: 21000 },
      { month: 'May', sales: 16000 },
      { month: 'Jun', sales: 19000 },
      { month: 'Jul', sales: 22000 },
      { month: 'Aug', sales: 25000 },
      { month: 'Sep', sales: 20000 },
      { month: 'Oct', sales: 23000 },
      { month: 'Nov', sales: 28000 },
      { month: 'Dec', sales: 30000 }
    ],
    categoryBreakdown: [
      { name: 'Fasteners', value: 65 },
      { name: 'Electrical', value: 35 }
    ],
    topProducts: [
      { name: 'Socket Head Cap Screws', sales: 1200 },
      { name: 'Hex Bolts', sales: 980 },
      { name: 'Wire Connectors', sales: 850 },
      { name: 'Circuit Breakers', sales: 720 },
      { name: 'Nylon Lock Nuts', sales: 650 }
    ]
  };
};
