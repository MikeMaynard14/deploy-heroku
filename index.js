const express = require('express'); 
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
require('dotenv/config');
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "client", "build")));

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(routes);


mongoose.connect(process.env.DB_CONNECTION, (err) =>{
    if(err){
        console.log("There was an error connecting to MongoDB");
    } else {
        console.log("Connection Successful");
    }
})

const PORT = process.env.PORT || 5000; 

app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Sever has started on port: ${PORT}`)); 
