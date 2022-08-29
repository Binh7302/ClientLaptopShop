import React, { useContext, createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductContextProvider = (props) => {
    const { children } = props;


    return (
        <ProductContext.Provider 
        value={{
            
        }}
        >
            {children}
        </ProductContext.Provider>
    )
}
