import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
import { Users } from "./Pages/Users/Users";
import { CreateEditUser } from "./Pages/CreateUser/CreateUser";
import AuthProvider from "./Context/AuthContext";
import PrivateRoutes from "./Utils/ProtectedRoute";
import { Home } from "./Pages/Home/Home";
import { Farms } from "./Pages/Farms/Farms";
import { UserDetailpage } from "./Pages/UserDetailPage/UserDetailpage";
import { FarmDetailpage } from "./Pages/FarmDetailPage/FarmDetailPage";
import { CreateEditEquipment } from "./Pages/CreateEquipment/CreateEquipment";
import { Equipments } from "./Pages/Equipments/Equipments";
import { Crops } from "./Pages/Crops/Crops";
import { CropDetails } from "./Pages/CropDetails/CropDetails";
import { CropCreateEdit } from "./Pages/CropCreateUpdate/CropCreateUpdate";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/create" element={<CreateEditUser />} />
            <Route path="/users/:id" element={<CreateEditUser />} />
            <Route path="/users/details/:id" element={<UserDetailpage />} />
            <Route path="/farms/details/:id" element={<FarmDetailpage />} />
            <Route path="/farms" element={<Farms />} />
            <Route path="/equipments" element={<Equipments />} />
            <Route path="/crops" element={<Crops />} />
            <Route path="/crops/details/:id" element={<CropDetails />} />
            <Route path="/crops/:id" element={<CropCreateEdit />} />
            <Route path="/crops/create" element={<CropCreateEdit />} />
            <Route path="/equipments/:id" element={<CreateEditEquipment />} />
            <Route
              path="/equipments/create"
              element={<CreateEditEquipment />}
            />
          </Route>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
