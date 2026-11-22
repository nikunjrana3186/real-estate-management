import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EMPTY = {
  propertyName: '',
  propertyType: 'Residential',
  description: '',
  location: '',
  price: '',
  area: '',
  bedrooms: '',
  bathrooms: '',
  status: 'Available',
};

// Used for both Add and Edit. `initialData` is filled in Edit mode.
export default function PropertyForm({ initialData, onSubmit, submitting, submitLabel = 'Save Property' }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(() => ({ ...EMPTY, ...(initialData || {}) }));
  const [errors, setErrors] = useState({});

  const isResidential = form.propertyType === 'Residential';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.propertyName.trim()) e.propertyName = 'Property name is required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.location.trim()) e.location = 'Location is required';
    if (form.price === '' || isNaN(Number(form.price)) || Number(form.price) < 0) e.price = 'Enter a valid price (0 or more)';
    if (form.area === '' || isNaN(Number(form.area)) || Number(form.area) <= 0) e.area = 'Enter a valid area greater than 0';
    if (isResidential) {
      ['bedrooms', 'bathrooms'].forEach((f) => {
        if (form[f] !== '' && (!Number.isInteger(Number(form[f])) || Number(form[f]) < 0)) e[f] = 'Enter a whole number (0 or more)';
      });
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      propertyName: form.propertyName.trim(),
      propertyType: form.propertyType,
      description: form.description.trim(),
      location: form.location.trim(),
      price: Number(form.price),
      area: Number(form.area),
      status: form.status,
      // Commercial properties send empty values so old bedroom/bathroom data is cleared
      bedrooms: isResidential && form.bedrooms !== '' ? Number(form.bedrooms) : '',
      bathrooms: isResidential && form.bathrooms !== '' ? Number(form.bathrooms) : '',
    });
  };

  const field = (name) => `form-control ${errors[name] ? 'is-invalid' : ''}`;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="row g-3">
        <div className="col-md-8">
          <label className="form-label">Property Name *</label>
          <input className={field('propertyName')} name="propertyName" value={form.propertyName} onChange={handleChange} />
          <div className="invalid-feedback">{errors.propertyName}</div>
        </div>
        <div className="col-md-4">
          <label className="form-label">Property Type *</label>
          <select className="form-select" name="propertyType" value={form.propertyType} onChange={handleChange}>
            <option>Residential</option>
            <option>Commercial</option>
          </select>
        </div>
        <div className="col-12">
          <label className="form-label">Description *</label>
          <textarea className={field('description')} rows="3" name="description" value={form.description} onChange={handleChange} />
          <div className="invalid-feedback">{errors.description}</div>
        </div>
        <div className="col-md-6">
          <label className="form-label">Location *</label>
          <input className={field('location')} name="location" value={form.location} onChange={handleChange} />
          <div className="invalid-feedback">{errors.location}</div>
        </div>
        <div className="col-md-6">
          <label className="form-label">Status</label>
          <select className="form-select" name="status" value={form.status} onChange={handleChange}>
            <option>Available</option>
            <option>Sold</option>
            <option>Rented</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Price (₹) *</label>
          <input className={field('price')} type="number" min="0" name="price" value={form.price} onChange={handleChange} />
          <div className="invalid-feedback">{errors.price}</div>
        </div>
        <div className="col-md-6">
          <label className="form-label">Area (sq ft) *</label>
          <input className={field('area')} type="number" min="1" name="area" value={form.area} onChange={handleChange} />
          <div className="invalid-feedback">{errors.area}</div>
        </div>
        {isResidential && (
          <>
            <div className="col-md-6">
              <label className="form-label">Bedrooms</label>
              <input className={field('bedrooms')} type="number" min="0" name="bedrooms" value={form.bedrooms} onChange={handleChange} />
              <div className="invalid-feedback">{errors.bedrooms}</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Bathrooms</label>
              <input className={field('bathrooms')} type="number" min="0" name="bathrooms" value={form.bathrooms} onChange={handleChange} />
              <div className="invalid-feedback">{errors.bathrooms}</div>
            </div>
          </>
        )}
      </div>
      <div className="mt-4 d-flex gap-2">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Saving...' : submitLabel}
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/properties')} disabled={submitting}>
          Cancel
        </button>
      </div>
    </form>
  );
}
