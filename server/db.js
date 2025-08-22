const Pool =require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Surya123",
    host: "localhost",
    port: 5432,
    database: "tecketapp"
});

module.exports = pool;