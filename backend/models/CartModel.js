const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        ingredient: { type: String },
        quantity: { type: Number } // Change this to Number
    }]
}, { timestamps: true });

cartSchema.index({ userId: 1 });

module.exports = mongoose.model('Cart', cartSchema);