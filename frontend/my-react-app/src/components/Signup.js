import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }

    //   Always add sqare brackets in the useEffect, so that it doesn't execute every time the component re-renders
    // Otherwise very bad for performance, and code quality./
  }, []);

  // Better way to do it;

  const submit = async (event) => {
    // This line is to prevent the default behaviour of the browser. It prevent auto submission of the form.
    event.preventDefault();

    // Do submit logic here.
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    localStorage.setItem("user", JSON.stringify(result));
    if (result) {
      navigate("/");
    }
  };

  //   const collectData = async () => {
  //     if (!email || !password || !name) {
  //       // Do something when any of these is missing.
  //       // Example:
  //       alert("Please enter all credentials.");

  //       // Add return in last so that the code doesn't execute further;
  //       return;
  //     }

  //     let result = await fetch("http://localhost:5000/register", {
  //       method: "post",
  //       body: JSON.stringify({ name, email, password }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     result = await result.json();
  //     console.warn(result);
  //     localStorage.setItem("user", JSON.stringify(result));
  //     if (result) {
  //       navigate("/");
  //     }
  //   };

  return (
    <div className="reg">
      <h1>Register</h1>
      <form onSubmit={submit}>
        <input
          className="input"
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          value={name}
          required
        />
        <input
          className="input"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          value={email}
          required
        />
        <input
          className="input"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          value={password}
          required
        />
        <button className="btt" type="submit">
          SignUp
        </button>
      </form>
    </div>
  );
};

export default Signup;
