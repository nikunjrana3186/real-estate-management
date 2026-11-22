export default function SearchFilters({ filters, onChange, onReset }) {
  const handle = (e) => onChange({ ...filters, [e.target.name]: e.target.value });
  return (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-body">
        <div className="row g-2">
          <div className="col-12 col-md-4 col-xl-3">
            <input className="form-control" name="search" placeholder="Search by name" value={filters.search} onChange={handle} />
          </div>
          <div className="col-12 col-md-4 col-xl-2">
            <input className="form-control" name="location" placeholder="Location" value={filters.location} onChange={handle} />
          </div>
          <div className="col-6 col-md-4 col-xl-2">
            <select className="form-select" name="type" value={filters.type} onChange={handle}>
              <option value="">All types</option>
              <option>Residential</option>
              <option>Commercial</option>
            </select>
          </div>
          <div className="col-6 col-md-4 col-xl-2">
            <select className="form-select" name="status" value={filters.status} onChange={handle}>
              <option value="">All statuses</option>
              <option>Available</option>
              <option>Sold</option>
              <option>Rented</option>
            </select>
          </div>
          <div className="col-6 col-md-4 col-xl-1">
            <input className="form-control" type="number" min="0" name="minPrice" placeholder="Min ₹" value={filters.minPrice} onChange={handle} />
          </div>
          <div className="col-6 col-md-4 col-xl-1">
            <input className="form-control" type="number" min="0" name="maxPrice" placeholder="Max ₹" value={filters.maxPrice} onChange={handle} />
          </div>
          <div className="col-12 col-md-4 col-xl-1 d-grid">
            <button className="btn btn-outline-secondary" onClick={onReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
