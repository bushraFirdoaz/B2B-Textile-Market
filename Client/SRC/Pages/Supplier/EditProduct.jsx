import { useState } from "react";
import { useParams } from "react-router-dom";
import "./EditProduct.css";

function EditProduct() {
  const { id } = useParams();

  // Get products from Local Storage
  const existingProducts =
    JSON.parse(localStorage.getItem("supplierProducts")) || [];

  // Find selected product
  const product = existingProducts.find(
    (item) => String(item.id) === String(id)
  );

  // Product not found
  if (!product) {
    return (
      <div className="edit-product-not-found">
        <div className="not-found-icon">📦</div>

        <h1>Product Not Found</h1>

        <p>
          The product you are trying to edit does not exist.
        </p>

        <button
          onClick={() =>
            (window.location.href = "/supplier/dashboard")
          }
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <EditProductForm
      product={product}
      existingProducts={existingProducts}
    />
  );
}


function EditProductForm({
  product,
  existingProducts,
}) {
  const [productName, setProductName] = useState(
    product.productName
  );

  const [category, setCategory] = useState(
    product.category
  );

  const [material, setMaterial] = useState(
    product.material
  );

  const [price, setPrice] = useState(
    product.price
  );

  const [moq, setMoq] = useState(
    product.moq
  );

  const [stock, setStock] = useState(
    product.stock
  );

  const [description, setDescription] = useState(
    product.description
  );


  // Save changes
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...product,

      productName: productName,
      category: category,
      material: material,
      price: price,
      moq: moq,
      stock: stock,
      description: description,
    };


    // Replace old product with updated product
    const updatedProducts = existingProducts.map(
      (item) =>
        String(item.id) === String(product.id)
          ? updatedProduct
          : item
    );


    // Save to Local Storage
    localStorage.setItem(
      "supplierProducts",
      JSON.stringify(updatedProducts)
    );


    // Success message
    alert("Product updated successfully!");


    // Go back to dashboard
    window.location.href =
      "/supplier/dashboard";
  };


  return (
    <div className="edit-product-page">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="edit-product-header">

        <div>

          <span className="edit-product-label">
            PRODUCT MANAGEMENT
          </span>

          <h1>
            Edit Product
          </h1>

          <p>
            Update your textile product information
            and inventory details.
          </p>

        </div>

        <div className="edit-product-badge">
          ✏️ Editing
        </div>

      </div>


      {/* =========================================
          FORM
      ========================================= */}

      <form
        className="edit-product-form"
        onSubmit={handleSubmit}
      >

        {/* Product Name */}

        <div className="form-group">

          <label>
            Product Name
          </label>

          <input
            type="text"
            value={productName}
            onChange={(e) =>
              setProductName(e.target.value)
            }
            placeholder="Example: Premium Cotton Fabric"
            required
          />

        </div>


        {/* Category */}

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


        {/* Material */}

        <div className="form-group">

          <label>
            Material
          </label>

          <input
            type="text"
            value={material}
            onChange={(e) =>
              setMaterial(e.target.value)
            }
            placeholder="Example: 100% Cotton"
            required
          />

        </div>


        {/* Price + MOQ */}

        <div className="form-row">

          <div className="form-group">

            <label>
              Price per kg (₹)
            </label>

            <input
              type="number"
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
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows="5"
            placeholder="Describe your fabric, quality, usage, etc."
            required
          />

        </div>


        {/* Buttons */}

        <div className="form-actions">

          <button
            type="button"
            className="cancel-btn"
            onClick={() =>
              (window.location.href =
                "/supplier/dashboard")
            }
          >
            Cancel
          </button>


          <button
            type="submit"
            className="submit-product-btn"
          >
            ✓ Save Changes
          </button>

        </div>

      </form>

    </div>
  );
}

export default EditProduct;