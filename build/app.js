"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var PORT = process.env.PORT || 5000;
app.get('/', function (req, res, next) {
    res.send("Hello from CRM api.");
});
app.listen(PORT, function () {
    console.log("Server Started");
});
