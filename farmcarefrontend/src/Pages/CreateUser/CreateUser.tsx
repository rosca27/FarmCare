import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
import { CreateSelect } from "./CreateUser.css";

export function CreateEditUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { token, setToken } = useAuth();
  const [user, setUser] = useState({});
  const stored_role = localStorage.getItem("role");
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = !!id;

  const {
    loading,
    error,
    data,
    customFetch: userFetcher,
  } = useCustomFetch(
    isEditMode
      ? `http://localhost:4000/api/users/${id}`
      : "http://localhost:4000/api/users",
    isEditMode ? "PUT" : "POST"
  );

  const { data: userData, customFetch: getUserFetcher } = useCustomFetch(
    `http://localhost:4000/api/users/${id}`,
    "GET"
  );

  useEffect(() => {
    if (!isEditMode && stored_role !== "admin") {
      navigate("/");
    }
  }, [token, isEditMode]);

  useEffect(() => {
    if (isEditMode) {
      getUserFetcher(token as string);
    }
  }, []);

  useEffect(() => {
    if (isEditMode && userData) {
      console.log(userData);
      const { first_name, last_name, age, email, role } = (userData as any)
        .data;
      setFirstName(first_name);
      setLastName(last_name);
      setAge(age);
      setEmail(email);
      setRole(role);
      console.log(firstName, lastName, age, email, role);
    }
  }, [userData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEditMode) {
      await userFetcher(token as string, {
        first_name: firstName,
        last_name: lastName,
        age: age,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        role: role,
      })
        .then((response) => {
          navigate("/users");
        })
        .catch((error) => {
          setErrorMessage(error.response.data.message);
        });
    } else {
      await userFetcher(token as string, {
        first_name: firstName,
        last_name: lastName,
        age: age,
        email: email,
        role: role,
      })
        .then((response) => {
          navigate("/users");
        })
        .catch((error) => {
          setErrorMessage(error.response.data.message);
        });
    }
  };

  return (
    <LoginComponent>
      <LoginWrapper>
        <form onSubmit={handleSubmit}>
          <LoginTitle>{isEditMode ? "Edit User" : "Create User"}</LoginTitle>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <RegisterGroup>
            <LoginInputBox>
              <LoginLabel htmlFor="firstName">First Name</LoginLabel>
              <LoginInput
                type="text"
                id="firstName"
                placeholder="Enter the user's first name"
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
                placeholder="Enter the user's last name"
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
              placeholder="Enter the user's age"
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
              placeholder="Enter the user's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </LoginInputBox>
          <LoginInputBox>
            <LoginLabel htmlFor="role">Role</LoginLabel>
            <CreateSelect
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select role</option>
              <option value="admin">admin</option>
              <option value="farmer">farmer</option>
            </CreateSelect>
          </LoginInputBox>
          {!isEditMode && (
            <>
              <LoginInputBox>
                <LoginLabel htmlFor="password">Password</LoginLabel>
                <LoginInput
                  type="password"
                  id="password"
                  placeholder="Enter the user's password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </LoginInputBox>
              <LoginInputBox>
                <LoginLabel htmlFor="confirmPassword">
                  Confirm Password
                </LoginLabel>
                <LoginInput
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm the user's password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </LoginInputBox>
            </>
          )}
          <LoginButton type="submit">
            {isEditMode ? "Update User" : "Create User"}
          </LoginButton>
        </form>
      </LoginWrapper>
    </LoginComponent>
  );
}
