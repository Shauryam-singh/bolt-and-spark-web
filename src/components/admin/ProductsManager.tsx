
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/integrations/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, Trash, Search, Plus, MoreVertical } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  categories: string[];
  categoryType: string;
  isNew?: boolean;
}

const ProductsManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search term
    if (searchTerm) {
      const filtered = products.filter(
        product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.categories.some(cat => 
            cat.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productsList);
      setFilteredProducts(productsList);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load products. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        await deleteDoc(doc(db, 'products', id));
        setProducts(products.filter(product => product.id !== id));
        toast({
          title: "Product deleted",
          description: "The product has been successfully deleted.",
        });
      } catch (error) {
        console.error('Error deleting product:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete the product. Please try again.",
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-industry-900">Products</h2>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <Button onClick={() => navigate('/admin/products/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-industry-700"></div>
        </div>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No products found.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead className="hidden md:table-cell">Categories</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                            <Package size={20} className="text-gray-500" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.name}
                        {product.isNew && (
                          <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">New</Badge>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate">
                        {product.description}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {product.categories.slice(0, 2).map((category, i) => (
                            <Badge key={i} variant="outline" className="bg-gray-100">
                              {category}
                            </Badge>
                          ))}
                          {product.categories.length > 2 && (
                            <Badge variant="outline" className="bg-gray-100">
                              +{product.categories.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            product.categoryType === 'electrical'
                              ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                              : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                          }
                        >
                          {product.categoryType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/admin/products/edit/${product.id}`)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(product.id)} className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsManager;
