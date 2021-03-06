const { Router } = require('express')
const Client = require('../../models/Client')
const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       example:
 *         id: 2e34wrf7
 *         name: client test
 *         email: clienttest@gmail.com
 *         phone: 8175698909
 *         providers: [ { id: skdfsdf }, { id: ksdzkw43} ]
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - providers
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the client
 *         name:
 *           type: string
 *           description: The client name
 *         email:
 *           type: string
 *           description: The client email address
 *         phone:
 *           type: integer
 *           description: The client phone number
 *         providers:
 *           type: array
 *           description: The client's providers
 */

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: The clients managing API
 */

/**
 * @swagger
 * /api/client:
 *  get:
 *    summary: Returns the list of all the clients
 *    tags: [Clients]
 *    responses:
 *      200:
 *        description: The list of clients
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Client'
 *      404:
 *        description: Clients Not Found
 *
 */

router.get('/', async (req, res) => {
  try {
    const clients = await Client.find()
    if (!clients) throw new Error('No Clients')
    const sorted = clients.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
    res.status(200).json(sorted)
  } catch (error) {
    res.status(404).json({success: true, message: error.message})
  }
})

/**
 * @swagger
 * /api/client/{id}:
 *  get:
 *    summary: Returns a client by id
 *    tags: [Clients]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The client id
 *    responses:
 *      200:
 *        description: The client description by id
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Client'
 *      404:
 *        description: The client was not found
 *
 */

// get request - one client
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try{
    const response = await Client.findByIdAndUpdate(id, req.body)
    if (!response) throw Error('Something went wrong')
    const updated = { ...response._doc, ...req.body }
    res.status(200).json(updated)
  } catch (error) {
    res.status(404).json({success: false, error: error,  errorMessage: error.message})
  }
})

/**
 * @swagger
 * /api/client:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: The client was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *          description: client already exists
 *       500:
 *         description: Server error
 */

// post request
router.post('/', async (req, res) => {
  const newClient = new Client(req.body)
  try{
    const client = await newClient.save()
    if (!client) throw new Error('Something went wrong saving client')
    res.status(200).json({success: true, client: client, message: 'Client Added Success'})
  } catch (error) {
    if (error.code === 11000){
      res.status(400).json({success: false, error: error,  errorMessage: 'Client with this Email Already Exists'})
    }else {
      res.status(500).json({success: false, error: error})
    }
  }
})

/**
 * @swagger
 * /api/client/{id}:
 *  put:
 *    summary: Update the client by the id
 *    tags: [Clients]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The client id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Client'
 *    responses:
 *      200:
 *        description: The client was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Client'
 *      400:
 *        description: The client with this email already exists
 *      500:
 *        description: Server error occurred
 */

// edit request
router.put('/:id', async (req, res) => {
  const { id } = req.params
  try{
    const response = await Client.findByIdAndUpdate(id, req.body)
    if (!response) throw Error('Something went wrong')
    const updated = { ...response._doc, ...req.body }
    res.status(200).json(updated)
  } catch (error) {
    if (error.code === 11000){
      res.status(400).json({success: false, error: error,  errorMessage: 'Client with this Email Already Exists'})
    }else {
      res.status(500).json({success: false, error: error})
    }
  }
})


/**
 * @swagger
 * /api/client/{id}:
 *   delete:
 *     summary: Remove the client by id
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The client id
 *     responses:
 *       200:
 *         description: The client was deleted
 *       404:
 *         description: The client was not found
 */

// delete request
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const removed = await Client.findByIdAndDelete(id)
    if (!removed) throw Error('Something went wrong. Client could not be found')
    res.status(200).json(removed)
  } catch (error) {
    res.status(404).json({ errorMessage: error.message })
  }
})

module.exports = router
