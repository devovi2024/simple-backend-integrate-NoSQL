// src/components/ProductItem.js
import React from 'react';

const ProductItem = ({ product, onEdit, onDelete }) => {
    return (
        <li>
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <button onClick={() => onEdit(product)}>Edit</button>
            <button onClick={() => onDelete(product._id)}>Delete</button>
        </li>
    );
};

export default ProductItem;
