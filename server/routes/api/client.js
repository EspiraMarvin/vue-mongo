const { Router } = require('express')
const Client = require('../../models/Client')

const router = Router()

// get request
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find()
    if (!clients) throw new Error('No Clients')
    const sorted = clients.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
    res.status(200).json(sorted)
  } catch (e) {
    res.status(500).json({success: true, message: e.message})
  }
})


// post request
router.post('/', async (req, res) => {
  console.log('post request')
  const newClient = new Client(req.body)
  console.log('newClient request', newClient)
  try{
    const client = await newClient.save()
    console.log('client at post req', client)
    if (!client) throw new Error('Something went wrong saving client')
    res.status(200).json({success: true, client: client, message: 'Client Added Success'})
  } catch (e) {
   res.status(500).json({success: false, error: e, errorCode: e.code, errorMessage: e.message})
  }
})

// edit request
router.put('/:id', async (req, res) => {
  const { id } = req.params
  try{
    const response = await Client.findByIdAndUpdate(id, req.body)
    if (!response) throw Error('Something went wrong')
    const updated = { ...response._doc, ...req.body }
    res.status(200).json(updated)
  } catch (e) {
    res.status(500).json({success: false, error: e, errorCode: e.code, errorMessage: e.message})
  }
})

// delete request
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const removed = await Client.findByIdAndDelete(id)
    if (!removed) throw Error('Something went wrong')
    res.status(200).json(removed)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

module.exports = router