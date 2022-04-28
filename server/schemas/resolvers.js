const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parents, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('__v -password')
                    .populate('thoughts')
                    .populate('friends')

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
        addArticle: async (parent, { publisher, title, description, content, url, urlToImage, publishedAt }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { username: context.user.username },
                    { $push: { favoriteArticles: { publisher, title, description, content, url, urlToImage, publishedAt }}},
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to log in to do this');
        }
    }
}

module.exports = resolvers;