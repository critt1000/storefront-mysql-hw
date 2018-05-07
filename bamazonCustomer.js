//Require the npm packages that will be used
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

//Create a connection with MySQL database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "test",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) {
        console.log("connect error: " + err.stack);
    }
    loadSQL();
});

//Function for the products table to load and print to console
function loadSQL() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        console.table(res);

    })
}

//Function for user to select an item to purchase
function userPickItems() {
    inquirer.prompt([
        {
            type: input,
            name: "choice",
            message: "Please use the ID of the item you would like or Q to exit",
            validate: function(value) {
                return !isNaN(val) || val.tolowerCase() === "q";
            }
        }
    ])
    .then(function(val) {
        if (val === q) {
            console.log("Come again later!!!");
            break;
        }

        else if ()
    })
}

//Function for user to select quantity of each item they would like to purchase
function userHowManyItems() {

}