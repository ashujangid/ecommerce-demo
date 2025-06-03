import React from "react";
import { useState, useEffect } from "react";
import styles from '../css/Thankyou.module.css';
import { useLocation, useNavigate } from "react-router-dom";

const Thankyou = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;
    const orderID = data.orderID;

    if (!data) {
        return (
            <div className={styles.container}>
                <h2>Order not Found</h2>
                <button onClick={() => navigate('/')}>Go to Home</button>
            </div>
        );
    }

    const {formStatus, formData, orderData} = data;

    const statusMessage = {
        approved: "Your order has been successfully placed!",
        declined: "Your transaction was declined. Please try again.",
        error: "Payment gateway failed. Please try again later or contact support.",
    };

    const total = orderData.quantity * orderData.product.price;

    return (
        <div className={styles.container}>
            <h1>
                {formStatus === 'approved' ? 'Thank you for your order!' : 'Payment Failed'}
            </h1>

            <p className={styles.status}>{statusMessage[formStatus]}</p>
            <div className={styles.section}>
                <h3>Order Number</h3>
                <p>{orderID}</p>
            </div>

            <div className={styles.section}>
                <h3>Order Summary</h3>
                <p><strong>Product: </strong>{orderData.product.title}</p>
                <p><strong>Variant: </strong>{orderData.selectedVariant}</p>
                <p><strong>Quantity: </strong>{orderData.quantity}</p>
                <p><strong>Price: </strong>${orderData.product.price.toFixed(2)}</p>
                <p><strong>Total: </strong>${total.toFixed(2)}</p>
            </div>

            <div className={styles.section}>
                <h3>Customer information</h3>
                {Object.entries(formData)
                    .filter(([key]) => !['cardNumber', 'cvvCode', 'expiryDate'].includes(key))
                    .map(([key, value]) => (
                        <p key={key}>
                            <strong>{key.replace(/([A-Z])/g, " $1")}:</strong> {value}
                        </p>
                    ))}
            </div>
        </div>
    );
}

export default Thankyou;