const { Router } = require('express')
const Provider = require('../../models/Provider')

const router = Router()

// get request
router.get('/', async (req, res) => {
  try {
    const providers = await Provider.find()
    if (!providers) throw new Error('No Providers')
    const sorted = providers.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
    res.status(200).json(sorted)
  } catch (e) {
    res.status(500).json({success: true, message: error.message})
  }
})


// post request
router.post('/', async (req, res) => {
  const newProvider = new Provider(req.body)

  console.log('newProvidereeeeeerrrrrrrrr', newProvider)
  try{
    const provider = await newProvider.save()
    console.log('provider at post req', provider)
    if (!provider) throw new Error('Something went wrong saving provider')
    res.status(200).json({success: true, provider: provider, message: 'Provider Added Success'})
  } catch (e) {
    res.status(500).json({success: false, error: e, errorMessage: e.message})
  }
})

// edit request
router.put('/:id', async (req, res) => {
  const { id } = req.params
  try{
    const response = await Provider.findByIdAndUpdate(id, req.body)
    if (!response) throw Error('Something went wrong')
    const updated = { ...response._doc, ...req.body }
    res.status(200).json(updated)
  } catch (e) {
    res.status(500).json({success: false, errorMessage: e.message})
  }
})

// delete request
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const removed = await Provider.findByIdAndDelete(id)
    if (!removed) throw Error('Something went wrong')
    res.status(200).json(removed)
  } catch (e) {
    res.status(500).json({ message: error.message })
  }
})


module.exports = router
