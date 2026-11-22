export default function ConfirmDeleteModal({ property, onConfirm, onCancel, deleting }) {
  if (!property) return null;
  return (
    <>
      <div className="modal d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete property</h5>
              <button type="button" className="btn-close" onClick={onCancel} disabled={deleting} />
            </div>
            <div className="modal-body">
              Are you sure you want to delete <strong>{property.propertyName}</strong>? This cannot be undone.
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline-secondary" onClick={onCancel} disabled={deleting}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={onConfirm} disabled={deleting}>
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
}
