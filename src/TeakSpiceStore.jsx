import React from "react";

const styles = {
  body: {
    fontFamily: "'Arial', sans-serif",
    lineHeight: 1.6,
    color: "#333",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: 20,
  },
  header: {
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: 20,
    padding: 30,
    marginBottom: 30,
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  logo: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#8B4513",
    textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
    marginBottom: 10,
  },
  tagline: {
    fontSize: "1.2rem",
    color: "#666",
    fontStyle: "italic",
    marginBottom: 20,
  },
  companyInfo: {
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    boxShadow: "0 6px 24px rgba(0,0,0,0.1)",
  },
  companyTitle: {
    color: "#2c3e50",
    marginBottom: 15,
    fontSize: "1.4rem",
  },
  companyDetails: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 20,
    marginBottom: 15,
  },
  detailItem: {
    background: "rgba(240,240,240,0.7)",
    padding: 15,
    borderRadius: 10,
    borderLeft: "4px solid #3498db",
  },
  detailLabel: {
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 5,
  },
  detailValue: {
    color: "#666",
  },
  productsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: "2.5rem",
    color: "white",
    textAlign: "center",
    marginBottom: 30,
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: 30,
    marginBottom: 40,
  },
  productCard: {
    background: "rgba(255,255,255,0.95)",
    borderRadius: 20,
    padding: 40,
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    backdropFilter: "blur(10px)",
  },
  productImage: {
    width: 200,
    height: 200,
    background: "linear-gradient(45deg, #f0f0f0, #e0e0e0)",
    borderRadius: 15,
    margin: "0 auto 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "5rem",
    boxShadow: "inset 0 4px 8px rgba(0,0,0,0.1)",
  },
  productTitle: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 15,
  },
  productDescription: {
    color: "#666",
    marginBottom: 20,
    lineHeight: 1.6,
    fontSize: "1.1rem",
  },
  productPrice: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#27ae60",
    marginBottom: 20,
  },
  productFeatures: {
    background: "rgba(240,248,255,0.8)",
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    textAlign: "left",
  },
  featuresTitle: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 15,
    textAlign: "center",
  },
  featuresList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  featureLi: {
    padding: "8px 0",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    color: "#555",
    display: "flex",
    alignItems: "center",
  },
  featureIcon: {
    color: "#27ae60",
    fontWeight: "bold",
    marginRight: 10,
  },
  contactSection: {
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: 20,
    padding: 40,
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    marginTop: 30,
  },
  contactTitle: {
    fontSize: "2rem",
    color: "#2c3e50",
    marginBottom: 20,
  },
  contactInfo: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 20,
    marginTop: 20,
  },
  contactItem: {
    background: "rgba(240,240,240,0.7)",
    padding: 20,
    borderRadius: 15,
    borderLeft: "4px solid #3498db",
  },
  contactItemH4: {
    color: "#2c3e50",
    marginBottom: 10,
  },
  // Responsive: Adjust for mobile
  '@media (max-width: 768px)': {
    productsGrid: {
      gridTemplateColumns: "1fr",
    },
    companyDetails: {
      gridTemplateColumns: "1fr",
    },
    contactInfo: {
      gridTemplateColumns: "1fr",
    },
    productCard: {
      padding: 20,
    },
  },
};

const featuresTeak = [
  "100% Sustainable Teak Wood",
  "Natural Antimicrobial Properties",
  "Handcrafted by Skilled Artisans",
  "Unique Grain Patterns",
  "Durable & Long-lasting",
  "Single Peice Wood with no Adhesive",
  "Easy to Clean & Maintain",
];

const featuresElaichi = [
  "100g Premium Quality Pack",
  "Sourced from Finest Plantations",
  "Fresh & Aromatic",
  "Perfect for Teas & Desserts",
  "Traditional Cooking Essential",
  "Natural & Pure",
  "Sealed for Freshness",
];

