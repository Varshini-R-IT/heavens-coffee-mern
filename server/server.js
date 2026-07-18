require("dotenv").config();
const dns = require("dns");

// Configure custom DNS servers for c-ares to bypass local Windows DNS resolution issues
if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder("ipv4first");
}
try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (err) {
    console.warn(`DNS server configuration warning: ${err.message}`);
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Coffee = require("./models/coffee");
const Order = require("./models/order");
const app = express();
app.use(cors());
app.use(express.json());
// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
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

app.post("/order", async (request, response) => {

    try {

        const order = new Order({
            customerName: request.body.customerName,
            coffee: request.body.coffee,
            price: request.body.price
        });

        await order.save();

        response.json({
            success: true,
            message: "Order Saved Successfully"
        });

    } catch (error) {

        response.status(500).json({
            success: false,
            message: error.message
        });

    }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});