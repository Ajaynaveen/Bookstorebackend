const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishYear: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Set default value to current date and time
    },
    updatedAt: {
        type: Date,
        default: Date.now // Set default value to current date and time
    }
});
bookSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});


const Book =new  mongoose.model('Book', bookSchema);

module.exports = Book;
