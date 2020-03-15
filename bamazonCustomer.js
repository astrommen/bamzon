var mysql = require("mysql");
var inquirer = require("inquirer");

// create connection to sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3000,
    user: "root",
    password: "",
    database: "bamazonDB"
});

// connect to mysql server and db
connection.connect(function(err) {
    if (err) throw err;
    buyProd();
});

function buyProd() {
    // query db for all products
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        return results;
    })
}