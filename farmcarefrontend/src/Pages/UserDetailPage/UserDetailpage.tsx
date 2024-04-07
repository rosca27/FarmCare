import React, { useEffect, useState } from "react";
import useCustomFetch from "../../Hooks/useCustomFetch";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import {
  FarmInfoContainer,
  FarmInfoWrapper,
  ListContainer,
  UserDetailMainBody,
  UserDetailPageContainer,
  UserDetailTitle,
  UserInfoContainer,
} from "./UserDetailPage.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Card from "../../Components/Card";
import { UserTableContainer } from "../Users/Users.css";

export const UserDetailpage = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [user, setUser] = useState();
  const [farms, setFarms] = useState([]);
  const navigate = useNavigate();
  const { data: userData, customFetch: userFetcher } = useCustomFetch(
    `http://localhost:4000/api/users/${id}`,
    "GET"
  );

  const { data: farmsList, customFetch: farmFetcher } = useCustomFetch(
    `http://localhost:4000/api/farms/user/${id}`,
    "GET"
  );

  useEffect(() => {
    userFetcher(token as string);
  }, [token, id]);

  useEffect(() => {
    farmFetcher(token as string);
  }, [token, id]);

  useEffect(() => {
    if (userData) {
      setUser((userData as any).data);
    }
  }, [userData]);

  useEffect(() => {
    if (farmsList) {
      setFarms((farmsList as any).data);
    }
  }, [farmsList]);

  return (
    <UserDetailPageContainer>
      <Sidebar />
      <UserDetailMainBody>
        <UserDetailTitle>User Detail</UserDetailTitle>
        <UserInfoContainer>
          {user && (
            <div>
              <h2>
                {(user as any).first_name} {(user as any).last_name}
              </h2>
              <p>
                <strong>Age:</strong> {(user as any).age}
              </p>
              <p>
                <strong>Email:</strong> {(user as any).email}
              </p>
              <p>
                <strong>Role:</strong> {(user as any).role}
              </p>
            </div>
          )}
        </UserInfoContainer>
        {farms.length > 0 && (
          <FarmInfoWrapper>
            <h2>Farms</h2>
            <FarmInfoContainer>
              {farms.length > 0 && (
                <div>
                  <ListContainer>
                    {farms.map((farm: any) => (
                      <div
                        onClick={() => navigate(`/farms/details/${farm.id}`)}
                      >
                        <Card key={farm.id}>
                          <h3>{farm.name}</h3>
                          <p>
                            <strong>Location:</strong> {farm.location}
                          </p>
                        </Card>
                      </div>
                    ))}
                  </ListContainer>
                </div>
              )}
            </FarmInfoContainer>
          </FarmInfoWrapper>
        )}
      </UserDetailMainBody>
    </UserDetailPageContainer>
  );
};

export default UserDetailpage;
