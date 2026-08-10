import { useEffect, useState } from "react";
import "./SupplierDashboard.css";

function SupplierDashboard() {

  // =========================================================
  // PRODUCTS
  // =========================================================

  const [products, setProducts] = useState([]);


  // =========================================================
  // BUYER INQUIRIES
  // =========================================================

  const [inquiries, setInquiries] = useState([]);


  // =========================================================
  // LOAD DATA
  // =========================================================

  useEffect(() => {

    const savedProducts =
      JSON.parse(
        localStorage.getItem("supplierProducts")
      ) || [];

    setProducts(savedProducts);


    const savedInquiries =
      JSON.parse(
        localStorage.getItem("buyerInquiries")
      ) || [];

    setInquiries(savedInquiries);

  }, []);


  // =========================================================
  // DELETE PRODUCT
  // =========================================================

  const handleDelete = (productId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }


    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );


    localStorage.setItem(
      "supplierProducts",
      JSON.stringify(updatedProducts)
    );


    setProducts(updatedProducts);


    alert("Product deleted successfully!");

  };


  // =========================================================
  // ACCEPT INQUIRY
  // =========================================================

  const handleAcceptInquiry = (inquiryId) => {

    const updatedInquiries = inquiries.map(
      (inquiry) => {

        if (inquiry.id === inquiryId) {

          return {
            ...inquiry,
            status: "Accepted",
            supplierResponse: "Accepted",
          };

        }

        return inquiry;

      }
    );


    localStorage.setItem(
      "buyerInquiries",
      JSON.stringify(updatedInquiries)
    );


    setInquiries(updatedInquiries);


    alert("Inquiry accepted successfully!");

  };


  // =========================================================
  // REJECT INQUIRY
  // =========================================================

  const handleRejectInquiry = (inquiryId) => {

    const confirmReject = window.confirm(
      "Are you sure you want to reject this inquiry?"
    );

    if (!confirmReject) {
      return;
    }


    const updatedInquiries = inquiries.map(
      (inquiry) => {

        if (inquiry.id === inquiryId) {

          return {
            ...inquiry,
            status: "Rejected",
            supplierResponse: "Rejected",
          };

        }

        return inquiry;

      }
    );


    localStorage.setItem(
      "buyerInquiries",
      JSON.stringify(updatedInquiries)
    );


    setInquiries(updatedInquiries);


    alert("Inquiry rejected.");

  };


  // =========================================================
  // UI
  // =========================================================

  return (

    <div className="supplier-dashboard">


      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="supplier-header">

        <div>

          <h1>
            Supplier Dashboard
          </h1>

          <p>
            Welcome back, Supplier 👋
          </p>

        </div>

      </div>


      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="stats-grid">


        {/* Total Products */}

        <div className="stat-card">

          <div className="stat-icon">
            📦
          </div>

          <div>

            <p>
              Total Products
            </p>

            <h2>
              {products.length}
            </h2>

          </div>

        </div>


        {/* Total Inquiries */}

        <div className="stat-card">

          <div className="stat-icon">
            📨
          </div>

          <div>

            <p>
              Total Inquiries
            </p>

            <h2>
              {inquiries.length}
            </h2>

          </div>

        </div>


        {/* Accepted */}

        <div className="stat-card">

          <div className="stat-icon">
            ✅
          </div>

          <div>

            <p>
              Accepted
            </p>

            <h2>

              {
                inquiries.filter(
                  (item) =>
                    item.status === "Accepted"
                ).length
              }

            </h2>

          </div>

        </div>


        {/* Pending */}

        <div className="stat-card">

          <div className="stat-icon">
            ⏳
          </div>

          <div>

            <p>
              Pending
            </p>

            <h2>

              {
                inquiries.filter(
                  (item) =>
                    item.status === "Pending"
                ).length
              }

            </h2>

          </div>

        </div>

      </div>


      {/* =====================================================
          BUYER INQUIRIES
      ===================================================== */}

      <div className="recent-orders">


        {/* Section Header */}

        <div className="section-header">

          <div>

            <h2>
              Buyer Inquiries
            </h2>

            <p className="inquiry-subtitle">
              Manage requests received from buyers.
            </p>

          </div>


          <span>
            {inquiries.length} Requests
          </span>

        </div>


        {/* No Inquiries */}

        {inquiries.length === 0 ? (

          <div className="no-products">

            <div className="no-products-icon">
              📨
            </div>

            <h3>
              No buyer inquiries yet
            </h3>

            <p>
              Buyer requests will appear here.
            </p>

          </div>

        ) : (

          <div className="inquiries-list">

            {inquiries.map((inquiry) => (

              <div
                className="inquiry-card"
                key={inquiry.id}
              >


                {/* Inquiry Header */}

                <div className="inquiry-card-header">

                  <div>

                    <h3>
                      {inquiry.productName}
                    </h3>

                    <p>
                      {inquiry.category}
                    </p>

                  </div>


                  <span
                    className={`inquiry-status ${
                      inquiry.status
                        ? inquiry.status.toLowerCase()
                        : "pending"
                    }`}
                  >

                    {inquiry.status || "Pending"}

                  </span>

                </div>


                {/* Inquiry Details */}

                <div className="inquiry-details-grid">


                  <div>

                    <span>
                      Buyer Name
                    </span>

                    <strong>
                      {inquiry.buyerName || "—"}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Company
                    </span>

                    <strong>
                      {inquiry.companyName || "—"}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Quantity
                    </span>

                    <strong>
                      {inquiry.quantity || 0} kg
                    </strong>

                  </div>


                  <div>

                    <span>
                      Date
                    </span>

                    <strong>
                      {inquiry.date || "—"}
                    </strong>

                  </div>


                </div>


                {/* Buyer Message */}

                <div className="inquiry-message">

                  <span>
                    Buyer Message
                  </span>

                  <p>
                    {inquiry.message ||
                      "No message provided."}
                  </p>

                </div>


                {/* Actions */}

                {inquiry.status === "Pending" && (

                  <div className="inquiry-actions">

                    <button
                      className="accept-inquiry-btn"
                      onClick={() =>
                        handleAcceptInquiry(
                          inquiry.id
                        )
                      }
                    >
                      ✓ Accept Inquiry
                    </button>


                    <button
                      className="reject-inquiry-btn"
                      onClick={() =>
                        handleRejectInquiry(
                          inquiry.id
                        )
                      }
                    >
                      ✕ Reject Inquiry
                    </button>

                  </div>

                )}


                {/* Accepted */}

                {inquiry.status === "Accepted" && (

                  <div className="inquiry-result accepted-result">

                    ✓ You accepted this buyer inquiry.

                  </div>

                )}


                {/* Rejected */}

                {inquiry.status === "Rejected" && (

                  <div className="inquiry-result rejected-result">

                    ✕ You rejected this buyer inquiry.

                  </div>

                )}

              </div>

            ))}

          </div>

        )}

      </div>


      {/* =====================================================
          MY PRODUCTS
      ===================================================== */}

      <div className="supplier-products">


        {/* Products Header */}

        <div className="section-header">

          <div>

            <h2>
              My Products
            </h2>

            <p className="inquiry-subtitle">
              Products currently listed in the marketplace.
            </p>

          </div>


          <span>
            {products.length} Products
          </span>

        </div>


        {/* No Products */}

        {products.length === 0 ? (

          <div className="no-products">

            <div className="no-products-icon">
              📦
            </div>

            <h3>
              No products added yet
            </h3>

            <p>
              Start adding your textile products
              to the marketplace.
            </p>


            <button
              className="add-product-btn"
              onClick={() => {
                window.location.href =
                  "/supplier/add-product";
              }}
            >
              + Add Your First Product
            </button>

          </div>

        ) : (

          <div className="supplier-product-grid">

            {products.map((product) => (

              <div
                className="supplier-product-card"
                key={product.id}
              >


                {/* Product Image */}

                <div className="supplier-product-image">

                  {product.image ? (

                    <img
                      src={product.image}
                      alt={product.productName}
                    />

                  ) : (

                    <div className="no-product-image">

                      <span>
                        🧵
                      </span>

                      <p>
                        No Image
                      </p>

                    </div>

                  )}

                </div>


                {/* Product Information */}

                <div className="supplier-product-info">


                  {/* Category */}

                  <div className="product-category">
                    {product.category}
                  </div>


                  {/* Product Name */}

                  <h3>
                    {product.productName}
                  </h3>


                  {/* Material */}

                  <p className="product-material">
                    {product.material}
                  </p>


                  {/* Product Details */}

                  <div className="supplier-product-details">


                    <div>

                      <span>
                        Price
                      </span>

                      <strong>
                        ₹{product.price} / kg
                      </strong>

                    </div>


                    <div>

                      <span>
                        MOQ
                      </span>

                      <strong>
                        {product.moq} kg
                      </strong>

                    </div>


                    <div>

                      <span>
                        Stock
                      </span>

                      <strong>
                        {product.stock} kg
                      </strong>

                    </div>


                  </div>


                  {/* Description */}

                  <p className="product-description">

                    {product.description ||
                      "No description available."}

                  </p>


                  {/* Actions */}

                  <div className="product-actions">


                    <button
                      className="edit-product-btn"
                      onClick={() =>
                        window.location.href =
                          `/supplier/edit-product/${product.id}`
                      }
                    >
                      Edit
                    </button>


                    <button
                      className="delete-product-btn"
                      onClick={() =>
                        handleDelete(product.id)
                      }
                    >
                      Delete
                    </button>


                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>


    </div>

  );

}

export default SupplierDashboard;