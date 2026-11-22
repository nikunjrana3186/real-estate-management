import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyForm from '../components/PropertyForm';
import { createProperty } from '../services/propertyService';
import { getErrorMessage } from '../services/api';

export default function AddProperty() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (data) => {
    setSubmitting(true);
    setError('');
    try {
      const created = await createProperty(data);
      navigate('/properties', { state: { message: `"${created.propertyName}" was added.` } });
    } catch (e) {
      setError(getErrorMessage(e));
      setSubmitting(false);
    }
  };

  return (
    <>
      <h4 className="mb-3">Add Property</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <PropertyForm onSubmit={handleSubmit} submitting={submitting} submitLabel="Add Property" />
        </div>
      </div>
    </>
  );
}
