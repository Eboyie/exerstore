import { Outlet } from 'react-router-dom';
import Navigation from './pages/Auth/Navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="">
      <ToastContainer />
      <main className="py-4">
        <Navigation />
      </main>
      <main className="pt-10">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
