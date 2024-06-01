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
import { FarmCreateEdit } from "./Pages/FarmCreateEdit/FarmCreateEdit";
import { InventoryCreateEdit } from "./Pages/InventoryCreateEdit/InventoryCreateEdit";
import { Inventories } from "./Pages/Inventories/Inventories";
import { PlantTypes } from "./Pages/PlantTypes/PlantTypes";
import { PlantTypeCreateEdit } from "./Pages/PlantTypeCreateUpdate/PlantTypeCreateUpdate";
import { CreateEditCost } from "./Pages/CostCreateEdit/CostCreateEdit";
import { Finances } from "./Pages/Finances/Finances";
import { Notifications } from "./Pages/Notifications/Notifications";
import { ImageUpload } from "./Pages/ImageUpload/ImageUpload";

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
            <Route path="/farms/:id" element={<FarmCreateEdit />} />
            <Route path="/farms/create" element={<FarmCreateEdit />} />
            <Route path="/inventories" element={<Inventories />} />
            <Route path="/inventories/:id" element={<InventoryCreateEdit />} />
            <Route
              path="/inventories/create"
              element={<InventoryCreateEdit />}
            />
            <Route path="/equipments/:id" element={<CreateEditEquipment />} />
            <Route
              path="/equipments/create"
              element={<CreateEditEquipment />}
            />
            <Route path="/finances/farm/:id" element={<Finances />} />
            <Route path="/notifications/farm/:id" element={<Notifications />} />
            <Route path="/plant-disease-classify" element={<ImageUpload />} />
          </Route>
          <Route path="/plant_types" element={<PlantTypes />} />
          <Route path="/plant_types/:id" element={<PlantTypeCreateEdit />} />
          <Route path="/plant_types/create" element={<PlantTypeCreateEdit />} />
          <Route path="/costs/:id" element={<CreateEditCost />} />
          <Route path="/costs/create" element={<CreateEditCost />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
