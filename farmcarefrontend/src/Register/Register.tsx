import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
import { RegisterGroup } from "./Register.css";

export function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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
          <LoginTitle>Register</LoginTitle>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
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
