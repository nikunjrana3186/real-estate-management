export default function DashboardCard({ title, value, icon, color }) {
  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body d-flex align-items-center gap-3">
        <div className={`stat-icon bg-${color} bg-opacity-10 text-${color}`}>
          <i className={`bi ${icon}`} />
        </div>
        <div>
          <div className="text-muted small">{title}</div>
          <div className="fs-4 fw-semibold">{value}</div>
        </div>
      </div>
    </div>
  );
}
