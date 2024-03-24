import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Components/Card/index";
import "./Users.css";

export function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="container">
      <div className="user-list">
        <h1>User List</h1>
        <ul className="list-group">
          {users.map((user: any) => (
            <Card key={user.id}>
              <div className="user-label inline">
                {user.first_name} {user.last_name}
              </div>
              <div className="user-label">{user.age}</div>
              <div className="user-label">{user.email}</div>
              <div className="user-label">{user.role}</div>
            </Card>
          ))}
        </ul>
      </div>
    </div>
  );
}
