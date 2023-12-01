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
/**
 * @swagger
 * /cars:
 *   post:
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
const authenticate = require('../middleware/authenticate');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { addcar,getAllCars, updateCar,getCarById,deleteCar} =require('../controllers/carController');
const router = express.Router();

router.get('/cars',authenticate, getAllCars);
router.get('/cars/:id', getCarById);
router.post('/cars',upload.single('carimage'), authenticate, addcar);
router.patch('/cars/:id', authenticate, updateCar);
router.delete('/cars/:id', authenticate, deleteCar);
module.exports = router;