const Pet = require("./model");
const db = require("../../utils/database");

Pet();

function createOne(req, res) {
  console.log("createOne pet");
  const petToCreate = {
    ...req.body,
  };

  const createOneSQL = `
  INSERT INTO pets (name, age, type, breed, microchip)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *
  `;

  const { name, age, type, breed, microchip } = petToCreate;

  db.query(createOneSQL, [name, age, type, breed, microchip])
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

module.exports = { createOne };
