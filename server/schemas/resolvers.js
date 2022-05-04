const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


const resolvers = {
    Query: {
        me: async (parents, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')

                return userData
            }

            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            return User.find()
                .select('-__v -password')
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
        },
        checkout: async(parent, args, context) => {
            const order = new Order({ article: args.articles })
            const { articles } = await order.populate('articles')

            const line_items = [];

            for (let i = 0; i < articles.length; i++) {
                const article = await stripe.article.create({
                    name: articles[i].name,
                    description: articles[i].description
                });

                const price = await stripe.prices.create({
                    article: article.id,
                    unit_amount: articles[i].price * 100,
                    currency: 'usd'
                })

                line_items.push({
                    price: price.id,
                    quantity: 1
                })
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'subscription',
                success_url: 'https://localhost:3000/success',
                cancel_url: 'https://localhost:3000/cancel'
            })

            return { session: session.id}
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { user, token }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Email, or Password is wrong')
            }
            
            const correctPW = await user.isCorrectPassword(password);

            if (!correctPW) {
                throw new AuthenticationError('Email, or Password is wrong')
            }
            
            const token = signToken(user);
            return { token, user }
        },
        addArticle: async (parent, { author, title, description, content, url, urlToImage, publishedAt }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { username: context.user.username },
                    { $push: { favoriteArticles: { author, title, description, content, url, urlToImage, publishedAt }}},
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to log in to do this');
        },
        deleteArticle: async(parent, { _id }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { username: context.user.username },
                    { $pull: {  favoriteArticles: { _id }}},
                    { new: true, runValidators: true }
                );
                return updatedUser;

            }
        }
    }
}

module.exports = resolvers;