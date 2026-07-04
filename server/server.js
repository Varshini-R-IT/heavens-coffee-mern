require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Coffee = require("./models/coffee");
const app = express();
app.use(cors());
app.use(express.json());
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((err) => {
    console.error("MongoDB Connection Error:", err);
});
app.get("/menu", async (request, response) => {
    const coffees = await Coffee.find();
    response.json(coffees);
});
// Add Sample Coffee (Run Only Once)
app.get("/add", async (request, response) => {
    await Coffee.deleteMany({});
    await Coffee.insertMany([
        {
            name: "Espresso",
            price: 120
        },
        {
            name: "Cappuccino",
            price: 180
        },
        {
            name: "Cold Coffee",
            price: 150
        }
    ]);
    response.send("Coffee Menu Added Successfully!");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});