import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const auth = localStorage.getItem("userdata");
    if (auth) {
      navigate("/");
    }
  }, []);
  const handlesubmit = async () => {
    let response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    localStorage.setItem("auth", JSON.stringify(response.auth));
    localStorage.setItem("userdata", JSON.stringify(response.result));
    navigate("/login");
  };

  return (
    <div className="register">
      <h1>Signup</h1>
      <input
        type="text"
        className="inputBox"
        placeholder="enter Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        className="inputBox"
        placeholder="enter Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="inputBox"
        placeholder="enter Your Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button className="appButton" type="button" onClick={handlesubmit}>
        Signup
      </button>
    </div>
  );
};

export default SignUp;
