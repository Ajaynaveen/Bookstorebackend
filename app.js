const express = require("express");
const app = express();
const cors=require('cors')
app.use(cors());
app.use(express.json());

const Book = require('./models/Book'); 

// Create a new book
app.post('/books', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(409).json({ message: "Please fill all the fields" });
        }
      
        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        });

        await newBook.save();

        return res.json(newBook);
    } catch (error) {
        console.error("Error creating book:", error);
        return res.status(500).json({ message: "An error occurred while creating the book." });
    }
});

// Retrieve all books
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        return res.status(500).json({ message: "An error occurred while fetching the books." });
    }
});

// Retrieve a specific book by ID
app.get('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.json(book);
    } catch (error) {
        console.error("Error fetching a book:", error);
        return res.status(500).json({ message: "An error occurred while fetching the book." });
    }
});

// Update a book with the specified ID (PUT)
app.put('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { title, author, publishYear } = req.body;

        let book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        book.title = title;
        book.author = author;
        book.publishYear = publishYear;
        await book.save();

        return res.json(book);
    } catch (error) {
        console.error("Error updating a book:", error);
        return res.status(500).json({ message: "An error occurred while updating the book." });
    }
});

// Partially update a book with the specified ID (PATCH)
app.patch('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        let book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        Object.keys(updates).forEach(key => {
            book[key] = updates[key];
        });

        await book.save();

        return res.json(book);
    } catch (error) {
        console.error("Error updating a book:", error);
        return res.status(500).json({ message: "An error occurred while updating the book." });
    }
});

// Delete a book with the specified ID
app.delete('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Find the book by ID
        let book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Remove the found book
        await Book.deleteOne({ _id: id });

        // Respond with success message
        return res.json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error("Error deleting a book:", error);
        return res.status(500).json({ message: "An error occurred while deleting the book." });
    }
});

module.exports = app;
