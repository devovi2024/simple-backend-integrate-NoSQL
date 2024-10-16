// src/components/ProductForm.js
import React, { useState } from 'react';
import { createProduct, updateProduct } from './api';

const ProductForm = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState(product || {
        title: '',
        short_des: '',
        price: '',
        discount: '',
        image: '',
        stock: '',
        star: '',
        remark: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (product) {
            await updateProduct(product._id, formData);
        } else {
            await createProduct(formData);
        }
        onSave();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
            <input name="short_des" value={formData.short_des} onChange={handleChange} placeholder="Short Description" />
            <input name="price" value={formData.price} onChange={handleChange} type="number" placeholder="Price" required />
            <input name="discount" value={formData.discount} onChange={handleChange} type="number" placeholder="Discount" />
            <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />
            <input name="stock" value={formData.stock} onChange={handleChange} type="number" placeholder="Stock" />
            <input name="star" value={formData.star} onChange={handleChange} type="number" placeholder="Star Rating" />
            <input name="remark" value={formData.remark} onChange={handleChange} placeholder="Remark" />
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default ProductForm;
