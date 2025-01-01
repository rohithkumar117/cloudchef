const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calendarSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
    date: { type: Date, required: true }
}, { timestamps: true });

calendarSchema.index({ userId: 1, date: 1 });

module.exports = mongoose.model('Calendar', calendarSchema);