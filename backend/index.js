const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const UserRoutes = require('./routes/userRoutes')
const TicketRoutes = require('./routes/ticketRoutes')
const BusRoutes = require("./routes/busRoutes")
const BookingRoutes = require("./routes/bookingRoutes")

require("dotenv").config();

const app = express();
app.use(bodyParser.json());

app.use(cors());


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Connected to MongoDB'));

app.set("view engine", "ejs");

app.use('/', UserRoutes);
app.use('/', TicketRoutes);
app.use('/', BusRoutes);
app.use('/',BookingRoutes)


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})