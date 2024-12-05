
const express = require("express");
const router = new express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: req.body,
        mode: 'payment',
        success_url: `${process.env.NYXIS_URL}/success`, // Your success URL after payment
        cancel_url: `${process.env.NYXIS_URL}/cancel`, // Your cancel URL
        // Optional: Collect the shipping address
        shipping_address_collection: {
            allowed_countries: ['US'], // Add allowed countries for shipping
        },
        // Optional: Add metadata for tracking or additional details
        metadata: {
            order_id: '123456',
        },
        // Optional: Enable or disable the shipping option
        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: { amount: 500, currency: 'usd' }, // $5 shipping fee
                    display_name: 'Standard Shipping',
                    delivery_estimate: {
                        minimum: { unit: 'day', value: 5 },
                        maximum: { unit: 'day', value: 7 },
                    },
                },
            },
        ],
    });

    res.json({ id: session.id });
});

module.exports = router;