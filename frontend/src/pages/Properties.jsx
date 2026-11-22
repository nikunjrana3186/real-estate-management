import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchFilters from '../components/SearchFilters';
import PropertyTable from '../components/PropertyTable';
import PropertyDetailsModal from '../components/PropertyDetailsModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import Loading from '../components/Loading';
import { getProperties, deleteProperty, updatePropertyStatus } from '../services/propertyService';
import { getErrorMessage } from '../services/api';

const EMPTY_FILTERS = { search: '', location: '', type: '', status: '', minPrice: '', maxPrice: '' };

export default function Properties() {
  const location = useLocation();
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(location.state?.message || '');
  const [viewing, setViewing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(''), 2000);
    return () => clearTimeout(timer);
  }, [message]);

  // Fetch from the backend whenever filters change. The 400ms delay (debounce)
  // avoids sending a request on every single keystroke, and abort cancels stale requests.
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      setLoading(true);
      getProperties(filters, controller.signal)
        .then((data) => {
          setProperties(data);
          setError('');
          setLoading(false);
        })
        .catch((e) => {
          if (e.name === 'CanceledError' || e.code === 'ERR_CANCELED') return;
          setError(getErrorMessage(e));
          setLoading(false);
        });
    }, 400);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [filters, reloadKey]);

  const refresh = useCallback(() => setReloadKey((k) => k + 1), []);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteProperty(toDelete._id);
      setMessage(`"${toDelete.propertyName}" was deleted.`);
      setToDelete(null);
      refresh();
    } catch (e) {
      setError(getErrorMessage(e));
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  const handleStatusChange = async (property, status) => {
    if (status === property.status) return;
    setUpdatingId(property._id);
    try {
      await updatePropertyStatus(property._id, status);
      setMessage(`Status of "${property.propertyName}" changed to ${status}.`);
      refresh();
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setUpdatingId(null);
    }
  };

  const hasFilters = Object.values(filters).some((v) => v !== '');

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Properties</h4>
        <Link to="/properties/add" className="btn btn-primary">
          <i className="bi bi-plus-lg me-1" />
          Add Property
        </Link>
      </div>

      <SearchFilters filters={filters} onChange={setFilters} onReset={() => setFilters(EMPTY_FILTERS)} />

      {message && (
        <div className="alert alert-success alert-dismissible">
          {message}
          <button className="btn-close" onClick={() => setMessage('')} />
        </div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card border-0 shadow-sm">
        {loading ? (
          <Loading text="Loading properties..." />
        ) : properties.length === 0 ? (
          <div className="text-center text-muted py-5">
            <i className="bi bi-inbox fs-1 d-block mb-2" />
            {hasFilters ? 'No properties match your filters.' : 'No properties yet. Add your first property.'}
          </div>
        ) : (
          <PropertyTable
            properties={properties}
            onView={setViewing}
            onDelete={setToDelete}
            onStatusChange={handleStatusChange}
            updatingId={updatingId}
          />
        )}
      </div>

      <PropertyDetailsModal property={viewing} onClose={() => setViewing(null)} />
      <ConfirmDeleteModal property={toDelete} deleting={deleting} onConfirm={handleDelete} onCancel={() => setToDelete(null)} />
    </>
  );
}
