
const Car = require('../models/carModel'); 

exports.addcar = async (req, res) => {
    const { carname, carprice, carimage,licensePlate } = req.body;
    const ownerId = req.user.userID;
    const carImagePath = req.file ? req.file.path : null;
    console.log(req.file);
    console.log(req.body);
    try {
        const newCar = new Car({
            carname,
            carprice,
            licensePlate,
            carimage: carImagePath || carimage,
            ownerId
        });
        const savedCar = await newCar.save();
        
        res.status(201).json({
            message: 'Car added successfully',
            car: {
                id: savedCar.carID,
                carname: savedCar.carname,
                carprice: savedCar.carprice,
                carimage: savedCar.carimage,
                licensePlate: savedCar.licensePlate,
                ownerId: savedCar.ownerId,

            },
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message, errors: error.errors });
        }
        
        if (error.code && error.code === 11000) {
            return res.status(409).json({ message: 'A car with this license plate already exists.' });        }

        res.status(500).json({ message: 'Server error occurred while adding the car.' });
    }
};

exports.getAllCars = async (req, res) => {
    const ownerId = req.user.userID;
const username = req.user.username;
    
    try {
        const cars = await Car.find({});
        const formattedCars = cars.map(car => {
            return {
                id: car.carID || car._id, 
                carname: car.carname,
                carprice: car.carprice,
                carimage: car.carimage,
                licensePlate: car.licensePlate,
                ownerId: ownerId , 
                username: username           // other fields you might want to include
            };
        });
        res.status(200).json({
            message: 'Cars fetched successfully',
            cars: formattedCars,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cars', error: error.message });
    }
};

exports.getCarById = async (req, res) => {
    const carId = req.params.id; 

    try {
        const car = await Car.findOne({ carID: carId });

        if (car) {
            res.status(200).json({
                message: 'Car fetched successfully',
                car: car
            });
        } else {
            res.status(404).json({ message: 'Car not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching car', error: error.message });
    }
};

exports.updateCar = async (req, res) => {
    const carId = req.params.id; 
    const updateData = req.body; 

    try {
        const updatedCar = await Car.findOneAndUpdate(
            { carID: carId },
            updateData,
            { new: true, runValidators: true }
        );

        if (updatedCar) {
            res.status(200).json({
                message: 'Car updated successfully',
                car: updatedCar
            });
        } else {
            res.status(404).json({ message: 'Car not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating car', error: error.message });
    }
};

exports.deleteCar = async (req, res) => {
    const carId = req.params.id;

    try {
        const deletedCar = await Car.findOneAndDelete({ carID: carId }); 

        if (deletedCar) {
            res.status(200).json({
                message: 'Car deleted successfully',
                car: deletedCar
            });
        } else {
            res.status(404).json({ message: 'Car not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting car', error: error.message });
    }
};
