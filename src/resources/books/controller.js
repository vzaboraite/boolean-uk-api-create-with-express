const Book = require("./model");
const db = require("../../utils/database");

Book();

function createOne(req, res) {
  console.log("createOne book");
  const bookToCreate = {
    ...req.body,
  };

  const createOneSQL = `
    INSERT INTO books (title, type, author, topic, publicationDate)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const { title, type, author, topic, publicationDate } = bookToCreate;

  db.query(createOneSQL, [title, type, author, topic, publicationDate])
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

module.exports = { createOne };
