
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/integrations/firebase';

// Function to get all products from Firebase
export const getAllProducts = async () => {
  try {
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    
    const productMap: Record<string, any> = {};
    
    snapshot.docs.forEach(doc => {
      const productData = doc.data();
      if (productData && productData.id) {
        productMap[productData.id] = {
          ...productData,
          firebaseId: doc.id // Store the Firebase document ID
        };
      }
    });
    
    return productMap;
  } catch (error) {
    console.error('Error fetching products:', error);
    return {};
  }
};

// Export an empty object as default for initial loading
export default {};
