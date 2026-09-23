import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/productsApi";
import { ShoppingCart } from "lucide-react";

function ProductListPage({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("-created_at");

  // 1. New pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  // Reset to page 1 whenever search query or ordering changes
  useEffect(() => {
    setPage(1);
  }, [search, ordering]);

  // Fetch products whenever search, ordering, or page changes
  useEffect(() => {
    getProducts(search, ordering, page).then((data) => {
      // 2. Handle paginated response structure from Django
      setProducts(data.results);
      // 12 is your backend page_size
      setTotalPages(Math.ceil(data.count / 12));
    });
  }, [search, ordering, page]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Products
        </h1>

        <div className="flex gap-3 w-full md:w-auto">
          <input
            className="w-full md:w-64 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all"
            placeholder="Search products"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2
             focus:ring-indigo-500 outline-none
             bg-white font-medium text-gray-700 cursor-pointer"
            value={ordering}
            onChange={(event) => setOrdering(event.target.value)}
          >
            <option value="-created_at">Newest</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between w-full px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900">Shop</h1>

        <button
          className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2
        focus:ring-indigo-500 outline-none bg-white font-medium text-gray-700 cursor-pointer
         hover:bg-gray-50 flex items-center gap-2"
          onClick={() => navigate("/cart")}
        >
          <ShoppingCart className="w-4 h-4" /> Cart
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-2xl border border-gray-100
             shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 
             flex flex-col overflow-hidden"
          >
            {/* Image Container */}
            <div
              className="w-full h-56 bg-gray-50 flex items-center
             justify-center p-6 overflow-hidden relative"
            >
              {product.image ? (
                <img
                  className="max-h-full max-w-full object-contain 
                  group-hover:scale-105 transition-transform duration-300"
                  src={product.image}
                  alt={product.name}
                />
              ) : (
                <div
                  className="flex h-full w-full items-center
                 justify-center bg-gray-100 text-gray-400 
                 font-medium text-sm"
                >
                  No Image
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-5 flex flex-col flex-grow justify-between">
              <div>
                {product.category_name && (
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider inline-block">
                    {product.category_name}
                  </span>
                )}

                <h2 className="mt-2 text-base font-bold text-gray-800 group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {product.name}
                </h2>
              </div>

              {/* Price & Action Button */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 block font-medium">
                    Price
                  </span>
                  <span className="text-lg font-extrabold text-gray-900">
                    ৳{product.price}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs rounded-xl transition-all cursor-pointer"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    Details
                  </button>

                  <button
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Pagination UI Controls */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm transition-all"
        >
          Previous
        </button>

        <span className="text-sm font-semibold text-gray-700">
          Page {page} of {totalPages || 1}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages || totalPages === 0}
          className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm transition-all"
        >
          Next
        </button>
      </div>
    </main>
  );
}

export default ProductListPage;
