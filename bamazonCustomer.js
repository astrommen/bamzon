var mysql = require("mysql");
var inquirer = require("inquirer");

// create connection to sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazonDB"
});

// used for decoration
var decor = "\n________________________________________\n";
var decor2 = "\n---------------------------------------------";

// connect to mysql server and db
connection.connect(function (err) {
    if (err) throw err;
    console.log("\nProducts for Sale" + decor);
    prodList();
    // setTimeout(start, 1000);
});

function prodList() {
    // query db for all products
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log("is in query");
        results.forEach(element => {

            return console.log(
                "#" + element.item_id + " " +
                element.product_name + " " +
                "$" + element.price +
                decor2
            );
        });
    // })
// }


// function start() {

    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "What item id would you like to purchase?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
            }
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
            }
        }
    ]).then(function(answer) {

        var chosenItem;
        console.log(answer);

    })
})
}