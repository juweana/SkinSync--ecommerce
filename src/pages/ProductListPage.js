import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/productsApi";
import { ShoppingCart } from "lucide-react";

function ProductListPage({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("-created_at");
  const navigate = useNavigate();

  useEffect(() => {
    getProducts(search, ordering).then((data) => setProducts(data));
  }, [search, ordering]);

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
        {/* Left side title or logo */}
        <h1 className="text-xl font-bold text-gray-900">Shop</h1>

        {/* Cart button pushed to top right */}
        <button
          className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2
        focus:ring-indigo-500 outline-none bg-white font-medium text-gray-700 cursor-pointer
         hover:bg-gray-50"
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
            {/* Image Container with Fixed Object Fit */}
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
            <div
              className="p-5 flex flex-col
             flex-grow justify-between"
            >
              <div>
                {/* Category Badge */}
                {product.category_name && (
                  <span
                    className="text-xs font-semibold
                   text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full 
                   uppercase tracking-wider inline-block"
                  >
                    {product.category_name}
                  </span>
                )}

                {/* Title */}
                <h2
                  className="mt-2 text-base font-bold text-gray-800
                 group-hover:text-indigo-600 transition-colors 
                 line-clamp-2"
                >
                  {product.name}
                </h2>
              </div>

              {/* Price & Action Button */}
              <div
                className="mt-5 pt-4 border-t
               border-gray-100 flex items-center 
               justify-between"
              >
                <div>
                  <span
                    className="text-xs
                   text-gray-400 block font-medium"
                  >
                    Price
                  </span>
                  <span className="text-lg font-extrabold text-gray-900">
                    ৳{product.price}
                  </span>
                </div>

                <button
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700
                   active:scale-95 text-white font-semibold text-sm rounded-xl shadow-md
                    hover:shadow-indigo-200 transition-all cursor-pointer"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  View Details
                </button>

                <button
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700
                   active:scale-95 text-white font-semibold text-sm rounded-xl shadow-md
                    hover:shadow-indigo-200 transition-all cursor-pointer"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  {" "}
                  Add To Cart{" "}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ProductListPage;
