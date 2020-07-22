// create a new Customer
// find a Customer by id
// get all Customers
// update a Customer by id
// remove a Customer
// remove all Customers

const sql = require('./db.js');

//constructor

const Customer = function(customer) {
    this.email = customer.email;
    this.name = customer.name;
    this.active = customer.active;
};


//get all
Customer.getAll = result => {
    sql.query("select * from customers",(err, res) => {
        if(err){
            console.log("error:",err);
            result(null,err);
            return;
        }
        console.log("customers:",res);
        result(null,res);
    });
};

Customer.create = (newCustomer, result) => {
    sql.query("insert into customers set ?", newCustomer,(err, res) => {
        if(err){
            console.log("error", err);
            result(err,null);
            return;
        }
        console.log("created customer:", { id: res.insertId, ...newCustomer }); 
        result(null,{id:res.insertId, ...newCustomer});
    });
};

Customer.findById = (customerId, result) => {
    sql.query(`select * from customers where id = ${customerId}`,(err,res) => {
        if (err) {
            console.log("error: ",err);
            result(err,null);
            return;
        }
        if (res.length) {
            console.log("customers found: ",res[0]);
            result(null,res[0]);
            return;
        }
        //no data
        result({kind:"not_found"},null);
    });
};

Customer.updateById = (id,customer,result) => {
    sql.query(
        "update customers set email = ?, name = ?, active =?, where id = ?",
        [customer.email, customer.name, customer.active],
        (err,res) => {
            if(err){
                console.log("error:", err);
                result(null,err);
                return;
            }
            
            if(res.affectedRows == 0){
                result({kind:"not_found"},null);
                return;
            }

            console.log("updated customers:", {id:id, ...customer});
            return(null,{id:id, ...customer});
        }
    );
};

Customer.remove = (id,result) => {
    sql.query("delete from customers where id = ?", id, (err, res) => {
        if(err){
            console.log("error:",err);
            result(null,err);
            return;
        }

        if(res.affectedRows == 0){
            result({kind: "not_found"},null);
            return;
        }

        console.log("deleted customer with id:",id);
        result(null,res);
    });
};

Customer.removeAll = result =>{
    sql.query("delete from customer", (err,res) => {
        if(err){
            console.log("error:",err);
            result(null,err);
            return;
        }

        console.log(`deleted customer ${res.affectedRows}`);
        result(null,res);
    });
};

module.exports = Customer;