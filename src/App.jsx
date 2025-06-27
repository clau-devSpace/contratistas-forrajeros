import { Routes, Route } from 'react-router-dom';
import Layout from './TheNew/Layout.jsx';
import Home from './pages/home';
import Socios from './pages/socios';
import AreaEconomica from './components/areaEconomica.jsx';

 export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="socios" element={<Socios />} />
        <Route path="areaEconomica"  element={<AreaEconomica 
        url="https://ensiladores.com.ar/InfoSocios/SeccionEcoPrincipal.php"
        tittle="Área Económica"/>} 
        />
      </Route>
    </Routes>
  );
}

