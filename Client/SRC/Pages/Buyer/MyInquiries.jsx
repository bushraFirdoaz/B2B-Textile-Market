import { useEffect, useState } from "react";

function MyInquiries() {

  const [inquiries, setInquiries] = useState([]);

  // Load buyer inquiries from Local Storage
  useEffect(() => {

    const savedInquiries =
      JSON.parse(localStorage.getItem("buyerInquiries")) || [];

    setInquiries(savedInquiries);

  }, []);


  // Get status styling
  const getStatusClass = (status) => {

    if (status === "Accepted") {
      return "inquiry-status accepted";
    }

    if (status === "Rejected") {
      return "inquiry-status rejected";
    }

    return "inquiry-status pending";

  };


  return (

    <div className="my-inquiries-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="my-inquiries-header">

        <h1>
          My Inquiries
        </h1>

        <p>
          Track the product requests you have sent to suppliers.
        </p>

      </div>


      {/* =========================
          NO INQUIRIES
      ========================= */}

      {inquiries.length === 0 ? (

        <div className="no-inquiries">

          <div className="no-inquiries-icon">
            📩
          </div>

          <h2>
            No Inquiries Yet
          </h2>

          <p>
            You haven't sent any product inquiries to suppliers yet.
          </p>

          <button
            onClick={() => {
              window.location.href = "/marketplace";
            }}
          >
            Browse Marketplace
          </button>

        </div>

      ) : (

        /* =========================
            INQUIRY LIST
        ========================= */

        <div className="inquiries-container">

          <div className="inquiries-summary">

            <strong>
              {inquiries.length}
            </strong>

            <span>
              {inquiries.length === 1
                ? " Inquiry"
                : " Inquiries"}
            </span>

          </div>


          {inquiries.map((inquiry) => (

            <div
              className="inquiry-card"
              key={inquiry.id}
            >

              {/* =========================
                  CARD HEADER
              ========================= */}

              <div className="inquiry-card-header">

                <div>

                  <h2>
                    {inquiry.productName}
                  </h2>

                  <p>
                    Category: {inquiry.category}
                  </p>

                </div>


                <div
                  className={getStatusClass(
                    inquiry.status
                  )}
                >
                  {inquiry.status || "Pending"}
                </div>

              </div>


              {/* =========================
                  PRODUCT INFORMATION
              ========================= */}

              <div className="inquiry-product-info">

                <div className="inquiry-info-item">

                  <span>
                    Product
                  </span>

                  <strong>
                    {inquiry.productName}
                  </strong>

                </div>


                <div className="inquiry-info-item">

                  <span>
                    Category
                  </span>

                  <strong>
                    {inquiry.category}
                  </strong>

                </div>


                <div className="inquiry-info-item">

                  <span>
                    Quantity
                  </span>

                  <strong>
                    {inquiry.quantity} kg
                  </strong>

                </div>


                <div className="inquiry-info-item">

                  <span>
                    Date
                  </span>

                  <strong>
                    {inquiry.date}
                  </strong>

                </div>

              </div>


              {/* =========================
                  BUYER INFORMATION
              ========================= */}

              <div className="inquiry-section">

                <h3>
                  Buyer Information
                </h3>

                <p>
                  <strong>Name:</strong>{" "}
                  {inquiry.buyerName}
                </p>

                <p>
                  <strong>Company:</strong>{" "}
                  {inquiry.companyName}
                </p>

              </div>


              {/* =========================
                  BUYER MESSAGE
              ========================= */}

              <div className="inquiry-section">

                <h3>
                  Your Request
                </h3>

                <div className="inquiry-message">

                  {inquiry.message}

                </div>

              </div>


              {/* =========================
                  SUPPLIER RESPONSE
              ========================= */}

              <div className="supplier-response">

                <h3>
                  Supplier Response
                </h3>


                {inquiry.status === "Accepted" ? (

                  <div className="response-accepted">

                    <strong>
                      ✓ Inquiry Accepted
                    </strong>

                    <p>
                      The supplier has accepted your request.
                      You can proceed with the order.
                    </p>

                  </div>

                ) : inquiry.status === "Rejected" ? (

                  <div className="response-rejected">

                    <strong>
                      ✕ Inquiry Rejected
                    </strong>

                    <p>
                      Unfortunately, the supplier has rejected
                      this request.
                    </p>

                  </div>

                ) : (

                  <div className="response-pending">

                    <strong>
                      ⏳ Waiting for Supplier Response
                    </strong>

                    <p>
                      Your inquiry has been sent successfully.
                      The supplier has not responded yet.
                    </p>

                  </div>

                )}

              </div>


              {/* =========================
                  ACTIONS
              ========================= */}

              <div className="inquiry-actions">

                <button
                  onClick={() => {
                    window.location.href =
                      "/marketplace";
                  }}
                >
                  Browse More Products
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}


export default MyInquiries;