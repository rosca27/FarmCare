import styled from "styled-components";

export const UserDetailPageContainer = styled.div`
  display: flex;
  background: url("../../images/pexels-karol-wiśniewski-878297.jpg") no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
`;

export const UserDetailMainBody = styled.div`
  background-color: transparent;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 95%;
  border-radius: 10px;
  color: white;
  padding: 20px;
  overflow-y: auto;
`;

export const UserDetailTitle = styled.h1`
  text-align: center;
  font-size: 3rem;
  color: white;
  @media screen and (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const UserInfoContainer = styled.div`
  padding: 20px;
  margin: 20px;
  justify-content: center;
  font-size: 1.3rem;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const FarmInfoContainer = styled.div`
  padding: 20px;
  overflow-y: auto;
  flex-direction: column;
  justify-content: center;
  font-size: 1.5rem;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const ListContainer = styled.div`
  padding: 20px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

export const FarmInfoWrapper = styled.div`
  display: flex;
  height: 100%;
  padding-left: 20px;
  padding-top: 20px;
  margin: 20px;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.1);
`;
