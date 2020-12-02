const {Router} = require('express')
const Order = require('../models/order')
const Delivery = require('../models/delivery')
const router = Router()


router.get('/getOrders', async (req, res) => {
  try {
    const orders = await Order.find().lean()
    res.status(200).json(orders)
  } catch (e) {
    console.log(e)
  }
})
router.get('/getOrders/:id', async (req, res) => {
  try {
    const order = await Order.findOne({id: req.params.id}).lean()
    res.status(200).json(order)
  } catch (e) {
    console.log(e)
  }
})
router.post('/duplicateOrder', async (req, res) => {
  try {
    const newOrder = req.body
    const startDelivery = new Date(+new Date())
    const finishDelivery = new Date(+new Date() + (30*24*60*60*1000))
    // - 7*24*60*60*1000
    const periodDelivery = finishDelivery - startDelivery
    const stepDelivery = periodDelivery / 10
    const deliveries = []

    for(let i = 0; i <= periodDelivery; i += stepDelivery){     
      const delivery = new Delivery({
        date: new Date(Date.parse(startDelivery) + i),
        interval: newOrder.deliveries[0].interval,
        address: newOrder.deliveries[0].address
      })
      await delivery.save();
      deliveries.push(delivery)
    }    

    newOrder.startDate = startDelivery
    newOrder.finishDate = finishDelivery
    newOrder.deliveries = deliveries

    const order = new Order(newOrder)       

    await order.save()    

    return res.status(201).json(order)
  } catch (e) {
    console.log(e)
  }
})

router.post('/cancelOrder', async (req, res) => {
  try {
    await Order.deleteOne({_id: req.body.id})
    return res.status(204).json({
      cancel: 'success'
    })
  } catch (e) {
    console.log(e)
  }
})

router.post('/create', async (req, res) => {  
  try {
    const newOrder = req.body
    const startDelivery = new Date(+new Date() - 7*24*60*60*1000)
    const finishDelivery = new Date(+new Date() + (30*24*60*60*1000 - 7*24*60*60*1000))
    // - 7*24*60*60*1000
    const periodDelivery = finishDelivery - startDelivery
    const stepDelivery = periodDelivery / 10
    const deliveries = []

    for(let i = 0; i <= periodDelivery; i += stepDelivery){     
      const delivery = new Delivery({
        date: new Date(Date.parse(startDelivery) + i),
        interval: newOrder.deliveries[0].interval,
        address: newOrder.deliveries[0].address
      })
      await delivery.save();
      deliveries.push(delivery)
    }    

    newOrder.startDate = startDelivery
    newOrder.finishDate = finishDelivery
    newOrder.deliveries = deliveries

    const order = new Order(newOrder)       

    await order.save()    

    return res.status(201).json(order)
  } catch (e) {
    console.log(e)
  }
})

module.exports = router