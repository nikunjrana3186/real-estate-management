import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import AddProperty from './pages/AddProperty';
import EditProperty from './pages/EditProperty';

function NotFound() {
  return (
    <div className="text-center py-5">
      <h4>Page not found</h4>
      <Link to="/">Back to dashboard</Link>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="layout">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="main">
        <Navbar onMenuClick={() => setMenuOpen(true)} />
        <main className="p-3 p-md-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/add" element={<AddProperty />} />
            <Route path="/properties/edit/:id" element={<EditProperty />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
