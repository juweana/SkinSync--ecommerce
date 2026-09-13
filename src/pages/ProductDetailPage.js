import { useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { getProduct } from "../api/productsApi";

function ProductDetailPage({ addToCart }) {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProduct(id).then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <main className="p-4">
      <button className="mb-4 bg-gray-200 p-2" onClick={() => navigate("/products")}>
        Back To Products
      </button>

      <button
        className="mt-4 bg-green-600 p-2 text-white"
        onClick={() => addToCart(product)}
      >
        Add To Cart
      </button>

      <button
        className="ml-2 mt-4 bg-gray-700 p-2 text-white"
        onClick={() => navigate("/cart")}
      >
        Cart
      </button>

      {product.image ? (
        <img className="mb-4 h-72 w-full object-cover" src={product.image} alt={product.name} />
      ) : (
        <div className="mb-4 flex h-72 items-center justify-center bg-gray-200">No Image</div>
      )}

      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p>Category: {product.category_name}</p>
      <p>Price: ৳{product.price}</p>
      <p className="mt-3">{product.description}</p>
    </main>
  );
}

export default ProductDetailPage;