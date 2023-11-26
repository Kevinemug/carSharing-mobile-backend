const mongoose = require('mongoose');
const express = require('express');
const authRoutes = require('./routes/authRoutes'); 
const carRoutes = require('./routes/carRoutes');
const userRoutes = require('./routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');



mongoose.connect('mongodb://127.0.0.1:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const app = express();
app.use(express.json()); 

app.use('/api/auth', authRoutes); // Mounting user routes
app.use('/api/car', carRoutes); // Mounting user routes
app.use('/api/user', userRoutes); // Mounting user routes')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
