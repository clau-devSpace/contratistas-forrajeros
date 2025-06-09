import { Outlet } from 'react-router-dom';
import Menu from '../components/Menu';
import Footer from '../components/Footer';

function Layout() {
  return (
    <>
      <Menu />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
