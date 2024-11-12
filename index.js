//instantiation
//import express API framework
const express = require("express")
const app = express();
const moment = require('moment')
//importing mysql
const mysql = require("mysql")
//port number
const PORT = process.env.PORT || 5000;

const logger = (req, res, next) =>{
    // https://bpi.com.ph  
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} : ${moment().format()}`)
    next()
}

app.use(logger)
//connection to mysql
const connection = mysql.createConnection({
    host: "b7zfmrogncwdyqquuodk-mysql.services.clever-cloud.com",
    user: "ufkbkbvbqtfmndax",
    password: "4EyiPkcT7ZLuhbXlWMB4",
    database: "b7zfmrogncwdyqquuodk",
});

//initilization of connection
connection.connect();


//API - REPORT
//GET request and response are the parameters
app.get("/api/products", (req, res) =>{
    //create a query
    connection.query("SELECT * FROM 1 ",(err, rows, fields)=>{
        //checking errors
        if(err) throw err;
        //response
        //key value pair
        res.json(rows);
    });
});

//API - REPORT - SEARCH
//passing the id parameter
//request - >>> front-end ID
app.get("/api/products:id",(req, res)=>{
    const id1=req.params.id; 
    connection.query(`SELECT * FROM 1 WHERE id='${id1}'`, (err, rows, fields)=>{
        if(err) throw err;

        if(rows.length > 0){
            res.json(rows);
        }else{
            res.status(400).json({msg: `${id1} id not found!`})
        }
    })
    //res.send(id);
})


//POST - CREATE
app.use(express.urlencoded({extended: false}))
app.post("/api/products", (req, res)=>{
    const item = req.body.item;
  const price = req.body.price;
  const quan = req.body.quan;
  const sup = req.body.sup;
    connection.query(`INSERT INTO 1 (supplier, itemname, unitPrice, quantity) VALUES ('${sup}','${item}', '${price}', '${quan}')`, (err, rows, fields) =>{
        if(err) throw err;
        res.json({msg: `Successfully inserted`});
    })

})

//CRUD
//API
//PUT - UPDATE
app.use(express.urlencoded({ extended: false }));
app.put("/api/products", (req, res) => {
  const item = req.body.item;
  const price = req.body.price;
  const quan = req.body.quan;
  const sup = req.body.sup;
  const id1 = req.body.id1;
  connection.query(
    `UPDATE 1 SET supplier='${sup}', itemname='${item}', unitPrice='${price}', quantity='${quan}' WHERE id='${id1}'`,
    (err, rows, fields) => {
      if (err) throw err;
      res.json({ msg: `Successfully updated!` });
    }
  );
});

//DELETE API
app.use(express.urlencoded({ extended: false }));
app.delete("/api/products", (req, res) =>{
    const id1=req.body.id;
    connection.query(`DELETE FROM 1 WHERE id='${id1}'`, (err, rows, fields)=>{
        if(err) throw err
        res.json({msg: `Successfully deleted!`})
    })
})




app.listen(5000, () => {
    console.log(`Server is running in port ${PORT}`);
})
