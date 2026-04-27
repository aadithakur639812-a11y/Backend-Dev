import express from "express";
import { validateYear } from "../middleware/validateYear.js";

const router = express.Router();

let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear", year: 2018 },
  { id: 2, title: "Deep Work", author: "Cal Newport", year: 2016 },
  { id: 3, title: "Clean Code", author: "Robert Martin", year: 2008 },
  { id: 4, title: "The Alchemist", author: "Paulo Coelho", year: 1988 }
];


//GET all books (filter + pagination)
router.get("/", (req, res) => {
  const { author, year, page = 1, limit = 5 } = req.query;

  let filteredBooks = books;

  //Filtering
  if (author) {
    filteredBooks = filteredBooks.filter(
      book => book.author.toLowerCase() === author.toLowerCase()
    );
  }

  if (year) {
    filteredBooks = filteredBooks.filter(
      book => book.year === parseInt(year)
    );
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);

  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

  res.json({
    total: filteredBooks.length,
    page: parseInt(page),
    limit: parseInt(limit),
    data: paginatedBooks
  });
});


//Search by title
router.get("/search", (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ message: "Title query required" });
  }

  const results = books.filter(book =>
    book.title.toLowerCase().includes(title.toLowerCase())
  );

  res.json(results);
});

//Create book (with validation middleware)
router.post("/", validateYear, (req, res) => {
  const newBook = {
    id: books.length + 1,
    ...req.body
  };

  books.push(newBook);
  res.status(201).json(newBook);
});


export default router;