const { Router } = require('express')
const Provider = require('../../models/Provider')
const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Provider:
 *       type: object
 *       example:
 *         id: sdfki4535e23
 *         name: provider test
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the provider
 *         name:
 *           type: string
 *           description: The provider name
 */

/**
 * @swagger
 * tags:
 *   name: Providers
 *   description: The providers managing API
 */

/**
 * @swagger
 * /api/provider:
 *  get:
 *    summary: Returns the list of all the providers
 *    tags: [Providers]
 *    responses:
 *      200:
 *        description: The list of clients
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Provider'
 *      404:
 *        description: Providers Not Found
 */

// get request
router.get('/', async (req, res) => {
  try {
    const providers = await Provider.find()
    if (!providers) throw new Error('Providers Not Found')
    // if (!providers) return res.status(404).json({success: false, message: 'Provider not found'})
    const sorted = providers.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
    res.status(200).json(sorted)
  } catch (error) {
    res.status(404).json({success: true, message: error.message})
  }
})

/**
 * @swagger
 * /api/provider/{id}:
 *  get:
 *    summary: Returns a provider by id
 *    tags: [Providers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The provider id
 *    responses:
 *      200:
 *        description: The provider description by id
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Provider'
 *      404:
 *        description: The client was not found
 *
 */

// get request - one provider
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try{
    const response = await Provider.findByIdAndUpdate(id, req.body)
    if (!response) throw Error('Something went wrong')
    const updated = { ...response._doc, ...req.body }
    res.status(200).json(updated)
  } catch (error) {
    res.status(404).json({success: false, error: error, errorMessage: error.message})
  }
})

/**
 * @swagger
 * /api/provider:
 *   post:
 *     summary: Create a new provider
 *     tags: [Providers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Provider'
 *     responses:
 *       200:
 *         description: The provider was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Provider'
 *       400:
 *          description: provider already exists
 *       500:
 *         description: Server error
 */

// post request
router.post('/', async (req, res) => {
  const newProvider = new Provider(req.body)

  try{
    const provider = await newProvider.save()
    if (!provider) throw Error('Something went wrong saving provider')
    res.status(200).json({success: true, provider: provider, message: 'Provider Added Success'})
  } catch (error) {
    if (error.code === 11000){
      res.status(400).json({success: false, error: error,  errorMessage: 'Provider Already Exists'})
    }else {
        res.status(500).json({success: false, error: error})
    }
  }
})

/**
 * @swagger
 * /api/provider/{id}:
 *  put:
 *    summary: Update the provider by the id
 *    tags: [Providers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The provider id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Provider'
 *    responses:
 *      200:
 *        description: The provider was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Provider'
 *      404:
 *        description: The provider was not found
 *      500:
 *        description: Server error occurred
 */

// edit request
router.put('/:id', async (req, res) => {
  const { id } = req.params
  try{
    const response = await Provider.findByIdAndUpdate(id, req.body)
    if (!response) throw Error('Something went wrong')
    const updated = { ...response._doc, ...req.body }
    res.status(200).json(updated)
  } catch (error) {
    // res.status(500).json({success: false, errorMessage: e.message})
    if (error.code === 11000){
      res.status(400).json({success: false, error: error,  errorMessage: 'Provider Already Exists'})
    }else {
      res.status(500).json({success: false, error: error})
    }
  }
})

/**
 * @swagger
 * /api/provider/{id}:
 *   delete:
 *     summary: Remove the provider by id
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The provider id
 *     responses:
 *       200:
 *         description: The provider was deleted
 *       404:
 *         description: The provider was not found
 */

// delete request
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const removed = await Provider.findByIdAndDelete(id)
    if (!removed) throw Error('Something went wrong. Provider could not be found')
    res.status(200).json(removed)
  } catch (error) {
    res.status(404).json({ errorMessage: error.message })
  }
})


module.exports = router
