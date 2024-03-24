import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route for saving a new book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all the required fields: title, author, publishYear'
            });
        }
        const newBook = {
            title: request.body.title.replace(/[^a-zA-Z0-9 :]/g, ''),
            author: request.body.author.replace(/[^a-zA-Z0-9 ]/g, ''),
            publishYear: request.body.publishYear.replace(/[^0-9]/g, '')
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

// Route for getting books from the database
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(201).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

// Route for ONE book from database by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);

        if(!isValidObjectId){
            return response.status(400).json({message: 'Invalid ID format'});
        }

        const book = await Book.findById(id);

        return response.status(201).json(book)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

// Route for updating a book
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all the required fields: title, author, publishYear'
            });
        }

        const { id } = request.params;
        const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);

        if(!isValidObjectId){
            return response.status(400).json({message: 'Invalid ID format'});
        }
        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result) {
            return response.status(404).json({message: 'Book not found'});
        }

        return response.status(200).send({message: 'Book updated successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

// Route for updating a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id, request.body);

        if(!result) {
            return response.status(404).json({message: 'Book not found'});
        }

        return response.status(200).send({message: 'Book deleted successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

export default router;