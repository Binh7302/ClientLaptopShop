import React, { useContext, createContext, useState } from 'react';
import { getAllProduct, getOneProduct, getImageByProductID, getSearchProduct, getOneBrand } from './ProductService';

export const ProductContext = createContext();

export const ProductContextProvider = (props) => {
    const { children } = props;
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);
    const [product, setProduct] = useState({});
    const [brand, setBrand] = useState({});



    const onGetAllProduct = async () => {
        try {
            const res = await getAllProduct();
            setProducts(res);

        } catch (error) {
            console.log('onGetAllProduct error: ', error);
        }
    }

    const onGetOneBrand = async (brandID) => {
        try {
            const res = await getOneBrand(brandID);
            console.log('onGetOneBrand: ', res);
            setBrand(res);
        } catch (error) {
            console.log('onGetOneBrand error: ', error);
        }
    }

    const onGetOneProduct = async (id) => {
        try {
            const res = await getOneProduct(id);
            setProduct(res);
            console.log('onGetOneProduct: ', res);

        } catch (error) {
            console.log('onGetOneProduct error: ', error);
        }
    }

    const onGetImageByProductID = async (productID) => {
        try {
            const res = await getImageByProductID(productID);
            setImages(res);
            // console.log('onGetImageByProductID: ', images);

        } catch (error) {
            console.log('onGetImageByProductID error: ', error);
        }
    }

    const onGetSearchProduct = async (productID) => {
        try {
            const res = await getSearchProduct(productID);
            setProducts(res);
            console.log('onGetSearchProduct: ', res);

        } catch (error) {
            console.log('onGetSearchProduct error: ', error);
        }
    }

    

    return (
        <ProductContext.Provider 
        value={{
            onGetAllProduct, onGetImageByProductID, onGetOneProduct, onGetSearchProduct, onGetOneBrand, brand,
            products, product, images
        }}
        >
            {children}
        </ProductContext.Provider>
    )
}
