// Import (require) connection.js
const connection = require('./connection');
const mysql = require ('mysql');

// Helper function for SQL syntax.
const printQuestionMarks = num =>{
    const arr = [];
    for (let i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(obj) {
    const arr = [];
    for (let key in obj) {
        const value = obj[key];
        if (Object.hasOwnProperty.call(obj, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

const orm = {
    // Display all burgers in the db.
    selectAll: (table, cb) => {
        const queryString = `SELECT * FROM  ?? `;

        connection.query(queryString, table, (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    // Add a burger to the db.
    insertOne: (table, cols, vals, cb) => {
        const queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)})`;

        console.log(queryString);

        connection.query(queryString, vals, (err, result) => {
            if (err) {
                throw err
            }
            cb(result);
        });
    },
    // Set burger devoured status to true.
    updateOne: (table, objColVals, condition, cb) => {
        let queryString = "UPDATE " + table;
    
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
    
        console.log(queryString);
        connection.query(queryString, (err, result) => {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
      }
    };

// Export the ORM object in module.exports.
module.exports = orm;