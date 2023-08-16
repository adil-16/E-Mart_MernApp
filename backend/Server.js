const express = require("express");

const mongoose = require("mongoose");
require("dotenv").config();

const cors = require("cors");

const routes = require("./routes/UserRoute");
const route = require("./routes/ProductsRoute");
const Route = require("./routes/OrderRoute");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Mongodb Connected..."))
    .catch((err) => console.error(err));

// Routes
app.use('/users', routes); 
app.use('/products', route);
app.use('/orders', Route) ;



app.listen(PORT, () => console.log("Server running on port " + PORT));