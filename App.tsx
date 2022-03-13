import React from 'react';
import { Platform } from 'react-native';

import AuthContext from './src/contexts/AuthContext';
import ProfileContext from './src/contexts/ProfileContext';
import CartProvider from './src/contexts/CartContext';
import ProductProvider from './src/contexts/ProductContext';

import Routes from './src/routes';

if (Platform.OS === 'android') {
  // only Android needs polyfill
  require('intl'); // import intl object
  require('intl/locale-data/jsonp/pt-BR'); // load the required locale details
}
export default function App() {
  return (
    <AuthContext.Provider value={{ isAuthenticated: true }}>
      <ProfileContext.Provider
        value={{
          email: 'email',
          family_name: 'family',
          given_name: 'given',
          locale: 'locale',
          name: 'name',
          picture: 'picture',
        }}
      >
        <CartProvider>
          <ProductProvider>
            <Routes />
          </ProductProvider>
        </CartProvider>
      </ProfileContext.Provider>
    </AuthContext.Provider>
  );
}
