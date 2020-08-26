const express = require('express');
const sqlite3 = require('sqlite3').verbose()
const bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let db = new sqlite3.Database(':memory:');
db.run('CREATE TABLE User(name text, email text)');
db.run('CREATE TABLE Company(name text, phone number)');
db.run('CREATE TABLE Jobs(title text, company text)');
app.post('/newuser', (req, res) => {
    db.run(`INSERT INTO User(name,email) VALUES(?,?)`, [req.body.name, req.body.email], function (err) {
        if (err) {
            return console.log(err.message);
        }
        res.json('success')
    });
})
app.get('/allusers',(req,res)=>{
    let sql = `SELECT distinct * FROM User`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        let result=[]
        rows.forEach((row) => {
            obj={}
            obj["name"]=row.name;
            obj["email"]=row.email;
            result.push(obj);
            console.log(row.name+" "+row.email);
        });
        res.json(result);
    });
})
app.post('/newcompany', (req, res) => {
    db.run(`INSERT INTO Company(name,phone) VALUES(?,?)`, [req.body.name, req.body.phone], function (err) {
        if (err) {
            return console.log(err.message);
        }
        res.json('success')
    });
})
app.get('/allcompanies',(req,res)=>{
    let sql = `SELECT distinct * FROM Company`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        let result=[]
        rows.forEach((row) => {
            obj={}
            obj["name"]=row.name;
            obj["phone"]=row.phone;
            result.push(obj);
            console.log(row.name+" "+row.phone);
        });
        res.json(result);
    });
})
app.post('/newjob', (req, res) => {
    db.run(`INSERT INTO Jobs(title,company) VALUES(?,?)`, [req.body.title, req.body.company], function (err) {
        if (err) {
            return console.log(err.message);
        }
        res.json('success')
    });
    
})
app.get('/alljobs',(req,res)=>{
    let sql = `SELECT distinct * FROM Jobs`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        let result=[]
        rows.forEach((row) => {
            obj={}
            obj["title"]=row.title;
            obj["company"]=row.company;
            result.push(obj);
            console.log(row.title+" "+row.company);
        });
        res.json(result);
    });
})
app.listen(8080)