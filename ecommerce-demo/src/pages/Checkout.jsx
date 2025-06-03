import React from "react";
import { useState } from "react";
import styles from '../css/Checkout.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
	const orderData = location.state;

    const [formData, setFormData] = useState({
		"name": "",
        "email": "",
        "phoneNo": "",
        "address": "",
        "city": "",
        "state": "",
        "zipCode": "",
        "cardNumber": "",
        "expiryDate": "",
        "cvvCode": "",
    });
	const [errors, setErrors] = useState({});

    const validations = () => {
        const ValidEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const ValidPhoneFormat = /^[0-9]{10}$/;
        const validationErrors = {};

        if (!formData.name) {
            validationErrors.name = "Required";
        }
        if (!formData.email) {
            validationErrors.email = "Required";
        } else if (!ValidEmailFormat.test(formData.email)) {
            validationErrors.email = "Invalid Email address format";
        }
        if (!formData.phoneNo) {
            validationErrors.phoneNo = "Required";
        } else if (!ValidPhoneFormat.test(formData.phoneNo)) {
            validationErrors.phoneNo = "Invalid Phone Number format";
        }
        if (!formData.address) {
            validationErrors.address = "Required";
        }
        if (!formData.city) {
            validationErrors.city = "Required";
        }
        if (!formData.state) {
            validationErrors.state = "Required";
        }
        if (!formData.zipCode) {
            validationErrors.zipCode = "Required";
        }
        if (!/^\d{16}$/.test(formData.cardNumber)) {
            validationErrors.cardNumber = "Card Number must be of 16 numbers";
        }
        if (!formData.expiryDate) {
            validationErrors.expiryDate = "Please enter the card expiry date";
        }
        if (!formData.expiryDate || new Date(formData.expiryDate) < new Date().setHours(0, 0, 0, 0)) {
            validationErrors.expiryDate = "Card Expiry Date must be future date";
        }
        if (!/^\d{3}$/.test(formData.cvvCode)) {
            validationErrors.cvvCode = "Please enter cvv code in format";
        }

        setErrors(validationErrors);
		return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validations()) return;

        const cvvCode = formData.cvvCode;
        let formStatus;

        if (cvvCode === '111') {
            formStatus = 'approved';
        } else if (cvvCode === '222') {
            formStatus = 'declined';
        } else if (cvvCode === '333') {
            formStatus = 'error';
        } else {
            formStatus = 'approved';
        }

        if (['222', '333'].includes(cvvCode)) {
            navigate("/thank-you", {
                state: {
                    formStatus,
                    formData,
                    orderData,
                    orderID: null,
                }
            });
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/checkout", {
                product: {
                    title: orderData.product.title,
                    price: orderData.product.price,
                    variant: orderData.selectedVariant,
                    quantity: orderData.quantity,
                },
                customer: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phoneNo,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zip: formData.zipCode,
                },
                status: formStatus
            });

            const { order_id } = response.data;

            navigate("/thank-you", {
                state: {
                    orderID: order_id,
                    formStatus,
                    formData,
                    orderData,
                }
            });

        } catch (error) {
            console.error("Order failed:", error);
            alert("Something went wrong while submitting your order.");
        }
      };

	if (!orderData) {
		return (
			<h2> No order found. Go back to Home</h2>
		);
	}

	const total = orderData.quantity * orderData.product.price;
    const fieldMaxLength = {
        zipCode: 5,
        phoneNo: 10,
        cardNumber: 16,
        cvv: 3
      };

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Checkout</h1>
            <div className={styles.flex}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h2 className={styles.sectionTitle}>Billing Information</h2>
                    {Object.keys(formData).map((key) => (
                        <div className={styles.formGroup} key={key}>
							<label>{key.replace(/([A-Z])/g, " $1")}</label>
							<input
								type={key === "expiryDate" ? "date" : "text"}
								name={key}
								value={formData[key]}
								onChange={(e) => {
                                    const value = e.target.value;
									setFormData({ ...formData, [key]: value });
                                    if (errors[key]) {
                                        setErrors((prev) => {
                                           const updatedError = {...prev};
                                           delete updatedError[key];
                                           return updatedError;
                                        });
                                    }
                                }
                            }
                            maxLength={fieldMaxLength[key] || undefined}
							/>
							{errors[key] && <span className={styles.error}>{errors[key]}</span>}
						</div>
					))}
					<button type="submit" className={styles.button}>Pay</button>
                </form>
				<div className={styles.summary}>
					<h2 className={styles.sectionTitle}>Ordery Summary</h2>
					<p><strong>Product:</strong> {orderData.product.title}</p>
					<p><strong>Variant:</strong> {orderData.selectedVariant}</p>
					<p><strong>Quantity:</strong> {orderData.quantity}</p>
					<p><strong>Subtotal:</strong> ${orderData.product.price.toFixed(2)}</p>
					<p><strong>Total:</strong> ${total.toFixed(2)}</p>
				</div>
            </div>
        </div>
    );
}

export default Checkout;