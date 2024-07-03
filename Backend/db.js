
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    _id: mongoose.ObjectId,
    desc: String,
    status: Boolean,
    crtBy: String,
   crtOn:Date
})

const transactionSchema = new mongoose.Schema({
    _id: mongoose.ObjectId,
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