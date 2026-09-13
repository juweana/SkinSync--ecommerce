import { useState } from "react";
import { createOrder } from "../api/ordersApi";

function CartPage({ cart, removeFromCart, clearCart }) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  async function handleCheckout(event) {
    event.preventDefault();

    const orderData = {
      customer_name: customerName,
      phone: phone,
      items: cart.map((item) => ({
        product: item.id,
        quantity: item.quantity,
      })),
    };

    await createOrder(orderData);
    clearCart();
    setCustomerName("");
    setPhone("");
    setMessage("Order placed successfully.");
  }

  return (
    <main className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Cart</h1>

      {cart.map((item) => (
        <div className="mb-2 border p-3" key={item.id}>
          <p className="font-bold">{item.name}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${item.price}</p>
          <button className="bg-red-600 p-2 text-white" onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <form className="mt-4 space-y-3" onSubmit={handleCheckout}>
        <input
          className="block border p-2"
          placeholder="Customer name"
          value={customerName}
          onChange={(event) => setCustomerName(event.target.value)}
          required
        />

        <input
          className="block border p-2"
          placeholder="Phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          required
        />

        <button className="bg-blue-600 p-2 text-white" type="submit">
          Place Order
        </button>
      </form>

      <p className="mt-3">{message}</p>
    </main>
  );
}

export default CartPage;