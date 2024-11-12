//instantiation
const express = require("express")
const app=express()
const mysql= require("mysql")
const moment=require("moment")
const PORT = process.env. PORT || 5000


const logger= (req,res,next) =>{
    console.log(
        ${req.protocol}://${req.get("host")}${req.originalUrl} : ${moment().format()}
    )
    next();
}
app.use(logger);


const connection = mysql.createConnection({
    host: "b7zfmrogncwdyqquuodk-mysql.services.clever-cloud.com",
    user: "ufkbkbvbqtfmndax",
    password: "4EyiPkcT7ZLuhbXlWMB4",
    database: "b7zfmrogncwdyqquuodk",
});

connection.connect();
//REPORT-CRUD
app.get("/api/products", (req,res) =>{
    connection.query("SELECT * FROM 1",(err,rows,fields) =>{
        if(err) throw err;
        res.json(rows)
    })
})

//REPORT-CRUD SEARCH
app.get("/api/products/:id", (req,res) =>{
    const id=req.params.id
    //res.send(id)
    connection.query(SELECT * FROM 1 WHERE id=${id}, (err,rows, fields)=>{
        if(err) throw err
        if(rows.lenght > 0){
        res.json(rows)
        }else{
            res.status(400).json({msg:`${id} id not found`})
        }
    })
})

//POST
//CREATE - CRUD
app.use(express.urlencoded({extended:false}))
app.post("/api/products", (req, res) =>{
    const itemname = req.body.itemname; //Juan
    const unitprice = req.body.unitprice; //DelaCruz
    const quantity = req.body.quantity; //juan@gmail.com
    const supplier =req.body.supplier; //male
    connection.query(INSERT INTO product (itemName, unitPrice, quantity, supplier) VALUES ('${itemname}','${unitprice}','${quantity}','${supplier}'),
        (err,rows,fields)=>{
            if(err) throw err;
            res.json({msg: `Succesfully insert`})
        }
    )
})

app.use(express.urlencoded({extended:false}))
app.put("/api/products",(req,res) =>{S
    const itemname = req.body.itemname; //Juan
    const unitprice = req.body.unitprice; //DelaCruz
    const quantity = req.body.quantity; //juan@gmail.com
    const supplier =req.body.supplier; //male
    const id=req.body.id;
    connection.query(UPDATE product SET itemName='${itemname}', unitPrice='${unitprice}',quantity='${quantity}',supplier='${supplier}' WHERE id='${id}',(err,rows,fields)=>{
        if(err) throw err
        res.json({msg: `Successfully Updated!`})
    })
})


//DELETE
app.use(express.urlencoded({extended:false}))
app.delete("/api/products",(req,res) =>{
    const id=req.body.id;
    HTMLFormControlsCollection.query(DELETE FROM 1 WHERE id='${id}'),(err,rows,fields)=>{
        if(err) throw err;
        res.json({msg: `Succesfully Deleted`})
    }
})

app.listen(5000, () => {
    console.log(Server is running in port ${PORT})
})
