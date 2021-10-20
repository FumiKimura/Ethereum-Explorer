const express = require("express");
const path = require("path");
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();

app.use(express.static(path.resolve(__dirname, "../build")));

app.use(cors({ credentials: true }));

app.get("/test", async (req, res) => {
    const test = await prisma.address.findMany();
    res.send(test);
})


app.get("/address/addressById", (req, res) => {
    
});

app.get("/address/allAddress", (req, res) => {
    
});

app.post("/address/newAddress", (req, res) => {
    
});

app.patch("/address/updateAddress", (req, res) => {
    
});

app.delete("/address/deleteAddress", (req, res) => {
    
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build", "index.html"));
})

module.exports = app;