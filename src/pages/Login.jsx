import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../context/UserContext";

const LoginWrapper = styled.div`
  background: linear-gradient(45deg, #f6d02f, #ff6f91);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  color: white;

  h2 {
    font-size: 2.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
    margin-bottom: 20px;
    text-align: center;
  }

  form {
    background: rgba(0, 0, 0, 0.4);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    width: 100%;
    max-width: 400px;
  }

  input {
    padding: 10px;
    font-size: 1rem;
    border-radius: 10px;
    border: 1px solid #ffd700;
    width: 100%;
    outline: none;

    &:focus {
      background-color: #ff6f91;
      color: white;
    }
  }

  button {
    background: #ffd700;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ff6f91;
      color: white;
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ email });
    navigate("/profile");
  };

  return (
    <LoginWrapper>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <button type="submit">Login</button>
      </form>
    </LoginWrapper>
  );
};

export default Login;
