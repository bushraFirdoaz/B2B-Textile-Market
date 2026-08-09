function OrderConfirmation() {
  return (
    <div className="confirmation-page">

      <div className="confirmation-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>Order Placed Successfully!</h1>

        <p>
          Thank you for your order. Your request has been
          successfully submitted to the supplier.
        </p>

        <div className="order-number">
          Order ID: #TXM2026001
        </div>

        <p>
          You can track your order status from your Buyer Dashboard.
        </p>

        <button
          onClick={() => {
            window.location.href = "/marketplace";
          }}
        >
          Continue Shopping
        </button>

      </div>

    </div>
  );
}

export default OrderConfirmation;