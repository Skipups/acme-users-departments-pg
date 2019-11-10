// routes for returning index.html and /api/users /api/departments
// user has id, name, department_id,
//department has id, name

const express= require ('express');
const server = express();
const db = require('./db.js');
const path = require('path');

server.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, './index.html'));
})

server.get('/api/departments', async(req, res, next)=>{
    try{
        res.send(await db.getAllDepartments())
    }catch(ex){
        next(ex);
    }
})

server.get('/api/users', async(req, res, next)=>{
    try{
        res.send(await db.getAllUsers())
    }catch(ex){
        next(ex);
    }
})



db.sync().then(() => server.listen(3000));
