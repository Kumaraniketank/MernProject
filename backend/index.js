const express = require("express");
const cors = require("cors");
require("./db/config");
const user = require("./db/user");
const Product = require("./db/Product");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  let User = new user(req.body);
  let result = await User.save();
  result = result.toObject();
  delete result.password;

  resp.send(result);
});

app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let User = await user.findOne(req.body).select("-password");
    if (User) {
      resp.send(User);
    } else {
      resp.send({ result: "No user Found" });
    }
  } else {
    resp.send({ result: "No user Found" });
  }
});
app.post("/add", async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});
app.get("/", async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "No Products Found" });
  }
});
app.delete("/products/:id", async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/product/:id", async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No Record Found." });
  }
});
app.put("/product/:id", async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.get("/search/:key", async (req, resp) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});

// function verifyToken(req, resp, next) {
//   let token = req.headers["authorization "];
//   if (token) {
//     token = token.split(" ")[1];
//     Jwt.verify(token, jwtKey, (err, valid) => {
//       if (err) {
//         resp.status(401).send({ result: "Please provide valid token" });
//       } else {
//         next();
//       }
//     });
//   } else {
//     resp.status(403).send({ result: "Please add token with header" });
//   }
//   console.warn("middlewar called", token);
//   next();
// }

app.listen(5000);
