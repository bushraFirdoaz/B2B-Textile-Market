import { useState } from "react";
import "./AddProduct.css";

function AddProduct() {

  // =========================================
  // FORM FIELDS
  // =========================================

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [material, setMaterial] = useState("");
  const [price, setPrice] = useState("");
  const [moq, setMoq] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  // Product image
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");


  // =========================================
  // HANDLE IMAGE UPLOAD
  // =========================================

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // Allow only image files
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    // Optional size restriction
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {

      const imageData = reader.result;

      // Save Base64 image
      setImage(imageData);

      // Show preview
      setImagePreview(imageData);

    };

    reader.readAsDataURL(file);

  };


  // =========================================
  // HANDLE FORM SUBMISSION
  // =========================================

  const handleSubmit = (e) => {

    e.preventDefault();


    // Image is required
    if (!image) {
      alert("Please upload a product image.");
      return;
    }


    // =========================================
    // CREATE NEW PRODUCT
    // =========================================

    const newProduct = {

      id: Date.now(),

      productName,
      category,
      material,

      price,
      moq,
      stock,

      description,

      // IMPORTANT
      // Image is saved as Base64
      image: image,

    };


    // =========================================
    // GET EXISTING PRODUCTS
    // =========================================

    const existingProducts =
      JSON.parse(
        localStorage.getItem("supplierProducts")
      ) || [];


    // =========================================
    // ADD NEW PRODUCT
    // =========================================

    const updatedProducts = [
      ...existingProducts,
      newProduct,
    ];


    // =========================================
    // SAVE TO LOCAL STORAGE
    // =========================================

    localStorage.setItem(
      "supplierProducts",
      JSON.stringify(updatedProducts)
    );


    // =========================================
    // SUCCESS
    // =========================================

    alert("Product added successfully!");


    // =========================================
    // CLEAR FORM
    // =========================================

    setProductName("");
    setCategory("");
    setMaterial("");
    setPrice("");
    setMoq("");
    setStock("");
    setDescription("");

    setImage("");
    setImagePreview("");

  };


  return (

    <div className="add-product-page">

      {/* =========================================
          DECORATIVE BACKGROUND
      ========================================= */}

      <div className="add-product-glow glow-one"></div>
      <div className="add-product-glow glow-two"></div>


      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="add-product-header">

        <div className="header-badge">
          ✦ SUPPLIER STUDIO
        </div>

        <h1>
          Add a New <span>Textile Product</span>
        </h1>

        <p>
          Showcase your textile products to buyers
          across the TexMarket marketplace.
        </p>

      </div>


      {/* =========================================
          MAIN FORM
      ========================================= */}

      <form
        className="add-product-form"
        onSubmit={handleSubmit}
      >

        {/* =========================================
            FORM INTRODUCTION
        ========================================= */}

        <div className="form-introduction">

          <div className="form-icon">
            🧵
          </div>

          <div>

            <h2>
              Product Information
            </h2>

            <p>
              Enter the details of the fabric you
              want to list on TexMarket.
            </p>

          </div>

        </div>


        {/* =========================================
            PRODUCT IMAGE
        ========================================= */}

        <div className="form-group">

          <label>
            Product Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />

          <small>
            Upload a clear image of your textile product.
            Maximum size: 5 MB.
          </small>


          {/* IMAGE PREVIEW */}

          {imagePreview && (

            <div className="product-image-preview">

              <img
                src={imagePreview}
                alt="Product Preview"
              />

            </div>

          )}

        </div>


        {/* =========================================
            PRODUCT NAME
        ========================================= */}

        <div className="form-group">

          <label>
            Product Name
          </label>

          <input
            type="text"
            placeholder="Example: Premium Cotton Fabric"
            value={productName}
            onChange={(e) =>
              setProductName(e.target.value)
            }
            required
          />

        </div>


        {/* =========================================
            CATEGORY + MATERIAL
        ========================================= */}

        <div className="form-row">

          <div className="form-group">

            <label>
              Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              required
            >

              <option value="">
                Select Category
              </option>

              <option value="Cotton">
                Cotton
              </option>

              <option value="Silk">
                Silk
              </option>

              <option value="Linen">
                Linen
              </option>

              <option value="Denim">
                Denim
              </option>

            </select>

          </div>


          <div className="form-group">

            <label>
              Material
            </label>

            <input
              type="text"
              placeholder="Example: 100% Cotton"
              value={material}
              onChange={(e) =>
                setMaterial(e.target.value)
              }
              required
            />

          </div>

        </div>


        {/* =========================================
            PRICE + MOQ
        ========================================= */}

        <div className="form-row">

          <div className="form-group">

            <label>
              Price per kg (₹)
            </label>

            <input
              type="number"
              placeholder="Example: 250"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              min="1"
              required
            />

          </div>


          <div className="form-group">

            <label>
              Minimum Order Quantity (kg)
            </label>

            <input
              type="number"
              placeholder="Example: 50"
              value={moq}
              onChange={(e) =>
                setMoq(e.target.value)
              }
              min="1"
              required
            />

          </div>

        </div>


        {/* =========================================
            STOCK
        ========================================= */}

        <div className="form-group">

          <label>
            Available Stock (kg)
          </label>

          <input
            type="number"
            placeholder="Example: 500"
            value={stock}
            onChange={(e) =>
              setStock(e.target.value)
            }
            min="0"
            required
          />

        </div>


        {/* =========================================
            DESCRIPTION
        ========================================= */}

        <div className="form-group">

          <label>
            Product Description
          </label>

          <textarea
            placeholder="Describe the fabric quality, texture, usage, finish, etc."
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows="5"
            required
          />

        </div>


        {/* =========================================
            PRODUCT PREVIEW MESSAGE
        ========================================= */}

        <div className="product-preview">

          <div className="preview-icon">
            🧶
          </div>

          <div>

            <h3>
              Ready to list your product?
            </h3>

            <p>
              Your product image and information will
              be saved and displayed to buyers in the
              TexMarket marketplace.
            </p>

          </div>

        </div>


        {/* =========================================
            BUTTONS
        ========================================= */}

        <div className="form-actions">

          <button
            type="button"
            className="cancel-btn"
            onClick={() =>
              window.history.back()
            }
          >
            Cancel
          </button>


          <button
            type="submit"
            className="submit-product-btn"
          >
            <span>＋</span>
            Add Product
          </button>

        </div>

      </form>

    </div>

  );

}

export default AddProduct;