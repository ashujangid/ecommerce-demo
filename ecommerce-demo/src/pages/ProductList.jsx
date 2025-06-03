import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../css/ProductList.module.css";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    const handleBuy = (product) => {
        navigate("/checkout", {
            state: {
                product,
                selectedVariant: product.variants[0],
                quantity: 1
            }
        });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Shop Shoes</h1>
            <div className={styles.grid}>
                {products.map((p) => (
                    <div key={p.id} className={styles.card}>
                        <img src={p.image} alt={p.title} className={styles.image} />
                        <h3>{p.title}</h3>
                        <p>{p.description}</p>
                        <strong>${p.price.toFixed(2)}</strong>
                        <button onClick={() => handleBuy(p)}>Buy Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
