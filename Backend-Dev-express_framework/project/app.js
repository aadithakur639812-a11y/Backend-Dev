const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const users = ["Aman", "Rohit", "Neha", "Ankit", "Pooja"];

app.get("/users", (req, res) => {
  const { name } = req.query;
  const filteredUsers = name
    ? users.filter(u => u.toLowerCase().includes(name.toLowerCase()))
    : users;

  res.render("users", { users: filteredUsers });
});
