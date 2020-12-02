const mongoose = require('mongoose')
const {Schema, model} = mongoose
const autoIncrement = require('mongoose-auto-increment');

const delivery = new Schema({
  id: { 
    type: Number, 
    unique: true,
    required: true
  },
  date: Date,
  interval: String,
  address: String
})

delivery.plugin(autoIncrement.plugin, { model: 'Delivery', field: 'id', startAt: 1, incrementBy: 1 });

module.exports = model('Delivery', delivery)