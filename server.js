// import dependancies
const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');

// configuring environment variable
dotenv.config();

//creating a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// test the connection
db.connect((err) =>{
    // connection is not succeful
    if (err){
        return console.log(' error connecting to database:', err)
    }

    // connection is successful
    console.log("successfully connected to mySQL:" , db.threadId)
})


app.set('view engine','ejs');
app.set('views',__dirname + '/views');


//1. Retrieve all patients
//retrieve all patients
app.get('/patients',(req, res) => {
    const getPatients = "SELECT patient_id,first_name ,last_name,date_of_birth FROM patients"
    db.query(getPatients , (err, data) => {
        // if i have an errer
        if(err) {
            return res.status(400).json('Failed to get patients' ,err)
        
        }
        res.render('data', {data }); 
        // res.status(200).json(data);
    })
})


//2. Retrieve all providers
app.get('/providers',(req, res) => {
    const getPatients = "SELECT first_name ,last_name, provider_specialty FROM providers"
    db.query(getPatients , (err, data) => {
        // if i have an errer
        if(err) {
            return res.status(400).json('Failed to get providers' ,err)
        
        }
        res.render('data', {data }); 
        // res.status(200).json(data);
    })
})


//3. Filter patients by First Name
app.get('/firstname-patients',(req, res) => {
    const getPatients = "SELECT first_name  FROM patients"
    db.query(getPatients , (err, data) => {
        // if i have an errer
        if(err) {
            return res.status(400).json('Failed to get patients' ,err)
        
        }
        res.render('data', {data }); 
        // res.status(200).json(data);
    })
})

//4. Retrieve all providers by their specialty
app.get('/providers-specialty',(req, res) => {
    const getPatients = "SELECT provider_specialty FROM providers"
    db.query(getPatients , (err, data) => {
        // if i have an errer
        if(err) {
            return res.status(400).json('Failed to get providers' ,err)
        
        }
        res.render('data', {data }); 
        // res.status(200).json(data);
    })
})




// start and listen to the server
app.listen(3300,() => {
    console.log('server is running on port 3300...')
})