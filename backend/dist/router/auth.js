"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../middleware/validate"));
const authController_1 = require("../controller/authController");
const schema_1 = require("../zod/schema");
const auth_1 = __importDefault(require("../middleware/auth"));
const authRouter = express_1.default.Router();
authRouter.post("/signup", (0, validate_1.default)(schema_1.signUpInput), authController_1.signup);
authRouter.post("/signin", (0, validate_1.default)(schema_1.signInInput), authController_1.signin);
authRouter.post("/signout", auth_1.default, authController_1.signout);
exports.default = authRouter;
