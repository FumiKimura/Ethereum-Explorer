const express = require("express");
const path = require("path");
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, "../build")));

//CRUD endpoints for database
app.get("/alladdress", async (req, res) => {
    const addresses = await prisma.address.findMany();
    res.send(addresses);
});

app.get("/address/:id", async (req, res) => {
    const address = await prisma.address.findUnique({
        where:{
            id: parseInt(req.params.id)
        }
    })
    res.send(address);
});

app.post("/address/:newaddress", async (req, res) => {
    const newAddress = await prisma.address.create({
        data:{
            address: req.params.newaddress
        }
    })
    res.send(newAddress);
});

app.patch("/address/:id/:newaddress", async (req, res) => {
    const updateAddress = await prisma.address.update({
        where:{
            id:parseInt(req.params.id)
        },
        data:{
            address: req.params.newaddress
        }
    });
    res.send(updateAddress);
});

app.delete("/address/:id", async (req, res) => {
    const deleteAddress = await prisma.address.delete({
        where:{
            id:parseInt(req.params.id)
        }
    });
    res.send(deleteAddress);
});

//Query for Ethereum blockchain data
app.get("/ethereum", async (req, res) => {
    res.send("Hello from Server");
})

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build", "index.html"));
})

module.exports = app;