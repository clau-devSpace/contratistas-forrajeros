import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/home';
import Socios from './pages/socios';

 export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="socios" element={<Socios />} />
      </Route>
    </Routes>
  );
}

