import React, { useState } from 'react';
import './PaymentForm.css';

function PaymentForm() {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('visa');
    const [amount, setAmount] = useState('');

    const handleCardNumberChange = (e) => setCardNumber(e.target.value);
    const handleExpiryDateChange = (e) => setExpiryDate(e.target.value);
    const handleCvvChange = (e) => setCvv(e.target.value);
    const handleCardholderNameChange = (e) => setCardholderName(e.target.value);
    const handleAmountChange = (e) => setAmount(e.target.value);

    const handlePaymentMethodChange = (e) => setPaymentMethod(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement payment processing logic here
        console.log('Payment details:', {
            cardNumber,
            expiryDate,
            cvv,
            cardholderName,
            paymentMethod,
            amount,
        });
    };

    return (
        <form className="payment-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Amount</label>
                <input type="text" value={amount} onChange={handleAmountChange} placeholder="Enter amount" required />
            </div>
            <div className="form-group">
                <label>Payment Method</label>
                <select value={paymentMethod} onChange={handlePaymentMethodChange}>
                    <option value="visa">Visa</option>
                    <option value="paypal">PayPal</option>
                    <option>ClicToPay</option>
                </select>
                <img src='https://res.cloudinary.com/dqmhtibfm/image/upload/v1720702857/1655388399_f3bfee33-ce8b-4e08-8926-81d960f8b7d11_nbvacf.png'  />
            </div>
            {paymentMethod === 'visa' && (
                <>
                    <div className="form-group">
                        <label>Card Number</label>
                        <input type="text" value={cardNumber} onChange={handleCardNumberChange} placeholder="Card Number" required />
                    </div>
                    <div className="form-group">
                        <label>Expiry Date</label>
                        <input type="text" value={expiryDate} onChange={handleExpiryDateChange} placeholder="MM/YY" required />
                    </div>
                    <div className="form-group">
                        <label>CVV</label>
                        <input type="text" value={cvv} onChange={handleCvvChange} placeholder="CVV" required />
                    </div>
                    <div className="form-group">
                        <label>Cardholder Name</label>
                        <input type="text" value={cardholderName} onChange={handleCardholderNameChange} placeholder="Cardholder Name" required />
                    </div>
                </>
            )}
            {paymentMethod === 'paypal' && (
                <div className="form-group">
                    <p>You'll be redirected to PayPal to complete your purchase.</p>
                </div>
            )}
            <button type="submit">Pay Now</button>
        </form>
    );
}

export default PaymentForm;
