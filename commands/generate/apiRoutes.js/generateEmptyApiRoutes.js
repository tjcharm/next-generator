"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEmptyApiRoutes = void 0;
const utils_1 = require("../../../utils");
const fs_1 = require("fs");
const generateEmptyApiRoutes = async (userInput) => {
    const modelName = userInput[2];
    if (!modelName) {
        return `no routeName recieved`;
    }
    if (!fs_1.existsSync(`pages`)) {
        await utils_1.createDirectory("pages");
    }
    if (!fs_1.existsSync(`pages/api`)) {
        await utils_1.createDirectory("pages/api");
    }
    if (!fs_1.existsSync(`pages/api/${modelName}s`)) {
        utils_1.createDirectory(`pages/api/${modelName}s`);
    }
    utils_1.createFile(`pages/api/${modelName}s/index.js`, "// blank test content for index");
    utils_1.createFile(`pages/api/${modelName}s/[${modelName}Id].js`, "// blank test content");
};
exports.generateEmptyApiRoutes = generateEmptyApiRoutes;
