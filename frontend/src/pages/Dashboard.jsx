import { useEffect, useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import Loading from '../components/Loading';
import { getDashboardStats } from '../services/dashboardService';
import { getErrorMessage } from '../services/api';
import { formatCurrency } from '../utils/format';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch((e) => setError(getErrorMessage(e)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading text="Loading dashboard..." />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <>
      <h4 className="mb-3">Dashboard</h4>
      {stats.totalProperties === 0 && (
        <div className="alert alert-info">No properties yet. Add your first property to see statistics.</div>
      )}
      <div className="row g-3">
        <div className="col-12 col-sm-6 col-xl-4">
          <DashboardCard title="Total Properties" value={stats.totalProperties} icon="bi-buildings" color="primary" />
        </div>
        <div className="col-12 col-sm-6 col-xl-4">
          <DashboardCard title="Available" value={stats.availableProperties} icon="bi-check-circle" color="success" />
        </div>
        <div className="col-12 col-sm-6 col-xl-4">
          <DashboardCard title="Sold" value={stats.soldProperties} icon="bi-tag" color="danger" />
        </div>
        <div className="col-12 col-sm-6 col-xl-4">
          <DashboardCard title="Rented" value={stats.rentedProperties} icon="bi-key" color="warning" />
        </div>
        <div className="col-12 col-sm-6 col-xl-4">
          <DashboardCard title="Total Property Value" value={formatCurrency(stats.totalPropertyValue)} icon="bi-currency-rupee" color="info" />
        </div>
      </div>
    </>
  );
}
