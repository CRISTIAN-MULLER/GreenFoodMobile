import React, { createContext, useState } from 'react';
import api from '../services/api';
import { ProductProps, SaleUnitProps } from './ProductContext';

export interface CartItemContext {
  items: ProductProps[];
  itemsTotalQty: number;
}

export interface CartContext {
  cart: CartItemContext;
  saleUnit: SaleUnitProps;
  setSaleUnit: (state: SaleUnitProps) => void;
  itemTotalQty: number;
  setItemTotalQty: (state: number) => void;
  itemsTotalQty: number;
  setItemsTotalQty: (state: number) => void;
  handleAddToCart: (state: CartItemContext) => void;
}

export const CartContext = createContext({} as CartContext);

const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<CartItemContext>({
    items: [],
    itemsTotalQty: 0,
  });
  const [saleUnit, setSaleUnit] = useState({} as SaleUnitProps);
  const [itemTotalQty, setItemTotalQty] = useState(0);
  const [itemsTotalQty, setItemsTotalQty] = useState(0);

  async function handleAddToCart(cartItem: CartItemContext) {
    // const item = cartItem;
    // item.itemTotalQty = itemTotalQty;
    console.log('aqui tambem');
    //  await api.post('/add-to-cart', cartItem);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        saleUnit,
        setSaleUnit,
        itemTotalQty,
        setItemTotalQty,
        itemsTotalQty,
        setItemsTotalQty,
        handleAddToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
