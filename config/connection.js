// Connect Node to MySQL.
const mysql = require("mysql");

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "nnmeqdrilkem9ked.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        port: 3306,
        user: "mm703opwiw14nojh",
        password: "ojw91pxht3buflq3",
        database: "fgwmhsp1n14ipobw"
    });
};

connection.connect(err => {
    if (err) {
        console.error(`error connecting: ${err.stack}`);
        return;
    }
    console.log(`connected as id ${connection.threadId}`);
});

// Export the connection.
module.exports = connection;