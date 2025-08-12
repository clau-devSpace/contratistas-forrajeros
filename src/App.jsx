import { Routes, Route } from 'react-router-dom';
import Layout from './TheNew/Layout.jsx';
import Home from './pages/home';
import Socios from './pages/socios';
import AreaEconomica from './components/areaEconomica.jsx';
import Convenios from './pages/convenios';
import Contacto from './pages/contacto.jsx';
import Mapa from './pages/mapa.jsx';
import JuntaDirectiva from './pages/JuntaDirectiva.jsx';
import CACFInfo from './pages/mision-vision-valores.jsx';
import Estadisticas from './pages/estadisticas.jsx';

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
        <Route path='mapa' element={<Mapa 
        url="https://ensiladores.com.ar/InfoSocios/Maps/MapaSociosAgrupado.php"/>}
        />
         <Route path="convenios" element={<Convenios />} />
         <Route path='estadisticas' element={<Estadisticas />} />
         <Route path="contacto" element={<Contacto />} />
         <Route path="JuntaDirectiva" element={<JuntaDirectiva />} />
         <Route path="mision-vision-valores" element={<CACFInfo />} />
      </Route>
    </Routes>
  );
}

