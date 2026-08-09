import { useEffect, useState } from "react";
import "./SupplierOrders.css";

function SupplierOrders() {
  // =========================================================
  // SAMPLE ORDERS
  // These are kept so the supplier page has demo orders.
  // =========================================================

  const sampleOrders = [
    {
      id: "1001",
      buyer: "ABC Textiles",
      product: "Premium Cotton Fabric",
      quantity: "100 kg",
      amount: "₹25,000",
      status: "Pending",
    },
    {
      id: "1002",
      buyer: "XYZ Fashion",
      product: "Heavy Denim Fabric",
      quantity: "150 kg",
      amount: "₹52,500",
      status: "Shipped",
    },
    {
      id: "1003",
      buyer: "Fashion Hub",
      product: "Premium Silk Fabric",
      quantity: "20 kg",
      amount: "₹17,000",
      status: "Delivered",
    },
    {
      id: "1004",
      buyer: "Style Works",
      product: "Natural Linen Fabric",
      quantity: "50 kg",
      amount: "₹21,000",
      status: "Processing",
    },
  ];

  // =========================================================
  // STATE
  // =========================================================

  const [orders, setOrders] = useState([]);

  // =========================================================
  // LOAD ORDERS
  // =========================================================

  useEffect(() => {
    loadOrders();
  }, []);

  // =========================================================
  // LOAD ORDERS FROM LOCAL STORAGE
  // =========================================================

  const loadOrders = () => {
    // Buyer inquiries
    const savedInquiries =
      JSON.parse(localStorage.getItem("buyerInquiries")) || [];

    // Saved order statuses
    const savedStatuses =
      JSON.parse(localStorage.getItem("orderStatuses")) || {};

    // =====================================================
    // CONVERT ACCEPTED BUYER INQUIRIES INTO ORDERS
    // =====================================================

    const inquiryOrders = savedInquiries
      .filter((inquiry) => {
        return (
          inquiry.status === "Accepted" ||
          inquiry.status === "accepted"
        );
      })
      .map((inquiry) => {
        const orderId =
          inquiry.orderId ||
          `TXM-${inquiry.id}`;

        return {
          id: orderId,

          inquiryId: inquiry.id,

          buyer:
            inquiry.companyName ||
            inquiry.buyerName ||
            "Buyer",

          buyerName:
            inquiry.buyerName ||
            "",

          companyName:
            inquiry.companyName ||
            "",

          product:
            inquiry.productName ||
            "Product",

          category:
            inquiry.category ||
            "",

          quantity:
            inquiry.quantity
              ? `${inquiry.quantity} kg`
              : "N/A",

          amount:
            inquiry.price && inquiry.quantity
              ? `₹${Number(inquiry.price) * Number(inquiry.quantity)}`
              : "Amount not available",

          price:
            inquiry.price ||
            "",

          message:
            inquiry.message ||
            "",

          status:
            savedStatuses[orderId] ||
            "Confirmed",

          source: "buyerInquiry",
        };
      });

    // =====================================================
    // APPLY SAVED STATUS TO SAMPLE ORDERS
    // =====================================================

    const updatedSampleOrders = sampleOrders.map((order) => ({
      ...order,

      status:
        savedStatuses[order.id] ||
        order.status,

      source: "sample",
    }));

    // =====================================================
    // COMBINE SAMPLE + REAL BUYER ORDERS
    // =====================================================

    const combinedOrders = [
      ...inquiryOrders,
      ...updatedSampleOrders,
    ];

    setOrders(combinedOrders);
  };

  // =========================================================
  // UPDATE ORDER STATUS
  // =========================================================

  const handleStatusChange = (orderId, newStatus) => {
    // Get existing statuses
    const savedStatuses =
      JSON.parse(localStorage.getItem("orderStatuses")) || {};

    // Update selected order
    const updatedStatuses = {
      ...savedStatuses,
      [orderId]: newStatus,
    };

    // Save to localStorage
    localStorage.setItem(
      "orderStatuses",
      JSON.stringify(updatedStatuses)
    );

    // Update UI immediately
    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
            }
          : order
      )
    );
  };

  // =========================================================
  // VIEW ORDER
  // =========================================================

  const handleViewOrder = (orderId) => {
    window.location.href =
      `/supplier/order/${orderId}`;
  };

  // =========================================================
  // STATUS CLASS
  // =========================================================

  const getStatusClass = (status) => {
    return status
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <div className="supplier-orders-page">

      {/* ==================================================
          PAGE HEADER
      ================================================== */}

      <div className="supplier-orders-header">

        <div>
          <h1>
            Supplier Orders
          </h1>

          <p>
            Manage buyer requests, orders and delivery status.
          </p>
        </div>

      </div>


      {/* ==================================================
          ORDER STATISTICS
      ================================================== */}

      <div className="order-stats">

        {/* TOTAL */}

        <div className="order-stat-card">

          <span>
            📦
          </span>

          <div>

            <p>
              Total Orders
            </p>

            <h2>
              {orders.length}
            </h2>

          </div>

        </div>


        {/* PENDING */}

        <div className="order-stat-card">

          <span>
            ⏳
          </span>

          <div>

            <p>
              Pending
            </p>

            <h2>
              {
                orders.filter(
                  (order) =>
                    order.status === "Pending"
                ).length
              }
            </h2>

          </div>

        </div>


        {/* CONFIRMED */}

        <div className="order-stat-card">

          <span>
            ✓
          </span>

          <div>

            <p>
              Confirmed
            </p>

            <h2>
              {
                orders.filter(
                  (order) =>
                    order.status === "Confirmed"
                ).length
              }
            </h2>

          </div>

        </div>


        {/* PROCESSING */}

        <div className="order-stat-card">

          <span>
            ⚙️
          </span>

          <div>

            <p>
              Processing
            </p>

            <h2>
              {
                orders.filter(
                  (order) =>
                    order.status === "Processing"
                ).length
              }
            </h2>

          </div>

        </div>


        {/* SHIPPED */}

        <div className="order-stat-card">

          <span>
            🚚
          </span>

          <div>

            <p>
              Shipped
            </p>

            <h2>
              {
                orders.filter(
                  (order) =>
                    order.status === "Shipped"
                ).length
              }
            </h2>

          </div>

        </div>


        {/* DELIVERED */}

        <div className="order-stat-card">

          <span>
            ✅
          </span>

          <div>

            <p>
              Delivered
            </p>

            <h2>
              {
                orders.filter(
                  (order) =>
                    order.status === "Delivered"
                ).length
              }
            </h2>

          </div>

        </div>

      </div>


      {/* ==================================================
          ORDERS SECTION
      ================================================== */}

      <div className="supplier-orders-section">

        <div className="section-header">

          <div>

            <h2>
              All Orders
            </h2>

            <p>
              View buyer orders and update delivery progress.
            </p>

          </div>

          <span>
            {orders.length} Orders
          </span>

        </div>


        {/* ==================================================
            EMPTY STATE
        ================================================== */}

        {orders.length === 0 ? (

          <div className="no-orders">

            <div className="no-orders-icon">
              📦
            </div>

            <h3>
              No Orders Yet
            </h3>

            <p>
              Accepted buyer requests will appear here.
            </p>

          </div>

        ) : (

          <div className="orders-table-wrapper">

            <table className="orders-table">

              <thead>

                <tr>

                  <th>
                    Order ID
                  </th>

                  <th>
                    Buyer
                  </th>

                  <th>
                    Product
                  </th>

                  <th>
                    Quantity
                  </th>

                  <th>
                    Amount
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Update Status
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {orders.map((order) => (

                  <tr
                    key={order.id}
                  >

                    {/* ORDER ID */}

                    <td>

                      <strong>
                        #{order.id}
                      </strong>

                    </td>


                    {/* BUYER */}

                    <td>

                      <div className="buyer-info">

                        <strong>
                          {order.buyer}
                        </strong>

                        {order.buyerName && (
                          <small>
                            {order.buyerName}
                          </small>
                        )}

                      </div>

                    </td>


                    {/* PRODUCT */}

                    <td>

                      <div>

                        <strong>
                          {order.product}
                        </strong>

                        {order.category && (
                          <small>
                            {order.category}
                          </small>
                        )}

                      </div>

                    </td>


                    {/* QUANTITY */}

                    <td>
                      {order.quantity}
                    </td>


                    {/* AMOUNT */}

                    <td>
                      {order.amount}
                    </td>


                    {/* CURRENT STATUS */}

                    <td>

                      <span
                        className={`order-status ${getStatusClass(
                          order.status
                        )}`}
                      >

                        {order.status}

                      </span>

                    </td>


                    {/* UPDATE STATUS */}

                    <td>

                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(
                            order.id,
                            e.target.value
                          )
                        }
                        className="order-status-select"
                      >

                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Confirmed">
                          Confirmed
                        </option>

                        <option value="Processing">
                          Processing
                        </option>

                        <option value="Shipped">
                          Shipped
                        </option>

                        <option value="Out for Delivery">
                          Out for Delivery
                        </option>

                        <option value="Delivered">
                          Delivered
                        </option>

                      </select>

                    </td>


                    {/* VIEW */}

                    <td>

                      <button
                        type="button"
                        className="view-order-btn"
                        onClick={() =>
                          handleViewOrder(order.id)
                        }
                      >
                        View
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default SupplierOrders;