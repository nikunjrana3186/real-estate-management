import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropertyForm from '../components/PropertyForm';
import Loading from '../components/Loading';
import { getPropertyById, updateProperty } from '../services/propertyService';
import { getErrorMessage } from '../services/api';

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    getPropertyById(id)
      .then(setProperty)
      .catch((e) => {
        setError(getErrorMessage(e));
        setLoadFailed(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data) => {
    setSubmitting(true);
    setError('');
    try {
      const updated = await updateProperty(id, data);
      navigate('/properties', { state: { message: `"${updated.propertyName}" was updated.` } });
    } catch (e) {
      setError(getErrorMessage(e));
      setSubmitting(false);
    }
  };

  if (loading) return <Loading text="Loading property..." />;

  return (
    <>
      <h4 className="mb-3">Edit Property</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      {!loadFailed && (
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <PropertyForm initialData={property} onSubmit={handleSubmit} submitting={submitting} submitLabel="Save Changes" />
          </div>
        </div>
      )}
    </>
  );
}
