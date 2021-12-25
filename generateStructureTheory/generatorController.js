"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatorController = void 0;
const utils_1 = require("../utils");
const generateCrud_1 = require("./generateCrud");
const modelGeneratorController_1 = require("./models/modelGeneratorController");
const generateApiRoutesController_1 = require("./apiRoutes/generateApiRoutesController");
const generatePagesController_1 = require("./pages/generatePagesController");
const generatorController = (userInput) => {
    let configData = (0, utils_1.readNextConfig)();
    console.log(configData);
    if (userInput[1] === "model" || userInput[1] === "m") {
        (0, modelGeneratorController_1.modelGeneratorController)(userInput);
    }
    else if (userInput[1] === "crud" || userInput[1] === "c") {
        (0, generateCrud_1.generateCrud)(userInput);
    }
    else if (userInput[1] === "api-routes" || userInput[1] === "a-r") {
        (0, generateApiRoutesController_1.generateApiRoutesController)(userInput);
    }
    else if (userInput[1] === "empty-api-routes" || userInput[1] === "e-a-r") {
    }
    else if (userInput[1] === "tests" || userInput[1] === "t") {
    }
    else if (userInput[1] === "pages" || userInput[1] === "p") {
        (0, generatePagesController_1.generatePagesController)(userInput);
    }
    else if (userInput[1] === "empty-pages" || userInput[1] === "e-p") {
    }
    else {
        console.log(`Sorry, that command wasnt recognized`);
    }
};
exports.generatorController = generatorController;
