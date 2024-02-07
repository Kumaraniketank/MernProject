import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/");
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/products/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getProducts();
      alert("Product is deleting..........");
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        className="search"
        type="test"
        placeholder="Search Product"
        onChange={searchHandle}
      />
      <b>
        <ul>
          <li>S.No.</li>
          <li>Name</li>
          <li>Price</li>
          <li>Category</li>
          <li>Company</li>
          <li>Operation</li>
        </ul>
      </b>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>
              <b>S.No.:</b> {index + 1}
            </li>
            <li>
              <b>Name:</b> {item.name}
            </li>
            <li>
              <b>Price:</b> ${item.price}
            </li>
            <li>
              <b>Category:</b> {item.category}
            </li>
            <li>
              <b>Company:</b> {item.company}
            </li>
            <li>
              <button onClick={() => deleteProduct(item._id)}>Delete</button>
              <Link to={"/update/" + item._id} className="link">
                Update
              </Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Result Found</h1>
      )}
    </div>
  );
};

export default ProductList;
