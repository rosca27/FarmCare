import React, { useEffect, useState } from "react";
import useCustomFetch from "../../Hooks/useCustomFetch";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import {
  UserDetailTitle,
  UserInfoContainer,
} from "../UserDetailPage/UserDetailPage.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { CreateButton } from "../Users/Users.css";
import {
  FarmDetailButton,
  FarmDetailCard,
  FarmDetailInfoContainer,
  FarmDetailsListContainer,
  FarmPropertyWrapper,
  TitleComponent,
} from "../FarmDetailPage/FarmDetailPage.css";
import {
  CropDetailMainBody,
  CropDetailPageContainer,
  CropInfoWrapper,
  CropsPropertiesWrapper,
} from "../CropDetails/CropDetails.css";
import { NotificationsInfoWrapper } from "./Notifications.css";

export const Notifications = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const { data: notificationList, customFetch: notificationsFetcher } =
    useCustomFetch(`http://localhost:4000/api/notifications/farm/${id}`, "GET");

  useEffect(() => {
    notificationsFetcher(token as string);
  }, [token, id]);

  useEffect(() => {
    if (notificationList) {
      setNotifications((notificationList as any).data);
    }
  }, [notificationList]);

  return (
    <CropDetailPageContainer>
      <Sidebar />
      <CropDetailMainBody>
        <UserDetailTitle>Notifications</UserDetailTitle>
        <NotificationsInfoWrapper>
          <CropsPropertiesWrapper>
            <FarmPropertyWrapper>
              <FarmDetailInfoContainer>
                {notifications.length > 0 ? (
                  <div>
                    <FarmDetailsListContainer>
                      {notifications.map((notification: any) => (
                        <div
                          onClick={() =>
                            navigate(`/notifications/${notification.id}`)
                          }
                        >
                          <FarmDetailCard key={notification.id}>
                            <h2>{notification.title}</h2>
                            <p>{notification.message}</p>
                          </FarmDetailCard>
                        </div>
                      ))}
                    </FarmDetailsListContainer>
                  </div>
                ) : (
                  <p>No notifications found!</p>
                )}
              </FarmDetailInfoContainer>
            </FarmPropertyWrapper>
          </CropsPropertiesWrapper>
        </NotificationsInfoWrapper>
      </CropDetailMainBody>
    </CropDetailPageContainer>
  );
};
