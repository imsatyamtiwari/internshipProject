const express = require('express')
const cors = require('cors');
const mongoose = require("mongoose");
const { Item, Transaction } = require('./db.js');
const app = express()
const port = 3000

app.use(express.json());
app.use(cors());

async function db() {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017');
        console.log("database connected");
    } catch (err) {
        console.log("some error occured");
    }
}

db();


app.get('/', async (req, res) => {
    try{
        const data = await Item.aggregate([
            {
              $lookup: {
                from: "transactions",       
                localField: "id",
                foreignField: "item_id",     
                as: "transactions"       
              }
            },
            {
              $unwind: "$transactions"   
            }
          ]);
        res.status(200).json({data});
    }catch(err){
        console.log("some error occured ",err);
        res.status(500).json({msg:"internal server error"});
    }
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
