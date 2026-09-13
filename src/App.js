import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((oldCart) => {
      const found = oldCart.find((item) => item.id === product.id);

      if (found) {
        return oldCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...oldCart, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart((oldCart) => oldCart.filter((item) => item.id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/products"
          element={<ProductListPage addToCart={addToCart} />}
        />
        <Route
          path="/products/:id"
          element={<ProductDetailPage addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          }
        />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/products" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
