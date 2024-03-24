import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";
import { Users } from "./Users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/users" element={<Users />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
