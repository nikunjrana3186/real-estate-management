const colors = { Available: 'success', Sold: 'danger', Rented: 'warning text-dark' };

export default function StatusBadge({ status }) {
  return <span className={`badge bg-${colors[status] || 'secondary'}`}>{status}</span>;
}
