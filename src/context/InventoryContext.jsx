import { createContext, useContext, useState } from 'react';

const InventoryContext = createContext(null);

const MOCK_PRODUCTS = [
  { id: 1,  name: 'Wireless Mouse',       category: 'Electronics',     quantity: 45,  unitPrice: 29.99,  reorderLevel: 10, supplier: 'TechSupplies Co.' },
  { id: 2,  name: 'USB Keyboard',         category: 'Electronics',     quantity: 8,   unitPrice: 49.99,  reorderLevel: 10, supplier: 'TechSupplies Co.' },
  { id: 3,  name: 'A4 Paper Ream',        category: 'Stationery',      quantity: 200, unitPrice: 5.99,   reorderLevel: 50, supplier: 'OfficeWorld' },
  { id: 4,  name: 'Blue Ballpoint Pens',  category: 'Stationery',      quantity: 15,  unitPrice: 1.49,   reorderLevel: 30, supplier: 'OfficeWorld' },
  { id: 5,  name: 'Office Chair',         category: 'Furniture',       quantity: 3,   unitPrice: 199.99, reorderLevel: 5,  supplier: 'FurniturePlus' },
  { id: 6,  name: 'Laptop Stand',         category: 'Electronics',     quantity: 20,  unitPrice: 35.00,  reorderLevel: 10, supplier: 'TechSupplies Co.' },
  { id: 7,  name: 'Sticky Notes Pack',    category: 'Stationery',      quantity: 60,  unitPrice: 3.99,   reorderLevel: 20, supplier: 'OfficeWorld' },
  { id: 8,  name: 'HDMI Cable 2m',        category: 'Electronics',     quantity: 5,   unitPrice: 12.99,  reorderLevel: 10, supplier: 'TechSupplies Co.' },
  { id: 9,  name: 'Desk Lamp',            category: 'Furniture',       quantity: 12,  unitPrice: 24.99,  reorderLevel: 5,  supplier: 'FurniturePlus' },
  { id: 10, name: 'Whiteboard Markers',   category: 'Stationery',      quantity: 4,   unitPrice: 8.99,   reorderLevel: 15, supplier: 'OfficeWorld' },
  { id: 11, name: 'Laptop Bag',           category: 'Accessories',     quantity: 18,  unitPrice: 39.99,  reorderLevel: 8,  supplier: 'BagWorld' },
  { id: 12, name: 'Hand Sanitizer 500ml', category: 'Medical',         quantity: 6,   unitPrice: 4.99,   reorderLevel: 20, supplier: 'MediSupply' },
  { id: 13, name: 'Safety Gloves',        category: 'Tools & Hardware', quantity: 30, unitPrice: 6.49,   reorderLevel: 10, supplier: 'SafetyFirst' },
  { id: 14, name: 'Thermal Flask 1L',     category: 'Accessories',     quantity: 2,   unitPrice: 22.99,  reorderLevel: 5,  supplier: 'HomeGoods' },
  { id: 15, name: 'Printer Paper A3',     category: 'Stationery',      quantity: 90,  unitPrice: 9.99,   reorderLevel: 30, supplier: 'OfficeWorld' },
];

export function InventoryProvider({ children }) {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [loading]               = useState(false);
  const [error]                 = useState(null);

  const fetchProducts = () => {};

  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now() };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id, product) => {
    const updated = { ...product, id };
    setProducts(prev => prev.map(p => p.id === id ? updated : p));
    return updated;
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const getLowStock = () => products.filter(p => p.quantity <= p.reorderLevel);

  return (
    <InventoryContext.Provider value={{
      products, loading, error,
      fetchProducts, addProduct, updateProduct, deleteProduct, getLowStock,
    }}>
      {children}
    </InventoryContext.Provider>
  );
}

export const useInventoryContext = () => useContext(InventoryContext);
