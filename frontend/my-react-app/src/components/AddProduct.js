import React from "react";
import { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const addProduct = async (event) => {
    event.preventDefault();

    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    console.warn(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if (addProduct) {
      setShow(true);
      return false;
    }
  };

  return (
    <div className="res">
      {show && (
        <span className="success">
          <h3>Product Added Successfully</h3>
        </span>
      )}
      <h1>Add Product</h1>
      <form>
        <input
          className="product"
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          value={name}
          required
        />
        {error && !name && <span className="error">Enter valid Name</span>}
        <input
          className="product"
          type="text"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter product price"
          value={price}
          required
        />
        {error && !price && <span className="error">Enter valid price</span>}
        <input
          className="product"
          type="text"
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter product category"
          value={category}
          required
        />
        {error && !category && (
          <span className="error">Enter valid Category</span>
        )}
        <input
          className="product"
          type="text"
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Enter product company"
          value={company}
          required
        />
        {error && !company && (
          <span className="error">Enter valid Company</span>
        )}
        <button onClick={addProduct} className="btt" type="button">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
