import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../css/LandingPage.module.css';

const product = {
    id: 1,
    title: "Converse Chuck Taylor All Star II",
    description: "High-top sneaker with durable canvas.",
    price: 79.99,
    image: "https://via.placeholder.com/300x300",
    variants: ["Black", "White", "Red"],
};

const Home = () => {
	const navigate = useNavigate();
	const [variant, setVariant] = useState(product.variants[0]);
	const [quantity, setQuantity] = useState(1);

	const handleBuyNow = () => {
		navigate('/checkout', {
			state: {
				product,
				selectedVariant: variant,
				quantity,
			},
		});
	}

	return (
		<div className={styles.container}>
			<h1>eCommerce Checkout Flow Simulation</h1>
			<div className={styles.card}>
				<img src={product.image} alt={product.title} className={styles.image} />

				<div className={styles.info}>
					<h2>{product.title}</h2>
					<p>{product.description}</p>
					<h3>${product.price.toFixed(2)}</h3>

					<div className={styles.formGroup}>
						<label>Variant:</label>
						<select value={variant} onChange={(e) => setVariant(e.target.value)}>
							{product.variants.map((v) => (
								<option key={v} value={v}>{v}</option>
							))}
						</select>
					</div>

					<div className={styles.formGroup}>
						<label>Quantity:</label>
						<input
							type="number"
							min="1"
							value={quantity}
							onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
						/>
					</div>

					<button onClick={handleBuyNow} className={styles.button}>Buy Now</button>
				</div>
			</div>
		</div>
	);
}

export default Home;