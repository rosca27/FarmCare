// @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

import styled from "styled-components";

// .register-wrapper {
//   height: 100vh;
//   width: 100vw;
//   font-family: 'Poppins', sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   justify-content: center;
//   display: flex;
//   align-items: center;
//   background: url('../../public/images/pexels-tom-fisk-1595104.jpg')
//   no-repeat;
//   background-size: cover;
//   background-position: center bottom;
// }

// @media only screen and (max-device-width: 428px) {
//   body {
//     background-position: center bottom;
//   }
//   .wrapper {
//     padding: 20px;
//   }
// }

//  .wrapper {
//   width: 100%;
//   height: 100%;
//   color: #fff;
//   background: transparent;
//   border: 2px solid rgba(255, 255, 255, .2);
//   backdrop-filter: blur(10px);
//   box-shadow: 0 0 10px rgba(0, 0, 0, .1);
//   border-radius: 10px;
//   padding: 30px 40px;
// }

// .wrapper h2 {
//   font-size: 36px;
//   text-align: center;
// }

// .wrapper .input-box {
//   position: relative;
//   width: 100%;
//   height: 50px;
//   margin: 30px 0;
// }

// .input-box input {
//   width: 100%;
//   height: 100%;
//   background: transparent;
//   border: none;
//   outline: none;
//   border: 2px solid rgba(255, 255, 255, .2);
//   border-radius: 40px;
//   font-size: 16px;
//   color: white;
//   padding: 20px 45px 20px 20px;
// }

// .input-box input::placeholder {
//   color: white;
// }

// .input-box .icon {
//   position: absolute;
//   top: 100%;
//   right: 20px;
//   transform: translateY(-50%);
//   font-size: 16px;
//   color: #fff;
// }

// .wrapper button {
//   width: 100%;
//   height: 45px;
//   border: none;
//   outline: none;
//   background: #fff;
//   border-radius: 40px;
//   font-size: 16px;
//   color: black;
//   font-weight: 500;
//   margin-top: 10px;
// }

// .wrapper .register-link {
//   font-size: 14.5px;
//   text-align: center;
//   margin-top: 20px;
// }
// .register-link p a {
//   color: #fff;
//   text-decoration: none;
//   font-weight: 500;
// }

// .input-group{
// display: flex;
// justify-content: space-between;
// }

// .input-group .input-box {
//     width: calc(50% - 15px);
// }

// label {
//     font-size: 16px;
//     color: white;
//     font-weight: 500;
//     margin-bottom: 5px;
//     display: block;
// }

export const RegisterComponent = styled.div`
  height: 100vh;
  width: 100vw;
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  justify-content: center;
  display: flex;
  align-items: center;
  background: url("../../public/images/pexels-tom-fisk-1595104.jpg") no-repeat;
  background-size: cover;
  background-position: center bottom;
`;

export const RegisterGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;
