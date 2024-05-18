import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Pages/Home/HomePage";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import RegisterPage from "./Pages/Register/RegisterPage";
import LoginPage from "./Pages/Login/LoginPage";
import ResetPasswordPage from "./Pages/ResetPassword/ResetPasswordPage";
import AddPetPage from "./Pages/AddPet/AddPetPage";
import AddSickPetPage from "./Pages/AddSickPet/AddSickPetPage";
import EditPetPage from "./Pages/EditPet/EditPetPage";
import EditPetPhotoPage from "./Pages/EditPetPhoto/EditPetPhotoPage";
import EditProfilePage from "./Pages/EditProfile/EditProfilePage";
import EditSickPetPage from "./Pages/EditSickPet/EditSickPetPage";
import EditSickPetPhotoPage from "./Pages/EditSickPetPhoto/EditSickPetPhotoPage";
import TokensPage from "./Pages/Tokens/TokensPage";
import LoggedRoute from "./Routing/LoggedRoute";
import PetsToAdoptPage from "./Pages/PetsToAdopt/PetsToAdoptPage";
import SickPetsPage from "./Pages/SickPets/SickPetsPage";
import PetToAdoptPage from "./Pages/PetToAdopt/PetToAdoptPage";
import MyPetsPage from "./Pages/MyPets/MyPetsPage";
import SavedPetsPage from "./Pages/SavedPets/SavedPetsPage";
import UsersPage from "./Pages/Users/UsersPage";
import SickPetsManagerPage from "./Pages/SickPetsManager/SickPetsManagerPage";
import MessagesPage from "./Pages/Messages/MessagesPage";
import AdminRoute from "./Routing/AdminRoute";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} ></Route>
      <Route path="/register" element={<RegisterPage />} ></Route>
      <Route path="/login" element={<LoginPage />} ></Route>
      <Route path="/reset-password" element={<ResetPasswordPage />} ></Route>
      <Route path="/pets-to-adopt" element={<PetsToAdoptPage />} ></Route>

      <Route path="/my-pets" element={<LoggedRoute><MyPetsPage /></LoggedRoute>} ></Route>
      <Route path="/saved-pets" element={<LoggedRoute><SavedPetsPage /></LoggedRoute>} ></Route>
      <Route path="/pets-to-adopt/:id" element={<LoggedRoute><PetToAdoptPage /></LoggedRoute>} ></Route>
      <Route path="/add-pet" element={<LoggedRoute><AddPetPage /></LoggedRoute>} ></Route>
      <Route path="/my-pets/edit/:id" element={<LoggedRoute><EditPetPage /></LoggedRoute>} ></Route>
      <Route path="/my-pets/edit-photo/:id" element={<LoggedRoute><EditPetPhotoPage /></LoggedRoute>} ></Route>
      <Route path="/edit-profile" element={<LoggedRoute><EditProfilePage /></LoggedRoute>} ></Route>
      <Route path="/bundles" element={<LoggedRoute><TokensPage /></LoggedRoute>} ></Route>
      <Route path="/sick-pets" element={<LoggedRoute><SickPetsPage /></LoggedRoute>} ></Route>
      <Route path="/messages" element={<LoggedRoute><MessagesPage /></LoggedRoute>} ></Route>
      <Route path="/messages/:id" element={<LoggedRoute><MessagesPage /></LoggedRoute>} ></Route>

      
      <Route path="/users" element={<AdminRoute><UsersPage /></AdminRoute>} ></Route>
      <Route path="/sick-pets-manager" element={<AdminRoute><SickPetsManagerPage /></AdminRoute>} ></Route>
      <Route path="/sick-pets-manager/add" element={<AdminRoute><AddSickPetPage /></AdminRoute>} ></Route>
      <Route path="/sick-pets-manager/edit/:id" element={<AdminRoute><EditSickPetPage /></AdminRoute>} ></Route>
      <Route path="/sick-pets-manager/edit-photo/:id" element={<AdminRoute><EditSickPetPhotoPage /></AdminRoute>} ></Route>
    </Route>
  )
); 

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
