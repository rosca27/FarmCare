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
import { CreateSelect } from "../CreateUser/CreateUser.css";

export function FarmCreateEdit() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [users, setUsers] = useState([]);
  const [user_id, setUserId] = useState("");
  const [farm_id, setFarmId] = useState("");
  const { token, setToken } = useAuth();
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const { id } = useParams();
  const user_id_local = localStorage.getItem("user_id");

  const isEditMode = !!id;

  const {
    loading,
    error,
    data: createdFarmData,
    customFetch: farmFetcher,
  } = useCustomFetch(
    isEditMode
      ? `http://localhost:4000/api/farms/${id}`
      : "http://localhost:4000/api/farms",
    isEditMode ? "PUT" : "POST"
  );

  const { data: farmData, customFetch: getFarmFetcher } = useCustomFetch(
    `http://localhost:4000/api/farms/${id}`,
    "GET"
  );

  const { customFetch: deleteFarmFetcher } = useCustomFetch(
    `http://localhost:4000/api/farms/${id}`,
    "DELETE"
  );

  const { data: userList, customFetch: getUsersFetcher } = useCustomFetch(
    `http://localhost:4000/api/users`,
    "GET"
  );

  useEffect(() => {
    if (isEditMode) {
      getFarmFetcher(token as string);
    }
  }, []);

  useEffect(() => {
    getUsersFetcher(token as string);
  }, []);

  useEffect(() => {
    if (userList) {
      setUsers((userList as any).data);
    }
  }, [userList]);

  useEffect(() => {
    if (isEditMode && farmData) {
      const { name, id, user_id, location } = (farmData as any).data;
      setName(name);
      setLocation(location);
      setUserId(user_id);
      setFarmId(id);
    }
  }, [farmData]);

  const handleDelete = async () => {
    await deleteFarmFetcher(token as string, {})
      .then(() => {
        navigate("/farms");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (createdFarmData) {
      if (role === "admin") {
        navigate("/farms");
      } else {
        const farmId = (createdFarmData as any).data.id;
        navigate(`/farms/details/${farmId}`);
      }
    }
  }, [createdFarmData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await farmFetcher(token as string, {
        name: name,
        location: location,
        user_id: role === "admin" ? user_id : user_id_local,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginComponent>
      <LoginWrapper>
        <form onSubmit={handleSubmit}>
          <LoginTitle>{isEditMode ? "Edit Farm" : "Create Farm"}</LoginTitle>
          {error && (
            <div className="alert alert-danger">{(error as any).message}</div>
          )}
          <RegisterGroup>
            <LoginInputBox>
              <LoginLabel htmlFor="name">Name</LoginLabel>
              <LoginInput
                type="text"
                id="name"
                placeholder="Enter the farm's name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </LoginInputBox>
            <LoginInputBox>
              <LoginLabel htmlFor="location">Location</LoginLabel>
              <LoginInput
                type="text"
                id="location"
                placeholder="Enter the farms's location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </LoginInputBox>
          </RegisterGroup>
          {role === "admin" && (
            <LoginInputBox>
              <LoginLabel htmlFor="user_id">User</LoginLabel>
              <CreateSelect
                id="user_id"
                value={user_id}
                onChange={(e) => setUserId(e.target.value)}
                required
              >
                <option value="">Select User</option>
                {users.map((user: any) => (
                  <option key={user.id} value={user.id}>
                    {user.first_name} {user.last_name}
                  </option>
                ))}
              </CreateSelect>
            </LoginInputBox>
          )}
          <LoginButton type="submit">
            {isEditMode ? "Update Farm" : "Create Farm"}
          </LoginButton>
          {isEditMode && (
            <LoginButton onClick={handleDelete}>Delete Farm</LoginButton>
          )}
        </form>
      </LoginWrapper>
    </LoginComponent>
  );
}
