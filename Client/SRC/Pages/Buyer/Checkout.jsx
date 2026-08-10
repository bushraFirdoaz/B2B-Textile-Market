import { useState } from "react";

function Checkout() {
  const [shipping, setShipping] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const savedCart = localStorage.getItem("cart");
  const cartItem = savedCart ? JSON.parse(savedCart) : null;

  const handleChange = (e) => {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    window.location.href = "/order-confirmation";
  };

  if (!cartItem) {
    return (
      <div className="checkout-page">
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>

        <button
          onClick={() => {
            window.location.href = "/marketplace";
          }}
        >
          Go to Marketplace
        </button>
      </div>
    );
  }

  const price = parseInt(
    cartItem.price.replace(/[^\d]/g, "")
  );

  const total = price * cartItem.quantity;

  return (
    <div className="checkout-page">

      <h1>Checkout</h1>

      <div className="checkout-container">

        {/* Shipping Information */}

        <div className="shipping-section">

          <h2>Shipping Information</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={shipping.name}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={shipping.phone}
              onChange={handleChange}
              required
            />

            <textarea
              name="address"
              placeholder="Shipping Address"
              value={shipping.address}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={shipping.city}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={shipping.state}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={shipping.pincode}
              onChange={handleChange}
              required
            />

            {/* Place Order Button */}

            <button
              type="submit"
              className="place-order-button"
            >
              Place Order
            </button>

          </form>

        </div>

        {/* Order Summary */}

        <div className="order-summary">

          <h2>Order Summary</h2>

          <div className="summary-item">

            <h3>{cartItem.name}</h3>

            <p>
              Price: {cartItem.price}
            </p>

            <p>
              Quantity: {cartItem.quantity}
            </p>

          </div>

          <hr />

          <h2>
            Total: ₹{total}
          </h2>

        </div>

      </div>

    </div>
  );
}

export default Checkout;