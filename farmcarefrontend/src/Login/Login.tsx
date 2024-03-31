import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import useCustomFetch from "../Hooks/useCustomFetch";

import {
  LoginButton,
  LoginComponent,
  LoginIcon,
  LoginInput,
  LoginInputBox,
  LoginLabel,
  LoginLink,
  LoginLinkA,
  LoginTitle,
  LoginWrapper,
} from "./Login.css";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios
      .post("http://localhost:4000/api/auth/login", {
        email: username,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        setErrorMessage("");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.data.role);
        localStorage.setItem("user_id", response.data.data.id);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <LoginComponent>
      <LoginWrapper>
        <form onSubmit={handleSubmit}>
          <LoginTitle>Login</LoginTitle>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <LoginInputBox>
            <LoginLabel htmlFor="username">Username</LoginLabel>
            <LoginInput
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <LoginIcon>
              <FaUser />
            </LoginIcon>
          </LoginInputBox>
          <LoginInputBox>
            <LoginLabel htmlFor="password">Password</LoginLabel>
            <LoginInput
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <LoginIcon>
              <FaLock />
            </LoginIcon>
          </LoginInputBox>
          <LoginButton>Login</LoginButton>
          <LoginLink>
            Don't have an account?{" "}
            <LoginLinkA to="/auth/register">Register</LoginLinkA>
          </LoginLink>
        </form>
      </LoginWrapper>
    </LoginComponent>
  );
}
