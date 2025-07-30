const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "84173",
  database: "mydatabase1",
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password(),
  ];
};

let q = "INSERT INTO user (id, username, email, password) VALUES ?";

let data = [];
for (let i = 0; i < 100; i++) {
  data.push(getRandomUser());
}

try {
  connection.query(q, [data], (err, result) => {
    if (err) throw err;
    console.log("Tables in the database:", result);
  });
} catch (error) {
  console.error("Error fetching tables:", error);
}

connection.end();
