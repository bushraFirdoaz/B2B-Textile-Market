import { useEffect, useState } from "react";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  const statusSteps = [
    "Confirmed",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  /* =========================================================
     LOAD ORDERS
  ========================================================= */

  useEffect(() => {
    loadOrders();

    // Update page when supplier changes order status
    const handleUpdate = () => {
      loadOrders();
    };

    window.addEventListener(
      "orderStatusUpdated",
      handleUpdate
    );

    window.addEventListener(
      "storage",
      handleUpdate
    );

    return () => {
      window.removeEventListener(
        "orderStatusUpdated",
        handleUpdate
      );

      window.removeEventListener(
        "storage",
        handleUpdate
      );
    };
  }, []);


  /* =========================================================
     GET ORDERS FROM LOCAL STORAGE
  ========================================================= */

  const loadOrders = () => {

    const inquiries =
      JSON.parse(
        localStorage.getItem("buyerInquiries")
      ) || [];

    const savedStatuses =
      JSON.parse(
        localStorage.getItem("orderStatuses")
      ) || {};


    // Make sure buyerInquiries is an array
    const inquiryList = Array.isArray(inquiries)
      ? inquiries
      : [];


    /*
      Only accepted inquiries become orders
    */

    const acceptedOrders = inquiryList
      .filter(
        (inquiry) =>
          inquiry.status === "Accepted" ||
          inquiry.supplierResponse === "Accepted"
      )
      .map((inquiry) => {

        /*
          Use the same order ID everywhere
        */

        const orderId =
          inquiry.orderId ||
          `TXM-${inquiry.id}`;


        /*
          Get current status from supplier updates
        */

        const currentStatus =
          savedStatuses[orderId] ||
          savedStatuses[inquiry.id] ||
          inquiry.orderStatus ||
          "Confirmed";


        return {
          ...inquiry,

          orderId,

          currentStatus,
        };
      });


    setOrders(acceptedOrders);
  };


  /* =========================================================
     GET CURRENT STATUS INDEX
  ========================================================= */

  const getStatusIndex = (status) => {

    const index =
      statusSteps.indexOf(status);

    return index === -1
      ? 0
      : index;
  };


  /* =========================================================
     GET TRACKING STEP CLASS
  ========================================================= */

  const getStepClass = (
    stepIndex,
    currentStatus
  ) => {

    const currentIndex =
      getStatusIndex(currentStatus);


    /*
      Previous steps
    */

    if (stepIndex < currentIndex) {
      return "completed";
    }


    /*
      Current step
    */

    if (stepIndex === currentIndex) {
      return "active";
    }


    /*
      Future steps
    */

    return "";
  };


  /* =========================================================
     PAGE
  ========================================================= */

  return (

    <div className="my-orders-page">

      <div className="my-orders-container">


        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="my-orders-header">

          <div>

            <h1>
              My Orders
            </h1>

            <p>
              Track your accepted orders
              and delivery status.
            </p>

          </div>


          <div className="orders-count">

            {orders.length} Orders

          </div>

        </div>



        {/* =================================================
            NO ORDERS
        ================================================= */}

        {orders.length === 0 ? (

          <div className="no-orders">

            <div className="no-orders-icon">
              📦
            </div>


            <h2>
              No Orders Yet
            </h2>


            <p>
              Your confirmed orders will
              appear here.
            </p>


            <button
              type="button"
              onClick={() => {
                window.location.href =
                  "/marketplace";
              }}
            >
              Browse Marketplace
            </button>

          </div>

        ) : (


          /* =================================================
             ORDERS LIST
          ================================================= */

          <div className="orders-list">

            {orders.map((order) => {

              const currentIndex =
                getStatusIndex(
                  order.currentStatus
                );


              return (

                <div
                  className="order-card"
                  key={order.orderId}
                >


                  {/* =========================================
                      ORDER HEADER
                  ========================================= */}

                  <div className="order-card-header">

                    <div>

                      <span className="order-label">
                        ORDER ID
                      </span>


                      <h2>
                        #{order.orderId}
                      </h2>

                    </div>


                    <div className="order-date">

                      <span>
                        Order Date
                      </span>


                      <strong>
                        {order.date ||
                          "Recently"}
                      </strong>

                    </div>

                  </div>



                  {/* =========================================
                      ACCEPTED MESSAGE
                  ========================================= */}

                  <div className="accepted-message">

                    <div className="accepted-icon">
                      ✓
                    </div>


                    <div>

                      <strong>
                        Supplier Accepted Your Request
                      </strong>


                      <p>
                        Your inquiry has been
                        accepted and is now
                        being processed as an order.
                      </p>

                    </div>

                  </div>



                  {/* =========================================
                      PRODUCT
                  ========================================= */}

                  <div className="order-product">

                    <div className="product-category">

                      {order.category ||
                        "Fabric"}

                    </div>


                    <div className="product-main">

                      <h3>

                        {order.productName ||
                          order.product}

                      </h3>


                      <p>

                        {order.material ||
                          "Textile Fabric"}

                      </p>

                    </div>

                  </div>



                  {/* =========================================
                      ORDER DETAILS
                  ========================================= */}

                  <div className="order-details-grid">


                    {/* QUANTITY */}

                    <div className="order-detail">

                      <span>
                        Quantity
                      </span>


                      <strong>
                        {order.quantity} kg
                      </strong>

                    </div>



                    {/* PRICE */}

                    <div className="order-detail">

                      <span>
                        Price
                      </span>


                      <strong>

                        ₹
                        {order.price ||
                          order.amount ||
                          "—"}

                        {" "} / kg

                      </strong>

                    </div>



                    {/* COMPANY */}

                    <div className="order-detail">

                      <span>
                        Company
                      </span>


                      <strong>

                        {order.companyName ||
                          "—"}

                      </strong>

                    </div>



                    {/* SUPPLIER RESPONSE */}

                    <div className="order-detail">

                      <span>
                        Supplier Response
                      </span>


                      <strong className="accepted-text">

                        Accepted ✓

                      </strong>

                    </div>

                  </div>



                  {/* =========================================
                      DELIVERY STATUS
                  ========================================= */}

                  <div className="tracking-section">


                    {/* TRACKING HEADER */}

                    <div className="tracking-header">

                      <div>

                        <h3>
                          Delivery Status
                        </h3>


                        <p>

                          Current status:

                          <strong>
                            {" "}
                            {order.currentStatus}
                          </strong>

                        </p>

                      </div>


                      <span className="current-status-badge">

                        {order.currentStatus}

                      </span>

                    </div>



                    {/* =======================================
                        HORIZONTAL TRACKING
                    ======================================= */}

                    <div className="tracking-container">


                      {/* BASE + PROGRESS LINE */}

                      <div className="tracking-line">

                        <div
                          className="tracking-line-progress"
                          style={{
                            width:
                              `${
                                (currentIndex /
                                  (statusSteps.length - 1)) *
                                100
                              }%`,
                          }}
                        />

                      </div>



                      {/* TRACKING STEPS */}

                      <div className="tracking-steps">

                        {statusSteps.map(
                          (step, index) => (

                            <div
                              className={
                                `tracking-step ${
                                  getStepClass(
                                    index,
                                    order.currentStatus
                                  )
                                }`
                              }
                              key={step}
                            >


                              {/* CIRCLE */}

                              <div className="tracking-circle">

                                {index <= currentIndex
                                  ? "✓"
                                  : index + 1}

                              </div>


                              {/* LABEL */}

                              <span>
                                {step}
                              </span>

                            </div>

                          )
                        )}

                      </div>

                    </div>

                  </div>



                  {/* =================================================
                      BUYER REQUEST
                  ================================================= */}

                  {order.message && (

                    <div className="buyer-request">

                      <h3>
                        Your Request
                      </h3>


                      <p>
                        {order.message}
                      </p>

                    </div>

                  )}

                </div>

              );

            })}

          </div>

        )}

      </div>

    </div>

  );
}

export default MyOrders;