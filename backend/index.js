const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let catalog = [];

// Sync from Google Sheets CSV
app.post('/api/sync', async (req, res) => {
  const { csvUrl } = req.body;
  catalog = [
    { name: "Handmade Mug", price: 15 },
    { name: "Red Dress", price: 50 },
  ];
  res.json({ products: catalog });
});

app.post('/api/checkout', async (req, res) => {
  const { item } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'https://streamcart.app/success',
    cancel_url: 'https://streamcart.app',
  });
  res.json({ url: session.url });
});

module.exports = app;
