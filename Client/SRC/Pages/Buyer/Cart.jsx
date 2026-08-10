import { useState } from "react";

function Cart() {
  const [cartItem, setCartItem] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : null;
  });

  if (!cartItem) {
    return (
      <div className="cart-page">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  const price = parseInt(
    cartItem.price.replace(/[^\d]/g, "")
  );

  const total = price * cartItem.quantity;

  const removeItem = () => {
    localStorage.removeItem("cart");
    setCartItem(null);
  };

  return (
    <div className="cart-page">

      <h1>Your Cart</h1>

      <div className="cart-item">

        <div>
          <h2>{cartItem.name}</h2>

          <p>{cartItem.price}</p>

          <p>
            Quantity: {cartItem.quantity}
          </p>

          <p>
            Total: ₹{total}
          </p>
        </div>

        <button onClick={removeItem}>
          Remove
        </button>

      </div>

      <button
  className="checkout-button"
  onClick={() => {
    window.location.href = "/checkout";
  }}
>
  Proceed to Checkout
</button>

    </div>
  );
}

export default Cart;