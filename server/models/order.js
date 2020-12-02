const mongoose = require('mongoose')
const {Schema, model} = mongoose
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const order = new Schema({  
  id: { 
    type: Number, 
    unique: true,
  },
  packageName: String,
  packageCalories: String,
  packageDay: String,  
  startDate: Date,
  finishDate: Date,
  readOnly: {
    type: Boolean,
    default: false
  },
  deliveries: [
    {      
      id: { 
        type: Number, 
        unique: true
      },
      date: Date,
      interval: String,
      address: String
    }
  ]
})

order.plugin(autoIncrement.plugin, { model: 'Order', field: 'id', startAt: 1, incrementBy: 1 });

module.exports = model('Order', order)

