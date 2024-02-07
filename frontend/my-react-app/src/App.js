import "./App.css";
import Nav from "./components/nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/footer";
import Signup from "./components/Signup";
import PrivateComponent from "./components/privatecomponent";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import UpdateProduct from "./components/UpdateProduct";
import About from "./components/about";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>logout Listing</h1>} />
            <Route path="/about" element={<About />} />
          </Route>

          <Route path="/Signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
