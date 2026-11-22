import { Link } from 'react-router-dom';

export default function Navbar({ onMenuClick }) {
  return (
    <nav className="navbar bg-white border-bottom px-3 sticky-top">
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-outline-secondary d-lg-none" onClick={onMenuClick} aria-label="Open menu">
          <i className="bi bi-list" />
        </button>
        <span className="fw-semibold">Real Estate Property Management</span>
      </div>
      {/* <Link to="/properties/add" className="btn btn-primary btn-sm">
        <i className="bi bi-plus-lg me-1" />
        Add Property
      </Link> */}
    </nav>
  );
}
