import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import AuthAdmin from '../Auth/AuthAdmin';
// import { useRouter } from 'next/navigation';
const GetProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
//  const router = useRouter();
//   const [authorized, setAuthorized] = useState(false);
  useEffect(() => {
    // try {
    //       const decoded = jwt.decode(token);
    //       if (!decoded?.isAdmin) {
    //         router.push('/'); // Redirect non-admins
    //       } else {
    //         setAuthorized(true); // Admin access granted
    //       }
    //     } catch (err) {
    //       router.push('/login');
    //     }
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/getproducts');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
//  if (!authorized) return null;
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>All Products | My Store</title>
        <meta name="description" content="Browse all our amazing products" />
      </Head>

      <div className="container mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>
        
        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <Link 
                  href={`/product/${product.slug}`}
                  className="block"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={product.img} 
                      alt={product.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                      {product.availableQty > 0 ? (
                        <span className="text-green-600 text-sm">In Stock</span>
                      ) : (
                        <span className="text-red-600 text-sm">Out of Stock</span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products available.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default AuthAdmin(GetProduct);