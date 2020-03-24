# bamzon
Amazon like storefront using node.js &amp; mysql

The user can be a customer or a manager.

## Customer Interface 
To use the customer interface the user will enter "node bamazonCustomer.js",
which will load the Product View:
![Product View](screenshots/bamazon&#32;customer&#32;table&#32;view.png)

Then the customer can choose an item id & quantity to buy.
The app return the cost before tax and ask to continue or checkout
![cost before tax](screenshots/cost&#32;before&#32;tax.png)

If the customer chooses to continue, the app will show the final cost.
![checkout](screenshots/checkout.png)


## Manager Interface
To use the manager interface the user will enter "node bamazonManager.js"
which load the Manager Menu:
![manager menu](screenshots/Manager&#32;Menu.png)

### View Products
If the user chooses to view products for sale. This view is different than
the customer view, it includes the quantity.
![prod view](screenshots/View&#32;Products.png)

If the user chooses to view low inventory products