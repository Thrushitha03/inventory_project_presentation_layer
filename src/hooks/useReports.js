import { useInventoryContext } from '../context/InventoryContext';

export function useReports() {
  const { products, getLowStock } = useInventoryContext();

  const lowStockProducts = getLowStock();
  const totalValue = products.reduce((acc, p) => acc + p.quantity * p.unitPrice, 0);

  const categoryMap = {};
  products.forEach(p => {
    categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
  });

  return {
    data: {
      totalProducts:       products.length,
      totalInventoryValue: totalValue,
      lowStockCount:       lowStockProducts.length,
      categoryCounts:      categoryMap,
    },
    loading: false,
    error: null,
  };
}
