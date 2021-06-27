"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const generatorController_1 = require("./commands/generate/generatorController");
const help_1 = require("./commands/help/help");
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const recursiveReadline = () => {
    rl.question("next-generator command: ", function (answer) {
        let userInput = answer.trim().split(" ");
        switch (userInput[0]) {
            case "exit":
            case "e":
                rl.close();
                break;
            case "help":
            case "h":
                help_1.help();
                break;
            case "generate":
            case "g":
                generatorController_1.generatorController(userInput);
                break;
        }
        recursiveReadline();
    });
};
recursiveReadline();
