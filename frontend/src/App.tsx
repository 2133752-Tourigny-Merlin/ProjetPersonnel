import { HomeRoute } from './routes/home.route';
import { AjoutRoute } from './routes/ajout.route';
import { SculpturesRoute } from './routes/sculptures.route';
import { DessinsRoute } from './routes/dessins.route';
import { PeinturesRoute } from './routes/peintures.route';
import { ModifierRoute } from './routes/modifier.route';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './routes/login.route';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomeRoute />} />
          <Route path="/Ajout" element={<AjoutRoute />} />
          <Route path="/Modifier" element={<ModifierRoute />} />
          <Route path="/Peintures" element={<PeinturesRoute />} />
          <Route path="/Dessins" element={<DessinsRoute />} />
          <Route path="/Sculptures" element={<SculpturesRoute />} />
        </Routes>
      </BrowserRouter>
      </>
  );
}

export const Home = () => {
  HomeRoute();
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

export default App;