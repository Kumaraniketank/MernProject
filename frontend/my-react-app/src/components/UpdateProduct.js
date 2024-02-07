import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.warn(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const updateProduct = async (event) => {
    event.preventDefault();
    console.warn(name, price, category, company);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    navigate("/");
    if (updateProduct) {
      setShow(true);
      return false;
    }
  };

  return (
    <div>
      {show && (
        <span className="success">
          <h3>Product Updateded Successfully</h3>
        </span>
      )}
      <h1>Update Product</h1>
      <form>
        <input
          className="product"
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Update product name"
          value={name}
        />

        <input
          className="product"
          type="text"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Update product price"
          value={price}
        />

        <input
          className="product"
          type="text"
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Update product category"
          value={category}
        />

        <input
          className="product"
          type="text"
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Update product company"
          value={company}
        />

        <button onClick={updateProduct} className="btt" type="button">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
