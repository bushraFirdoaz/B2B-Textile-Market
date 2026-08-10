function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">

          <p className="hero-label">B2B TEXTILE MARKETPLACE</p>

          <h1>
            Source Fabrics.
            <br />
            <span>Source Smarter.</span>
          </h1>

          <p className="hero-description">
            Discover quality fabrics from trusted suppliers.
            Compare products, explore materials, and source in bulk
            from one marketplace.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              Explore Marketplace
            </button>

            <button className="secondary-btn">
              Become a Supplier
            </button>
          </div>

        </div>
      </section>


      {/* Categories Section */}
      <section className="categories" id="categories">

        <div className="section-heading">
          <p>EXPLORE</p>
          <h2>Browse by Fabric Category</h2>
          <span>
            Find the right material for your business needs.
          </span>
        </div>

        <div className="category-list">

          <div className="category-card">
            <div className="category-icon">🧵</div>
            <h3>Cotton</h3>
            <p>Soft, breathable and versatile fabrics.</p>
          </div>

          <div className="category-card">
            <div className="category-icon">✨</div>
            <h3>Silk</h3>
            <p>Premium fabrics for elegant products.</p>
          </div>

          <div className="category-card">
            <div className="category-icon">🌿</div>
            <h3>Linen</h3>
            <p>Natural and lightweight textile materials.</p>
          </div>

          <div className="category-card">
            <div className="category-icon">👖</div>
            <h3>Denim</h3>
            <p>Durable fabrics for fashion and apparel.</p>
          </div>

          <div className="category-card">
            <div className="category-icon">🧶</div>
            <h3>Wool</h3>
            <p>Warm and durable fabrics for various uses.</p>
          </div>

        </div>

      </section>


      {/* Featured Products */}
      <section className="featured-products">

        <div className="section-heading">
          <p>POPULAR PRODUCTS</p>
          <h2>Featured Fabrics</h2>
          <span>
            Explore fabrics available from our marketplace suppliers.
          </span>
        </div>

        <div className="product-list">

          <div className="product-card">
            <div className="product-image">🧵</div>

            <div className="product-info">
              <p className="product-category">Cotton</p>

              <h3>Premium Cotton Fabric</h3>

              <p className="product-description">
                Soft and breathable cotton fabric suitable for apparel.
              </p>

              <div className="product-details">
                <strong>₹250 / kg</strong>
                <span>MOQ: 50 kg</span>
              </div>

              <p className="supplier-name">
                ABC Textiles
              </p>

              <button className="view-product-btn">
                View Product
              </button>
            </div>
          </div>


          <div className="product-card">
            <div className="product-image">🌿</div>

            <div className="product-info">
              <p className="product-category">Linen</p>

              <h3>Premium Linen Fabric</h3>

              <p className="product-description">
                Lightweight natural linen fabric for fashion products.
              </p>

              <div className="product-details">
                <strong>₹320 / kg</strong>
                <span>MOQ: 100 kg</span>
              </div>

              <p className="supplier-name">
                Royal Fabrics
              </p>

              <button className="view-product-btn">
                View Product
              </button>
            </div>
          </div>


          <div className="product-card">
            <div className="product-image">✨</div>

            <div className="product-info">
              <p className="product-category">Silk</p>

              <h3>Premium Silk Fabric</h3>

              <p className="product-description">
                Smooth and elegant silk fabric for premium clothing.
              </p>

              <div className="product-details">
                <strong>₹650 / kg</strong>
                <span>MOQ: 25 kg</span>
              </div>

              <p className="supplier-name">
                Silk House India
              </p>

              <button className="view-product-btn">
                View Product
              </button>
            </div>
          </div>

        </div>

      </section>
            {/* Why TexMarket */}
      <section className="why-texmarket">

        <div className="section-heading">
          <p>WHY TEXMARKET</p>
          <h2>Everything You Need to Source Better</h2>
          <span>
            Built to make textile sourcing simple, transparent and efficient.
          </span>
        </div>

        <div className="benefits">

          <div className="benefit-card">
            <div className="benefit-icon">🏭</div>
            <h3>Trusted Suppliers</h3>
            <p>
              Discover products from textile suppliers and manufacturers.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">📦</div>
            <h3>Bulk Ordering</h3>
            <p>
              Find fabrics with clear pricing and minimum order quantities.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">🔍</div>
            <h3>Easy Discovery</h3>
            <p>
              Search and compare fabrics based on your business requirements.
            </p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">🤖</div>
            <h3>AI Assistance</h3>
            <p>
              Get intelligent fabric recommendations while you source.
            </p>
          </div>

        </div>

      </section>
      {/* Supplier CTA */}
<section className="supplier-cta">

  <div className="supplier-cta-content">

    <p className="hero-label">FOR TEXTILE SUPPLIERS</p>

    <h2>
      Grow Your Textile Business With TexMarket
    </h2>

    <p>
      List your fabrics, connect with buyers, and manage your
      products and orders from one simple platform.
    </p>

    <button className="supplier-btn">
      Become a Supplier
    </button>

  </div>

</section>
      {/* Footer */}
      <footer className="footer">

        <div className="footer-content">

          <div>
            <h2 className="footer-logo">TexMarket</h2>
            <p>
              A B2B marketplace connecting textile buyers
              with trusted suppliers.
            </p>
          </div>

          <div>
            <h4>Marketplace</h4>
            <a href="#">Browse Fabrics</a>
            <a href="#">Categories</a>
            <a href="#">Suppliers</a>
          </div>

          <div>
            <h4>For Business</h4>
            <a href="#">Become a Supplier</a>
            <a href="#">How It Works</a>
            <a href="#">Contact Us</a>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2026 TexMarket. All rights reserved.</p>
        </div>

      </footer>

    </>
  );
}

export default LandingPage;