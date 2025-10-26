import { Routes, Route } from 'react-router-dom';
import Layout from './TheNew/Layout.jsx';
import Home from './pages/home';
import Socios from './pages/socios';
import AreaEconomica from './components/areaEconomica.jsx';
import Convenios from './pages/convenios';
import Contacto from './pages/contacto.jsx';
import Mapa from './pages/mapa.jsx';
import ComisionDirectiva from './pages/ComisionDirectiva.jsx';
import CACFInfo from './pages/mision-vision-valores.jsx';
import Estadisticas from './pages/estadisticas.jsx';
import TablaGeneral from './pages/TablaGeneral.jsx';

 export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="socios" element={<Socios />} />
        <Route path="TablaGeneral" element={<TablaGeneral />} />
        <Route path='mapa' element={<Mapa 
        url="https://ensiladores.com.ar/InfoSocios/Maps/MapaSociosAgrupado.php"/>}
        />
         <Route path="convenios" element={<Convenios />} />
         <Route path='estadisticas' element={<Estadisticas />} />
         <Route path="contacto" element={<Contacto />} />
         <Route path="ComisionDirectiva" element={<ComisionDirectiva />} />
         <Route path="mision-vision-valores" element={<CACFInfo />} />
      </Route>
    </Routes>
  );
}

