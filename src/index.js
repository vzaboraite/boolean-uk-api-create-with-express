require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const booksRouter = require("./resources/books/router");
const petsRouter = require("./resources/pets/router");

const db = require("./utils/database");
const Book = require("./resources/books/model");
const Pet = require("./resources/pets/model");

/* IMPORT ROUTERS */

const app = express();

console.log(process.env.PGURL);

/* SETUP MIDDLEWARE */

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/books", booksRouter);
app.use("/pets", petsRouter);

/* SETUP ROUTES */

/* CATCH-ALL TO TEST ROUTES */

app.get("*", (req, res) => {
  res.json({ ok: true });
});

/* START SERVER */

const port = 3030;

app.listen(port, () => {
  db.connect((error) => {
    if (error) {
      console.error("[ERROR] Connection error: ", error.stack);
    } else {
      console.log("\n[DB] Connected...\n");

      Book();
      Pet();
    }
  });

  console.log(`[SERVER] Running on http://localhost:${port}/`);
});
