import { useEffect, useState } from "react";

function Marketplace() {

  // =========================================
  // SEARCH
  // =========================================

  const [searchTerm, setSearchTerm] = useState("");


  // =========================================
  // SUPPLIER PRODUCTS
  // =========================================

  const [supplierProducts, setSupplierProducts] = useState([]);


  // =========================================
  // SELECTED PRODUCT
  // =========================================

  const [selectedProduct, setSelectedProduct] = useState(null);


  // =========================================
  // INQUIRY FORM
  // =========================================

  const [showInquiryForm, setShowInquiryForm] = useState(false);

  const [buyerName, setBuyerName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [inquiryQuantity, setInquiryQuantity] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");


  // =========================================
  // FEATURED PRODUCTS
  // =========================================

  const featuredProducts = [

    {
      id: 1,
      name: "Premium Cotton Fabric",
      category: "Cotton",
      material: "100% Cotton",
      price: 250,
      moq: 50,

      image: "Public/Images/Cotton_Fab.jpeg",

      description:
        "Premium quality cotton fabric suitable for garments and textile manufacturing.",
    },


    {
      id: 2,
      name: "Premium Silk Fabric",
      category: "Silk",
      material: "Pure Silk",
      price: 850,
      moq: 20,

      image: "Public/Images/Silk_Fab.jpeg",

      description:
        "High-quality silk fabric with a smooth and luxurious finish.",
    },


    {
      id: 3,
      name: "Natural Linen Fabric",
      category: "Linen",
      material: "100% Linen",
      price: 420,
      moq: 30,

      image: "Public/Images/Lenin_Fab.jpeg",

      description:
        "Natural lightweight linen fabric suitable for premium clothing.",
    },


    {
      id: 4,
      name: "Heavy Denim Fabric",
      category: "Denim",
      material: "Cotton Denim",
      price: 350,
      moq: 50,

      image: "Public/Images/Denim_Fab.jpg",

      description:
        "Durable cotton denim fabric suitable for jeans and jackets.",
    },

  ];


  // =========================================
  // LOAD SUPPLIER PRODUCTS
  // =========================================

  useEffect(() => {

    const loadSupplierProducts = () => {

      const savedProducts =
        JSON.parse(
          localStorage.getItem("supplierProducts")
        ) || [];

      setSupplierProducts(savedProducts);

    };


    // Load initially
    loadSupplierProducts();


    // Listen for localStorage changes
    window.addEventListener(
      "storage",
      loadSupplierProducts
    );


    return () => {

      window.removeEventListener(
        "storage",
        loadSupplierProducts
      );

    };

  }, []);


  // =========================================
  // CONVERT SUPPLIER PRODUCTS
  // =========================================

  const formattedSupplierProducts =
    supplierProducts.map((product) => ({

      id: `supplier-${product.id}`,

      // Original product ID
      originalId: product.id,

      name:
        product.productName ||
        "Unnamed Product",

      category:
        product.category ||
        "Fabric",

      material:
        product.material ||
        "Textile Material",

      price:
        product.price || 0,

      moq:
        product.moq || 1,

      stock:
        product.stock || 0,

      description:
        product.description ||
        "No description available.",


      // =====================================
      // IMPORTANT IMAGE FIX
      // =====================================

      image:
        product.image || null,


      // Identify supplier product
      isSupplierProduct: true,

    }));


  // =========================================
  // COMBINE PRODUCTS
  // =========================================

  const allProducts = [

    ...featuredProducts,

    ...formattedSupplierProducts,

  ];


  // =========================================
  // SEARCH PRODUCTS
  // =========================================

  const filteredProducts =
    allProducts.filter((product) => {

      const searchText =
        searchTerm.toLowerCase().trim();

      return (

        product.name
          .toLowerCase()
          .includes(searchText)

        ||

        product.category
          .toLowerCase()
          .includes(searchText)

        ||

        product.material
          .toLowerCase()
          .includes(searchText)

      );

    });


  // =========================================
  // VIEW PRODUCT
  // =========================================

  const handleViewProduct = (product) => {

    setSelectedProduct(product);

    setShowInquiryForm(false);

  };


  // =========================================
  // CLOSE PRODUCT
  // =========================================

  const closeProductDetails = () => {

    setSelectedProduct(null);

    setShowInquiryForm(false);

  };


  // =========================================
  // OPEN INQUIRY
  // =========================================

  const handleOpenInquiry = () => {

    setShowInquiryForm(true);

  };


  // =========================================
  // SEND INQUIRY
  // =========================================

  const handleSendInquiry = (e) => {

    e.preventDefault();


    if (!selectedProduct) {
      return;
    }


    const quantity =
      Number(inquiryQuantity);


    const price =
      Number(selectedProduct.price);


    const moq =
      Number(selectedProduct.moq);


    const stock =
      Number(selectedProduct.stock || 0);


    // =========================================
    // STOCK VALIDATION
    // =========================================

    if (
      selectedProduct.isSupplierProduct &&
      quantity > stock
    ) {

      alert(
        `Requested quantity cannot exceed available stock of ${stock} kg.`
      );

      return;

    }


    // =========================================
    // MOQ VALIDATION
    // =========================================

    if (quantity < moq) {

      alert(
        `Minimum order quantity is ${moq} kg.`
      );

      return;

    }


    // =========================================
    // ESTIMATED VALUE
    // =========================================

    const estimatedValue =
      quantity * price;


    // =========================================
    // CREATE INQUIRY
    // =========================================

    const newInquiry = {

      id: Date.now(),

      // Product information
      productId:
        selectedProduct.id,

      supplierProductId:
        selectedProduct.isSupplierProduct
          ? selectedProduct.originalId
          : null,

      productName:
        selectedProduct.name,

      category:
        selectedProduct.category,

      material:
        selectedProduct.material,


      // =====================================
      // IMPORTANT
      // SAVE PRODUCT IMAGE WITH INQUIRY
      // =====================================

      productImage:
        selectedProduct.image || null,


      // Pricing
      price:
        price,

      moq:
        moq,


      // Buyer information
      buyerName:
        buyerName,

      companyName:
        companyName,


      // Quantity
      quantity:
        quantity,


      // Estimated value
      estimatedValue:
        estimatedValue,


      // Buyer message
      message:
        inquiryMessage,


      // Status
      status:
        "Pending",


      // Date
      date:
        new Date().toLocaleDateString(),


      // Time
      time:
        new Date().toLocaleTimeString(),

    };


    // =========================================
    // GET EXISTING INQUIRIES
    // =========================================

    const existingInquiries =
      JSON.parse(
        localStorage.getItem("buyerInquiries")
      ) || [];


    // =========================================
    // ADD INQUIRY
    // =========================================

    const updatedInquiries = [

      ...existingInquiries,

      newInquiry,

    ];


    // =========================================
    // SAVE
    // =========================================

    localStorage.setItem(

      "buyerInquiries",

      JSON.stringify(
        updatedInquiries
      )

    );


    // =========================================
    // SUCCESS
    // =========================================

    alert(
      "Inquiry sent successfully! The supplier will review your request."
    );


    // =========================================
    // CLEAR FORM
    // =========================================

    setBuyerName("");

    setCompanyName("");

    setInquiryQuantity("");

    setInquiryMessage("");


    // =========================================
    // CLOSE
    // =========================================

    setShowInquiryForm(false);

    setSelectedProduct(null);

  };


  return (

    <div className="marketplace-page">


      {/* =========================================
          PAGE HEADING
      ========================================= */}

      <h1>
        Explore Fabrics
      </h1>

      <p>
        Discover quality fabrics from trusted textile suppliers.
      </p>


      {/* =========================================
          SEARCH BAR
      ========================================= */}

      <div className="marketplace-search">

        <input
          type="text"
          placeholder="Search fabrics, materials, colors..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <button>
          Search
        </button>

      </div>


      {/* =========================================
          CATEGORIES
      ========================================= */}

      <div className="categories-section">

        <h2>
          Browse by Category
        </h2>


        <div className="category-grid">


          {/* Cotton */}

          <div className="category-card">

            <div className="category-image">

              <img
                src="Public/Images/Cotton.jpeg"
                alt="Cotton Fabric"
              />

            </div>

            <h3>
              Cotton
            </h3>

            <p>
              Soft and breathable fabrics
            </p>

          </div>


          {/* Silk */}

          <div className="category-card">

            <div className="category-image">

              <img
                src="Public/Images/Silk.jpg"
                alt="Silk Fabric"
              />

            </div>

            <h3>
              Silk
            </h3>

            <p>
              Premium and luxurious fabrics
            </p>

          </div>


          {/* Linen */}

          <div className="category-card">

            <div className="category-image">

              <img
                src="Public/Images/Lenin.jpeg"
                alt="Linen Fabric"
              />

            </div>

            <h3>
              Linen
            </h3>

            <p>
              Natural and lightweight fabrics
            </p>

          </div>


          {/* Denim */}

          <div className="category-card">

            <div className="category-image">

              <img
                src="Public/Images/Denim.jpeg"
                alt="Denim Fabric"
              />

            </div>

            <h3>
              Denim
            </h3>

            <p>
              Durable fabrics for fashion
            </p>

          </div>


        </div>

      </div>


      {/* =========================================
          AVAILABLE PRODUCTS
      ========================================= */}

      <div className="products-section">


        <div className="products-section-header">

          <div>

            <h2>
              Available Products
            </h2>

            <p>
              Browse fabrics available from our marketplace.
            </p>

          </div>


          <span>
            {filteredProducts.length} Products
          </span>

        </div>


        {/* =====================================
            PRODUCT GRID
        ===================================== */}

        {filteredProducts.length > 0 ? (

          <div className="product-grid">

            {filteredProducts.map((product) => (

              <div
                className="product-card"
                key={product.id}
              >


                {/* =================================
                    PRODUCT IMAGE
                ================================= */}

                <div className="product-image">


                  {product.image ? (

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                  ) : (

                    <div className="supplier-product-placeholder">

                      <span>
                        {product.category}
                      </span>

                    </div>

                  )}


                  {/* Product Badge */}

                  <span className="product-badge">

                    {product.isSupplierProduct
                      ? "Supplier Product"
                      : "Featured"}

                  </span>


                </div>


                {/* =================================
                    PRODUCT INFO
                ================================= */}

                <div className="product-info">

                  <h3>
                    {product.name}
                  </h3>


                  <p>
                    {product.material}
                  </p>


                  {/* Price + MOQ */}

                  <div className="product-details">

                    <span className="product-price">

                      ₹{product.price} / kg

                    </span>


                    <span className="product-moq">

                      MOQ: {product.moq} kg

                    </span>

                  </div>


                  {/* Stock */}

                  {product.isSupplierProduct && (

                    <p className="product-stock">

                      Available Stock:{" "}

                      <strong>
                        {product.stock} kg
                      </strong>

                    </p>

                  )}


                  {/* Description */}

                  {product.description && (

                    <p className="product-description">

                      {product.description}

                    </p>

                  )}


                  {/* View Product */}

                  <button
                    onClick={() =>
                      handleViewProduct(product)
                    }
                  >
                    View Product
                  </button>


                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="no-products">

            <h3>
              No products found
            </h3>

            <p>
              Try searching with a different product,
              category, or material.
            </p>

          </div>

        )}

      </div>


      {/* =========================================
          PRODUCT DETAILS MODAL
      ========================================= */}

      {selectedProduct && (

        <div
          className="product-modal-overlay"
          onClick={closeProductDetails}
        >


          <div
            className="product-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* Close */}

            <button
              className="product-modal-close"
              onClick={closeProductDetails}
            >
              ×
            </button>


            {/* =================================
                MODAL IMAGE
            ================================= */}

            <div className="product-modal-image">


              {selectedProduct.image ? (

                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                />

              ) : (

                <div className="supplier-modal-placeholder">

                  {selectedProduct.category}

                </div>

              )}


            </div>


            {/* =================================
                MODAL CONTENT
            ================================= */}

            <div className="product-modal-content">


              <span className="product-modal-badge">

                {selectedProduct.isSupplierProduct
                  ? "Supplier Product"
                  : "Featured Product"}

              </span>


              <h2>
                {selectedProduct.name}
              </h2>


              <p className="modal-material">

                {selectedProduct.material}

              </p>


              {/* =================================
                  DETAILS GRID
              ================================= */}

              <div className="modal-details-grid">


                <div>

                  <span>
                    Category
                  </span>

                  <strong>
                    {selectedProduct.category}
                  </strong>

                </div>


                <div>

                  <span>
                    Price
                  </span>

                  <strong>
                    ₹{selectedProduct.price} / kg
                  </strong>

                </div>


                <div>

                  <span>
                    Minimum Order
                  </span>

                  <strong>
                    {selectedProduct.moq} kg
                  </strong>

                </div>


                {selectedProduct.isSupplierProduct && (

                  <div>

                    <span>
                      Available Stock
                    </span>

                    <strong>
                      {selectedProduct.stock} kg
                    </strong>

                  </div>

                )}

              </div>


              {/* =================================
                  DESCRIPTION
              ================================= */}

              <div className="modal-description">

                <h3>
                  Product Description
                </h3>

                <p>

                  {selectedProduct.description ||
                    "No description available for this product."}

                </p>

              </div>


              {/* =================================
                  SUPPLIER INFORMATION
              ================================= */}

              {selectedProduct.isSupplierProduct && (

                <div className="supplier-info-box">

                  <strong>
                    Supplier Product
                  </strong>

                  <p>
                    This product has been added by a
                    supplier and is currently available
                    in the marketplace.
                  </p>

                </div>

              )}


              {/* =================================
                  INQUIRY / ACTIONS
              ================================= */}

              {!showInquiryForm ? (

                <div className="modal-actions">

                  <button
                    className="modal-close-btn"
                    onClick={closeProductDetails}
                  >
                    Close
                  </button>


                  <button
                    className="modal-inquiry-btn"
                    onClick={handleOpenInquiry}
                  >
                    Send Inquiry
                  </button>

                </div>

              ) : (

                <div className="inquiry-form-container">

                  <h3>
                    Send Product Inquiry
                  </h3>

                  <p>
                    Send your requirement to the supplier.
                  </p>


                  <form
                    onSubmit={handleSendInquiry}
                  >


                    {/* Buyer Name */}

                    <div className="inquiry-form-group">

                      <label>
                        Your Name
                      </label>

                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={buyerName}
                        onChange={(e) =>
                          setBuyerName(e.target.value)
                        }
                        required
                      />

                    </div>


                    {/* Company */}

                    <div className="inquiry-form-group">

                      <label>
                        Company Name
                      </label>

                      <input
                        type="text"
                        placeholder="Enter your company name"
                        value={companyName}
                        onChange={(e) =>
                          setCompanyName(e.target.value)
                        }
                        required
                      />

                    </div>


                    {/* Quantity */}

                    <div className="inquiry-form-group">

                      <label>
                        Required Quantity (kg)
                      </label>

                      <input
                        type="number"
                        placeholder={`Minimum ${selectedProduct.moq} kg`}
                        min={selectedProduct.moq}
                        value={inquiryQuantity}
                        onChange={(e) =>
                          setInquiryQuantity(e.target.value)
                        }
                        required
                      />

                    </div>


                    {/* Message */}

                    <div className="inquiry-form-group">

                      <label>
                        Message
                      </label>

                      <textarea
                        rows="4"
                        placeholder="Write your requirements..."
                        value={inquiryMessage}
                        onChange={(e) =>
                          setInquiryMessage(e.target.value)
                        }
                        required
                      />

                    </div>


                    {/* Estimated Value */}

                    {inquiryQuantity && (

                      <div className="inquiry-estimate">

                        <span>
                          Estimated Order Value
                        </span>

                        <strong>

                          ₹
                          {(
                            Number(inquiryQuantity) *
                            Number(selectedProduct.price)
                          ).toLocaleString("en-IN")}

                        </strong>

                      </div>

                    )}


                    {/* Form Buttons */}

                    <div className="inquiry-form-actions">

                      <button
                        type="button"
                        className="inquiry-cancel-btn"
                        onClick={() =>
                          setShowInquiryForm(false)
                        }
                      >
                        Back
                      </button>


                      <button
                        type="submit"
                        className="inquiry-submit-btn"
                      >
                        Send Inquiry
                      </button>

                    </div>


                  </form>

                </div>

              )}

            </div>

          </div>

        </div>

      )}


      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="marketplace-footer">

        <div className="footer-content">


          <div className="footer-brand">

            <h2>
              Elanza
            </h2>

            <p>
              A B2B textile marketplace connecting
              buyers with trusted fabric suppliers.
            </p>

          </div>


          <div className="footer-column">

            <h3>
              Quick Links
            </h3>

            <a href="/marketplace">
              Marketplace
            </a>

            <a href="#">
              Categories
            </a>

            <a href="#">
              About Us
            </a>

          </div>


          <div className="footer-column">

            <h3>
              For Suppliers
            </h3>

            <a href="#">
              Become a Supplier
            </a>

            <a href="#">
              Supplier Login
            </a>

            <a href="/supplier/add-product">
              List Your Products
            </a>

          </div>


          <div className="footer-column">

            <h3>
              Contact
            </h3>

            <p>
              Email: support@texmarket.com
            </p>

            <p>
              Hyderabad, India
            </p>

          </div>


        </div>


        <div className="footer-bottom">

          <p>
            © 2026 TexMarket. All rights reserved.
          </p>


          <div className="footer-bottom-links">

            <a href="#">
              Privacy Policy
            </a>

            <a href="#">
              Terms of Service
            </a>

          </div>

        </div>

      </footer>


    </div>

  );

}

export default Marketplace;