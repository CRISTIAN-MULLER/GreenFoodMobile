import React, { createContext, useEffect, useState } from 'react';
import { Load } from '../components/Load';

import api from '../services/api';

export type SaleUnitProps = {
  _id: string;
  active: boolean;
  saleUnit: string;
  price: number;
  description: string;
};

export type ProductProps = {
  _id: string;
  name: string;
  image: string;
  saleUnits: [
    {
      _id: string;
      active: boolean;
      saleUnit: string;
      price: number;
      description: string;
    }
  ];
  category: string;
  active: boolean;
  saleUnit: SaleUnitProps;
  itemTotalQty: number;
};

interface ProductContext {
  products: [ProductProps] | undefined;
  loading: boolean;
}

export const ProductContext = createContext({} as ProductContext);

const ProductProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<[ProductProps]>();
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  async function fetchProducts() {
    const { data } = await api.get(`products?_sort=name&_order=asc`);
    if (!data) return setLoading(true);
    setProducts(data);
    setLoading(false);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) return;
    //setLoadingMore(true);
    //setPage((oldValue) => oldValue + 1);
    // const  fetchProducts();
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
