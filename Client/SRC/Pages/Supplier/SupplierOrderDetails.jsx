import { useParams } from "react-router-dom";
import { useState } from "react";
import "./SupplierOrderDetails.css";

function SupplierOrderDetails() {

  const { id } = useParams();

  const orders = [
    {
      id: "1001",
      buyer: "ABC Textiles",
      email: "abc.textiles@gmail.com",
      product: "Premium Cotton Fabric",
      material: "100% Cotton",
      quantity: "100 kg",
      price: "₹250 / kg",
      amount: "₹25,000",
      address: "Hyderabad, Telangana",
      status: "Pending",
    },
    {
      id: "1002",
      buyer: "XYZ Fashion",
      email: "xyz.fashion@gmail.com",
      product: "Heavy Denim Fabric",
      material: "Cotton Denim",
      quantity: "150 kg",
      price: "₹350 / kg",
      amount: "₹52,500",
      address: "Bangalore, Karnataka",
      status: "Shipped",
    },
    {
      id: "1003",
      buyer: "Fashion Hub",
      email: "fashionhub@gmail.com",
      product: "Premium Silk Fabric",
      material: "Pure Silk",
      quantity: "20 kg",
      price: "₹850 / kg",
      amount: "₹17,000",
      address: "Mumbai, Maharashtra",
      status: "Delivered",
    },
    {
      id: "1004",
      buyer: "Style Works",
      email: "styleworks@gmail.com",
      product: "Natural Linen Fabric",
      material: "100% Linen",
      quantity: "50 kg",
      price: "₹420 / kg",
      amount: "₹21,000",
      address: "Chennai, Tamil Nadu",
      status: "Processing",
    },
  ];

  const order = orders.find(
    (item) => item.id === id
  );

  /* ==============================
     SAVED ORDER STATUS
  ============================== */

  const savedStatuses =
    JSON.parse(
      localStorage.getItem("orderStatuses")
    ) || {};

  const [status, setStatus] = useState(
    order
      ? savedStatuses[order.id] || order.status
      : "Pending"
  );

  /* ==============================
     SAVED SHIPPING INFORMATION
  ============================== */

  const savedShippingInfo =
    JSON.parse(
      localStorage.getItem("shippingInfo")
    ) || {};

  const existingShipping =
    savedShippingInfo[order?.id] || {};

  const [trackingId, setTrackingId] = useState(
    existingShipping.trackingId || ""
  );

  const [expectedDelivery, setExpectedDelivery] =
    useState(
      existingShipping.expectedDelivery || ""
    );

  /* ==============================
     ORDER NOT FOUND
  ============================== */

  if (!order) {

    return (
      <div className="order-not-found">

        <h2>
          Order Not Found
        </h2>

        <p>
          The order you are looking for does not exist.
        </p>

        <button
          onClick={() =>
            window.location.href =
              "/supplier/orders"
          }
        >
          Back to Orders
        </button>

      </div>
    );

  }

  /* ==============================
     UPDATE STATUS
  ============================== */

  const updateStatus = () => {

    const currentStatuses =
      JSON.parse(
        localStorage.getItem("orderStatuses")
      ) || {};

    currentStatuses[order.id] = status;

    localStorage.setItem(
      "orderStatuses",
      JSON.stringify(currentStatuses)
    );

    window.dispatchEvent(
      new Event("orderStatusUpdated")
    );

    alert(
      "Order status updated successfully!"
    );

  };

  /* ==============================
     UPDATE SHIPPING INFORMATION
  ============================== */

  const updateShippingInfo = () => {

    const currentShippingInfo =
      JSON.parse(
        localStorage.getItem("shippingInfo")
      ) || {};

    currentShippingInfo[order.id] = {
      trackingId: trackingId,
      expectedDelivery: expectedDelivery,
    };

    localStorage.setItem(
      "shippingInfo",
      JSON.stringify(currentShippingInfo)
    );

    window.dispatchEvent(
      new Event("orderShippingInfoUpdated")
    );

    alert(
      "Shipping information updated successfully!"
    );

  };

  return (

    <div className="supplier-order-details">

      {/* ==============================
          BACK BUTTON
      ============================== */}

      <button
        className="back-orders-btn"
        onClick={() =>
          window.location.href =
            "/supplier/orders"
        }
      >
        ← Back to Orders
      </button>


      {/* ==============================
          PAGE HEADER
      ============================== */}

      <div className="order-details-header">

        <div>

          <p className="order-label">
            ORDER DETAILS
          </p>

          <h1>
            Order #{order.id}
          </h1>

          <p>
            Review and manage this customer order.
          </p>

        </div>

        <span
          className={`order-status-large ${status.toLowerCase()}`}
        >
          {status}
        </span>

      </div>


      {/* ==============================
          MAIN INFORMATION
      ============================== */}

      <div className="order-details-grid">

        {/* BUYER INFORMATION */}

        <div className="order-detail-card">

          <h2>
            Buyer Information
          </h2>

          <div className="detail-row">

            <span>
              Buyer
            </span>

            <strong>
              {order.buyer}
            </strong>

          </div>

          <div className="detail-row">

            <span>
              Email
            </span>

            <strong>
              {order.email}
            </strong>

          </div>

          <div className="detail-row">

            <span>
              Delivery Address
            </span>

            <strong>
              {order.address}
            </strong>

          </div>

        </div>


        {/* PRODUCT INFORMATION */}

        <div className="order-detail-card">

          <h2>
            Product Information
          </h2>

          <div className="detail-row">

            <span>
              Product
            </span>

            <strong>
              {order.product}
            </strong>

          </div>

          <div className="detail-row">

            <span>
              Material
            </span>

            <strong>
              {order.material}
            </strong>

          </div>

          <div className="detail-row">

            <span>
              Quantity
            </span>

            <strong>
              {order.quantity}
            </strong>

          </div>

          <div className="detail-row">

            <span>
              Price
            </span>

            <strong>
              {order.price}
            </strong>

          </div>

        </div>

      </div>


      {/* ==============================
          ORDER SUMMARY
      ============================== */}

      <div className="order-summary-card">

        <h2>
          Order Summary
        </h2>

        <div className="summary-row">

          <span>
            Product
          </span>

          <strong>
            {order.product}
          </strong>

        </div>

        <div className="summary-row">

          <span>
            Quantity
          </span>

          <strong>
            {order.quantity}
          </strong>

        </div>

        <div className="summary-row total-row">

          <span>
            Total Amount
          </span>

          <strong>
            {order.amount}
          </strong>

        </div>

      </div>


      {/* ==============================
          SHIPPING INFORMATION
      ============================== */}

      <div className="shipping-update-card">

        <h2>
          Shipping Information
        </h2>

        <p className="shipping-description">
          Enter the shipping details that should
          be visible to the buyer.
        </p>


        {/* TRACKING ID */}

        <div className="shipping-input-group">

          <label>
            Tracking ID
          </label>

          <input
            type="text"
            placeholder="Enter tracking ID"
            value={trackingId}
            onChange={(e) =>
              setTrackingId(e.target.value)
            }
          />

        </div>


        {/* EXPECTED DELIVERY */}

        <div className="shipping-input-group">

          <label>
            Expected Delivery Date
          </label>

          <input
            type="date"
            value={expectedDelivery}
            onChange={(e) =>
              setExpectedDelivery(e.target.value)
            }
          />

        </div>


        {/* SAVE SHIPPING */}

        <button
          className="update-shipping-btn"
          onClick={updateShippingInfo}
        >
          Save Shipping Information
        </button>

      </div>


      {/* ==============================
          ORDER STATUS
      ============================== */}

      <div className="order-actions">

        <button
          className="back-btn"
          onClick={() =>
            window.location.href =
              "/supplier/orders"
          }
        >
          Back to Orders
        </button>


        <select
          className="order-status-select"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >

          <option value="Pending">
            Pending
          </option>

          <option value="Processing">
            Processing
          </option>

          <option value="Shipped">
            Shipped
          </option>

          <option value="Delivered">
            Delivered
          </option>

        </select>


        <button
          className="update-status-btn"
          onClick={updateStatus}
        >
          Update Status
        </button>

      </div>

    </div>

  );

}

export default SupplierOrderDetails;