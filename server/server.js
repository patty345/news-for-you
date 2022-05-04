const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
// const { stripe } =  require('./utils/stripe');
// const { auth } =  require('./utils/auth');
// const { User } =  require('./models');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { authMiddleWare } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: authMiddleWare
    });
    await server.start();
    server.applyMiddleware({ app });
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
}



// app.get('/price', auth, async (req, res) => {
//     const price = await stripe.prices.list({
//         apiKey: process.env.STRIPE_SECRET_KEY
//     })

//     return res.json(price)
// })

// app.post('/session', auth, async (req, res) => {
//     const user = await User.findOne({email: req.user})
//     const session = await stripe.checkout.sessions.create({
//         mode: 'subscription',
//         payment_method_types: ['card'],
//         line_items: [
//             {
//                 price: req.body.priceId,
//                 quantity: 1
//             }
//         ],
//         success_url: 'http://localhost:3000',
//         cancel_url: 'http://localhost:3000/cancel',
//         customer: user.stripeCustomerId
//     }, {
//         apiKey: process.env.STRIPE_SECRET_KEY
//     })

//     return res.json(session)
// })


startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))
}

// app.get('*', (req, res) => {
//     // res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});