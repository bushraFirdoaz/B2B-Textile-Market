import { useState } from "react";
import "./AddProduct.css";

function AddProduct() {
  // Form fields
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [material, setMaterial] = useState("");
  const [price, setPrice] = useState("");
  const [moq, setMoq] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      productName,
      category,
      material,
      price,
      moq,
      stock,
      description,
    };

    // Get existing products
    const existingProducts =
      JSON.parse(localStorage.getItem("supplierProducts")) || [];

    // Add new product
    const updatedProducts = [
      ...existingProducts,
      newProduct,
    ];

    // Save products
    localStorage.setItem(
      "supplierProducts",
      JSON.stringify(updatedProducts)
    );

    // Success message
    alert("Product added successfully!");

    // Clear form
    setProductName("");
    setCategory("");
    setMaterial("");
    setPrice("");
    setMoq("");
    setStock("");
    setDescription("");
  };

  return (
    <div className="add-product-page">

      {/* Decorative background shapes */}
      <div className="add-product-glow glow-one"></div>
      <div className="add-product-glow glow-two"></div>

      {/* Page Header */}
      <div className="add-product-header">

        <div className="header-badge">
          ✦ SUPPLIER STUDIO
        </div>

        <h1>
          Add a New <span>Textile Product</span>
        </h1>

        <p>
          Showcase your textile products to buyers across the
          TexMarket marketplace.
        </p>

      </div>


      {/* Main Form Card */}
      <form
        className="add-product-form"
        onSubmit={handleSubmit}
      >

        {/* Form Introduction */}
        <div className="form-introduction">

          <div className="form-icon">
            🧵
          </div>

          <div>
            <h2>Product Information</h2>

            <p>
              Enter the details of the fabric you want to
              list on TexMarket.
            </p>
          </div>

        </div>


        {/* Product Name */}
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


        {/* Category + Material */}
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


        {/* Price + MOQ */}
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


        {/* Stock */}
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


        {/* Description */}
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


        {/* Product Preview */}
        <div className="product-preview">

          <div className="preview-icon">
            🧶
          </div>

          <div>

            <h3>
              Ready to list your product?
            </h3>

            <p>
              Your product information will be saved
              and displayed in your supplier dashboard.
            </p>

          </div>

        </div>


        {/* Buttons */}
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