// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../api';
import ProductItem from './ProductItem';

const ProductList = ({ onEdit }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const response = await fetchProducts();
            setProducts(response.data);
        };
        getProducts();
    }, []);

    const handleDelete = async (id) => {
        await deleteProduct(id);
        setProducts(products.filter(product => product._id !== id));
    };

    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map(product => (
                    <ProductItem key={product._id} product={product} onEdit={onEdit} onDelete={handleDelete} />
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
