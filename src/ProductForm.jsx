import { useState, useEffect } from "react";

const ProductForm = () => {
  const [productId, setProductId] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [productName, setProductName] = useState("");
  const [totalValue, setTotalValue] = useState(0);

  const handleProductIdChange = (e) => {
    setProductId(e.target.value);
  };

  const handleSellingPriceChange = (e) => {
    setSellingPrice(e.target.value);
  };

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleStoreDetails = () => {
    const existingDetails =
      JSON.parse(localStorage.getItem("productDetails")) || [];
    const newProduct = { productId, sellingPrice, productName };
    const updatedDetails = [...existingDetails, newProduct];
    localStorage.setItem("productDetails", JSON.stringify(updatedDetails));
    alert("Product details stored in local storage.");
  };

  useEffect(() => {
    // Calculate the total value worth of products based on selling prices
    const calculateTotalValue = () => {
      const productDetails =
        JSON.parse(localStorage.getItem("productDetails")) || [];
      const total = productDetails.reduce(
        (acc, product) => acc + parseFloat(product.sellingPrice || 0),
        0
      );
      setTotalValue(total.toFixed(2));
    };

    calculateTotalValue();
  }, []);

  return (
    <div>
      <h1>Product Details Form</h1>
      <label>
        Product ID:
        <input type="text" value={productId} onChange={handleProductIdChange} />
      </label>
      <br />
      <label>
        Selling Price:
        <input
          type="text"
          value={sellingPrice}
          onChange={handleSellingPriceChange}
        />
      </label>
      <br />
      <label>
        Product Name:
        <input
          type="text"
          value={productName}
          onChange={handleProductNameChange}
        />
      </label>
      <br />
      <button onClick={handleStoreDetails}>Store Details</button>
      <div>
        <strong>Total Value Worth of Products:</strong> ${totalValue}
      </div>
    </div>
  );
};

export default ProductForm;
