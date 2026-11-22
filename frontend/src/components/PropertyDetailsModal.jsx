import { formatCurrency, formatDate } from '../utils/format';
import StatusBadge from './StatusBadge';

export default function PropertyDetailsModal({ property, onClose }) {
  if (!property) return null;
  const rows = [
    ['Type', property.propertyType],
    ['Location', property.location],
    ['Price', formatCurrency(property.price)],
    ['Area', `${property.area.toLocaleString('en-IN')} sq ft`],
    ['Bedrooms', property.bedrooms ?? '-'],
    ['Bathrooms', property.bathrooms ?? '-'],
    ['Created', formatDate(property.createdAt)],
  ];
  return (
    <>
      <div className="modal d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{property.propertyName}</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <StatusBadge status={property.status} />
              </div>
              <p className="text-muted">{property.description}</p>
              <dl className="row mb-0">
                {rows.map(([label, value]) => (
                  <div className="d-flex" key={label}>
                    <dt className="col-4">{label}</dt>
                    <dd className="col-8">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
}
