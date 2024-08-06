import { HomeRoute } from './routes/home.route';
import { AdminRoute } from './routes/admin.route';
import { AjoutRoute } from './routes/ajout.route';
import { SculpturesRoute } from './routes/sculptures.route';
import { DessinsRoute } from './routes/dessins.route';
import { PeinturesRoute } from './routes/peintures.route';


import { SculpturesAdminRoute } from './routes/sculpturesAdmin.route';
import { DessinsAdminRoute } from './routes/dessinsAdmin.route';
import { PeinturesAdminRoute } from './routes/peinturesAdmin.route';

import { ModifierRoute } from './routes/modifier.route';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './routes/login.route';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminRoute />} />
          <Route path="/Ajout" element={<AjoutRoute />} />
          <Route path="/Modifier/:_id" element={<ModifierRoute />} />
          <Route path="/Peintures" element={<PeinturesRoute />} />
          <Route path="/Dessins" element={<DessinsRoute />} />
          <Route path="/Sculptures" element={<SculpturesRoute />} />
          <Route path="/PeinturesAdmin" element={<PeinturesAdminRoute />} />
          <Route path="/DessinsAdmin" element={<DessinsAdminRoute />} />
          <Route path="/SculpturesAdmin" element={<SculpturesAdminRoute />} />
        </Routes>
      </BrowserRouter>
      </>
  );
}

export const Home = () => {
  HomeRoute();
};

export const Admin = () => {
  AdminRoute();
};

export const Ajout = () => {
  AjoutRoute();
};

export const Modifier = () => {
  ModifierRoute();
};

export const Peintures = () => {
  PeinturesRoute();
};

export const Dessins = () => {
  DessinsRoute();
};

export const Sculptures = () => {
  SculpturesRoute();
};

export const PeinturesAdmin = () => {
  PeinturesAdminRoute();
};

export const DessinsAdmin = () => {
  DessinsAdminRoute();
};

export const SculpturesAdmin = () => {
  SculpturesAdminRoute();
};

export default App;