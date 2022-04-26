const { Schema } = require('mongoose')


const articleSchema = new Schema({
    publisher: {
        type: String
    },
    title:  {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    urlToImage: {
        type: String,
        required: true
    },
    publishedAt: {
        type: String,
        required: true
    }
})

module.exports = articleSchema;