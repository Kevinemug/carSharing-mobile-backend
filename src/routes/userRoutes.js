/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Retrieves a list of cars
 *     description: Retrieve a list of cars
 *     responses:
 *       200:
 *         description: A list of cars.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 */

const express = require('express');
const {getAllUsers,getUserById} = require('../controllers/userController');
const router = express.Router();

router.get('/allUsers',getAllUsers);
router.get('/getUser/:id',getUserById);

module.exports = router;
