import React, { useState, useEffect } from "react";
import {
  CreateButton,
  UserComponent,
  UserComponentList,
  UserComponenth1,
  UserTable,
  UserTableContainer,
} from "./Users.css";
import useCustomFetch from "../../Hooks/useCustomFetch";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Card from "../../Components/Card";
import { useNavigate } from "react-router-dom";

export function Users() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { data, customFetch: userFetcher } = useCustomFetch(
    "http://localhost:4000/api/users",
    "GET"
  );

  useEffect(() => {
    userFetcher(token as string);
  }, []);

  useEffect(() => {
    if (data) {
      setUsers((data as any).data);
    }
  }, [data]);

  return (
    <UserComponent>
      <Sidebar />
      <UserComponentList>
        <UserComponenth1>User List</UserComponenth1>
        <CreateButton onClick={() => navigate("/users/create")}>
          Create user
        </CreateButton>
        <UserTableContainer>
          {users.map((user: any) => (
            <div onClick={() => navigate(`/users/details/${user.id}`)}>
              <Card key={user.id}>
                <h2>
                  {user.first_name} {user.last_name}
                </h2>
                <p>
                  <strong>Age:</strong> {user.age}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Role:</strong> {user.role}
                </p>
              </Card>
            </div>
          ))}
        </UserTableContainer>
      </UserComponentList>
    </UserComponent>
  );
}
