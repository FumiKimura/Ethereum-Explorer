const express = require("express");
const path = require("path");
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const axios = require('axios');

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
app.get("/ethereum/latest", async (req, res) => {
    const data = await axios.post('https://mainnet.infura.io/v3/b0b3157f5e7c420dbb454144ea397263', {
        "id": 1337,
        "jsonrpc": "2.0",
        "method": "eth_blockNumber",
        "params": []
      });
    res.send(data.data);
});  

app.get("/ethereum/latest/setup", async (req, res) => {
    const blockNums = [];
    const latestBlock = await axios.post('https://mainnet.infura.io/v3/b0b3157f5e7c420dbb454144ea397263', {
        "id": 1337,
        "jsonrpc": "2.0",
        "method": "eth_blockNumber",
        "params": []
    });

    const latestBlockNum = parseInt(latestBlock.data.result);
    let nextBlockNum = latestBlockNum;

    for(let i = 0; i < 5; i++){
        nextBlockNum -= i
        let nextBlockBinary = `0x${nextBlockNum.toString(16)}`;
        blockNums.push(axios.post('https://mainnet.infura.io/v3/b0b3157f5e7c420dbb454144ea397263', {
            "id": 1337,
            "jsonrpc": "2.0",
            "method": "eth_getBlockByNumber",
            "params": [nextBlockBinary, true]
        }))
    }
    Promise.all(blockNums).then((arr)=>{
        res.send(arr.map((block)=>block.data.result));
    })
});  

app.get("/ethereum/latest/:blocknum", async (req, res) => {
    const {blocknum} = req.params;
    const blocks = [];

    res.send(blocknum);
    // const latestBlockNum = await axios.post('https://mainnet.infura.io/v3/b0b3157f5e7c420dbb454144ea397263', {
    //     "id": 1337,
    //     "jsonrpc": "2.0",
    //     "method": "eth_blockNumber",
    //     "params": []
    // });

    // let i = 0;
    // let nextBlock = latestBlockNum.data.result;
    // res.send(parsInt(nextBlock));
    // // while(nextBlock !== blocknum){
    //     nextBlock = (parseInt(latestBlockNum.data.result) - i).toString(16);
    //     console.log(nextBlock);
    //     const latestBlockData = await axios.post('https://mainnet.infura.io/v3/b0b3157f5e7c420dbb454144ea397263', {
    //         "id": 1337,
    //         "jsonrpc": "2.0",
    //         "method": "eth_getBlockByNumber",
    //         "params": [nextBlock, true]
    //     })

    //     blocks.push(latestBlockData.data.result);
    //     i++;
    // }

    // Promise.all(blocks).then((arr)=>{
    //     res.send(arr.map((block)=> block.data.result));
    // })
    // res.send(latestBlockData);
})

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build", "index.html"));
})

module.exports = app;