import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Get supplier products from Local Storage
    const supplierProducts =
      JSON.parse(localStorage.getItem("supplierProducts")) || [];

    // Find the selected product
    const selectedProduct = supplierProducts.find(
      (item) => String(item.id) === String(id)
    );

    setProduct(selectedProduct);
  }, [id]);

  // Product not found
  if (!product) {
    return (
      <div className="product-not-found">
        <h1>Product Not Found</h1>

        <p>
          Sorry, this product is no longer available.
        </p>

        <button
          onClick={() =>
            (window.location.href = "/marketplace")
          }
        >
          Back to Marketplace
        </button>
      </div>
    );
  }

  return (
    <div className="product-details-page">

      {/* Back Button */}

      <button
        className="back-marketplace-btn"
        onClick={() =>
          (window.location.href = "/marketplace")
        }
      >
        ← Back to Marketplace
      </button>


      {/* Product Details */}

      <div className="product-details-container">

        {/* Product Image */}

        <div className="product-details-image">

          <div className="product-category-image">
            {product.category}
          </div>

        </div>


        {/* Product Information */}

        <div className="product-details-info">

          <span className="product-category-badge">
            {product.category}
          </span>

          <h1>
            {product.productName}
          </h1>

          <p className="product-material">
            {product.material}
          </p>


          {/* Price */}

          <div className="product-main-price">

            <span>
              Price
            </span>

            <strong>
              ₹{product.price} / kg
            </strong>

          </div>


          {/* Product Details */}

          <div className="product-info-grid">

            <div className="info-box">

              <span>
                Minimum Order Quantity
              </span>

              <strong>
                {product.moq} kg
              </strong>

            </div>


            <div className="info-box">

              <span>
                Available Stock
              </span>

              <strong>
                {product.stock} kg
              </strong>

            </div>


            <div className="info-box">

              <span>
                Material
              </span>

              <strong>
                {product.material}
              </strong>

            </div>


            <div className="info-box">

              <span>
                Category
              </span>

              <strong>
                {product.category}
              </strong>

            </div>

          </div>


          {/* Description */}

          <div className="product-description-section">

            <h2>
              Product Description
            </h2>

            <p>
              {product.description}
            </p>

          </div>


          {/* Actions */}

          <div className="product-detail-actions">

            <button
              className="contact-supplier-btn"
              onClick={() =>
                alert(
                  "Supplier contact feature will be implemented next."
                )
              }
            >
              Contact Supplier
            </button>

            <button
              className="request-quote-btn"
              onClick={() =>
                alert(
                  "Request Quote feature will be implemented next."
                )
              }
            >
              Request Quote
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;