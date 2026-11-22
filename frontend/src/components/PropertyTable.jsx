import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { formatCurrency, formatDate } from '../utils/format';

const STATUSES = ['Available', 'Sold', 'Rented'];

export default function PropertyTable({ properties, onView, onDelete, onStatusChange, updatingId }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover mb-0">
        <thead className="table-light">
          <tr>
            <th>Property Name</th>
            <th>Type</th>
            <th>Location</th>
            <th>Price</th>
            <th>Area (sq ft)</th>
            <th>Status</th>
            <th>Created</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((p) => (
            <tr key={p._id}>
              <td className="fw-medium">{p.propertyName}</td>
              <td>{p.propertyType}</td>
              <td>{p.location}</td>
              <td>{formatCurrency(p.price)}</td>
              <td>{p.area.toLocaleString('en-IN')}</td>
              <td>
                <StatusBadge status={p.status} />
              </td>
              <td className="text-nowrap">{formatDate(p.createdAt)}</td>
              <td className="text-end text-nowrap">
                <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => onView(p)} title="View">
                  <i className="bi bi-eye" />
                </button>
                <Link to={`/properties/edit/${p._id}`} className="btn btn-sm btn-outline-primary me-1" title="Edit">
                  <i className="bi bi-pencil" />
                </Link>
                <div className="dropdown d-inline-block me-1">
                  <select
                    className="form-select form-select-sm d-inline-block w-auto"
                    value={p.status}
                    disabled={updatingId === p._id}
                    onChange={(e) => onStatusChange(p, e.target.value)}
                    aria-label="Change status"
                  >
                    {STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(p)} title="Delete">
                  <i className="bi bi-trash" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
