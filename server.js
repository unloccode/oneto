const express = require('express');

const app = express();
const PORT = 8080;

//simple route
app.get('/', (req, res)=>{
    res.send({message: "I am Unloccode!"});
});

//fire up the server
app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});