import express from 'express';
import { stripe } from '../utils/stripe';
import { auth } from '../utils/auth';
import { User } from '../models';

const router = express.Router();

router.get('/price', auth, async (req, res) => {
    const price = await stripe.prices.list({
        apiKey: process.env.STRIPE_SECRET_KEY
    })

    return res.json(price)
})

router.post('/session', auth, async (req, res) => {
    const user = await User.findOne({email: req.user})
    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
            {
                price: req.body.priceId,
                quantity: 1
            }
        ],
        success_url: 'http://localhost:3000',
        cancel_url: 'http://localhost:3000/cancel',
        customer: user.stripeCustomerId
    }, {
        apiKey: process.env.STRIPE_SECRET_KEY
    })

    return res.json(session)
})

export default router;