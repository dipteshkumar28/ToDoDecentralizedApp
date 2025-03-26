// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/TodoList.sol";

contract DeployScript is Script {
    function run() external {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(privateKey);
        ToDoList taskToDo = new ToDoList();
        console.log("Contract deployed at:", address(taskToDo));
        vm.stopBroadcast();
    }
}
