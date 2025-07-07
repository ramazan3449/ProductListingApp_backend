import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="App">
      <h2>Product List</h2>
      <div className="carousel">
        {products.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const [selectedColor, setSelectedColor] = useState("yellow");

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="product-card">
      <img
        src={product.images[selectedColor]}
        alt={`${product.name} - ${selectedColor}`}
      />
      <h3>{product.name}</h3>
      <p>${product.price} USD</p>
      <div className="selected-color">
        {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)} Gold
      </div>
      
      {/* Rating container with stars and text */}
      <div className="rating-container">
        <ReactStars
          count={5}
          value={product.rating}
          size={24}
          edit={false}
          activeColor="#ffcc00"
          isHalf={true}
        />
        <span className="rating-text">{product.rating.toFixed(1)}</span>
      </div>

      {/* Color swatches */}
      <div className="color-swatches">
        {Object.keys(product.images).map((color) => (
          <img
            key={color}
            src={product.images[color]}
            alt={color}
            onClick={() => handleColorChange(color)}
            className={`swatch ${selectedColor === color ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
