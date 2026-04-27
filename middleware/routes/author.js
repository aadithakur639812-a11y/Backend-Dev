import express from "express";

const router = express.Router();

let authors = [
  { id: 1, name: "James Clear", country: "USA" },
  { id: 2, name: "Cal Newport", country: "USA" }
];

// CREATE
router.post("/", (req, res) => {
  const newAuthor = {
    id: authors.length + 1,
    ...req.body
  };

  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});

// READ ALL
router.get("/", (req, res) => {
  res.json(authors);
});

// READ ONE
router.get("/:id", (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.id));

  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  }

  res.json(author);
});

// UPDATE
router.put("/:id", (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.id));

  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  }

  Object.assign(author, req.body);
  res.json(author);
});

// DELETE
router.delete("/:id", (req, res) => {
  authors = authors.filter(a => a.id !== parseInt(req.params.id));
  res.json({ message: "Author deleted successfully" });
});

export default router;