const express = require ('express');
const app = express(); //app express name 
require ('dotenv').config(); //import what is on .env file


// Routes
const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")
const flightRoutes = require("./routes/flightRoutes")

app.get('/', (req, res) => {
    res.send('Welcome from express!')
})

app.use(express.json());
// BACKEND ROUTES
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/flights', flightRoutes);

mongoose.connect(process.env.DB_URL).then(() => console.log('DB Connected successfully!')).catch(err => console.log("DB error", err));


const PORT = process.env.PORT || 5000; //access PORT connection from .env 

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})