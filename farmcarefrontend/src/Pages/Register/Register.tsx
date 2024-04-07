import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useCustomFetch from "../../Hooks/useCustomFetch";

import {
  LoginButton,
  LoginComponent,
  LoginInput,
  LoginInputBox,
  LoginLabel,
  LoginLink,
  LoginLinkA,
  LoginTitle,
  LoginWrapper,
} from "../Login/Login.css";
import { RegisterGroup } from "../Register/Register.css";
import { useAuth } from "../../Context/AuthContext";

export function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { token, setToken } = useAuth();
  const stored_role = localStorage.getItem("role");
  const navigate = useNavigate();

  const { loading, error, data, customFetch } = useCustomFetch(
    "http://localhost:4000/api/auth/register",
    "POST"
  );

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios
      .post("http://localhost:4000/api/auth/register", {
        first_name: firstName,
        last_name: lastName,
        age: age,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        role: role,
      })
      .then((response) => {
        console.log(response.data);
        setErrorMessage("");
        setToken(response.data.token);
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
          <LoginTitle>Register</LoginTitle>
          {error && (
            <div className="alert alert-danger">{(error as any).message}</div>
          )}
          <RegisterGroup>
            <LoginInputBox>
              <LoginLabel htmlFor="firstName">First Name</LoginLabel>
              <LoginInput
                type="text"
                id="firstName"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </LoginInputBox>
            <LoginInputBox>
              <LoginLabel htmlFor="lastName">Last Name</LoginLabel>
              <LoginInput
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </LoginInputBox>
          </RegisterGroup>
          <LoginInputBox>
            <LoginLabel htmlFor="age">Age</LoginLabel>
            <LoginInput
              type="number"
              id="age"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </LoginInputBox>
          <LoginInputBox>
            <LoginLabel htmlFor="email">Email</LoginLabel>
            <LoginInput
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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
          </LoginInputBox>
          <LoginInputBox>
            <LoginLabel htmlFor="confirmPassword">Confirm Password</LoginLabel>
            <LoginInput
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </LoginInputBox>
          <LoginButton type="submit">Register</LoginButton>
          <LoginLink>
            Already have an account?{" "}
            <LoginLinkA to="/auth/login">Login</LoginLinkA>
          </LoginLink>
        </form>
      </LoginWrapper>
    </LoginComponent>
  );
}
