import { NavLink } from 'react-router-dom';

export default function Sidebar({ open, onClose }) {
  const link = ({ isActive }) => `nav-link ${isActive ? 'active' : ''}`;
  return (
    <>
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">
          <i className="bi bi-buildings me-2" />
          EstateManager
        </div>
        <nav className="nav flex-column mt-2" onClick={onClose}>
          <NavLink to="/" end className={link}>
            <i className="bi bi-speedometer2 me-2" />
            Dashboard
          </NavLink>
          <NavLink to="/properties" end className={link}>
            <i className="bi bi-house-door me-2" />
            Properties
          </NavLink>
          <NavLink to="/properties/add" className={link}>
            <i className="bi bi-plus-circle me-2" />
            Add Property
          </NavLink>
        </nav>
      </aside>
      <div className={`backdrop ${open ? 'show' : ''}`} onClick={onClose} />
    </>
  );
}
