// Users.js
import React, { useState, useEffect } from "react";
import {
  UserComponent,
  UserComponentList,
  UserComponenth1,
  UserTable,
} from "./Users.css";
import useCustomFetch from "../Hooks/useCustomFetch";
import Sidebar from "../Components/Sidebar/Sidebar";

export function Users() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

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
      <UserComponenth1>User List</UserComponenth1>
      <UserComponentList>
        <UserTable>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user.id}>
                <td>
                  {user.first_name} {user.last_name}
                </td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </UserTable>
      </UserComponentList>
    </UserComponent>
  );
}
