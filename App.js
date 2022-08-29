import React from 'react';
import AppNavigation from './src/components/navigation/AppNavigation';
import { UserContextProvider } from './src/components/users/UserContext';
import { ProductContextProvider } from './src/components/products/ProductContext';
export default function App() {
  return (
    <UserContextProvider>
      <ProductContextProvider>
        <AppNavigation />
      </ProductContextProvider>
    </UserContextProvider>
  );
}

