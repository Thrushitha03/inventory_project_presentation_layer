import { useState, useEffect } from 'react';
import { ValidationUtils } from '../utilities/ValidationUtils';
import { CATEGORIES } from '../utilities/Constants';

const EMPTY = { name: '', category: '', quantity: '', unitPrice: '', reorderLevel: 10, supplier: '' };

export default function ProductForm({ initial = null, onSubmit, onCancel, loading = false }) {
  const [form,   setForm]   = useState(initial || EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => { setForm(initial || EMPTY); }, [initial]);

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = ValidationUtils.validateProduct(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    await onSubmit({
      ...form,
      quantity:     Number(form.quantity),
      unitPrice:    Number(form.unitPrice),
      reorderLevel: Number(form.reorderLevel),
    });
  };

  const Field = ({ label, field, type = 'text', ...rest }) => (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        value={form[field]}
        onChange={set(field)}
        {...rest}
      />
      {errors[field] && <div className="error-msg">{errors[field]}</div>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <div className="form-grid-2">
        <Field label="Product Name *"  field="name"     placeholder="e.g. Wireless Mouse" />
        <div className="form-group">
          <label>Category *</label>
          <select value={form.category} onChange={set('category')}>
            <option value="">Select category</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.category && <div className="error-msg">{errors.category}</div>}
        </div>
        <Field label="Quantity *"      field="quantity"     type="number" min="0" placeholder="0" />
        <Field label="Unit Price (₹) *" field="unitPrice"   type="number" min="0" step="0.01" placeholder="0.00" />
        <Field label="Reorder Level"   field="reorderLevel" type="number" min="0" placeholder="10" />
        <Field label="Supplier"        field="supplier"     placeholder="Supplier name" />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving…' : (initial ? 'Update Product' : 'Add Product')}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}