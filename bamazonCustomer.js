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
var decor = "\n______________________________________________\n";
var decor2 = "\n---------------------------------------------";

var subTotal = [];

// connect to mysql server and db
connection.connect(function (err) {
    if (err) throw err;
    console.log("\nProducts for Sale" + decor);
    start();
});

function prodList() {
    // query db for all products
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        results.forEach(element => {

            return console.log(
                "#" + element.item_id + " " +
                element.product_name + " " +
                "$" + element.price +
                decor2
            );
        });
    })
}


function start() {

    prodList();

    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "item",
                type: "input",
                message: "\nWhat item id would you like to purchase?",
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
                message: "\nHow many would you like to purchase?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                    return true;
                    }
                    return false;
                }
            }
        ]).then(function(answer) {

            var chosenItem;

            results.forEach (element => {
                if (element.item_id === parseInt(answer.item)) {
                    chosenItem = element;
                }
            })
            
            if (chosenItem.stock_quantity >= parseInt(answer.quantity)) { 

                var newQty = chosenItem.stock_quantity - answer.quantity;
                
                connection.query(
                    
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: newQty
                        },
                        {
                            item_id: chosenItem.item_id
                        }
                    ],
                    function(error) {
                        if (error) throw err;
                    }
                );

                var userCost = chosenItem.price * answer.quantity;

                subTotal.push(userCost);
                
                console.log(
                    "\nWe have stock!",
                    "Your cost before tax is $" + userCost
                );
                beginOrEnd();

            } else {
                console.log("\nNot enough stock...more on order");
                beginOrEnd();
            }
        });
    });
}

function beginOrEnd() {
    inquirer.prompt({
        name: "again",
        type: "list",
        message: "Would you like to [CONTINUE] or [CHECKOUT]?",
        choices: ["CONTINUE", "CHECKOUT"]
    }).then(function(answer) {
        if (answer.again === "CONTINUE") {
            start();
        } 
        else if (answer.again === "CHECKOUT"){
            var checkout = subTotal.reduce(myFunc);
            
            function myFunc(total, num) {
                return total + num;
            }

            console.log(
                "\nYour new subtotal is: $" + checkout,
                "\nPlease follow the link to Paypal to complete your transaction!\n"
            );

            connection.end();
        }
    })

}