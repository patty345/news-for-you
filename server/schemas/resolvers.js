const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { update } = require('../models/User');

const resolvers = {
    Query: {
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
            return { user }
        },
        addArticle: async (parent, { userId, articleBody }, context) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { favoriteArticles: { articleBody }}},
                { new: true }
            );
            return updatedUser;
        }
    }
}

module.exports = resolvers;