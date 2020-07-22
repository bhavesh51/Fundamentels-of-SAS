// /customers: GET, POST, DELETE
// /customers/:customerId: GET, PUT, DELETE

module.exports = app => {
    const customers = require("../controllers/customer.controller.js");

    //create new customer 
    app.post("/customers", customers.create);

    //retrive customers
    app.get("/customers", customers.findAll);

    //retrive single customer 
    app.get("/customers/:customerId", customers.findOne);

    //update a customers with customer id
    app.put("/customers/:customerId", customers.update);

    //delete customer with customer id
    app.delete("/customers/:customerId", customers.delete);

    //delete all customers
    app.delete("/customers", customers.deleteAll);

};
