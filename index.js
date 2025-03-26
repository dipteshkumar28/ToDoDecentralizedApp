const express = require("express");
const app = express();
const fileUpload = require('express-fileupload');
app.use(
    fileUpload({
        extended: true
    })
);
app.use(express.static(__dirname));
app.use(express.json());
const path = require("path");
const { ethers } = require("ethers");
var port = 3000;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

const SEPOLIA_RPC_URL = "https://eth-sepolia.g.alchemy.com/v2/hsfl6UotB_rG5OFa7Tf0WUxpPIivgZk1";
const PRIVATE_KEY = "0b755a414d99beddce37b7d39eea6f9cbf2baaf7b521ce81de9c676917efe1f7";
const CONTRACT_ADDRESS = "0xe284B04D1e42Fd5900f0b491055A73ab9caB6081";

const { abi } = require("./out/TodoList.sol/ToDoList.json");
const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);


const contractinstance = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
app.post("/addTask", async (req, res) => {
    var tasks = req.body.task;
    console.log(tasks);
    async function storeDataInBlockchain(tasks) {
        console.log("Adding the task in the blockchain network...");
        const tx = await contractinstance.addTask(tasks);
        await tx.wait();
        console.log(tx);
    }

    await storeDataInBlockchain(tasks);
    res.send("The task has been registered in the smart contract");
});
app.post("/changeStatus", async (req, res) => {
    var id = req.body.id;

    async function storeDataInBlockchain(id) {
        console.log("Changing the task status....");
        const tx = await contractinstance.markAsFinished(id);
        await tx.wait();
    }

    await storeDataInBlockchain(id);
    res.send("The task status has been changed in the smart contract");
});

app.listen(port, function () {
    console.log("Server is Live");
    console.log("App is listening on port 3000");
});