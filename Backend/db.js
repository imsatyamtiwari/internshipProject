
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    id:{type:String,required:true},
    desc: {
        type:String,
        required:true
    },
    status: Boolean,
    crtBy: String,
   crtOn:Date
})

const transactionSchema = new mongoose.Schema({
    id:{type:String,required:true},
    stocks: Number,
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }
})


const Item = new mongoose.model('Item', itemSchema);
const Transaction = new mongoose.model('Transaction', transactionSchema);

module.exports = {
    Item,
    Transaction
}