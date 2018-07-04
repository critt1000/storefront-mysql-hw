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

//Check connection and on successfull & call loadProducts function
connection.connect(function(err) {
    if (err) {
        console.log("connect error: " + err.stack);
    }
    loadProducts();
});

//Function to display products to user & call userPickItems function
function loadProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        console.table(res);

        userPickItems(res);

    })
}

//Function for user to select an item to purchase || press q to exit || reloads products on a invalid selection
function userPickItems(inventory) {
    inquirer.prompt([
        {
            type: "input",
            name: "choice",
            message: "Please use the ID of the item you would like or Q to exit: ",
            validate: function(val) {
                return !isNaN(val) || val.toLowerCase() === "q";
            }
        }
    ])
    .then(function(val) {
        // Check if user selects quit program
        checkQuit(val.choice);
        var choiceId = parseInt(val.choice);
        var product = checkIfItemRemains(choiceId, inventory);

        if (product) {
            userHowManyItems(product);
        }
        else {
            console.log("\nThat item is not available.");
            loadProducts();
        }
    });
}

//Function for user to select quantity of each item they would like to purchase || press q to exit || reload products if user selects to high of quantity
function userHowManyItems(product) {
    inquirer.prompt([{
        type: "input",
        name: "quantity",
        message: "How many of that item would you like? or press q to exit: ",
        validate: function(val) {
            return val > 0 || val.toLowerCase() === "q";
        }
    }])
    .then(function(val) {
        //check if user wants to quit
        checkQuit(val.quantity);
        var quantity = parseInt(val.quantity);

        if (quantity > product.stock_quantity) {
            console.log("Not enough in stock!");
            loadProducts();
        }
        else {
            purchaseItem(product, quantity);
        }
    });
};

//Function to purchase item and reload products to console
function purchaseItem(product, quantity) {
    connection.query(
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
        [quantity, product.item_id],
        function(err, res) {
            console.log("You bought " + quantity + " of " + product.product_name + "!");
            loadProducts();
        }
    )
};

//Function to check if user's selection is available & and return corresponding answer
function checkIfItemRemains(choiceId, inventory) {
    for (var i = 0; i < inventory.length; i++) {
        if (inventory[i].item_id === choiceId) {
            return inventory[i];
        }
    }
    return null;
};

//Function for when user selects q to exit program 
function checkQuit(choice) {
    if (choice.toLowerCase() === "q") {
        console.log("Thanks for shopping");
        process.exit(0);
    }
};