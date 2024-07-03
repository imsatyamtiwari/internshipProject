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
        await mongoose.connect('mongodb+srv://satyam_21:Satyam123@cluster0.uoxag2f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log("database connected");
    } catch (err) {
        console.log("some error occured");
    }
}

db();


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/search', async (req, res) => {
    const body = req.body;
    const items = await Item.find({ $or: [{ _id: body.value }, { desc: body.value }] });
    console.log(items);
    res.json({
        msg:"msg sent"
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
