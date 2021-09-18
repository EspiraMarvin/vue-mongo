
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
