import { ethers } from 'https://cdn.jsdelivr.net/npm/ethers@6.3.0/dist/ethers.min.js';

let WALLET_CONNNECTED = "";
let contractAddress = "0xe284B04D1e42Fd5900f0b491055A73ab9caB6081";
let contractabi = [
    {
        "type": "constructor",
        "inputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "addTask",
        "inputs": [
            {
                "name": "_desc",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "getAllTasks",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct ToDoList.Task[]",
                "components": [
                    {
                        "name": "desc",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "status",
                        "type": "uint8",
                        "internalType": "enum ToDoList.TaskStatus"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getTask",
        "inputs": [
            {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "",
                "type": "uint8",
                "internalType": "enum ToDoList.TaskStatus"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "gettaskcount",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "markAsFinished",
        "inputs": [
            {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "tasks",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "desc",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "status",
                "type": "uint8",
                "internalType": "enum ToDoList.TaskStatus"
            }
        ],
        "stateMutability": "view"
    }
]
window.connectMetamask = async () => {
    try {
        if (!window.ethereum) {
            alert("Please install MetaMask to use this feature.");
            return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();

        // Use getAddress() to get the connected wallet address
        const address = await signer.getAddress();
        WALLET_CONNNECTED = address;

        const element = document.getElementById("metamasknotification");
        element.innerHTML = `Metamask is Connected: ${WALLET_CONNNECTED}`;
    } catch (error) {
        console.error("Error connecting to MetaMask:", error);
    }
};

window.getAllTasks = async () => {
    if (WALLET_CONNNECTED != 0) {
        var p3 = document.getElementById("p3");
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();

        const contractInstance = new ethers.Contract(contractAddress, contractabi, signer);
        p3.innerHTML = "Please wait, getting all the tasks from smart contract";
        var tasks = await contractInstance.getAllTasks();
        console.log(tasks);

        var table = document.getElementById("mytable");

        for (let i = 0; i < tasks.length; i++) {
            var row = table.insertRow();
            var idCell = row.insertCell();
            var descCell = row.insertCell();
            var statusCell = row.insertCell();

            const status = tasks[i].status == 0 ? "Pending" : "Finished";
            idCell.innerHTML=i;
            descCell.innerHTML=tasks[i].desc;
            statusCell.innerHTML=status;
        }

        p3.innerHTML="The Tasks Are Updated";

    } else {
        var p3 = document.getElementById("p3");
        p3.innerHTML = "Please Connect Metamask First";
    }
}
