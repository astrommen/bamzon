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
var decor = "\n________________________________________________________\n";
var decor2 = "\n-------------------------------------------------------";

connection.connect(function (err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer.prompt({
    name: "menu",
    type: "list",
    message:"What would you like to do?",
    choices: [
      "View Products for Sale", 
      "View Low Inventory",
      "Add to Inventory",
      "Add New Product"
    ]
  }).then(function(answer) {
    if (answer.menu === "View Products for Sale") {
      viewAll();
    }
    else if (answer.menu === "View Low Inventory") {
      viewLow()
    }
    else if (answer.menu === "Add to Inventory") {
      addInv();
    }
    else if (answer.menu === "Add New Product") {
      addProd();
    }
  })
}

function viewAll() {
  // query db for all products
  connection.query("SELECT * FROM products", function (err, results) {
    
    if (err) throw err;
    
    console.log("\nProducts for Sale" + decor);
    
    results.forEach(element => {
    
      return console.log(
        "#" + element.item_id + " " +
        element.product_name + " " +
        "$" + element.price + " " +
        element.stock_quantity + "ea" +
        decor2
      );
   
    });
  })
}

function viewLow() {
  connection.query("SELECT * FROM products WHERE stock_quantity<=30", function(err, results) {
    if (err) throw err;
    
    console.log("\nLow Inventory" + decor);
    
    results.forEach(element => {
    
      return console.log(
        "#" + element.item_id + " " +
        element.product_name + " " +
        "$" + element.price + " " +
        element.stock_quantity + "ea" +
        decor2
      );
    });
  });
}