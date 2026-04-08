import { useState, useEffect, useCallback } from 'react';
import { api } from '../utilities/ApiUtils';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const data = await api.get('/products');
      setProducts(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const addProduct = async (product) => {
    const created = await api.post('/products', product);
    setProducts(prev => [created, ...prev]);
    return created;
  };

  const editProduct = async (id, data) => {
    const updated = await api.put(`/products/${id}`, data);
    setProducts(prev => prev.map(p => p.id === id ? updated : p));
    return updated;
  };

  const removeProduct = async (id) => {
    await api.delete(`/products/${id}`);
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return {
    products, loading, error,
    refresh: load,
    lowStockProducts: products.filter(p => p.quantity <= p.reorderLevel),
    addProduct, editProduct, removeProduct,
  };
}
