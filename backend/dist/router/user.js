"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("./../controller/userController");
const auth_1 = __importDefault(require("../middleware/auth"));
const userRouter = express_1.default.Router();
userRouter.get("/me", auth_1.default, userController_1.getMe);
exports.default = userRouter;
