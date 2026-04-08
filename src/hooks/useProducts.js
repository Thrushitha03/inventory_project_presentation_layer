import { useState } from 'react';
import { useInventoryContext } from '../context/InventoryContext';

export function useProducts() {
  const { products, loading, error, addProduct, updateProduct, deleteProduct, getLowStock } = useInventoryContext();
  const [saving, setSaving] = useState(false);

  const refresh = () => {};

  const addProductHandler = async (product) => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 500));
    const created = addProduct(product);
    setSaving(false);
    return created;
  };

  const editProduct = async (id, data) => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 500));
    const updated = updateProduct(id, data);
    setSaving(false);
    return updated;
  };

  const removeProduct = async (id) => {
    await new Promise(r => setTimeout(r, 300));
    deleteProduct(id);
  };

  return {
    products, loading, error, saving,
    refresh,
    lowStockProducts: getLowStock(),
    addProduct: addProductHandler,
    editProduct,
    removeProduct,
  };
}