export default function TeakSpiceStore() {
  React.useEffect(() => {
    // Set page background from JS for single-file usage (since <body> tag can't be styled in a React component root)
    document.body.style = "";
    for (let k in styles.body) document.body.style[k] = styles.body[k];
    return () => { document.body.style = ""; };
  }, []);
  
  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>🌿 Kridion </div>
        <div style={styles.tagline}>Premium Kitchen Essentials & Authentic Spices</div>
      </header>

      {/* Company Info */}
      <div style={styles.companyInfo}>
        <h3 style={styles.companyTitle}>📋 Company Information</h3>
        <div style={styles.companyDetails}>
          <div style={styles.detailItem}>
            <div style={styles.detailLabel}>GSTIN Number</div>
            <div style={styles.detailValue}>2322143452342</div>
          </div>
          <div style={styles.detailItem}>
            <div style={styles.detailLabel}>Business Type</div>
            <div style={styles.detailValue}>Premium Kitchen Essentials & Spices</div>
          </div>
          <div style={styles.detailItem}>
            <div style={styles.detailLabel}>Established</div>
            <div style={styles.detailValue}>Serving quality since 2023</div>
          </div>
          <div style={styles.detailItem}>
            <div style={styles.detailLabel}>Specialty</div>
            <div style={styles.detailValue}>Handcrafted Wood Products & Authentic Spices</div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div style={styles.productsSection}>
        <h2 style={styles.sectionTitle}>🛍️ Our Premium Products</h2>
        <div style={styles.productsGrid}>
          {/* Product 1: Teak Chopping Board */}
          <div style={styles.productCard}>
            <div style={styles.productImage}>🪵</div>
            <h2 style={styles.productTitle}>Premium Teak Wood Chopping Board</h2>
            <p style={styles.productDescription}>
              Handcrafted from sustainable teak wood, each board is unique with beautiful grain patterns. Perfect for all your kitchen needs with natural antimicrobial properties.
            </p>
            <div style={styles.productPrice}>Starting ₹999</div>
            <div style={styles.productFeatures}>
              <h4 style={styles.featuresTitle}>Key Features</h4>
              <ul style={styles.featuresList}>
                {featuresTeak.map((f, idx) => (
                  <li key={idx} style={styles.featureLi}>
                    <span style={styles.featureIcon}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Product 2: Elaichi */}
          <div style={styles.productCard}>
            <div style={styles.productImage}>🌿</div>
            <h2 style={styles.productTitle}>Premium Green Elaichi (Cardamom)</h2>
            <p style={styles.productDescription}>
              Fresh, aromatic green cardamom pods sourced from the finest plantations. Perfect for teas, desserts, and traditional cooking. Premium quality guaranteed.
            </p>
            <div style={styles.productPrice}>Starting ₹399 @100 gm</div>
            <div style={styles.productFeatures}>
              <h4 style={styles.featuresTitle}>Product Details</h4>
              <ul style={styles.featuresList}>
                {featuresElaichi.map((f, idx) => (
                  <li key={idx} style={styles.featureLi}>
                    <span style={styles.featureIcon}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div style={styles.contactSection}>
        <h2 style={styles.contactTitle}>📞 Get in Touch</h2>
        <p>For orders, inquiries, or custom requirements, please contact us:</p>
        <div style={styles.contactInfo}>
          <div style={styles.contactItem}>
            <h4 style={styles.contactItemH4}>📧 Email</h4>
            <p>info@kridion.com</p>
          </div>
          <div style={styles.contactItem}>
            <h4 style={styles.contactItemH4}>📱 Phone</h4>
            <p>+91 98765 43210</p>
          </div>
          <div style={styles.contactItem}>
            <h4 style={styles.contactItemH4}>⏰ Business Hours</h4>
            <p>Mon-Sat: 9:00 AM - 6:00 PM</p>
          </div>
          <div style={styles.contactItem}>
            <h4 style={styles.contactItemH4}>🚚 Delivery</h4>
            <p>Pan India Shipping Available</p>
          </div>
        </div>
      </div>
    </div>
  );
}
